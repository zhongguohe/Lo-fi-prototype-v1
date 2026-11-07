# Changelog

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
