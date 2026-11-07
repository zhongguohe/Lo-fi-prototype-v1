# Project status

**Last updated:** 2026-11-07 (America/Detroit)  
**Current project phase:** Lo-fi Prototype V1 — Initial Implementation / Preparation for Classroom Testing  
**Current task:** user-authorized upload of source and GitHub Pages configuration to the existing group repository; owner Pages activation pending.

## Project summary

Helping University Students Move More During and Beyond Study Time is a SI/HBHE 684 group project for undergraduate/graduate students aged 18+ who study for long periods. It supports short Study Breaks and separate Planned Exercise through (1) Adjustable Study-Break Prompts, (2) Backup Exercise Plans and Rescheduling, and (3) Cumulative Progress Feedback and Optional Virtual Pet.

## How to interpret verification

- **Implemented and Verified:** implementation exists with a relevant passing automated check and/or an explicitly recorded developer browser walkthrough. This does not mean exhaustive coverage or participant evaluation.
- **Implemented but Unverified:** source implementation exists; relevant runtime/device behavior has not been tested.
- **Partially Implemented:** only part of the described behavior is present; see the limitation.
- **Not Implemented:** absent; may be deliberately outside V1 scope.
- **Known Issue:** a concrete defect or discrepancy with evidence is recorded below.

Evidence: **S** = current source inspection; **T** = automated tests rerun for this handoff; **B** = prior local developer browser walkthrough retained in `docs/lo-fi-v1/development-verification.md`; **Z** = fresh extracted-package checks in `docs/lo-fi-v1/handoff-verification.md`. B is historical verification, not a fresh full UI regression in the packaging task. There are no classroom participant findings.

## Completed Work and Current Prototype

15 primary interfaces are functions in `src/App.jsx`; common buttons/cards/dialogs and Context also live there. `Form.jsx`/`validation.js` implement English inline validation. Pure record/date/timer/goal functions are in `model.js`. See the full route map in [information architecture](docs/information-architecture.md).

| ID | Actual interface / component | Status | Evidence and scope |
| --- | --- | --- | --- |
| P01 | Initial Setup / Setup | Implemented and Verified | S, B: explicit pet choice, preferences, save and repeat-visit persistence |
| P02 | Home / Home | Implemented and Verified | S, B: shared totals, pending plan, empty/next-day state |
| P03 | Study Settings / StudySettings | Implemented and Verified | S, B: Save/Cancel; new interval applies after Save |
| P04 | Study Session / Study | Implemented and Verified | S, T, B: start, pause, resume, reminder countdown and session end |
| P05 | Activity Session / Activity | Implemented and Verified | S, T, B: shared study/exercise modes, start/pause/resume/finish/early end |
| P06 | Activity Confirmation / Confirmation | Implemented and Verified | S, T, B: actual record review/edit/save/discard, feedback and return |
| P07 | Exercise Plans / Plans | Implemented and Verified | S, B: grouped status lists and shared goal |
| P08 | Plan Editor / PlanEditor | Implemented and Verified | S, B: new/edit modes, saved and canceled edits |
| P09 | Backup Setup / Backup | Implemented and Verified | S, B: prepared backup saved with plan; draft refresh excluded |
| P10 | Plan Details / PlanDetails | Implemented and Verified | S, B: original/backup/actual summary, reschedule, skip, completion |
| P11 | Progress Overview / Progress | Implemented and Verified | S, T, B: separate statistics and recalculated growth |
| P12 | Activity History / History | Implemented and Verified | S, B: date sorting, category filter, manual entry; no date search |
| P13 | Record Details/Edit / Record | Implemented and Verified | S, T, B: details/edit/manual modes; correction recalculates totals |
| P14 | Virtual Pet / Pet | Implemented and Verified | S, T, B: placeholder, stage, toggle with progress retained |
| P15 | Personal Center / Personal | Implemented and Verified | S, B: profile save/cancel, shared settings, goal/device/help dialogs; K01 applies to repeated future goals |

## Feature status

| Function | Status | Evidence / boundaries |
| --- | --- | --- |
| Flow A including delayed, paused, early-end and confirmed-save branches | Implemented and Verified | S, T, B; in-app simulation only |
| Flow B create/backup/reschedule/skip/actual confirmation | Implemented and Verified | S, T, B; plans alone earn nothing |
| Flow C history/edit/recalculate/pet off/on | Implemented and Verified | S, T, B |
| Records, plan/preference synchronization and growth from unique IDs | Implemented and Verified | S, T, B; no independent-device duplicate detection |
| localStorage persistence and empty/sample reset | Implemented and Verified | S, B; no robust arbitrary-schema migration |
| English required/range/format validation | Implemented and Verified | S, T, B; native browser validation bubbles disabled |
| Logical 390 × 844 frame / fit-to-height desktop preview | Implemented and Verified | S, B; 1280 × 720 preview measured and inspected |
| Responsive CSS on physical phones / actual mobile Safari focus behavior | Implemented but Unverified | CSS and 16px form controls exist; no physical-device/browser matrix |
| Full keyboard/screen-reader accessibility | Implemented but Unverified | Labels, error descriptions and modal focus handling exist; no complete accessibility audit |
| Multiple consecutive future-goal updates | Known Issue | K01; model reproduction in current audit |
| Goal history and reschedule audit history | Partially Implemented | One future goal; first original schedule retained; K01 |
| Source IA's date search / editable default snooze | Partially Implemented | Category filter + date sorting; fixed 5/10 choices |
| Device connection and pet visuals | Partially Implemented | Local explanatory toggle and line icon; no import/decorations |
| Source IA's feedback submission | Not Implemented | Help/About text exists; no submit action |
| Real notifications, detection, sync, accounts, backend, calendar, AI | Not Implemented | Explicitly outside V1 scope |
| Classroom participant testing, walkthrough video artifact | Not Implemented | No participant data or completed video supplied in this project |

## Technical architecture

- JavaScript ES modules, React + React DOM, Vite, React Router DOM, Lucide React; no TypeScript or backend.
- Resolved versions are in `package-lock.json` and [technical architecture](docs/technical-architecture.md); package.json uses compatible version ranges.
- `BrowserRouter` wraps development; production uses `HashRouter` so static-host refresh does not need an SPA fallback. Routes/Navigate/NavLink choose pages. Vite base is set by DEPLOY_BASE_PATH for Pages builds.
- React state and Context own preferences, study, active activity, records, plans and day offset. `planDraft`, current modal and temporary notices are memory-only.
- localStorage key `si684-wireframe-v1`, schema version 1. Stats are derived on render rather than a separate accumulating points counter.
- `npm install` or `npm ci`; `npm run dev`; `npm test`; `npm run build`; `npm run preview`.
- A small vite.config.js now handles repository-base paths. Bundled imports are used; no public folder is needed.

## Known issues and implementation limits

| ID | Issue | Evidence / impact / next action |
| --- | --- | --- |
| K01 | Scheduling another future goal after an earlier scheduled goal has taken effect can revert the current-week goal to the older base goal | Reproduced with `goalFor`: effective scheduled 90 with base 60 → replace future slot → current value becomes 60. Affects goal line, not recorded minutes/points. Fix with agreed effective-date/history model in a separately authorized code task |
| K02 | Browser-tab timing is incremental, not elapsed wall-clock reconciliation | Source timer uses setInterval; background throttling or closing the page freezes/slows time. Prototype limit, not real reminder reliability |
| K03 | New-plan draft is not persisted; header Back from Backup does not commit its local unsaved edits | Source inspection: planDraft is memory-only; explicit in-page Back saves the local draft, header Back only navigates. Refresh loses the draft. No UI repair in packaging scope |
| K04 | Intensity is initially guessed from activity name | Source regex; confirmation allows edits. It can misclassify unfamiliar activity names; no health detection claim. Discuss explicit intensity selection during evaluation |
| K05 | Saved feedback retains an active snapshot until Done/Continue; navigation can leave it pending | Source inspection: startActivity redirects while active exists. This can surprise users starting another task; editing its record elsewhere can leave old feedback text. Prior walkthrough completed normally; unusual navigation combinations are not exhaustively tested |
| K06 | Persisted state validation checks only version and record/plan arrays | Source inspection; malformed same-version storage or multi-tab concurrent writes may cause inconsistent state. No migration or concurrency handling |

Additional limits: no pet unlock ledger, source/device suggestion audit trail, comprehensive date filter, real sync, or physical-device tests. These are not evidence of failed health outcomes. No new scope is implied by this list.

## Open questions

The [decision register](docs/design-decisions.md) separates explicit brief decisions from demo assumptions. Group confirmation is still needed for future intensity entry, target-history semantics, navigation refinements, V2 priorities, later visual design, evaluation protocol and repository licensing/ownership. No group vote is inferred.

## Next steps

1. Review this package and the known issues with the group. GitHub creation/upload is a separate task.
2. Run participant tasks using the blank [testing template](docs/lo-fi-v1/testing-notes.md); record observations and distinguish task success from health effectiveness.
3. Recheck known issues and physical phone/browser accessibility before classroom reliance where relevant.
4. Prioritize Lo-fi V2 changes using actual findings and current course requirements; do not preemptively build them.
5. Start Hi-fi only after the group confirms scope and visual direction. Update status, decisions, and changelog after significant work.

## Handoff verification

The maintenance task leaves `src/`, `tests/`, `index.html` and package.json byte-identical to their inspected baseline. Current install/build/test and extracted-ZIP results, package exclusions and archive hashes are recorded in [handoff verification](docs/lo-fi-v1/handoff-verification.md). Historical developer checks remain separate from participant testing.


## Stage organization and Version History

- **Lo-fi V1:** src/ is the current runnable low-fidelity implementation. This ZIP is the complete independent/restorable V1 project snapshot, not a screenshot-only export. Keep stage snapshots before modifying the same src/ for future iterations. The earlier pre-prototypes ZIP is preserved locally under outputs/archive; it is excluded from the new ZIP.
- **2026-11-07 organization update:** prototypes/lo-fi-v1 now holds its README, five actual navigation screenshots, an unfilled feedback template and package verification. README/AGENTS entry paths were updated; existing detailed docs and code remain preserved. Source files, tests, entry HTML and package.json remain unchanged.
- **Design sources:** real DOCX copies are exposed as docs/Problem_Statement.docx, docs/Information_Architecture.docx and docs/Causal_Diagrams.docx. No original Causal_Diagrams.pdf exists in the retained materials, so no PDF substitute was invented. Original filenames/hashes remain in docs/original-documents.
- **Current browser evidence:** on 2026-11-07 normal navigation reached Home, Study, Exercise, Progress and Personal Center and saved actual screenshots. The console error log was empty. These are current navigation/screenshot checks, not a complete re-run of all A/B/C branches or participant sessions. Historical detailed walkthrough evidence remains unchanged.
- **Lo-fi V2:** not started; wait for actual classroom findings and group/course decisions. Stage entry is prototypes/lo-fi-v2/README.md.
- **Hi-fi:** not started; later authorized visual/interaction refinement. Stage entry is prototypes/hi-fi/README.md.
- **Future version control:** after a separately authorized GitHub/Git setup, use reviewed commits and tags such as lofi-v1 and lofi-v2 to preserve stages. No repository, tag, remote upload or deployment was performed here.

The latest organization install/test/build and extracted-package results are in [prototypes/lo-fi-v1/package-verification.md](prototypes/lo-fi-v1/package-verification.md). Existing known issues K01–K06 are retained; no UI, flow or feature fix was included in this organization task. Classroom results remain Not Yet Tested in [feedback.md](prototypes/lo-fi-v1/feedback.md).


## GitHub publication preparation — 2026-11-07

The current user explicitly authorized source/configuration upload to the existing `zhongguohe/Lo-fi-prototype-v1` repository. This supersedes earlier maintenance-only restrictions for this task. The signed-in collaborator Songzbin1 can upload files but cannot manage repository options. The user chose to upload code and configuration first and wait for owner activation of Pages. No new repository, credentials or tag should be created.

Deployment changes are limited to vite.config.js, production HashRouter selection in main.jsx, and a test/build/deploy workflow. No page design, intervention, activity logic or reward rules change. A pre-publication V1 ZIP is preserved locally in outputs/archive.

- Local repository-prefixed production build: passed; 15 tests passed.
- Plain static-server browser preflight: Setup → Home, Study, Exercise, Progress, Personal Center worked at /Lo-fi-prototype-v1/. Refreshing the nested Personal Center hash route restored the correct page. Further checks are recorded in prototypes/lo-fi-v1/github-publication.md.
- Remote upload and Pages deployment status must be recorded after execution. **Online demo: Implemented but Unverified, pending owner Pages enablement and successful deployment.** Expected URL alone is not evidence that the site works.
- Existing V1 known issues and physical-device/accessibility limits remain. Local preflight and source upload are not participant tests.
