from logging.config import fileConfig

from alembic import context
from sqlmodel import SQLModel

from database import database_url, engine
import models  # Register only the catalog tables in migration metadata.

config = context.config
if config.config_file_name:
    fileConfig(config.config_file_name)
target_metadata = SQLModel.metadata


if context.is_offline_mode():
    context.configure(
        url=database_url,
        target_metadata=target_metadata,
        literal_binds=True,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()
else:
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
        )
        with context.begin_transaction():
            context.run_migrations()
