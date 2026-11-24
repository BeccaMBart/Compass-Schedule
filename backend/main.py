from contextlib import asynccontextmanager
from typing import Annotated

from fastapi import Depends, FastAPI, Request
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Session, select

from database import create_tables_and_seed, get_session
from models import Room, RoomCreate, RoomRead


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_tables_and_seed()
    yield


app = FastAPI(title="Class Scheduler", lifespan=lifespan)
DatabaseSession = Annotated[Session, Depends(get_session)]


@app.exception_handler(SQLAlchemyError)
async def storage_unavailable(request: Request, error: SQLAlchemyError):
    return JSONResponse(
        status_code=503,
        content={"detail": "Room storage is unavailable. Check PostgreSQL and retry."},
    )


@app.get("/rooms", response_model=list[RoomRead])
def list_rooms(session: DatabaseSession):
    return session.exec(select(Room).order_by(Room.id)).all()


@app.post("/rooms", status_code=201, response_model=RoomRead)
def create_room(room: RoomCreate, session: DatabaseSession):
    saved = Room(**room.model_dump())
    session.add(saved)
    session.commit()
    session.refresh(saved)
    return saved
