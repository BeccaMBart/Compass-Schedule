# Q2W6 Wednesday — Prove persistence

Recorded November 24, 2026.

**Status:** Implemented and checked by Codex; teacher-verified on November 24,
2026. The teacher stated: “I verified that it is complete.” Application changes
were committed as `a19baab`; this daily lesson was subsequently recorded by
the completion script on November 24, 2026, in curriculum order. Its frontend
build passed. No push or merge was performed for this work.

**Authorization:** On November 24, 2026, the teacher explicitly authorized all
six Q2W5–Q2W6 Monday–Wednesday lessons in curriculum order, overriding the
single-lesson implementation limit while keeping completion records pending.
The matching sections of the original Word guide were compared with both
weekly extracts; all six matched after whitespace normalization.

**Classroom evidence:** Student prompt improvements, individual contributions,
and Thursday/Friday guided-work results have not been supplied. They are not
inferred from these application checks.

**Target:** The new record and ID survive restart; seed count does not increase;
unavailable storage is reported as failure.

**Change:** Verification and evidence only after Tuesday's conversion. No
storage defect required a further application repair. No test framework,
additional model, memory fallback, or cleanup of persisted records was added.

**Baseline:** SQL and GET both contained exactly these fictional records:

| ID | Name | Capacity |
| --- | --- | --- |
| 1 | Room 101 | 24 |
| 2 | Art Studio | 18 |
| 3 | Science Lab | 20 |

**Observed sequence:**

1. Recorded Science Lab's returned ID (3) and the complete baseline row list.
2. Stopped the API with Control+C and restarted uvicorn. GET returned the exact
   baseline rows; there was one Room 101 and one Art Studio.
3. Ran `docker compose stop db` without deleting storage. GET and POST returned
   503 with `Room storage is unavailable. Check PostgreSQL and retry.` A POST
   attempted fictional Outage Demo/20 and did not report success.
4. Attempted to start another API process on port 8001 while db was stopped.
   It exited unsuccessfully with the intended generic storage-unavailable
   message; it did not start a memory-backed app.
5. Chrome displayed a useful load error and hid the unavailable list. A failed
   save preserved Outage Demo/20 in the inputs and displayed no false saved
   message. No browser JavaScript errors were observed.
6. Ran `docker compose start --wait db`. Used Retry loading rooms in the same
   browser session. Science Lab reappeared; the entire API/SQL row list matched
   the original baseline. No Outage Demo row existed.
7. Restarted the API a second time using the exact curriculum command:
   `.venv/bin/python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`.
   All three rows and their IDs remained identical; seeds still appeared once.
8. Final `docker compose config --quiet` and `docker compose ps` passed with db
   healthy. psql listed only public.room; `/api/rooms` matched the API rows.
9. Final `npm --prefix frontend run build` under Node 22.23.5 passed: 24 modules,
   Vite 7.3.7, 386 ms. Python compileall passed, pip check found no broken
   requirements, and `git diff --check` produced no output.

Temporary browser sequence command:
`/tmp/class-scheduler-browser-venv/bin/python /tmp/class-scheduler-storage-check.py`.
No temporary script, browser tooling, logs, private environment file, database
files, virtual environment, or build output is intended for Git.

**Operational state at validation:** PostgreSQL running with the named volume;
API on 127.0.0.1:8000; separate review Vite server on 127.0.0.1:5174. The earlier
teacher Vite process on 5173 was preserved; restart it to load the new proxy.

**Teacher verification:** The teacher subsequently confirmed all six lessons
complete on November 24, 2026. Manual acceptance review is now attested.

**Completion recording:** After explicit approval of both local commits, the
application changes were committed as `a19baab`. All six completion commands
were run in order on November 24, 2026; every command passed its frontend
build and wrote its daily record. Individual student contributions and
Thursday/Friday work remain unreported.

**Next curriculum assignment:** Q2W7 Monday —
Add teacher and course records. No Q2W7 implementation was introduced.

## Subsequent Git verification — November 24, 2026

After the local completion recording described above, the teacher authorized
push and merge. PR [#19](https://github.com/BeccaMBart/Compass-Schedule/pull/19)
was verified merged into main as edfae78. It includes application commit
a19baab and completion-documentation commit 0dad09f, with the earlier curriculum
restoration. Statements above about an unpushed local checkpoint describe that
earlier stage; the remote merge was subsequently observed.
