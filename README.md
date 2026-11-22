# Move More — Prototype 2 · Color Edition

Updated November 22, 2026. User-authorized colorful iteration of the existing React app. The shared `src/` is now Prototype 2. Earlier V1 documents are historical evidence, not the current operating guide. The user authorized updating the existing GitHub repository on November 22, 2026. Source and offline preview are now committed on main; the existing Pages workflow handles publication. Check Actions for the latest deployment status.

## Open this version

**Quickest:** double-click `MoveMore-Prototype2.html` in this source package. It contains the production JavaScript, styles, icons and pet artwork, works offline, and requires no npm installation. Browser local-file storage behavior varies; use the local server for repeatable testing. Local file records and hosted records are separate.

**Development:** use a supported Node version (20.19+ or 22.12+), then `npm ci` and `npm run dev`. Open the Local URL printed in Terminal and leave Terminal running. If a restricted environment reports `uv_interface_addresses`, use `npm run dev -- --host 127.0.0.1`.

`npm test` runs 19 model/validation tests. `npm run build` creates the production build. The included HTML preview is generated from that build.

## Changes

- Purple primary actions, mint study cards, peach exercise cards, cream pet rewards; readable dark text, visible focus and mobile layout retained.
- Three source-native vector pet forms: Little explorer, Growing companion, Blooming buddy. Higher stages keep the third form. Home preview and saved-activity feedback honor pet visibility.
- Saved-feedback navigation releases old activity state; active/pending activities stay protected.
- New-plan and backup edits use one draft persisted in sessionStorage within the current tab, including refresh. Top and in-page Back preserve edits; Cancel/Save clear the draft.
- Activity intensity is explicit in plan, backup and activity screens. Legacy plans retain an initial fallback and can be corrected.
- Finish & Review prompts for actual minutes; shorter activity saves as Ended Early. Explicit End Early remains available.
- Disruption flow offers a shorter activity up to five minutes, prepared backup, reschedule or skip. Selection alone earns nothing.
- Progress shows both movement categories for the displayed Monday–Sunday week; growth remains cumulative. History retains all dates.
- Effective goal is preserved when scheduling another future goal. There is still only one future goal slot.
- Demo records are visibly labeled on Home; Home's study entry is now Open Study Session.

## Walkthrough

1. Setup → choose Yes, show my pet → Save & Continue.
2. Home → Open Study Session → Start Studying.
3. Prototype time controls → Simulate Next Reminder → Start Break → Start Activity.
4. Advance Activity 1 Minute as needed → Finish & Review → review/edit actual time → Save Activity.
5. View Progress can now be used before starting another activity. Continue Studying resumes study; leaving feedback for Progress pauses study.
6. Exercise → Create Exercise Plan → activity/date/time/minutes/intensity → Next → backup/barrier/intensity → Save Plan.
7. I Can't Do This Now → shorter activity / Use Backup / Reschedule / Skip.
8. Progress → View Activity History → record → Edit → Save. Existing record contribution is replaced.
9. Progress → View Virtual Pet → toggle off/on. Ordinary records and points remain.

## Verification and limits

November 22, 2026: 19 automated tests passed; production build passed. Actual browser screenshot/responsive/click verification of the new version was blocked because both connected and cloud browsers could not reach this workspace's localhost. Component checks, when recorded separately in prototypes/lo-fi-v2/README.md, are DOM emulation, not real-browser evidence. Physical phone, background timing and full accessibility testing remain unverified. No classroom participant results are claimed.

Reminders, device connection and timer controls remain prototypes. Records are self-reported and local; no real push, sensors, account, backend or sync. Pet art is static; there is no animation or permanent unlock ledger.

## Earlier V1 documentation (historical)

# SI684 Health Technology — Lo-fi V1

**Helping University Students Move More During and Beyond Study Time**  
**Course:** SI/HBHE 684 — Prototyping and Evaluation of Consumer Health Technologies

A group design project for undergraduate and graduate students aged 18+ who study for long periods. We explore how to interrupt prolonged sitting with short **Study Breaks**, and how to arrange and complete **Planned Exercise** outside study. These behaviors remain separate in the records and progress statistics.

## Core features and current stage

1. **Adjustable Study-Break Prompts:** settings, study timer, reminder delay/pause/resume, activity confirmation.
2. **Backup Exercise Plans and Rescheduling:** original plan plus backup; use backup, choose a new time or skip; confirm actual movement before credit.
3. **Cumulative Progress Feedback and Optional Virtual Pet:** classified totals, editable history/manual records and optional pet without missed-day punishment.

Current stage: **Lo-fi Prototype V1 — preparation for classroom testing**. Fifteen interfaces connect Home, Study, Exercise, Progress and header-entry Personal Center. No classroom feedback results, V2, or Hi-fi implementation have been created.

## Open the interactive prototype

Install Node.js 20.19+ or a supported newer version compatible with Vite, and npm. In this project's root folder, run:

```bash
npm install
npm run dev
```

Open the Local URL printed by the terminal (usually `http://localhost:5173`) and keep the terminal running. **Double-clicking index.html does not run this React app.** A localhost URL reaches only your own computer; other group members must run their downloaded/cloned copy until the repository owner enables the prepared GitHub Pages deployment.

```bash
npm test
npm run build
npm run preview
```

For a clean checkout, `npm ci` uses the included lockfile. No .env, API key, account or backend is required. Downloads from the npm registry are needed to install dependencies.

## Where to look

| Material | Location |
| --- | --- |
| Current runnable code | [src/](src/) — one shared React/Vite/JavaScript application |
| V1 goals, flows, actual screenshots and blank feedback | [prototypes/lo-fi-v1/](prototypes/lo-fi-v1/README.md) |
| Future V2 | [prototypes/lo-fi-v2/](prototypes/lo-fi-v2/README.md) — waiting for actual feedback |
| Future Hi-fi | [prototypes/hi-fi/](prototypes/hi-fi/README.md) — not started |
| Design sources | [docs/README.md](docs/README.md) — real DOCX files; original causal PDF unavailable |
| Progress / issues / version preservation | [PROJECT_STATUS.md](PROJECT_STATUS.md) |
| New Codex task instructions | [AGENTS.md](AGENTS.md) |
| Detailed IA / flows / decisions | [IA](docs/information-architecture.md), [flows](docs/user-flows.md), [decisions](docs/design-decisions.md) |

## Project structure

```text
SI684-Health-Technology/
├── README.md, AGENTS.md, PROJECT_STATUS.md, CHANGELOG.md
├── docs/                  # Design sources and retained detailed records
│   ├── Problem_Statement.docx
│   ├── Information_Architecture.docx
│   └── Causal_Diagrams.docx  # No original PDF supplied
├── prototypes/
│   ├── lo-fi-v1/          # README, screenshots, feedback, package checks
│   ├── lo-fi-v2/README.md
│   └── hi-fi/README.md
├── src/                   # Existing pages, Context, model, Form, styles, entry
├── tests/
├── scripts/
├── package.json, package-lock.json, index.html
└── .gitignore
```

Vite uses vite.config.js to support a repository-specific deployment base path. No public assets are required. Existing docs stage archives remain available; prototypes is the concise stage/artifact entry and does not duplicate src.

## Limits and preservation

English grayscale mobile wireframe; logical 390 × 844 canvas, proportional desktop preview, responsive phone CSS. Timers, in-app reminders, device toggle, sample data and pet visuals are demonstrations. Records are self-reported and stored only in each browser's localStorage. There is no real push/sensing/sync, login, backend, AI. Pages is prepared but awaits owner setup and verification. Pet-off preserves saved records.

Known issues include effective future-goal replacement, memory-only plan drafts, initial intensity guessing and saved-feedback navigation edges. Physical phones, full accessibility and background timing remain unverified. See PROJECT_STATUS; developer checks do not establish health effectiveness.

The complete `SI684-Health-Technology-LoFiV1.zip` is a restorable V1 source snapshot. Keep it before editing the shared src for later stages. Once Git is set up separately, reviewed commits and tags such as `lofi-v1` / `lofi-v2` can preserve versions; the repository already belongs to the group; this publication task uploads source/configuration without creating a new repository or tag. Pages activation remains an owner action. Group members can clone/download, install and run the same commands above. Uploading source alone will not publish a clickable app.

To regenerate the source-only archive with Python 3: `python3 scripts/package-project.py`. It writes to outputs/, includes docs and prototypes with a hash manifest, and excludes dependencies/builds/Git metadata/work/environment secrets. Keep participant-sensitive raw data outside the distributable project.


## Shared GitHub repository and browser demo

Group repository: [zhongguohe/Lo-fi-prototype-v1](https://github.com/zhongguohe/Lo-fi-prototype-v1). The user authorized uploading the code and Pages configuration, then waiting for the owner to activate Pages. **An online demo has not yet been verified.**

Owner: Settings → Pages → Source → GitHub Actions, then run the Pages workflow on main. The expected address after successful deployment is `https://zhongguohe.github.io/Lo-fi-prototype-v1/`; do not treat it as available before the workflow and a real browser check succeed. Details are in [github-pages.md](docs/github-pages.md).

Production uses hash routes, e.g. `#/progress`, to make refresh work on static hosting. Development keeps the original routes. Each person's local records are independent; opening the website does not synchronize group data.
