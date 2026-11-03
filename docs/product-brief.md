# Class Scheduler — Product Brief

## Classroom project

Shared Compass Academy | Grade 11 | Q2W2–Q4W8

**Starting record:** At Q2W2, the repository contained `README.md` only. Earlier learning introduced concepts; application implementation begins here. The starting Git commit still needs to be recorded from the repository.

## Purpose

Build a web application that helps authorized school staff organize rooms, teachers, courses, class sections, and a weekly timetable. Staff should be able to find the approved classes, teachers, and locations clearly.

## Users and permissions

- **Admin:** Creates and edits rooms, teachers, courses, and sections; places and changes draft meetings; and approves publication.
- **Teacher:** Views and prints only their own approved timetable. Teachers cannot edit drafts or publish.

These permissions must eventually be enforced by the server, not just by what appears on the screen.

## Required finished product (due Q4W8)

1. Manage rooms and room capacities; teachers; courses; and class sections.
2. Support one active term with a repeating Monday–Friday timetable and fixed periods **P1, P2, and P3**.
3. Manually place, move, and remove class-section meetings in rooms and periods.
4. Reject room, teacher, and section scheduling conflicts on the server.
5. Reject placements where a section's planned seat limit exceeds the room's capacity; protect against invalid related edits and concurrent saves.
6. Support school-approved Microsoft sign-in and enforce trusted **Admin** and **Teacher** permissions.
7. Allow an Admin to publish a valid, approved timetable. The published version remains stable when draft records change, until a new version is approved.
8. Allow a Teacher to view and print only their own published timetable.
9. Deploy and verify the application on **Azure** for teaching.
10. Operate the completed application permanently on an **HTTPS VPS** by Q4W8, with adult ownership, backups, recovery checks, and operating documentation.

## Out of scope

- Student enrollment or registration and student accounts.
- Individual student timetables.
- Automatic schedule generation.
- Building future functionality early or hiding it behind switches or feature flags.

## Planned technology (not installed or implemented yet)

- Frontend: React 19, plain JavaScript, Vite 7, Node.js 22.12+ within Node 22.
- Backend: Python 3.12 and FastAPI.
- Database: PostgreSQL 16.
- Sign-in: school-approved Microsoft identity.
- Development workflow: VS Code and Git.
- Deployment: Azure teaching deployment, followed by permanent VPS operation.

## Incremental classroom process

Each lesson starts from actual saved files and the current task board. The teacher operates AI; students refine prompts, review small changes, predict and record expected/actual behavior, and contribute reviewed edits. A proposed change is not a completed feature until checks actually run and evidence is recorded.

## Q2W2 Monday — planning only

Proposed documentation deliverables:

- `docs/product-brief.md`
- `docs/board.md`
- `docs/prompt-log.md`

No application code is part of Monday's documentation task. `README.md` is updated only to describe the planning work accurately.

## First implementation task — Q2W2 Tuesday

Create **only one React page**, displaying exactly:

- Heading: `Class Scheduler`
- Purpose sentence: `We are building a tool to plan classes and rooms.`

Do not add forms, controls, a room list, API, database, authentication, hidden pages, or future features.

### First-page acceptance check (for Tuesday, not Monday)

- [ ] The exact heading and sentence appear in the browser.
- [ ] No other app features appear.
- [ ] The page runs locally.
- [ ] `npm run build` succeeds.
- [ ] No unrelated files or features were added.

## Monday documentation acceptance check

- [ ] All three planning documents are saved in `docs/`.
- [ ] The board has exactly one Ready build task: the introductory React page.
- [ ] Every later feature is in Backlog, not Doing or Done.
- [ ] The README still accurately describes the project.
- [ ] No application code was added.
- [ ] `git status` and the staged diff have been reviewed.

**Verification status:** Documentation drafted for review. Repository save, checks, commits, and push have not been observed or confirmed in this chat.