# Q2W6 Monday — Create the database service

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

**Target:** db is healthy and a psql connection works. .env is ignored; no
application persistence is claimed at this intermediate stage.

**Paths at this stage:** `compose.yaml`, `.env.example`, `.gitignore`, plus an
ignored private local `.env` created without displaying credentials.

**Change:** PostgreSQL 16 service `db`, host binding `127.0.0.1:5432`, named
`scheduler_data` volume, and pg_isready healthcheck. Credentials come from
ignored `.env`; `.env.example` remains eligible for Git. The API was not changed
for database storage until Tuesday's separately checked step.

| Command/check | Observed result |
| --- | --- |
| `docker --version` / `docker compose version` | Docker 29.8.0; Compose v5.5.1. |
| Docker readiness | Initially stopped; installed Docker Desktop was opened with approval, then engine version 29.8.0 was confirmed. |
| Private settings | Generated .env privately with exclusive creation and permissions 0600; no existing file overwritten and no password displayed. |
| `git check-ignore .env` | Printed .env, confirming it is ignored. |
| `git check-ignore .env.example` | No output, exit 1: example is not ignored, as intended. |
| `docker compose config --quiet` | Passed without printing interpolated credentials. |
| `docker compose up -d --wait db` | Pulled postgres:16, created project network/named volume, and reached healthy status. |
| `docker compose ps` | db healthy; only loopback port 5432 published. |
| `docker compose exec -T db psql -U scheduler -d scheduler -c '\dt'` | Successful connection; `Did not find any relations.` before Tuesday created Room. |
| Frontend build | `npm --prefix frontend run build` under Node 22 passed. |

**Limitations:** Docker socket access required approved escalation. Database
health alone was not recorded as proof of application persistence. No database
volume was deleted during these lessons.

**Next assignment in order:** Q2W6 Tuesday — Replace memory with PostgreSQL.

## Subsequent Git verification — November 24, 2026

After the local completion recording described above, the teacher authorized
push and merge. PR [#19](https://github.com/BeccaMBart/Compass-Schedule/pull/19)
was verified merged into main as edfae78. It includes application commit
a19baab and completion-documentation commit 0dad09f, with the earlier curriculum
restoration. Statements above about an unpushed local checkpoint describe that
earlier stage; the remote merge was subsequently observed.
