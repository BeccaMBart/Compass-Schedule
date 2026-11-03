# Class Scheduler

A Shared Compass Academy Grade 11 classroom project.

We are building a web application that helps school staff organize
classes, teachers, rooms, and a weekly timetable.

Development begins in Q2W2. The required working product is due by
the end of Q4W8.

## Current Project Status

**Q2W2 Tuesday — First React page completed and tested locally.**

The project now includes a working React frontend created with
React 19, Vite 7, and plain JavaScript.

The first page displays:

- Heading: Class Scheduler
- Purpose sentence: We are building a tool to plan classes and rooms.

The teacher reported that the page worked and today's checks
completed successfully.

This is the first working application page. It is not yet a
functional scheduling system.

There are currently no room records, scheduling features, backend,
database, sign-in system, or deployment.

The features below describe our planned product unless specifically
identified as completed.

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
They will not edit the draft schedule or publish changes.

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
| Frontend | React 19, plain JavaScript, Vite 7 | Introduced Q2W2 Tuesday |
| Frontend tooling | Node.js 22.12+ within Node 22 | Introduced Q2W2 Tuesday |
| Backend | Python 3.12 and FastAPI | Planned |
| Database | PostgreSQL 16 | Planned |
| Authentication | Microsoft sign-in | Planned |
| File editing and Git workflow | Visual Studio Code | In use |
| Teaching deployment | Microsoft Azure | Planned |
| Permanent hosting | Always-on VPS with adult operations owner | Planned |

These are the course's selected versions, not claims about the newest
available software releases.

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

## First Week — Q2W2

### Monday — Project Planning

Agreed on the project scope using the existing README and created
the planning documents:

- `docs/product-brief.md` — project purpose, staff roles, fixed-period
  timetable, exclusions, required outcome, and acceptance checks.
- `docs/board.md` — one introductory React-page task in Ready, with
  future features in Backlog.
- `docs/prompt-log.md` — original and improved prompts, review
  questions, and expected-versus-actual evidence.

No application functionality was built on Monday.

### Tuesday — First React Page

**Task: TASK-001 — Create the first React page**

Created the initial frontend application using:

- React 19
- Vite 7
- Plain JavaScript
- Node.js 22.12 or later within Node 22

The following application files were introduced:

- `frontend/package.json`
- `frontend/index.html`
- `frontend/src/main.jsx`
- `frontend/src/App.jsx`

The root `.gitignore` was updated to exclude frontend dependencies,
generated build files, and local environment files.

Running `npm install` generates `frontend/package-lock.json`,
which should be committed to Git.

#### What We Built

The application displays exactly:

**Class Scheduler**

We are building a tool to plan classes and rooms.

The page contains:

- One React component named `App`.
- One heading (`h1`).
- One paragraph (`p`).

There are no forms, room records, scheduling controls, API requests,
database connections, authentication features, or additional pages.

#### Development Server

The Vite development server is configured to bind to:

`127.0.0.1`

The default local address is:

`http://127.0.0.1:5173/`

This keeps the development server accessible locally on the
teacher's Mac rather than exposing it to the local network.

#### Problem Encountered and Fixed

During the first browser test, the page appeared completely white.

The original `App.jsx` component was missing the React import
needed for the JSX transformation used by our minimal Vite setup.

The problem was addressed by adding:

`import React from 'react';`

to the beginning of `frontend/src/App.jsx`.

This correction required no additional dependencies or features.

#### Tuesday Acceptance Results

| Acceptance check | Reported result |
| --- | --- |
| Page displays "Class Scheduler" | Passed |
| Page displays the exact purpose sentence | Passed |
| Local development server works | Passed |
| Production build succeeds | Passed |
| No additional application features | Passed |
| Initial blank-page problem resolved | Passed |

**Evidence:** The teacher reported that everything worked after
the React import correction.

The application was not independently run by ChatGPT.

The Git commit hash, push, and merge status have not been provided
for this lesson.

### Wednesday — Review and Improve

Planned work:

- Review the existing React page.
- Make one small, guided wording change.
- Inspect the Git differences.
- Run the page and build checks again.
- Record expected and actual results.
- Save a reviewed checkpoint.

Wednesday's work has not yet been implemented.

Forms, scheduling, the backend, the database, sign-in, and hosting
will be added in later lessons.

## Project Documents

The project planning and classroom records are stored in:

- `docs/product-brief.md` — product purpose, users, requirements,
  exclusions, and project timeline.
- `docs/board.md` — Backlog, Ready, Doing, Review, Done, and
  Blocked tasks.
- `docs/prompt-log.md` — classroom prompts, improvements, reviews,
  and evidence.

The task board and prompt log should be updated with Tuesday's
actual results and the reviewed Git commit information.

Future application features remain in Backlog until their lessons.

## Running the Application

The frontend can now run locally.

### Requirements

- Node.js version 22.12 or later within the Node 22 line.
- npm.
- A terminal, such as the integrated terminal in VS Code.

### First-Time Installation

Open a terminal at the repository root.

```bash
cd frontend
npm install