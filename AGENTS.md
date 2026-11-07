# SI684 project instructions

## Project context

This is the SI/HBHE 684 group health technology design project, **Helping University Students Move More During and Beyond Study Time**. Current work is a mobile React Lo-fi V1 for classroom usability testing. Core design sources are linked from `docs/project-overview.md`. Do not depend on previous chat memory.

## Required reading

At the beginning of a task:

1. Read `README.md`.
2. Read `PROJECT_STATUS.md`, especially known issues and verification limits.
3. Read `docs/design-decisions.md`.
4. Read `docs/information-architecture.md` and `docs/user-flows.md` when relevant.
5. Read the relevant `prototypes/lo-fi-v1/`, `prototypes/lo-fi-v2/`, or `prototypes/hi-fi/` README and stage artifacts. Detailed older notes remain under docs; for V1 operation, use `docs/lo-fi-v1/prototype-guide.md`. Inspect the existing React code before changing it.

Explicit current user instructions control authorized task scope. Preserve source documents as historical evidence; record discrepancies rather than silently rewriting research or assuming all draft suggestions are approved.

## Development rules

- Preserve confirmed decisions, the target population (students aged 18+), both target behaviors, and the three named intervention components.
- Do not add a new core intervention, remove existing functions, or change Lo-fi into Hi-fi without an explicit group/user request. Label unconfirmed proposals as pending group confirmation.
- Keep study breaks and moderate planned exercise statistics separate. Plans, reschedules, skips, reminder choices, and opening the app earn no activity credit.
- Save activity credit only after confirmation or explicit manual-record save. Replace records by ID when edited; do not add their contribution twice.
- A missed day never removes saved activity or harms the pet. Pet visibility does not affect records or ordinary progress.
- Reuse existing components, shared state, and pure model functions before adding new architecture. `App.jsx` currently contains the pages and Context; a large refactor is not required to make routine changes.
- Keep user-facing app text, including validation errors, in American English. Use the shared `Form` / `Field` components; do not reintroduce localized native browser validation bubbles.
- Preserve the 390 × 844 logical mobile canvas, proportional desktop preview, and actual-phone responsive layout unless the task changes this requirement.
- Timers, device connection, and growth parameters are prototype mechanisms, not validated health measurements or recommendations.

## Documentation rules

After important work:

1. Update `PROJECT_STATUS.md` with actual implementation, verification, issues, and next steps.
2. Append significant changes to `CHANGELOG.md`; never replace prior entries. Use known dates; label reconstructed dates as such.
3. Update `docs/design-decisions.md` when a decision or assumption changes, including its evidence/source.
4. Record new problems and limitations. Keep proposals separate from committed next work. For stage iterations, also update the corresponding prototypes directory; preserve earlier work rather than deleting or overwriting it.
5. Preserve originals and append classroom findings only when actual observations exist. Do not invent participant comments or research results.

## Verification rules

- Run checks appropriate to the change. For code changes use `npm test` and `npm run build`; after packaging, verify an extracted copy can install/build/test.
- Use the exact status labels in `PROJECT_STATUS.md`. A requirement or source-code inspection alone is not proof of successful browser behavior.
- Record dates, methods, and coverage. Distinguish previous developer walkthroughs, current automated checks, and real participant testing.
- Do not claim a file was read or a test passed without evidence. Mark anything untested as unverified.
- Do not package dependencies, builds, scratch files, credentials, environment secrets, or participant data. The package script uses an allowlist including prototypes. Preserve the complete V1 ZIP before editing shared src for later stages; future Git tags are a separate authorized action.
- No repository creation, remote upload, git push, or public deployment is implied by maintenance or packaging. These need a separate explicit task.
