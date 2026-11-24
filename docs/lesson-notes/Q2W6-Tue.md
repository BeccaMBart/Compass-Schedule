# Q2W6 Tuesday — Replace memory with PostgreSQL

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

**Target:** A newly created room has the same ID/name/capacity in the screen,
GET response, and SQL row.

**Paths:** `backend/main.py`, `backend/database.py`, `backend/models.py`,
`backend/requirements.txt`, and the storage explanation in `frontend/src/App.jsx`.

**Change:** Room storage now uses SQLModel and psycopg, with DATABASE_URL loaded
from the server environment or absolute repository-root .env path. Startup
creates only the Room table and seeds the original rooms only if empty. Writes
commit and return the database-generated ID. GET/POST validation and response
contracts are preserved. There is no memory fixture or fallback in the API or
frontend. Startup fails clearly without storage; runtime storage errors return
a generic 503 without connection details.

**Commands:** `backend/.venv/bin/python -m pip install -r backend/requirements.txt`;
start uvicorn from `backend`; run the temporary browser check against 5174; use
`docker compose exec -T db psql -U scheduler -d scheduler -c 'SELECT id, name,
capacity FROM room ORDER BY id;'`; compare its rows with GET using Python urllib.

| Check | Observed result |
| --- | --- |
| Initial database rows | Room 101 ID 1/capacity 24; Art Studio ID 2/capacity 18. |
| Browser creation | Science Lab/20 appeared once with confirmed save feedback. |
| API and SQL | Both contained Science Lab ID 3/name Science Lab/capacity 20; complete ordered API and SQL row arrays matched exactly. |
| Refresh/filter | Browser refresh retained Science Lab; art/xyz/clear filter checks passed. |
| Server validation | All seven invalid direct examples from Q2W5 Tuesday still returned 422; all existing rows remained unchanged. |
| Table/route scope | Only public.room exists; only GET /rooms and POST /rooms are application routes. |
| Documentation | Chrome Swagger GET /rooms > Try it out > Execute returned a live 200 response containing Science Lab. |
| Dependency consistency | pip check reported `No broken requirements found.` |

**Dependency versions validated:** FastAPI 0.165.0, uvicorn 0.54.0, pydantic
2.14.4, SQLModel 0.0.50, psycopg[binary] 3.3.9, python-dotenv 1.2.4. Direct
requirements are pinned to these observed versions.

**Next assignment in order:** Q2W6 Wednesday — Prove persistence.
