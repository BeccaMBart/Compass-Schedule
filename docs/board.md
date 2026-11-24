
# Class Scheduler — Classroom Task Board

**Current lesson:** Q2W4 Wednesday — Refine messages and review (completion recorded)
**Build status:** Q2W4 Wednesday: frontend production build passed; manual checks teacher-attested.
**Rule:** Future features remain in Backlog. A task moves to Done only after reviewed evidence exists.

## Backlog



All cards below are **future work**, not current implementation or verified functionality. Their owners will be assigned when the relevant lessons begin.

| Task card | Planned lesson | Owner | Acceptance check (future) |
| --- | --- | --- | --- |
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

No daily task is currently Ready.

## Doing

No implementation task is currently in progress.

## Review

### TASK-001 — Create the first React page

- **Planned lesson:** Q2W2 Tuesday.
- **Owner:** Teacher/class (to assign at the lesson).
- **User need:** A staff member opening the first page should understand the purpose of the app.
- **Change:** A React page with the heading `Class Scheduler` and the sentence `We are building a tool to plan classes and rooms.`
- **In scope:** Exactly the heading and sentence on one page.
- **Out of scope:** Forms, room records, scheduling, API, database, Microsoft sign-in, additional pages, and hidden functionality.
- **Acceptance check:** The exact two texts display; `npm run build` succeeds; the review finds no additional app features.
- **Evidence:** Teacher previously reported browser and build success; final task-board/Git evidence review remains pending.

## Done



### Q2W3 Monday, November 9, 2026 — Add Two Room Records

**Task:** Create two fictional local room records and display them in a read-only list.

**Status:** Done — teacher-confirmed.

**Records:**

| ID | Room | Capacity |
| --- | --- | --- |
| 1 | Room 101 | 24 |
| 2 | Art Studio | 18 |

**Affected application file:**

- `frontend/src/App.jsx`

**Acceptance evidence:**

- Both original room records remain present.
- Room 101 displays with capacity 24.
- Art Studio displays with capacity 18.
- The teacher subsequently confirmed both rooms displayed correctly.
- The teacher reported a successful production build on Q2W3 Tuesday.
- Monday's completion was confirmed by the teacher.

**Git evidence:** Monday-specific commit and push results were not separately supplied.

The records are local demonstration data. No forms, database, API, persistence, or scheduling functionality was introduced.

### Q2W3 Tuesday, November 10, 2026 — Extract RoomCard

**Task:** Extract the existing repeated room display into a reusable React component.

**Status:** Done — teacher-verified.

**Teacher-reported acceptance results:**

- Both fictional rooms displayed correctly: Passed.
- Original heading and purpose sentence preserved.
- Room names and capacities unchanged.
- Production build (`npm run build`): Passed.
- Git commit: Completed.
- Git push: Completed.

**Affected application files:**

- `frontend/src/App.jsx`
- `frontend/src/RoomCard.jsx`

**Implementation:**

- `App.jsx` imports `RoomCard`.
- Each room is passed through the `room` prop.
- React list rendering continues to use `room.id` as its stable key.
- `RoomCard.jsx` displays one room.
- No additional dependencies, state, or future features were introduced.

**Evidence:** Results reported by the teacher on November 10, 2026. ChatGPT did not independently run the application.

### Q2W3 Wednesday — Completion Record

**Curriculum task:** Review reuse and evidence

**Curriculum acceptance target:** RoomCard has no hard-coded individual room name; the two-record output remains correct.

**Recorded on:** 2026-11-11

**Manual checks:** Teacher-attested by running this command; browser behavior not observed by the script.

**Production build:** Passed automatically (`npm run build`).

**Application Git status:** No uncommitted frontend changes detected.

**Git push:** Not verified by this script.

**Scope:** Daily lesson record only. Weekly feature cards remain in Backlog until separately reviewed.

### Q2W4 Monday — Build the filter

- **Planned lesson:** Q2W4 Monday.
- **Owner:** Teacher/class.
- **User need:** Staff can quickly find a room by its name.
- **Change:** Add a labeled name filter using React state.
- **In scope:** Case-insensitive filtering, a no-match message, and restoring all original rooms when the input is cleared.
- **Out of scope:** Room creation, storage, API, database, and future scheduling functionality.
- **Affected application file:** `frontend/src/App.jsx`.
- **Preserved component:** `frontend/src/RoomCard.jsx`.
- **Acceptance check:**
  - `art` displays Art Studio.
  - `xyz` displays No matching rooms.
  - Clearing the input restores Room 101 and Art Studio.
- **Evidence:** Manual checks teacher-attested; production build passed. See completion record below.
- **Status:** Completion recorded; teacher-attested.

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

## Blocked

No current application blocker has been reported.

Historical Q2W2 planning and TASK-001 Git evidence remains pending where indicated.
