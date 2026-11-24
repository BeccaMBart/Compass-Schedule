from pydantic import BaseModel, ConfigDict, Field as ValidationField
from sqlmodel import Field, SQLModel


class RoomCreate(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = ValidationField(strict=True, min_length=1)
    capacity: int = ValidationField(strict=True, gt=0)


class Room(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    capacity: int


class RoomRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    capacity: int
