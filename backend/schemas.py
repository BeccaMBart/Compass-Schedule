from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field

# Match PostgreSQL INTEGER and reject booleans, fractions, and numeric strings.
PositiveInteger = Annotated[int, Field(strict=True, gt=0, le=2147483647)]
NonblankText = Annotated[str, Field(strict=True, min_length=1)]


class InputModel(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)


class RoomCreate(InputModel):
    name: NonblankText
    capacity: PositiveInteger


class RoomRead(RoomCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class TeacherWrite(InputModel):
    display_name: NonblankText


class TeacherRead(TeacherWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int


class CourseWrite(InputModel):
    title: NonblankText


class CourseRead(CourseWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int


class SectionWrite(InputModel):
    label: NonblankText
    course_id: PositiveInteger
    teacher_id: PositiveInteger
    seat_limit: PositiveInteger


class SectionRead(SectionWrite):
    model_config = ConfigDict(from_attributes=True)
    id: int
