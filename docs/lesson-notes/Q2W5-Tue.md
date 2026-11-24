# Q2W5 Tuesday — Add server creation and connect React

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

**Target:** A valid creation appears in GET /rooms; an invalid direct API
request is rejected with no new record.

**Paths at this stage:** `backend/main.py`, `frontend/src/App.jsx`,
`frontend/vite.config.js`. No database was introduced in this lesson.

**Change:** Added a trimmed, nonblank name and strict positive integer input
contract with extra fields forbidden. POST returns 201 and a server-generated
ID. React now GETs and POSTs `/api/rooms`; Vite forwards to port 8000 and strips
`/api`. Removed the frontend fixture and local-only append implementation.

**Actual commands/checks:** Started the API as documented in Monday's note;
used inline Python `urllib.request` requests against port 8000; started the
separate frontend with `npm --prefix frontend run dev -- --port 5174 --strictPort`;
ran `/tmp/class-scheduler-browser-venv/bin/python /tmp/class-scheduler-browser-check.py tuesday`.
Temporary browser tools were installed outside the repository; no application
dependency or test framework was added for them.

| Check | Observed result |
| --- | --- |
| Valid direct creation | POST with name `  API Demo  ` and capacity 20 returned 201, trimmed `API Demo`, unique ID 3; GET included the record. |
| Invalid direct requests | Blank name; capacities 0, -3, 2.5, true, and string `20`; extra `id` field: all returned 422, and the complete GET list remained unchanged. |
| Browser filter | `ArT` showed only Art Studio; `xyz` showed No matching rooms; clearing restored the full list. |
| Browser creation | Science Lab/20 returned confirmed server-save feedback and appeared exactly once. |
| Browser refresh | Science Lab remained visible because it was read from the running API. |
| Browser JavaScript | No page errors observed. |
| Build | `npm --prefix frontend run build`: 24 modules transformed; passed. |

**Encountered issue and correction:** The pre-existing teacher Vite process on
5173 had not loaded the newly created proxy configuration. `/api/rooms` served
HTML, causing a JSON parse failure, and the first browser check timed out.
Preserved that process and started a separate Node 22 Vite server on 5174.
Subsequent proxy and browser checks passed. Restart the old Vite process before
using 5173 with the new code.

**Next assignment in order:** Q2W5 Wednesday — Handle failure and retry.

## Subsequent Git verification — November 24, 2026

After the local completion recording described above, the teacher authorized
push and merge. PR [#19](https://github.com/BeccaMBart/Compass-Schedule/pull/19)
was verified merged into main as edfae78. It includes application commit
a19baab and completion-documentation commit 0dad09f, with the earlier curriculum
restoration. Statements above about an unpushed local checkpoint describe that
earlier stage; the remote merge was subsequently observed.
