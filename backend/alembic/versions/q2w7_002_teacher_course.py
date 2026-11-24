"""Add teacher and course tables; existing rooms are unchanged."""
from alembic import op
import sqlalchemy as sa

revision = "q2w7_002"
down_revision = "q2w7_001"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "teacher",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("display_name", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "course",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("course")
    op.drop_table("teacher")
