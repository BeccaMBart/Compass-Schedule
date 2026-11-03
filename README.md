# Class Scheduler

A Shared Compass Academy Grade 11 classroom project.

We are building a web application that helps school staff organize
classes, teachers, rooms, and a weekly timetable.

Development begins in Q2W2. The required working product is due by
the end of Q4W8.

## Current Project Status

**Planning stage — application development has not started.**

This repository currently contains only this README and its Git history.

There is no working website, backend, database, sign-in system, or
deployment yet. The features below describe our planned product;
they are not claims about completed functionality.

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

The server will enforce these permissions.

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

These technologies will be introduced as their lessons arrive:

| Area | Planned technology |
| --- | --- |
| Frontend | React 19, plain JavaScript, and Vite 7 |
| Frontend tooling | Node.js 22, version 22.12 or later within Node 22 |
| Backend | Python 3.12 and FastAPI |
| Database | PostgreSQL 16 |
| Authentication | Microsoft sign-in |
| File editing and Git workflow | Visual Studio Code |
| Teaching deployment | Microsoft Azure |
| Permanent hosting | An always-on VPS with an adult operations owner |

These are the course's selected versions, not a list of the newest
available software releases.

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

### Monday

Agree on the project scope and create:

- A product brief.
- A task board.
- A prompt log.

The teacher will also add the source-snapshot helper supplied in the
lesson guide. No application functionality is built on Monday.

### Tuesday

Create the first React page with only:

- The heading: "Class Scheduler"
- The sentence: "We are building a tool to plan classes and rooms."

Check that the page displays correctly and that the build succeeds.

### Wednesday

Review a small wording change, inspect its differences, check the
page again, and save a reviewed checkpoint.

Forms, scheduling, the backend, the database, sign-in, and hosting
will be added in later lessons.

## Project Documents

The following documents are planned for Q2W2 Monday.
They do not exist yet:

- `docs/product-brief.md` — product purpose, users, and scope.
- `docs/board.md` — Backlog, Ready, Doing, Review, Done, and Blocked tasks.
- `docs/prompt-log.md` — prompts and the improvements we make to them.

Lesson notes and student contribution records will be added as work
is completed.

## Running the Application

There is nothing to run yet.

After we create and verify the first React page, we will update this
section with the actual setup and run instructions.

## Classroom Responsibilities

The teacher operates ChatGPT, manages account access, and oversees
application changes.

Students help define tasks, improve prompts, make small guided edits,
review changes, test supplied examples, and explain results.

Thursday and Friday home activities reinforce basic concepts through
short guided browser or paper examples. They do not require students
to independently build advanced application features.

## Data and Credentials

Use fictional records while developing and testing.

Do not commit passwords, access tokens, private keys, `.env` files,
database backups, or other credentials.

Keep account credentials out of ChatGPT prompts and student work.

## Definition of Done

A task is complete when:

- It meets the agreed requirement.
- Its relevant checks have actually been performed.
- Expected and observed results are recorded.
- The changes have been reviewed and saved in Git.
- The task board reflects the verified result.

Update this README as the project grows so it continues to describe
what actually exists.

