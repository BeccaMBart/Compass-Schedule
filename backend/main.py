from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException, Path, Request, Response
from fastapi.responses import JSONResponse
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlmodel import Session, select

from database import get_session, verify_database
from models import Course, Room, Section, Teacher
from schemas import (
    CourseRead, CourseWrite, RoomCreate, RoomRead,
    SectionRead, SectionWrite, TeacherRead, TeacherWrite,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    verify_database()
    yield


app = FastAPI(title="Class Scheduler", lifespan=lifespan)
DatabaseSession = Annotated[Session, Depends(get_session)]
RecordId = Annotated[int, Path(gt=0, le=2147483647)]


def get_record(session, model, record_id):
    record = session.get(model, record_id)
    if record is None:
        raise HTTPException(status_code=404, detail="Record not found.")
    return record


def save_record(session, record):
    session.add(record)
    session.commit()
    session.refresh(record)
    return record


@app.exception_handler(IntegrityError)
async def relationship_conflict(request: Request, error: IntegrityError):
    return JSONResponse(
        status_code=409,
        content={"detail": "A related record changed or is still referenced. Reload and try again."},
    )


@app.exception_handler(SQLAlchemyError)
async def storage_unavailable(request: Request, error: SQLAlchemyError):
    return JSONResponse(
        status_code=503,
        content={"detail": "Catalog storage is unavailable. Check PostgreSQL and retry."},
    )


@app.get("/rooms", response_model=list[RoomRead])
def list_rooms(session: DatabaseSession):
    return session.exec(select(Room).order_by(Room.id)).all()


@app.post("/rooms", status_code=201, response_model=RoomRead)
def create_room(room: RoomCreate, session: DatabaseSession):
    return save_record(session, Room(**room.model_dump()))


@app.get("/rooms/{record_id}", response_model=RoomRead)
def read_room(record_id: RecordId, session: DatabaseSession):
    return get_record(session, Room, record_id)


@app.put("/rooms/{record_id}", response_model=RoomRead)
def update_room(record_id: RecordId, room: RoomCreate, session: DatabaseSession):
    saved = get_record(session, Room, record_id)
    saved.name = room.name
    saved.capacity = room.capacity
    return save_record(session, saved)


@app.get("/teachers", response_model=list[TeacherRead])
def list_teachers(session: DatabaseSession):
    return session.exec(select(Teacher).order_by(Teacher.id)).all()


@app.get("/teachers/{record_id}", response_model=TeacherRead)
def read_teacher(record_id: RecordId, session: DatabaseSession):
    return get_record(session, Teacher, record_id)


@app.post("/teachers", status_code=201, response_model=TeacherRead)
def create_teacher(teacher: TeacherWrite, session: DatabaseSession):
    return save_record(session, Teacher(**teacher.model_dump()))


@app.put("/teachers/{record_id}", response_model=TeacherRead)
def update_teacher(record_id: RecordId, teacher: TeacherWrite, session: DatabaseSession):
    saved = get_record(session, Teacher, record_id)
    saved.display_name = teacher.display_name
    return save_record(session, saved)


@app.delete("/teachers/{record_id}", status_code=204, response_class=Response)
def delete_teacher(record_id: RecordId, session: DatabaseSession):
    saved = get_record(session, Teacher, record_id)
    if session.exec(select(Section.id).where(Section.teacher_id == record_id)).first() is not None:
        raise HTTPException(status_code=409, detail="This teacher is used by a section and cannot be deleted.")
    session.delete(saved)
    session.commit()
    return Response(status_code=204)


@app.get("/courses", response_model=list[CourseRead])
def list_courses(session: DatabaseSession):
    return session.exec(select(Course).order_by(Course.id)).all()


@app.get("/courses/{record_id}", response_model=CourseRead)
def read_course(record_id: RecordId, session: DatabaseSession):
    return get_record(session, Course, record_id)


@app.post("/courses", status_code=201, response_model=CourseRead)
def create_course(course: CourseWrite, session: DatabaseSession):
    return save_record(session, Course(**course.model_dump()))


@app.put("/courses/{record_id}", response_model=CourseRead)
def update_course(record_id: RecordId, course: CourseWrite, session: DatabaseSession):
    saved = get_record(session, Course, record_id)
    saved.title = course.title
    return save_record(session, saved)


@app.delete("/courses/{record_id}", status_code=204, response_class=Response)
def delete_course(record_id: RecordId, session: DatabaseSession):
    saved = get_record(session, Course, record_id)
    if session.exec(select(Section.id).where(Section.course_id == record_id)).first() is not None:
        raise HTTPException(status_code=409, detail="This course is used by a section and cannot be deleted.")
    session.delete(saved)
    session.commit()
    return Response(status_code=204)


def validate_section_references(section: SectionWrite, session: Session):
    if session.get(Course, section.course_id) is None:
        raise HTTPException(status_code=422, detail="Choose an existing course.")
    if session.get(Teacher, section.teacher_id) is None:
        raise HTTPException(status_code=422, detail="Choose an existing teacher.")


@app.get("/sections", response_model=list[SectionRead])
def list_sections(session: DatabaseSession):
    return session.exec(select(Section).order_by(Section.id)).all()


@app.get("/sections/{record_id}", response_model=SectionRead)
def read_section(record_id: RecordId, session: DatabaseSession):
    return get_record(session, Section, record_id)


@app.post("/sections", status_code=201, response_model=SectionRead)
def create_section(section: SectionWrite, session: DatabaseSession):
    validate_section_references(section, session)
    return save_record(session, Section(**section.model_dump()))


@app.put("/sections/{record_id}", response_model=SectionRead)
def update_section(record_id: RecordId, section: SectionWrite, session: DatabaseSession):
    saved = get_record(session, Section, record_id)
    validate_section_references(section, session)
    for field, value in section.model_dump().items():
        setattr(saved, field, value)
    return save_record(session, saved)
