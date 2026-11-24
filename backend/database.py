import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Session, SQLModel, create_engine, select

from models import Room

load_dotenv(Path(__file__).resolve().parent.parent / ".env")
database_url = os.environ.get("DATABASE_URL")
if not database_url:
    raise RuntimeError("Set DATABASE_URL in the server environment or repository-root .env.")

engine = create_engine(
    database_url,
    pool_pre_ping=True,
    hide_parameters=True,
    connect_args={"connect_timeout": 3},
)


def create_tables_and_seed():
    try:
        SQLModel.metadata.create_all(engine)
        with Session(engine) as session:
            if session.exec(select(Room)).first() is None:
                session.add_all([
                    Room(name="Room 101", capacity=24),
                    Room(name="Art Studio", capacity=18),
                ])
                session.commit()
    except SQLAlchemyError:
        raise RuntimeError("Room storage is unavailable. Start PostgreSQL and check local settings.") from None


def get_session():
    with Session(engine) as session:
        yield session
