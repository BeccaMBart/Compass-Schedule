from sqlmodel import Field, SQLModel
from sqlalchemy import CheckConstraint


class Room(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    capacity: int


class Teacher(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    display_name: str


class Course(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str


class Section(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint("seat_limit > 0", name="ck_section_seat_limit_positive"),
    )

    id: int | None = Field(default=None, primary_key=True)
    label: str
    course_id: int = Field(foreign_key="course.id", ondelete="RESTRICT", index=True)
    teacher_id: int = Field(foreign_key="teacher.id", ondelete="RESTRICT", index=True)
    seat_limit: int
