# Q2W7 Tuesday — Add sections and catalog forms

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

**Curriculum acceptance target:** Section A references Algebra and T1 with limit 24; invalid IDs and limits cannot be saved.

**Task:** Add Section(id, label, course_id, teacher_id, seat_limit), create/read/
update routes, catalog forms/selectors, and room editing.

**Application paths:** backend/models.py, backend/schemas.py, backend/main.py,
backend/database.py, backend/alembic/versions/q2w7_003_sections.py;
frontend/src/App.jsx, frontend/src/RoomCard.jsx, frontend/src/Catalog.jsx,
and frontend/src/catalogApi.js.

**Migration:** Stopped the API and created another private pre-section backup
outside Git. Applied q2w7_003 to scheduler_migration_test first, comparing all
prior room/teacher/course rows before/after and checking schema metadata.
Then applied it to scheduler with the same preservation checks. Both databases
reported q2w7_003 and no new upgrade operations. The migration adds Section,
a positive seat-limit check, indexed foreign keys to Course/Teacher, and
ON DELETE RESTRICT; it does not change any prior rows or tables.

Actual commands: `backend/.venv/bin/python
/tmp/class-scheduler-q2w7-tuesday-migration.py`; from backend,
`.venv/bin/python -m alembic upgrade q2w7_003`, `current`, and `check`, with a
private process-environment DATABASE_URL override for the separate database.

**Browser/API observations:**

| Check | Actual observation |
| --- | --- |
| Teacher/course forms | Created fictional Casey Example T3 and Music C3 through Chrome. These disposable browser-check records were explicitly removed during Wednesday's unreferenced-delete check. |
| Section A | Browser POST sent course_id 1, teacher_id 1, seat_limit 24; returned section ID 1. UI showed Algebra/C1 and Alex Example/T1. |
| Section B | Browser POST sent course_id 2, teacher_id 2, seat_limit 18; returned section ID 2. UI showed Art/C2 and Jordan Example/T2. |
| Invalid browser limits | 0, -3, 2.5 rejected; inputs preserved and no new section. |
| Invalid API values | 22 cases covering invalid/missing referenced IDs, blank label, extra fields, invalid integer types/ranges rejected with 422 for both POST and PUT; section list unchanged. |
| Read/update | All four catalog individual/list GET paths work. Section updates preserve ID; valid relationship change was saved then restored. Missing update returns 404. |
| Room edit | Science Lab ID 3 changed from 20 to 21, rejected 0, then restored to 20. Invalid direct updates reject without changing rows. |
| Refresh | Section A still showed its saved relationships and limit after reload. |
| Browser errors | No JavaScript page errors. |
| Build / Python | Production build passed (26 modules); compileall and pip check passed. |

IDs and positive numeric values must fit PostgreSQL INTEGER. Server schemas
reject extra fields, booleans, numeric strings, fractions, and out-of-range
integers; selectors convert saved ID values to numeric JSON before sending.
Names/labels are trimmed and nonblank.

Commands: `/tmp/class-scheduler-browser-venv/bin/python
/tmp/class-scheduler-q2w7-tuesday-browser.py` and `backend/.venv/bin/python
/tmp/class-scheduler-q2w7-tuesday-check.py`. Chrome tooling/scripts are outside
Git; no frontend dependency or project test framework was added.

**Next assignment in order:** Q2W7 Wednesday — Review edits and record relationships.
