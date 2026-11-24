# Q2W5 Monday — Create the first backend

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

**Target:** GET /rooms returns status 200 and the two expected records. No
database files or routes were generated at this stage.

**Paths at this stage:** `backend/main.py`, `backend/requirements.txt`,
`.gitignore`. Existing teacher changes in `.gitignore` were preserved.

**Sequence:** Created the temporary-memory GET-only API first, checked it,
stopped that API process, and only then proceeded to Tuesday. That temporary
implementation was later replaced by the separately authorized Q2W6 work.

| Check | Observed result |
| --- | --- |
| Python / Node | Python 3.12.16 and Node 22.23.5 selected. |
| Virtual environment | `python3.12 -m venv backend/.venv` succeeded; its files are ignored. |
| Dependencies | `backend/.venv/bin/python -m pip install -r backend/requirements.txt` succeeded after authorized network escalation. |
| API startup | From `backend`, `.venv/bin/python -m uvicorn main:app --host 127.0.0.1 --port 8000` started successfully. |
| Direct GET /rooms | HTTP 200; Room 101 ID 1/capacity 24 and Art Studio ID 2/capacity 18, exactly once. |
| Route inspection | OpenAPI contained only GET /rooms as an application route. No database code existed at this stage. |
| Documentation | GET /docs returned 200 at this stage. Interactive Swagger Execute was also checked later against the completed database API and returned 200. |
| Frontend baseline | `npm --prefix frontend run build` under Node 22 passed. |

**Limitations:** This note records the intermediate Monday state. The final
working tree implements the later authorized lessons and therefore also has
POST and PostgreSQL. The initial network-restricted pip attempt failed to
resolve PyPI; the approved rerun installed dependencies successfully.

**Next assignment in order:** Q2W5 Tuesday — Add server creation and connect React.
