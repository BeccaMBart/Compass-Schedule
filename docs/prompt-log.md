    # Class Scheduler — Prompt Log

    Record the request made to AI, how the class improved its specificity, the proposed change, a human review, and the actual acceptance results. Never paste passwords, tokens, `.env` contents, real student information, or database dumps.

    ## Entry 001 — Q2W2 Monday: Agree on the first task

    **Project:** Shared Compass Academy Grade 11 — Class Scheduler  
    **Branch reported by teacher:** `main` (not independently verified)  
    **Starting repository reported:** `README.md` only, with Git history  
    **Starting commit:** Pending `git log -1 --oneline`  
    **Observed behavior:** Not run yet

    ### Vague starting request

    > Build my app.

    ### Improved bounded prompt

    > Our repository contains only README.md. Draft docs/product-brief.md, docs/board.md, and docs/prompt-log.md. The finished product needs manual rooms/classes/teacher scheduling, conflict checks, Microsoft sign-in with Admin and Teacher roles, publishing, Azure teaching deployment, and a permanent VPS by Q4W8. Exclude student enrollment. Put all future features in Backlog. Put only a React page with a heading and purpose sentence in Ready. Include an acceptance check. Do not generate app code or replace README.md.

    ### Follow-up context and request

    The teacher attached the actual README and asked to compare it with the three document drafts and update the README with the Q2W2 Monday documentation work. This follow-up authorizes a narrow README documentation update; it does not authorize app code.

    ### Why the prompt improved

    It names the existing starting files, the audience and final scope, the exact three output paths, the only Ready build task, what must remain in Backlog, and an observable acceptance check. The supplied README adds the school's project name and the precise Monday–Friday P1–P3 timetable, staff roles, excluded automatic scheduling, and selected technology versions.

    ### Proposed file changes

    | Path | Proposed change |
    | --- | --- |
    | `docs/product-brief.md` | State purpose, scope, exclusions, users, timeline, and acceptance checks. |
    | `docs/board.md` | Keep later features in Backlog, exactly one introductory page task in Ready, and the other columns honest. |
    | `docs/prompt-log.md` | Save the prompt and this review/evidence record. |
    | `README.md` | Record Monday's documentation drafts and link to them; keep the future application status clear. |

    No application code was generated for this documentation task.

    ### Student and teacher review

    - [ ] Each pair improves one vague requirement without adding an app feature.
    - [ ] A reviewer confirms the Ready card covers only the heading and purpose sentence.
    - [ ] A reviewer checks all new and edited paths in the Git diff.
    - [ ] Teacher records what the actual repository reports.

    **Student contribution/branch:** Pending classroom record.  
    **Teacher approval:** Pending.

    ### Acceptance check: expected vs. actual

    | Check | Expected | Actual |
    | --- | --- | --- |
    | Three planning documents | All exist under `docs/`. | Not verified in repository. |
    | Ready column | Exactly one first-page React task. | Proposed board meets this in its draft; repository not verified. |
    | Future features | All remain Backlog. | Proposed board meets this in its draft; repository not verified. |
    | App files | None added today. | No app code proposed; repository not verified. |
    | README | Existing content preserved with accurate Monday update. | Revised copy prepared; local save not verified. |
    | Git changes | Reviewed and committed after checks. | Not run yet. |

    **Suggested commit message:** `Document Q2W2 Monday planning`  
    **Commit hash / push:** Pending; do not report a success without local output.

    ### Next lesson

    Q2W2 Tuesday — Build only the first React page displaying `Class Scheduler` and `We are building a tool to plan classes and rooms.` The task stays Ready until its actual checks pass.

    ## Q2W3 Tuesday — Completion Evidence

    **Task:** Extract RoomCard.
    **Human review:** Teacher reviewed App.jsx and reported that the RoomCard extraction works.
    **Expected:** Both original rooms display with unchanged names/capacities; production build succeeds.
    **Actual (teacher-reported, November 10, 2026):** Both rooms displayed correctly; `npm run build` passed; Git commit and push completed.
    **AI verification:** ChatGPT did not run the application.
    **Prompt improvement:** Extract only the existing list item into a component receiving one room prop; preserve visible text and stable `room.id` keys.
    **Affected paths:** `frontend/src/App.jsx`, `frontend/src/RoomCard.jsx`.

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


## November 24, 2026 — Q2W5–Q2W6 implementation and validation

**Teacher request:** “can you please verify that everything is ready to work
and then complete weeks 5 and 6 work and validate it”.

**Scope clarification:** Teacher selected “Yes—implement all six in order;
leave completion records pending”, explicitly overriding the root instructions'
single-lesson implementation limit for these six lessons. This did not attest
manual checks or authorize new application commits, pushes, merges, or later
curriculum features.

**Prompt boundary:** Implement Monday–Wednesday in order, checking the temporary
API before connecting React, observing the stopped API before improving feedback,
and checking a healthy empty database before converting the API. Preserve the
existing teacher .gitignore changes and all completed lesson records. No student
work or Thursday/Friday completion is inferred.

**Actual implementation paths:** backend/main.py, backend/requirements.txt,
backend/database.py, backend/models.py, frontend/src/App.jsx,
frontend/vite.config.js, compose.yaml, .env.example, .gitignore. Evidence/status
paths: README.md, docs/board.md, docs/prompt-log.md, and six daily notes under
docs/lesson-notes/. The generated private .env is ignored and excluded from Git.

**Observed evidence:** See [Q2W5 Monday](lesson-notes/Q2W5-Mon.md),
[Tuesday](lesson-notes/Q2W5-Tue.md), [Wednesday](lesson-notes/Q2W5-Wed.md),
[Q2W6 Monday](lesson-notes/Q2W6-Mon.md), [Tuesday](lesson-notes/Q2W6-Tue.md),
and [Wednesday](lesson-notes/Q2W6-Wed.md). API/Chrome/SQL checks, actual API/DB
restarts, invalid writes, unavailable storage, the production build, and Python
dependency/syntax checks were performed. Science Lab is stored with ID 3 and
capacity 20. Final GET/SQL rows match, with one copy of each original seed.

**Failures/corrections during verification:** Initial pip network access and
Docker socket access were blocked by the sandbox; approved escalated commands
succeeded. The old Vite process on 5173 served HTML for /api/rooms because its
configuration predated the new proxy; this caused a JSON parse failure and a
browser timeout. A separate Node 22 Vite process on 5174 loaded the new proxy
and passed the checks; the teacher process was preserved. One ad hoc Python
request-check command had a syntax error and was corrected before rerunning.
The initial Swagger locator matched both the table header and actual 200 cell;
it was narrowed to the response body and the live Execute check then passed.
These setup/inspection failures are not relabeled as original passes.

**Git/lesson status:** Work remains uncommitted on readiness/q2w5-mon, based on
ea0eeb1. Existing .gitignore edits are preserved. No application commit, push,
PR, merge, or lesson-completion invocation was performed. The board's last
completed lesson remains Q2W4 Wednesday. All six new lessons are in Review
pending teacher attestation and application Git review. Q2W7 and later work
remains Backlog.


## November 24, 2026 — Teacher verification of Q2W5 and Q2W6

**Teacher request:** “can you please update the board and anything else with w5
and w6 completion? I verified that it is complete”.

**Attestation recorded:** The teacher confirms manual acceptance/review for all
six implemented Monday–Wednesday lessons. README, board, and all six daily
notes now record that confirmation. No separate student contributions or
Thursday/Friday completion are inferred.

**Required workflow:** Application changes are still uncommitted. Root
AGENTS.md requires committed application changes before the completion script,
and approval of the described commit before Git mutation. The prepared action
is a focused local application commit on readiness/q2w5-mon, followed by six
completion-script invocations in order and a local documentation commit.
No push, PR, merge, or lesson after Q2W6 is included in this action.

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


## November 24, 2026 — Approved local commits and completion recording

**Approval:** The teacher selected “Approve both local commits and completion
recording” for the described application/configuration commit and subsequent
completion/documentation commit on readiness/q2w5-mon, based on ea0eeb1.
No push or merge was authorized in that approval.

**Application Git result:** Commit `a19baab` — `Implement Q2W5 and Q2W6 room API
and persistence`. It contains exactly nine application/configuration files.
Only the lesson-related .gitignore additions were staged; the teacher's
pre-existing /AGENTS.md ignore rule remains an uncommitted working-tree change.
No private .env, dependencies, build output, database files, temporary scripts,
or logs were staged.

**Completion commands:** With Node 22.23.5 and TZ=America/New_York, ran these
commands sequentially from the repository root after the application commit:

```bash
node scripts/complete-lesson.mjs Q2W5 Monday
node scripts/complete-lesson.mjs Q2W5 Tuesday
node scripts/complete-lesson.mjs Q2W5 Wednesday
node scripts/complete-lesson.mjs Q2W6 Monday
node scripts/complete-lesson.mjs Q2W6 Tuesday
node scripts/complete-lesson.mjs Q2W6 Wednesday
```

All six commands exited successfully, passed their frontend production builds
(24 modules each), and wrote the matching daily record into README, board,
and prompt log. Each invocation detected no uncommitted frontend changes.
These commands record the teacher's attestation; they do not independently
verify browser behavior or a remote push. No completion-script changes or
progression bypasses were needed.

**Documentation result:** The six daily notes now record teacher-verified,
formally recorded completion. The combined Q2W5–Q2W6 card is in Done, all older
Done records remain, and the board's current lesson is Q2W6 Wednesday — Prove
persistence. The next curriculum assignment is Q2W7 Monday — Add teacher and
course records. Q2W7 and later application work remains Backlog. Completion
documentation is saved by the separate approved local documentation commit.
No push, PR, merge, or Thursday/Friday completion was performed.
