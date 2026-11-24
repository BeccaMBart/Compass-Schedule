import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import Session, create_engine, select

from models import Course, Room, Section, Teacher

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


def verify_database():
    """Check the migrated schema without creating tables or changing records."""
    try:
        with Session(engine) as session:
            for model in (Room, Teacher, Course, Section):
                session.exec(select(model).limit(1)).first()
    except SQLAlchemyError:
        raise RuntimeError(
            "Catalog storage is unavailable. Check PostgreSQL and apply the reviewed migrations."
        ) from None


def get_session():
    with Session(engine) as session:
        yield session
