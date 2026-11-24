"""Add sections with restrictive references; existing catalog rows are unchanged."""
from alembic import op
import sqlalchemy as sa

revision = "q2w7_003"
down_revision = "q2w7_002"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "section",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("label", sa.String(), nullable=False),
        sa.Column("course_id", sa.Integer(), nullable=False),
        sa.Column("teacher_id", sa.Integer(), nullable=False),
        sa.Column("seat_limit", sa.Integer(), nullable=False),
        sa.CheckConstraint("seat_limit > 0", name="ck_section_seat_limit_positive"),
        sa.ForeignKeyConstraint(["course_id"], ["course.id"], ondelete="RESTRICT"),
        sa.ForeignKeyConstraint(["teacher_id"], ["teacher.id"], ondelete="RESTRICT"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_section_course_id", "section", ["course_id"])
    op.create_index("ix_section_teacher_id", "section", ["teacher_id"])


def downgrade():
    op.drop_index("ix_section_teacher_id", table_name="section")
    op.drop_index("ix_section_course_id", table_name="section")
    op.drop_table("section")
