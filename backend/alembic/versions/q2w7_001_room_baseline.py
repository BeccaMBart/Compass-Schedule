"""Baseline of the existing Q2W6 Room table; no data changes."""
from alembic import op
import sqlalchemy as sa

revision = "q2w7_001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "room",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("capacity", sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("room")
