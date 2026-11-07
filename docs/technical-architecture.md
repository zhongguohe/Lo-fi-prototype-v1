# Technical architecture

## Organization

The application intentionally retains its existing structure. `src/App.jsx` contains route definitions, Context provider, all 15 page functions, common wireframe primitives, and the shared modal renderer. `src/Form.jsx` provides Form and Field with a validation-error context; `src/validation.js` maps validity flags to English messages without reading localized browser strings. `src/model.js` contains pure date, record, timer, goal, stats, and sample-state helpers. `src/style.css` holds all grayscale/responsive styles. `main.jsx` mounts StrictMode and BrowserRouter.

This handoff adds documentation and packaging support, not a page/component refactor. Splitting pages can be considered when a future task justifies it; preserve behavior and tests if that happens.

## Data contract

| State | Fields / purpose |
| --- | --- |
| prefs | interval, duration, activity, goal, pet, notifications, nickname, avatar, device, scheduledGoal |
| study | status, elapsed seconds, reminder remaining seconds, reminders on/delayed/paused |
| active | UUID, category, optional planId, activity, planned duration, actual timer, intensity, date, source, completion, status and backup flag |
| records | Confirmed self-reported activities; duration in minutes, category and intensity are separate; id identifies replacement on correction |
| plans | Original activity, date/time, duration, barrier, backup type/duration and status; reschedule can retain first original date/time |
| dayOffset | Prototype displayed-date offset; does not add records |
| planDraft / modal / notice | Memory-only UI state; not persisted |

localStorage key is `si684-wireframe-v1`; persisted state has version 1. `readState` falls back to default samples on missing/unparseable input but is not a full schema validator. JSON export/import, cross-tab reconciliation and migration are absent.

`saveRecord` replaces by ID, then updates any linked plan to the record's completion status. `stats` derives point totals each time; UI save paths enforce confirmation. The helper itself is not a security or server validation layer. Separate manual entries receive separate UUIDs and are not semantically deduplicated.

Study time and reminder time are distinct. Study Paused freezes both. Reminders Paused/global-off freezes only reminder countdown. Activity time increments only in running state. Timers are interval demonstrations and do not reconcile real time after background suspension.

## Tooling and portability

Use Node.js 20.19+ or a supported newer release satisfying Vite's engine range, plus npm. Use the checked-in lockfile with `npm ci` for a clean reproducible install. The resolved direct dependency versions are appended below from the actual lockfile.

No `.env` file, API key, custom Vite configuration, external assets directory, or backend is needed. React and Lucide are npm dependencies, not vendored in the source ZIP. `npm install` needs registry access; a ZIP with source only is not an offline dependency bundle.

BrowserRouter needs a history fallback if later hosted. Do not add hosting configuration or publish as part of this handoff. `crypto.randomUUID` and modern viewport CSS assume a modern browser; physical-phone and non-localhost LAN behavior remain unverified.

## Maintenance residue

An unused `pnpm-workspace.yaml` containing an unresolved esbuild build-policy placeholder came from the initial tooling setup. The application uses npm and package-lock.json. That unused file was moved unchanged into local `work/handoff-audit/` and excluded from the distributable package. No source code or required configuration was removed.

## Resolved direct dependency versions

| Package | Version in lockfile |
| --- | --- |
| react | 19.3.1 |
| react-dom | 19.3.1 |
| vite | 7.3.7 |
| react-router-dom | 7.18.5 |
| lucide-react | 0.468.0 |

Validation runtime for the 2026-11-07 handoff: Node.js v24.22.1 and npm 12.2.2. See the handoff verification record for extraction and install results.
