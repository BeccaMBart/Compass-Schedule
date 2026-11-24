# Q2W5 Wednesday — Handle failure and retry

Recorded November 24, 2026.

**Status:** Implemented and checked by Codex; teacher-verified on November 24,
2026. The teacher stated: “I verified that it is complete.” Application changes
were committed as `a19baab`; this daily lesson was subsequently recorded by
the completion script on November 24, 2026, in curriculum order. Its frontend
build passed. No push or merge was performed for this work.

**Authorization:** On November 24, 2026, the teacher explicitly authorized all
six Q2W5–Q2W6 Monday–Wednesday lessons in curriculum order, overriding the
single-lesson implementation limit while keeping completion records pending.
The matching sections of the original Word guide were compared with both
weekly extracts; all six matched after whitespace normalization.

**Classroom evidence:** Student prompt improvements, individual contributions,
and Thursday/Friday guided-work results have not been supplied. They are not
inferred from these application checks.

**Target:** API-down produces a visible error; restart/retry recovers; no false
Saved message appears.

**Path:** `frontend/src/App.jsx`. GET/POST contracts and the filter were retained.

**Observed before the change:** With the API stopped, headless Chrome showed
`Could not load rooms.` and no retry button. This actual observation preceded
Wednesday's feedback implementation.

**Change:** Added loading/saving feedback, disabled pending submission controls,
useful load/save failures, and a reload/retry action. Failed saves preserve the
form values. A save is reported only after a 201 response and returned record.
The list is fetched again from the API; there is no local fallback. An aborted
initial request does not update an unmounted component.

**Actual commands/checks:** `/tmp/class-scheduler-browser-venv/bin/python
/tmp/class-scheduler-wednesday-check.py` drove Chrome against the separate Vite
server. It started and terminated only its own temporary API process, using the
same uvicorn target and loopback port as the curriculum.

| Check | Observed result |
| --- | --- |
| API stopped | Useful error: `Could not load rooms. Check that the API is running, then retry.` |
| Save with API stopped | Failure text displayed; Science Lab and capacity 20 remained in their inputs; no saved message. |
| Restart / Retry | API restarted; Retry loading rooms restored the list without losing unsaved inputs. |
| Successful recovery | Submitting afterward displayed `Room "Science Lab" saved by the server.`; the room appeared once. |
| Refresh | The server-created Science Lab remained visible. |
| Form regression | Blank name, 0, -3, and 2.5 were rejected without adding a room. |
| Loading feedback | Final read-only Chrome check delayed the GET request: Loading rooms was visible and Reload rooms was disabled until the response arrived. |
| JavaScript / build | No browser page errors; production build passed with 24 modules. |

**Limitations:** Codex observed Chrome through temporary inspection scripts,
not the teacher's own browser session. The teacher subsequently confirmed
completion on November 24, 2026. No automated project test framework was introduced.

**Next assignment in order:** Q2W6 Monday — Create the database service.
