# Class Scheduler — Curriculum Lesson Index

This index is a navigation aid derived from the official *Curriculum Guide* Word document. The original guide controls teaching order, lesson prompts, review procedures, and acceptance checks. If the index and guide differ, stop and reconcile them before teaching or recording completion.

There are 25 instructional weeks, Q2W2 through Q4W8, with 75 Monday–Wednesday classroom lessons. Thursday and Friday guided work and each week's preparation remain in the original guide; they are not automatically marked complete by the lesson script.

| Lesson | Exact curriculum title | Acceptance target |
| --- | --- | --- |
| Q2W2 Monday | Agree on the first task | The board has one Ready build task and no claim that any app feature exists. |
| Q2W2 Tuesday | Create the first React page | The page shows only the agreed heading and sentence; npm run build succeeds. Inspect the file list for unwanted features. |
| Q2W2 Wednesday | Review a change and save a checkpoint | A peer can identify the changed line; the browser and build agree; the remote branch contains the reviewed commit. |
| Q2W3 Monday | Add two room records | Both records appear exactly once with the correct capacities; refreshing shows the same source-defined list. |
| Q2W3 Tuesday | Extract RoomCard | Both rooms still render correctly and npm run build succeeds after the extraction. |
| Q2W3 Wednesday | Review reuse and evidence | RoomCard has no hard-coded individual room name; the two-record output remains correct. |
| Q2W4 Monday | Build the filter | art shows Art Studio; xyz shows no match; clearing restores both original records. |
| Q2W4 Tuesday | Build the local add form | A valid room appears once; invalid input adds nothing; a refresh resets locally added rooms. |
| Q2W4 Wednesday | Refine messages and review | The selected message is clearer and all previous local checks still pass. |
| Q2W5 Monday | Create the first backend | GET /rooms returns status 200 and the two expected records. No database files or routes were generated. |
| Q2W5 Tuesday | Add server creation and connect React | A valid creation appears in GET /rooms; an invalid direct API request is rejected with no new record. |
| Q2W5 Wednesday | Handle failure and retry | API-down produces a visible error; restart/retry recovers; no false Saved message appears. |
| Q2W6 Monday | Create the database service | db is healthy and a psql connection works. .env is ignored; no application persistence is claimed yet. |
| Q2W6 Tuesday | Replace memory with PostgreSQL | A newly created room has the same ID/name/capacity in the screen, GET response, and SQL row. |
| Q2W6 Wednesday | Prove persistence | The new record and ID survive restart; seed count does not increase; unavailable storage is reported as failure. |
| Q2W7 Monday | Add teacher and course records | Existing rooms remain; valid teachers/courses save; blank values are rejected. |
| Q2W7 Tuesday | Add sections and catalog forms | Section A references Algebra and T1 with limit 24; invalid IDs and limits cannot be saved. |
| Q2W7 Wednesday | Review edits and record relationships | Rename preserves relationships; referenced delete is rejected; no existing record disappears unexpectedly. |
| Q2W8 Monday | Add the Meeting record | The meeting record refers to valid IDs; invalid days, periods, or missing records are rejected. |
| Q2W8 Tuesday | Build the manual planner | Section A appears at Monday P1 in Room 101 after reload; the list order follows days and periods. |
| Q2W8 Wednesday | Add move and remove actions | Move changes only the selected meeting; confirmed remove deletes only that meeting; canceled remove changes nothing. |
| Q2W9 Monday | Reject room and teacher collisions | Valid choices save; conflicting choices return a documented conflict response and leave existing meetings unchanged. |
| Q2W9 Tuesday | Check capacity and related edits | 24 in 24 passes; 24 in 18 fails; lowering a used room below its section limit leaves the original capacity unchanged. |
| Q2W9 Wednesday | Demonstrate and review the increment | The notes accurately distinguish working sequential rules from unfinished protections; no failed check is relabeled as passed. |
| Q3W1 Monday | Write tests from the rules | Tests exercise the intended behavior and use a separate database; results are recorded as actually run. |
| Q3W1 Tuesday | Protect simultaneous writes | Competing bookings cannot both claim the same slot; rejected writes preserve existing records. |
| Q3W1 Wednesday | Verify rollback and review the repair | No partial change survives the induced failure; sequential checks and the race check still pass. |
| Q3W2 Monday | Register the two application identities | The actual tenant, two client/application IDs, scope, and local redirect are recorded and verified by the authorized teacher. |
| Q3W2 Tuesday | Add browser sign in | The intended account can sign in/out and request the configured API scope; no token is displayed or committed. |
| Q3W2 Wednesday | Validate access at the API | Missing/invalid token is rejected; the valid API token reaches allowed authenticated routes; no sensitive details leak in errors. |
| Q3W3 Monday | Create the permission matrix | Admin can save; Teacher and unassigned identities cannot write; changing browser role text has no effect. |
| Q3W3 Tuesday | Add the teacher boundary | Teacher sees the empty approved-view message; direct requests cannot expose drafts or another teacher's data. |
| Q3W3 Wednesday | Test forbidden requests | The matrix matches actual server behavior, including denied direct requests. |
| Q3W4 Monday | Design and store the snapshot | Valid publish creates a version; failed publish does not change the active version or leave a partial snapshot. |
| Q3W4 Tuesday | Add publish review and action | Cancel changes nothing; success shows the actual version; failure leaves the previous version active. |
| Q3W4 Wednesday | Prove publication stability | Approved records remain stable after draft edits; forbidden and failed publications cannot advance the active pointer. |
| Q3W5 Monday | Connect the approved read endpoint | T1 and T2 receive only their own published rows; changing a request parameter cannot expose another teacher. |
| Q3W5 Tuesday | Make the timetable readable | Monday P2 precedes Tuesday P1; long names remain readable; empty authorized results are explained. |
| Q3W5 Wednesday | Add a usable print view | Print preview includes the correct teacher/version and all authorized meetings with no Admin controls. |
| Q3W6 Monday | Observe and fix one usability issue | A second user can complete the chosen task and existing rule/permission tests still pass. |
| Q3W6 Tuesday | Build the CI check | The branch workflow reports actual backend test and frontend build results without contacting production data. |
| Q3W6 Wednesday | Review a pull request | The merged change has a clear purpose, peer review, and observed check results; no unrelated feature slipped in. |
| Q3W7 Monday | Build the production image | Image builds from current source; its contents exclude local secrets and unnecessary development files. |
| Q3W7 Tuesday | Run production settings locally | The production container serves the UI and API; readiness fails when its database is unavailable; secrets stay server-side. |
| Q3W7 Wednesday | Verify the packaged release | The production package passes the core story locally and is traceable to reviewed source. |
| Q3W8 Monday | Provision the teaching environment | The selected services and private app-to-database path are configured; unresolved access/network issues are recorded explicitly. |
| Q3W8 Tuesday | Deploy and configure hosted identity | The HTTPS site loads the deployed version; valid sign-in and authorized API access work against the Azure database. |
| Q3W8 Wednesday | Run the Azure acceptance story | The full authorized workflow and required denials work in Azure; records survive an app restart. |
| Q3W9 Monday | Create and restore a backup | The isolated restore contains the expected records and approved version; the working database remains unchanged. |
| Q3W9 Tuesday | Document cost and operating responsibility | The checklist names an owner and distinguishes stopped compute from remaining resource costs. |
| Q3W9 Wednesday | Review the Azure milestone | The milestone record is honest and the VPS backlog contains only necessary deployment/operating tasks and real defects. |
| Q4W1 Monday | Map the deployment | Every account and operating task has an adult owner; no invented hostnames, secrets, or completed claims appear. |
| Q4W1 Tuesday | Prepare access and DNS | The adult can access the server; Docker/Compose version checks work; DNS points to the intended server. |
| Q4W1 Wednesday | Review readiness | Ready status is backed by real access and DNS evidence; missing dependencies have an owner and immediate follow-up. |
| Q4W2 Monday | Create the VPS configuration | Compose configuration validates without displaying secrets; only Caddy has public ports; volumes and current image tag are explicit. |
| Q4W2 Tuesday | Start and verify the service | HTTPS is valid; the app is ready; both roles behave correctly; approved timetable data is visible on a second device. |
| Q4W2 Wednesday | Confirm continuous operation | The service recovers after the planned reboot, retains data, and remains available after class under its adult owner. |
| Q4W3 Monday | Schedule and protect backups | A current off-host backup exists and the adult can verify schedule, retention, and failure handling. |
| Q4W3 Tuesday | Restore into an isolated database | The isolated restored database contains the known records; the live app remains unchanged and available. |
| Q4W3 Wednesday | Rehearse support and rollback | A named adult can identify the current image, latest backup, alert path, and tested recovery procedure. |
| Q4W4 Monday | Write user task scripts | Each required behavior has a task and expected result; test identities have the intended roles. |
| Q4W4 Tuesday | Observe and record | Test results include successful and failed tasks; every failure has usable reproduction information. |
| Q4W4 Wednesday | Prioritize the repair plan | Every required failure has an owner, bounded repair task, and retest; no extra week or hidden scope reduction is assumed. |
| Q4W5 Monday | Fix the top observed failure | The original failure is resolved and nearby regression checks pass with evidence linked to the issue. |
| Q4W5 Tuesday | Check role and data boundaries | All protected paths enforce server permissions; conflicting or invalid writes leave the database unchanged. |
| Q4W5 Wednesday | Review dependencies and deploy fixes | The repaired image passes the selected checks on VPS and its version matches the recorded commit. |
| Q4W6 Monday | Audit requirement coverage | All required rows have current evidence or a named blocker; no requirement is silently removed. |
| Q4W6 Tuesday | Run the release acceptance suite | All required checks pass for one identified candidate, or each failure remains an explicit blocker to fix this week/next week. |
| Q4W6 Wednesday | Tag and document the candidate | Candidate status is honest; the deployed version and documentation match the recorded evidence. |
| Q4W7 Monday | Resolve the remaining blocker or verify readiness | Every selected blocker is closed with a retest, or an immediate owner-led repair is scheduled within the remaining lessons. |
| Q4W7 Tuesday | Test the handoff guide | The backup owner can locate status, version, backup, recovery, and support information; the Teacher guide matches the UI. |
| Q4W7 Wednesday | Rehearse the final demonstration | The rehearsal uses the real app and fits ten minutes, with every required feature linked to evidence. |
| Q4W8 Monday | Complete the final acceptance record | Every required row is a supported pass by Q4W8; otherwise the record accurately states incomplete and class time stays on repair. |
| Q4W8 Tuesday | Demonstrate the product and learning | The live demonstration matches the final record; each student explains a concrete contribution and check. |
| Q4W8 Wednesday | Transfer ownership and reflect | The owner accepts the handoff and the permanent service remains available; required work is complete within the scheduled year. |
