# Q2W7 Wednesday — Review edits and record relationships

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

**Curriculum acceptance target:** Rename preserves relationships; referenced delete is rejected; no existing record disappears unexpectedly.

**Task:** Preserve IDs/relationships during edits, reject deletion of referenced
teachers/courses with useful messages, and verify room capacity validation.

**Application paths:** backend/main.py and frontend/src/Catalog.jsx, building on
Tuesday's Section foreign keys and validated edit routes. No new migration was
needed for Wednesday.

**Observed gap before the change:** DELETE /courses/1 and /teachers/1 returned
405 Method Not Allowed. Added only those two bounded DELETE paths and catalog
confirmation controls. Referenced records return 409. The database independently
restricts referenced deletion; there is no cascade. Confirmed deletion of an
unreferenced record returns 204; missing records return 404.

| Check | Actual observation |
| --- | --- |
| Course rename | Algebra changed to Algebra I with course ID 1; Section A retained course_id 1 and displayed the updated title. |
| Referenced course delete | Browser confirmation followed by a useful rejection; direct DELETE returned 409. Course/section rows unchanged. |
| Teacher rename/delete | Alex Example renamed with teacher ID 1 intact; Section A stayed linked. Referenced delete returned 409 with a useful message. |
| Restore | Course and teacher names restored to Algebra and Alex Example after checking. |
| Cancel delete | Canceling deletion of disposable T3 changed no record. |
| Unreferenced delete | Confirmed removal of only T3/C3 created for Tuesday's browser validation; no original room/teacher/course/section disappeared. |
| Foreign-key boundary | On scheduler_migration_test only, direct SQL deletes of a referenced fictional teacher/course raised integrity errors. The records and referencing section remained. |
| API/SQL agreement | All working catalog API arrays matched SQL rows exactly. Only room, teacher, course, section, and alembic_version exist. |
| Room/filter regression | art/xyz/clear still worked; all original room rows were restored exactly. |
| Failure/retry | With API stopped, catalog save showed failure, kept Retry Example input, and showed no saved message. Reload failed honestly; API restart and Retry restored records and preserved the unsaved input. |
| Persistence | All four catalog record arrays and IDs survived API restart unchanged. |
| Browser JavaScript | No page errors observed in create/edit/delete/recovery sequences. |

**Final working demonstration data:** Three original rooms; Alex Example T1,
Jordan Example T2; Algebra C1, Art C2; Section A ID 1/C1/T1/24 and Section B
ID 2/C2/T2/18. Temporary rename/capacity changes were restored. No unreferenced
validation-only T3/C3 records remain in the working catalog.

**Commands and final checks:**

- Chrome: `/tmp/class-scheduler-browser-venv/bin/python
  /tmp/class-scheduler-q2w7-wednesday-browser.py` and
  `/tmp/class-scheduler-q2w7-recovery-browser.py`.
- Direct API/SQL: `backend/.venv/bin/python
  /tmp/class-scheduler-q2w7-wednesday-check.py`.
- `npm --prefix frontend run build` under Node 22.23.5: passed, Vite 7.3.7,
  26 modules, final application build 389 ms.
- `backend/.venv/bin/python -m compileall -q backend/main.py backend/database.py
  backend/models.py backend/schemas.py backend/alembic`: passed.
- `backend/.venv/bin/python -m pip check`: No broken requirements found (an
  unwritable cache warning did not affect the dependency check).
- `docker compose config --quiet` / `docker compose ps`: valid and db healthy.
- From backend, `.venv/bin/python -m alembic current`: q2w7_003 (head).
  Both databases' `alembic check` reported no new upgrade operations.
- `git diff --check`: passed. Application was committed as `1d733c4` before
  the formal completion records were written.

No check failures were relabeled as passes. The pre-change 405 result is
recorded as the missing delete functionality, followed by observed 409/204/404
behavior after implementation. No database/volume reset was used.

**Review URLs:** http://127.0.0.1:5174/ and http://127.0.0.1:8000/docs.
The teacher's older frontend process on 5173 remains untouched.

**Completion and limits:** Teacher acceptance/review is now attested and
all three daily completion records were entered in order after application
commit `1d733c4`. Current publication/Git status is linked through PR #20.
Student contributions and guided home-work completion remain unreported.
No meetings, enrollment, roles/authentication, or timetable publication
features were implemented.

**Next curriculum assignment:** Q2W8 Monday —
Add the Meeting record.
