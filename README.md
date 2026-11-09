
# Class Scheduler

A Shared Compass Academy Grade 11 classroom project.

We are building a web application that helps school staff organize
classes, teachers, rooms, and a weekly timetable.

Development begins in Q2W2. The required working product is due by
the end of Q4W8.

## Current Project Status

**Q2W3 Monday — Two local room records added to the React page.
Acceptance checks pending.**

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

The room information is stored directly in the frontend source code.

These are demonstration records. They are not saved in a database.

The teacher has not yet supplied the final browser, refresh,
production-build, or Git results for today's change.

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
| Backend | Python 3.12 and FastAPI | Planned |
| Database | PostgreSQL 16 | Planned |
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
| Original heading | Class Scheduler | Pending |
| Original purpose | Original sentence remains | Pending |
| Room 101 | Appears once, capacity 24 | Pending |
| Art Studio | Appears once, capacity 18 | Pending |
| Browser refresh | Same two records appear | Pending |
| Production build | Completes without errors | Pending |

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
- Reusable RoomCard component.

The reusable `RoomCard` component is reserved for the next lesson.

#### Evidence

The teacher and students worked through the room array,
React import, existing heading, purpose paragraph, and list
rendering structure.

Final browser observations, refresh results, build output, and
Git commit evidence have not yet been provided.

Today's implementation should not be marked Done until the
acceptance checks are completed and recorded.

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

### Current Manual Checks

1. Confirm the heading displays correctly.
2. Confirm the original purpose sentence remains unchanged.
3. Confirm Room 101 appears once with capacity 24.
4. Confirm Art Studio appears once with capacity 18.
5. Refresh and confirm the same two rooms remain.
6. Run `npm run build` and inspect the actual result.

Record observed results before marking the task complete.

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

## Next Lesson

**Q2W3 Tuesday — Extract RoomCard**

The next planned lesson will introduce a reusable React component
to display the existing room records.

The current two-room list must work correctly before starting
the next lesson.

Do not implement future features ahead of their scheduled lessons.
