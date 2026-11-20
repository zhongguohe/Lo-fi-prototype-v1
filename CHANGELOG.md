# Changelog

## 2026-11-20 — New plan opening time

- New exercise plans initialize to today's displayed date and the local hour/minute when the editor opens, instead of 17:30. The value stays fixed until edited; returning to a draft preserves it. Existing save-time checks reject past schedules.
- Verification: 22 tests passed; production build passed. This small default-value update has not received a new browser walkthrough.

Append significant updates; preserve earlier entries. Dates below use America/Detroit. Initial feature history is reconstructed from the retained source files and developer verification notes, not Git commits or group meeting records.

## 2026-11-07 — GitHub Pages upload preparation

- User authorized code/configuration upload to the existing group repository, with Pages activation deferred to the owner because the collaborator cannot manage repository options.
- Added repository-base Vite configuration, production hash routing, and a test/build/Pages workflow. Preserved existing UI and activity/growth logic.
- Preserved the remote initial README in docs/original-documents. Updated publication instructions and explicit pending/verified boundaries.
- Local repository-path build, existing tests and plain static-host route checks were performed. Remote results are recorded separately after actual upload; no unverified public URL is claimed.

## 2026-11-07 — Stage-folder organization and screenshot snapshot

- Added prototypes/lo-fi-v1 with stage README, five actual current browser screenshots and blank feedback template; added V2/Hi-fi stage entries without implementing either stage.
- Simplified the group README and updated AGENTS/PROJECT_STATUS to use prototypes as the stage entry while preserving existing detailed docs, original source files and known issues.
- Added short-name DOCX entry copies of the three actual design files. The causal source remains DOCX because no original PDF was available; no blank or invented PDF was created.
- Included prototypes in the source ZIP allowlist. Preserved the previous complete ZIP locally and regenerated the full V1 snapshot for restoring the shared src later.
- Rechecked install/build/existing tests and extracted-package integrity; results live in prototypes/lo-fi-v1/package-verification.md. No feature/visual/source-code change, GitHub action or deployment occurred.

## 2026-11-07 — Collaboration handoff and archive preparation

- Preserved the React application and tests without a behavior/UI refactor.
- Added AGENTS, project status, project overview, current IA/flows, decision register, technical architecture, source provenance, V1 archive and participant-testing template, and future V2/Hi-fi placeholders.
- Preserved the previous detailed README and developer checks; copied three previously supplied original DOCX files unchanged into the archive and retained paragraph-text extracts.
- Distinguished explicit brief decisions, demo assumptions, code/source discrepancies, historical browser checks, automated checks, and untested participant/device behavior.
- Recorded the effective-goal replacement issue and other source-observed limits; did not expand scope to fix or redesign them.
- Expanded .gitignore and added an allowlisted source ZIP packager with a SHA-256 file manifest. The unused pnpm setup placeholder was retained locally under work and excluded from the package.
- Installation, build, tests and extracted-package evidence are recorded in docs/lo-fi-v1/handoff-verification.md. No GitHub creation, push, upload, or deployment was performed.

## Lo-fi V1 initial implementation and follow-up fixes — files recorded 2026-11-06

Exact per-feature implementation times were not separately versioned. This entry reconstructs the initial baseline from local files and developer notes.

- React + Vite + JavaScript + CSS, React Router DOM and Lucide React; shared Context/state and browser localStorage.
- Fifteen primary interfaces, Home/Study/Exercise/Progress navigation, header Personal Center and shared dialogs.
- Study reminder/delay/pause/activity confirmation flow; plan/backup/reschedule/skip/actual exercise flow; history/correction/progress/optional pet flow.
- Shared sample records, one pending plan and prepared backup; separate break and weekly moderate exercise totals; demonstration growth and no missed-day penalty.
- Prototype timer, device and data controls; no backend, account, push delivery, sensors, sync, or production tracking.
- Follow-up sizing and English-error fixes: a logical 390 × 844 canvas scales for short desktop previews; shared Form/Field validation replaces localized native error bubbles. Sixteen-pixel form inputs reduce mobile focus-zoom risk, though physical phones remain untested.
- Developer walkthroughs recorded all page entrances and key flow branches. Automated suite reached 15 model/validation tests. Classroom participant results and a completed walkthrough video were not supplied.

### 2026-11-07 — Group repository upload verified

Uploaded 61 reviewed project files to the existing zhongguohe/Lo-fi-prototype-v1 repository. Fetched the remote tree and verified every file against the upload set. A fresh remote-source copy passed dependency installation, all 15 tests and production build. GitHub Actions build also succeeded; deployment awaits owner Pages activation (configure-pages returned Not Found). Public demo remains unverified. No UI or activity logic was changed in this publication follow-up.

## 2026-11-20 — User-flow baseline for team walkthroughs (America/New_York)

- Added a Chinese source-grounded V1 baseline with 14 flow diagrams (F00–F13), stable node IDs, task cases, field constraints, current-state defects and audit mappings.
- Added a navigable diagram document generated from the Markdown source, plus regeneration tooling and stage entry links.
- Included a change-log/PR template connecting each future change to its task, before/after behavior, evidence and verification. No product behavior changes, participant findings, commit, push or deployment were performed by this documentation task.
- Clarified the team workflow at the user's request: the project iterates from the copied V1 toward the V2 assignment; code review belongs to the responsible teammates' agents. Added a plain-language 12-task trial guide, simple issue-report/update examples, and marked detailed engineering checklists as optional references.
- Revised the Chinese collaboration guide to use concise professional language and standard task/steps/expected-result terminology. Added separate English agent review notes; product behavior remains unchanged.

## 2026-11-20 — V2 iteration 1: interaction and data repairs

- A01 / F05-12: leaving saved feedback releases the completed task; an on-break study session becomes paused, and subsequent activities can start without duplicating earlier records. Unsaved tasks retain their protection.
- A02 / F05/F08: completed-activity dates cannot be in the future; shared field and model validation protect saves. Legacy future records remain in history but do not contribute to current totals.
- A03 / F06-09: backup text is held in the existing shared draft, so top and bottom Back preserve inputs consistently. Refresh still loses unsaved drafts.
- A05 / F10-06: scheduling a new future weekly goal retains an already-effective goal as the current value.
- A06 / F07-11: plan creation/editing and rescheduling reject past dates/times; passing time on the backup step is also checked before plan creation.
- A07 / F09-03: pet progress distinguishes points earned this stage from remaining points. Grayscale layout and reward calculations remain unchanged; version labels identify V2.
- Preserved the V1 source ZIP before code changes. Added focused regressions; 21 tests and build passed. Targeted browser evidence is documented separately from participant findings.
- Core interaction proposals (intensity, startup labels, activity-first feedback) await user approval. No commit, push, merge or deployment performed.

### 2026-11-20 — Approved interaction updates

- User explicitly approved all three interaction proposals in this chat; no additional group vote inferred.
- A04 / F05-02/03: new planned-exercise activity requires an actual Light/Moderate choice directly on confirmation; manual exercise entry also clears the default and requires a choice. Removed name-based inference for new exercise tasks. Existing saved records are not silently reclassified.
- F01-07 / F03-05 / F07-07: changed preparation entry labels to Open Study Session / Prepare Break / Prepare Activity, retaining explicit Start Activity timing.
- F05-07: saved feedback prioritizes the activity name, actual duration and category; light exercise explains its separate contribution; pet-off feedback omits the growth stage. Reward rules remain unchanged.
- 22 tests and build passed; browser checked both intensity choices, missing-choice errors, manual-entry validation, and pet-off feedback. Actual participant testing and walkthrough video remain outstanding.
