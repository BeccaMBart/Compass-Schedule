# Class Scheduler — Classroom Task Board

**Current lesson:** Q2W2 Monday — Agree on the first task  
**Build status:** No application feature has been verified or completed.  
**Rule:** Future features remain in Backlog. A task moves to Done only after reviewed evidence exists.

## Backlog

All cards below are **future work**, not current implementation or verified functionality. Their owners will be assigned when the relevant lessons begin.

| Task card | Planned lesson | Owner | Acceptance check (future) |
| --- | --- | --- | --- |
| Show two fictional rooms in a reusable component | Q2W3 | Teacher/class (later) | Two named rooms and capacities display correctly. |
| Add a local room filter and creation form | Q2W4 | Teacher/class (later) | Filter and validated room addition work only in local browser state. |
| Build room API and connect page | Q2W5 | Teacher/class (later) | Valid room requests work; invalid direct requests are rejected. |
| Store rooms persistently in PostgreSQL | Q2W6 | Teacher/class (later) | New room data survives API restart. |
| Manage teachers, courses, sections, and room edits | Q2W7 | Teacher/class (later) | Catalog relationships save correctly, without losing existing rooms. |
| Create the manual draft timetable | Q2W8 | Teacher/class (later) | Meeting placements can be saved, moved, and removed for Monday–Friday P1–P3. |
| Check conflicts and capacity on the server | Q2W9 | Teacher/class (later) | Room, teacher, section, and capacity conflicts are rejected. |
| Protect simultaneous saves and test rules | Q3W1 | Teacher/class (later) | Concurrent competing bookings cannot corrupt a valid schedule. |
| Add Microsoft sign-in and API credential validation | Q3W2 | Teacher/class (later) | Valid school account works; invalid credentials are rejected. |
| Enforce Admin and Teacher permissions | Q3W3 | Teacher/class (later) | Admin may manage drafts; Teacher cannot edit or read another teacher's data. |
| Publish stable approved timetable | Q3W4 | Teacher/class (later) | Publishing creates an approved version unchanged by later draft edits. |
| Display and print each teacher's approved timetable | Q3W5 | Teacher/class (later) | Each teacher can see and print only their approved meetings. |
| Improve usability and shared checks | Q3W6 | Teacher/class (later) | Focused usability fixes and repeatable checks have evidence. |
| Package application for hosting | Q3W7 | Teacher/class (later) | Existing app runs in a verified production container. |
| Deploy and verify on Azure | Q3W8–Q3W9 | Adult owner/class (later) | Hosted HTTPS app passes sign-in, rules, publication, persistence, and recovery checks. |
| Prepare and deploy permanent VPS | Q4W1–Q4W2 | Adult owner/class (later) | The app runs at the permanent HTTPS address with durable storage. |
| Back up, restore, test, repair, and hand over | Q4W3–Q4W8 | Adult owner/class (later) | Recovery, required acceptance checks, and permanent operations are verified by Q4W8. |

**Excluded, not backlog implementation:** student enrollment, student accounts/individual schedules, automatic timetable generation, and hidden future features.

## Ready

### TASK-001 — Create the first React page

- **Planned lesson:** Q2W2 Tuesday.
- **Owner:** Teacher/class (to assign at the lesson).
- **User need:** A staff member opening the first page should understand the purpose of the app.
- **Change:** A React page with the heading `Class Scheduler` and the sentence `We are building a tool to plan classes and rooms.`
- **In scope:** Exactly the heading and sentence on one page.
- **Out of scope:** Forms, room records, scheduling, API, database, Microsoft sign-in, additional pages, and hidden functionality.
- **Acceptance check:** The exact two texts display; `npm run build` succeeds; the review finds no additional app features.
- **Evidence:** Not run yet. Record the actual browser and build results during Tuesday's lesson.

## Doing

No implementation task is currently in progress.

## Review

No implementation task is awaiting review.

## Done

No application features have been completed or verified. Monday planning-document drafts are recorded in `docs/prompt-log.md`; they will count as reviewed documentation work only after the teacher checks and commits them.

## Blocked

No confirmed blocker has been reported. Git remote access, starting commit, and repository status still need to be checked in the local repository; do not treat them as failures before checking.

## Q2W2 Monday acceptance check

- [ ] `docs/product-brief.md`, `docs/board.md`, and `docs/prompt-log.md` have been saved locally.
- [ ] Ready contains exactly one build task (TASK-001).
- [ ] The board does not claim an application feature exists.
- [ ] Future feature cards remain in Backlog.
- [ ] No app code has been added for Monday.
- [ ] `README.md` records planning work without claiming a working app.
- [ ] Teacher/student reviewers inspected the staged diff and recorded actual Git observations.

**Actual results:** Not supplied yet.  
**Evidence/commit:** Pending local review and commit.