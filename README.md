
# Class Scheduler

A Shared Compass Academy Grade 11 classroom project.

We are building a web application that helps school staff organize
classes, teachers, rooms, and a weekly timetable.

Development begins in Q2W2. The required working product is due by
the end of Q4W8.

## Current Project Status

**Q2W7 Wednesday — Review edits and record relationships. Frontend production build passed; curriculum manual checks teacher-attested.**

Q2W7 Monday–Wednesday is teacher-verified and formally recorded complete on
November 24, 2026. Application commit `1d733c4` preceded all three completion
commands; each command passed its frontend build. Publication and current Git
status are tracked in [PR #20](https://github.com/BeccaMBart/Compass-Schedule/pull/20). The current
catalog supports teachers, courses, sections, and room edits. Alembic now owns
schema changes; the API does not create tables or reseed records at startup.
See [Monday](docs/lesson-notes/Q2W7-Mon.md),
[Tuesday](docs/lesson-notes/Q2W7-Tue.md), and
[Wednesday](docs/lesson-notes/Q2W7-Wed.md) for commands and observed evidence.

The [student handout](docs/student-work/Q2W7-guided-home-work.md) and
[contribution template](docs/student-work/Q2W7-contribution-template.md) are
prepared. Student contributions and Thursday/Friday completion are unreported.

Q2W5 and Q2W6 Monday–Wednesday application work has been implemented in
curriculum order under explicit teacher authorization. API, browser, SQL,
failure/retry, and persistence observations are recorded in
`docs/lesson-notes/Q2W5-Mon.md` through `docs/lesson-notes/Q2W6-Wed.md`.
The teacher confirmed on November 24, 2026: “I verified that it is complete.”
Manual acceptance review is teacher-attested for all six lessons. Application
changes were committed as `a19baab`; all six completion records were then
entered in curriculum order on November 24, 2026. Each completion invocation
passed its frontend build. Those week 5–6 changes were subsequently merged
through PR #19 into main at `edfae78`.

The project includes a React frontend built with:

- React 19
- Vite 7
- Plain JavaScript
- Node.js 22.12 or later within Node 22

The original page contains:

- Heading: Class Scheduler
- Purpose: We are building a tool to plan classes and rooms.

During Q2W3 Monday, we worked on displaying two fictional rooms
using a local JavaScript array.

| ID | Room Name | Capacity |
| --- | --- | --- |
| 1 | Room 101 | 24 |
| 2 | Art Studio | 18 |

These fictional demonstration records now come from PostgreSQL through
GET `/rooms`. The frontend form uses POST `/rooms` through Vite’s `/api`
proxy; it no longer holds a source fixture or a local-only save path.

The screen preserves the original heading, purpose, RoomCard, and name
filter. It shows loading/failure feedback and a reload/retry action. Failed
saves preserve inputs. Successful saves require a server 201 response.
Saved rooms and their IDs survive API and database stop/start cycles.
The local verification added Science Lab, capacity 20, with ID 3.

The teacher reported successful room display and production-build
checks on Tuesday, confirming the Monday records still work. A
Monday-specific refresh result and Git commit were not separately
reported.

The application is not yet a functional scheduling system.

## What We Are Building

The finished application will allow authorized school staff to:

- Create and manage rooms, teachers, courses, and class sections.
- Manually schedule class sections into rooms and time slots.
- Plan one active term using Monday through Friday and three fixed
  periods each day: P1, P2, and P3.
- Prevent conflicting room, teacher, or section assignments.
- Prevent scheduling a section into a room with insufficient capacity.
- Sign in with a school-approved Microsoft account.
- Use permissions appropriate to an Admin or Teacher role.
- Publish an approved timetable.
- Let teachers view and print their own approved timetable.

Editing a draft will not change the currently approved timetable.

A new approved version will require a separate publication action.

## User Roles

### Admin

Admins will manage catalog records, edit the draft schedule, and
publish approved timetables.

### Teacher

Teachers will view and print their own approved timetable.

Teachers will not edit draft schedules or publish changes.

The server will enforce these permissions when authentication and
authorization are implemented in later lessons.

## What Is Outside Our Scope

This project will not include:

- Student enrollment or registration.
- Individual student schedules.
- Automatic schedule generation.
- Features built ahead of their scheduled lessons and hidden behind
  switches or feature flags.

Additional ideas may be recorded for later consideration, but they
must not delay the required product.

## Planned Technology

These are the selected course technologies:

| Area | Technology | Status |
| --- | --- | --- |
| Frontend | React 19, JavaScript, Vite 7 | Introduced Q2W2 |
| Frontend tooling | Node.js 22.12+ within Node 22 | Introduced Q2W2 |
| Backend | Python 3.12 and FastAPI | Implemented Q2W5; teacher-verified |
| Database | PostgreSQL 16 | Implemented Q2W6; teacher-verified |
| Schema changes | Alembic 1.20.1 | Introduced Q2W7; teacher-verified |
| Authentication | Microsoft sign-in | Planned |
| File editing and Git | Visual Studio Code | In use |
| Teaching deployment | Microsoft Azure | Planned |
| Permanent hosting | Always-on VPS | Planned |

The VPS will have an adult operations owner.

These are the course's selected versions, not claims about the
newest available software releases.

Dependencies will be introduced only when their lessons require them.

## How We Will Build It

We will develop the application in small, reviewed steps throughout
the remaining school year.

For each classroom task, we will:

1. Describe one clear user need.
2. Define how we will check whether the change works.
3. Improve a focused prompt with the teacher.
4. Have the teacher request the current change using ChatGPT.
5. Review the proposed files before saving them in VS Code.
6. Run the application or the supplied checks.
7. Record what actually happened.
8. Review, commit, and push the change using VS Code.
9. Merge the reviewed work before starting the next lesson.

AI-generated code is a proposal that people must review and test.

We will not mark a task complete just because AI generated files.

## Q2W2 — First Week

### Monday — Project Planning

Agreed on the project scope and created the planning documents:

- `docs/product-brief.md` — Project purpose, staff roles, fixed-period
  timetable, exclusions, required outcome, and acceptance checks.
- `docs/board.md` — Classroom task board.
- `docs/prompt-log.md` — Prompts, improvements, reviews, and evidence.

No application functionality was built on Monday.

### Tuesday — First React Page

**Task: TASK-001 — Create the first React page**

Created the initial frontend application using React 19, Vite 7,
and plain JavaScript.

The application files introduced were:

- `frontend/package.json`
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`

The root `.gitignore` was updated to exclude dependencies,
generated builds, local environment files, and secrets.

The `frontend/package-lock.json` file is generated by npm and should
be committed to Git.

The original React page displayed:

# Class Scheduler

We are building a tool to plan classes and rooms.

The page contained one `App` component with:

- One heading (`h1`).
- One paragraph (`p`).

#### Problem Encountered and Fixed

During the first browser test, the page appeared completely white.

The problem was addressed by restoring the React import at the
beginning of `frontend/src/App.jsx`:

```jsx
import React from 'react';
```

This correction required no additional dependencies.

#### Tuesday Acceptance Results

| Acceptance Check | Reported Result |
| --- | --- |
| Heading displays | Passed |
| Purpose sentence displays | Passed |
| Local development server works | Passed |
| Production build succeeds | Passed |
| Blank-page problem resolved | Passed |

**Evidence:** The teacher reported that everything worked after the
React import correction.

ChatGPT did not independently run the application.

### Wednesday — Review and Improve

The classroom reviewed the planned first-page improvement.

The recorded checkpoint indicated that implementation and
acceptance checks were still pending.

No additional application features were confirmed by this checkpoint.

## Q2W3 — Room Records

### Monday, November 9, 2026 — Add Two Room Records

**Task: Display two fictional rooms in a read-only list.**

**Status: Done — confirmed by the teacher.** The later Tuesday browser
and build results also verify that these two records remain displayed.

#### Learning Objective

Students will learn how JavaScript objects and arrays can hold
information that React displays in a browser.

#### What We Worked On

We added two local room records to `frontend/src/App.jsx`.

Each record contains:

- `id` — A unique identifier.
- `name` — The room's name.
- `capacity` — The number of people the room can hold.

The records are:

| ID | Name | Capacity |
| --- | --- | --- |
| 1 | Room 101 | 24 |
| 2 | Art Studio | 18 |

The room data is defined using a JavaScript array:

```jsx
const rooms = [
  {
    id: 1,
    name: 'Room 101',
    capacity: 24,
  },
  {
    id: 2,
    name: 'Art Studio',
    capacity: 18,
  },
];
```

The `App` component uses JavaScript's `.map()` method to create
a list item for each room.

Each list item uses `room.id` as its stable React key.

The original page heading and purpose sentence are preserved.

#### Important Concepts

**JavaScript object**

An object groups related information, such as a room's ID, name,
and capacity.

**JavaScript array**

An array holds multiple items. Our array contains two room objects.

**React list rendering**

The `.map()` method allows React to display each room from the
array without manually writing the same HTML for every record.

**React key**

The `key` property helps React distinguish items in a list.

We use each room's unique ID instead of its position in the array.

**Local source data**

The records are written directly into `App.jsx`.

Refreshing the browser should display the same records because
they are defined in the application source.

The records are not stored in a database or browser storage.

#### Files Changed

- `frontend/src/App.jsx` — Two room records and read-only display.

No additional packages or application files are required for
Monday's task.

#### Acceptance Checks

| Check | Expected Result | Actual Result |
| --- | --- | --- |
| Original heading | Class Scheduler | Preserved in Tuesday's reviewed source |
| Original purpose | Original sentence remains | Preserved in Tuesday's reviewed source |
| Room 101 | Appears once, capacity 24 | Passed, teacher-reported Tuesday |
| Art Studio | Appears once, capacity 18 | Passed, teacher-reported Tuesday |
| Browser refresh | Same two records appear | Not separately reported |
| Production build | Completes without errors | Passed, teacher-reported Tuesday |

A relevant failure would be a missing room, duplicate room,
incorrect capacity, or blank browser page.

#### What We Did Not Build

- Room creation or editing forms.
- Search functionality.
- API requests.
- Database storage.
- Browser persistence.
- Scheduling functionality.
- Authentication or authorization.
- Reusable RoomCard component (introduced Tuesday, not Monday).

The reusable `RoomCard` component was introduced in Tuesday's lesson.

#### Evidence

The teacher and students worked through the room array,
React import, existing heading, purpose paragraph, and list
rendering structure.

The teacher confirmed Monday's work was completed. Tuesday's
teacher-reported browser and build checks verified that both Monday
room records still displayed correctly. A Monday-specific refresh
result and Git commit were not separately provided.

## Project Documents

The project planning and classroom records are stored in:

- `docs/product-brief.md` — Product purpose, users, requirements,
  exclusions, and timeline.
- `docs/board.md` — Backlog, Ready, Doing, Review, Done, and Blocked.
- `docs/prompt-log.md` — Classroom prompts, improvements, reviews,
  and evidence.

Future application features remain in Backlog until their lessons.

The task board and prompt log should reflect actual observed
results rather than assuming a generated change has passed.

## Running the Application

### Requirements

- Node.js 22.12 or later within Node 22.
- npm.
- Visual Studio Code or a Mac terminal.

### First-Time Installation

Open a terminal at the repository root.

```bash
cd frontend
npm install
```

This installs the dependencies specified in `frontend/package.json`.

### Start the Development Server

Working directory: `frontend`

```bash
npm run dev
```

The development server is configured to bind to `127.0.0.1`.

Open the local address printed by Vite, normally:

http://127.0.0.1:5173/

Stop the server with Control+C in the terminal.

### Build the Application

Working directory: `frontend`

```bash
npm run build
```

A successful build generates a `dist` folder.

The `dist` folder is generated output and should not be committed
to Git.

### Run the API and database

Use Python 3.12, Node 22.12+ within Node 22, and a running Docker Desktop.
On the teacher's prepared Mac, activate the installed tools in each terminal:

```bash
source ~/.nvm/nvm.sh
nvm use 22
source ~/.local/bin/env
```

The following commands run at the repository root. The virtual environment
and ignored private `.env` were created during local validation. On a new
checkout, create the environment and install the pinned backend dependencies:

```bash
python3.12 -m venv backend/.venv
backend/.venv/bin/python -m pip install -r backend/requirements.txt
```

`.env.example` documents the variable names with password placeholders. Do
not use those placeholders as credentials. For a new local checkout, the
following command generates `.env` privately, refuses to overwrite an existing
file, and prints no password. Never display, upload, or commit `.env`.

```bash
python3.12 - <<'PYENV'
import os, secrets
password = secrets.token_hex(24)
lines = ["POSTGRES_USER=scheduler", "POSTGRES_DB=scheduler",
         "POSTGRES_PASSWORD=" + password,
         "DATABASE_URL=postgresql+psycopg://scheduler:" + password + "@127.0.0.1:5432/scheduler"]
fd = os.open(".env", os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
with os.fdopen(fd, "w") as f:
    f.write("\n".join(lines) + "\n")
PYENV
```

Confirm `.env` is ignored and `.env.example` is not ignored. Start PostgreSQL:

```bash
git check-ignore .env
docker compose config --quiet
docker compose up -d --wait db
docker compose ps
```

The service binds only to `127.0.0.1:5432` and stores its data in the named
`scheduler_data` volume. `config --quiet` validates without printing resolved
credentials. Avoid plain `docker compose config`, which would reveal them.

The prepared local database is already at migration `q2w7_003`. For a fresh
empty database, apply migrations before starting the API. For an existing
pre-Alembic Room database, follow the schema-comparison and baseline-adoption
procedure in the Q2W7 Monday note first; stamping alone does not create tables.
No records are automatically seeded on a fresh empty database.

Start the API in a separate terminal:

```bash
cd backend
.venv/bin/python -m alembic upgrade head
.venv/bin/python -m alembic current
.venv/bin/python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Start the frontend in another terminal with `npm --prefix frontend run dev`.
Restart any Vite process that predates creation of `frontend/vite.config.js`,
so it loads the proxy configuration. Validation used a separate Vite process
on `http://127.0.0.1:5174/` to preserve an existing teacher process on 5173.

The Vite proxy is for local development. A production build passing does not
claim that production API routing or hosting is implemented.

### Current Manual Checks

1. Confirm the original heading and purpose sentence, Room 101 (24), and Art
   Studio (18). Existing additional rooms must remain present.
2. Filter with `art`, then `xyz`, then clear: expect Art Studio, no-match text,
   and the full saved list.
3. Open `http://127.0.0.1:8000/docs`; use GET `/rooms` > Try it out > Execute.
   Expect 200. POST a fictional room: expect 201 and an actual generated ID.
4. Try a blank name and capacities 0, -3, and 2.5. The form rejects them;
   direct API requests must also reject invalid input with 422 and no new row.
   Extra request fields, booleans, and numeric strings are rejected by the API.
5. Add a uniquely named fictional room through the form. Compare its actual
   ID/name/capacity in GET `/rooms` and SQL:

   ```bash
   docker compose exec -T db psql -U scheduler -d scheduler -c 'SELECT id, name, capacity FROM room ORDER BY id;'
   ```

6. Stop the API with Control+C; load/retry and attempt a save. Expect useful
   failure feedback, preserved inputs, and no false saved message. Restart
   the API and use Retry loading rooms; the saved list must recover.
7. Record the new room's ID. Restart the API twice and compare the list;
   the saved room and ID must remain, and seed rooms must not multiply.
8. Stop/start the database without deleting storage:

   ```bash
   docker compose stop db
   docker compose start --wait db
   docker compose ps
   ```

   While stopped, GET and POST must return 503, the screen must report the
   failure, and failed saves must preserve input. After recovery, retry and
   compare the original IDs and rows. Never delete volumes for this check.
9. Run `npm --prefix frontend run build` under Node 22 and review the actual
   result. Review `git diff` and `git diff --check` before committing.

10. In Teachers and Courses, create fictional records, reject blank values,
    and edit a display name/title. The record ID must remain unchanged.
11. In Sections, select saved teacher/course records. Section A should use
    Algebra/C1, Alex Example/T1, and limit 24; Section B uses Art/C2, Jordan
    Example/T2, and limit 18 in the prepared demonstration data. Invalid IDs,
    blank labels, and invalid limits must be rejected by the API as well.
12. Rename Algebra to Algebra I; Section A must show the new title while
    retaining course_id 1. Attempt to delete the referenced course and teacher:
    expect 409 and a useful message, with all related records unchanged.
    Restore the original name after the check.
13. Edit Science Lab's capacity while retaining room ID 3. Invalid capacity
    must reject without changing the saved room; restore capacity 20 afterward.
14. Inspect migration status from backend with `.venv/bin/python -m alembic
    current` and `.venv/bin/python -m alembic check`: expect q2w7_003 and no new
    upgrade operations. Migrations were checked on scheduler_migration_test
    before the working database; do not downgrade or reset data for a check.

Evidence notes distinguish Codex browser observations from teacher review.
Thursday/Friday guided student work and student contributions have not been
attested by these application checks.

## Classroom Responsibilities

The teacher operates ChatGPT, manages account access, and oversees
application changes.

Students help define tasks, improve prompts, make small guided edits,
review changes, test supplied examples, and explain results.

No independent advanced application development is assigned at home.

## Data and Credentials

Use fictional school data while developing and testing.

Do not commit or share:

- Passwords.
- Access tokens.
- Private keys.
- `.env` files.
- Database dumps.
- `node_modules`.
- `dist`.
- Virtual environments.
- Temporary logs.

Do not place real student information in development records.

## Definition of Done

A task is complete when:

1. It meets the agreed requirement.
2. Relevant checks have actually been performed.
3. Expected and observed results are recorded.
4. Changes have been reviewed and saved in Git.
5. The task board reflects the verified result.

## Q2W3 Tuesday — Verified Completion

**Task:** Extract the reusable RoomCard component.

**Status:** Done — verified by the teacher.

**Teacher-reported results (November 10, 2026):**

- Both fictional rooms displayed correctly: Passed.
- Production build (`npm run build`): Passed.
- Git commit: Completed.
- Git push: Completed.

**Affected application files:**

- `frontend/src/App.jsx`
- `frontend/src/RoomCard.jsx`

The original heading, purpose sentence, and two
fictional room records were preserved.

No new dependencies or future features were added.

These results were reported by the teacher.
ChatGPT did not independently run the application.

### Q2W3 Wednesday — Completion Record

**Curriculum task:** Review reuse and evidence
**Curriculum acceptance target:** RoomCard has no hard-coded individual room name; the two-record output remains correct.
**Recorded on:** 2026-11-11
**Manual checks:** Teacher-attested by running this command; browser behavior not observed by the script.
**Production build:** Passed automatically (`npm run build`).
**Application Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Daily lesson record only. Weekly feature cards remain in Backlog until separately reviewed.

### Q2W4 Monday — Completion Record

**Curriculum task:** Build the filter
**Curriculum acceptance target:** art shows Art Studio; xyz shows no match; clearing restores both original records.
**Recorded on:** 2026-11-16
**Manual checks:** Teacher-attested by running this command; browser behavior not observed by the script.
**Production build:** Passed automatically (`npm run build`).
**Application Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Daily lesson record only. Future feature cards remain in Backlog.

### Q2W4 Tuesday — Completion Record

**Curriculum task:** Build the local add form
**Curriculum acceptance target:** A valid room appears once; invalid input adds nothing; a refresh resets locally added rooms.
**Recorded on:** 2026-11-17
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Completed Backlog card:** Build the local add-room form
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W4 Wednesday — Completion Record

**Curriculum task:** Refine messages and review
**Curriculum acceptance target:** The selected message is clearer and all previous local checks still pass.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W5 Monday — Completion Record

**Curriculum task:** Create the first backend
**Curriculum acceptance target:** GET /rooms returns status 200 and the two expected records. No database files or routes were generated.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W5 Tuesday — Completion Record

**Curriculum task:** Add server creation and connect React
**Curriculum acceptance target:** A valid creation appears in GET /rooms; an invalid direct API request is rejected with no new record.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W5 Wednesday — Completion Record

**Curriculum task:** Handle failure and retry
**Curriculum acceptance target:** API-down produces a visible error; restart/retry recovers; no false Saved message appears.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W6 Monday — Completion Record

**Curriculum task:** Create the database service
**Curriculum acceptance target:** db is healthy and a psql connection works. .env is ignored; no application persistence is claimed yet.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W6 Tuesday — Completion Record

**Curriculum task:** Replace memory with PostgreSQL
**Curriculum acceptance target:** A newly created room has the same ID/name/capacity in the screen, GET response, and SQL row.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W6 Wednesday — Completion Record

**Curriculum task:** Prove persistence
**Curriculum acceptance target:** The new record and ID survive restart; seed count does not increase; unavailable storage is reported as failure.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W7 Monday — Completion Record

**Curriculum task:** Add teacher and course records
**Curriculum acceptance target:** Existing rooms remain; valid teachers/courses save; blank values are rejected.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W7 Tuesday — Completion Record

**Curriculum task:** Add sections and catalog forms
**Curriculum acceptance target:** Section A references Algebra and T1 with limit 24; invalid IDs and limits cannot be saved.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

### Q2W7 Wednesday — Completion Record

**Curriculum task:** Review edits and record relationships
**Curriculum acceptance target:** Rename preserves relationships; referenced delete is rejected; no existing record disappears unexpectedly.
**Recorded on:** 2026-11-24
**Manual checks:** Teacher-attested by invoking this command; browser behavior was not independently verified by the script.
**Automated check:** Frontend `npm run build` passed during this invocation.
**Frontend Git status:** No uncommitted frontend changes detected.
**Git push:** Not verified by this script.
**Scope:** Only this daily lesson is recorded. Other curriculum checks remain teacher-attested, and unrelated weekly cards are unchanged.

## Next Lesson

**Next curriculum lesson:** Q2W8 Monday — Add the Meeting record

**Acceptance target:** The meeting record refers to valid IDs; invalid days, periods, or missing records are rejected.

Follow the official curriculum and current source snapshot. Do not implement future lessons early.

