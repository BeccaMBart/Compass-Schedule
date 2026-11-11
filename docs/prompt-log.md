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
