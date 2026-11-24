# Q2W7 Monday — Add teacher and course records

Recorded November 24, 2026.

**Status:** Teacher-verified and formally recorded complete on November 24,
2026. Application changes were committed as `1d733c4` before the three daily
completion commands; all three commands succeeded in curriculum order with
passing frontend builds.

**Publication:** [PR #20](https://github.com/BeccaMBart/Compass-Schedule/pull/20)
tracks the implementation, documentation, and current remote Git status.

**Authorization:** The teacher requested all week 7 tasks. Monday–Wednesday
application work was performed in curriculum order within week 7. All three
lesson extracts match the preserved original Word guide after whitespace
normalization. The teacher subsequently requested the PR/merge and explicitly
confirmed all three manual checks/reviews complete, authorizing the formal
records. Student work and week 8 implementation are not attested or included.

**Branch/base:** lesson/q2w7-mon from merged main edfae78 (PR #19). The prior
instruction-file ignore change in .gitignore is preserved unchanged.

**Student evidence:** Prompt wording improvements and individual contributions
have not been supplied. The student-only guided home-work handout and blank
contribution template are prepared in docs/student-work/. No Thursday/Friday
completion is inferred.

**Curriculum acceptance target:** Existing rooms remain; valid teachers/courses save; blank values are rejected.

**Task:** Add Teacher(id, display_name) and Course(id, title), reviewed migrations,
and bounded create/read/update routes while preserving existing rooms.

**Changed application paths:** backend/models.py, backend/main.py,
backend/database.py, backend/schemas.py, backend/requirements.txt,
backend/alembic.ini, backend/alembic/env.py, backend/alembic/script.py.mako,
backend/alembic/versions/q2w7_001_room_baseline.py, and
backend/alembic/versions/q2w7_002_teacher_course.py.

**Actual migration sequence:**

1. Stopped the API before schema-management changes. Created a private custom
   pg_dump backup inside the local db container and copied it outside Git to
   a private temporary directory (file permissions 0600). No dump contents or
   credentials were displayed. Confirmed scheduler_migration_test did not
   exist, then created it without dropping/replacing any database.
2. Applied q2w7_001 to the empty scheduler_migration_test database. Compared
   working/test Room columns, types, nullability, defaults, primary-key columns,
   indexes, unique constraints, and foreign keys; they matched before stamping.
3. Inserted a fictional sentinel Room only into the separate test database.
   Applied q2w7_002 there and verified the sentinel remained unchanged and the
   expected room/teacher/course/alembic_version tables existed. Alembic check
   reported no new upgrade operations.
4. Only after those checks, stamped the working database at q2w7_001 and
   upgraded it to q2w7_002. All three pre-existing Room rows/IDs remained exact.
   Alembic current/history/check passed. Only stamp/upgrade were executed;
   no downgrade, data reset, or volume deletion occurred.

The API now checks migrated tables at startup. create_all and startup seeding
were removed; schema/data are not silently changed by starting the server.
Alembic 1.20.1 is the only new direct dependency.

**Commands used:** `backend/.venv/bin/python -m pip install -r
backend/requirements.txt`; temporary migration runner
`backend/.venv/bin/python /tmp/class-scheduler-q2w7-monday-migration.py`;
from backend, `.venv/bin/python -m alembic current`, `history`, and `check`.
Migration credentials were passed only through the process environment.

For reference, this is the complete baseline-adoption command sequence for a
NEW EMPTY scheduler_migration_test and an UNVERSIONED existing Room database.
The current local databases are already at q2w7_003; this sequence is historical
adoption guidance and intentionally refuses to run on either nonempty test
schemas or an already versioned working database. Back up first and stop the
API as in the curriculum. From backend:

```bash
.venv/bin/python - <<'PYMIGRATION'
import os, subprocess, sys
from sqlalchemy import create_engine, inspect
from database import engine

test = create_engine(engine.url.set(database="scheduler_migration_test"),
                     hide_parameters=True)
assert inspect(test).get_table_names() == [], "Preserve the existing test schema"
assert set(inspect(engine).get_table_names()) == {"room"}, "Inspect existing schema/history"

def run(target, *args):
    env = dict(os.environ, DATABASE_URL=target.url.render_as_string(hide_password=False))
    subprocess.run([sys.executable, "-m", "alembic", *args], env=env, check=True)

def shape(target):
    i = inspect(target)
    return {
        "columns": [{k: str(c[k]) if k == "type" else c[k]
                     for k in ["name", "type", "nullable", "default"]}
                    for c in i.get_columns("room")],
        "pk": i.get_pk_constraint("room")["constrained_columns"],
        "indexes": i.get_indexes("room"),
        "unique": i.get_unique_constraints("room"),
        "foreign_keys": i.get_foreign_keys("room"),
    }

run(test, "upgrade", "q2w7_001")
assert shape(test) == shape(engine), "Room schema mismatch: do not stamp"
run(test, "upgrade", "q2w7_002")
run(test, "upgrade", "q2w7_003")
run(test, "check")
run(engine, "stamp", "q2w7_001")
run(engine, "upgrade", "q2w7_002")
run(engine, "upgrade", "q2w7_003")
run(engine, "current")
run(engine, "check")
PYMIGRATION
```

The actual live work checked Monday's q2w7_002 intermediate state before adding
Tuesday's q2w7_003. The combined adoption recipe above targets the final week 7
source. Do not stamp a database whose Room schema fails comparison.

| Acceptance / validation | Actual observation |
| --- | --- |
| Existing Room rows | Room 101 ID 1/24, Art Studio ID 2/18, Science Lab ID 3/20 all unchanged. |
| Teacher creation | Alex Example T1 and Jordan Example T2 saved with 201; whitespace trimmed. |
| Course creation | Algebra C1 and Art C2 saved with 201. |
| Validation | Blank/nonstring/missing/extra fields returned 422; no new rows added. |
| Read/update | Individual/list GETs work; updates retain IDs; unknown update returns 404; temporary names restored. |
| Build | npm --prefix frontend run build under Node 22.23.5 passed at Monday's checkpoint (24 modules). |

API check command: `backend/.venv/bin/python
/tmp/class-scheduler-q2w7-monday-check.py` (temporary outside the repository).
No automated project test framework was added.

**Next assignment in order:** Q2W7 Tuesday — Add sections and catalog forms.
