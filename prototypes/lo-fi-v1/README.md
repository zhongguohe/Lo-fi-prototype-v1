# Lo-fi V1 prototype archive

**Stage:** Lo-fi Prototype V1 — preparation for classroom testing.  
**Code:** the single current React application is in [../../src/](../../src/). This directory contains stage records, screenshots and feedback, not another React project.

## Design goal and implemented pages

Help students aged 18+ fit short movement breaks into study and follow through on planned exercise outside study. Keep these behaviors separate; use a simple English grayscale mobile wireframe with a 390 × 844 logical canvas.

P01 Initial Setup; P02 Home; P03 Study Settings; P04 Study Session; P05 Activity Session; P06 Activity Confirmation; P07 Exercise Plans; P08 Plan Editor; P09 Backup Setup; P10 Plan Details; P11 Progress Overview; P12 Activity History; P13 Record Details/Edit; P14 Virtual Pet; P15 Personal Center. Exact routes and shared-component modes are in the [IA](../../docs/information-architecture.md).

## Three flows and main interactions

- **A — Study Break:** settings → study → reminder → Start Break / Remind Later / Pause Reminders → activity → actual confirmation → saved feedback → Continue Studying. Study pause and reminder pause have different timer behavior.
- **B — Exercise Planning:** plan → prepared backup → details → original activity, backup, reschedule or skip → actual confirmation → updated plan and progress. Creating/changing/skipping a plan earns nothing.
- **C — Progress & Virtual Pet:** separate statistics → history/detail → edit record → recalculated totals → optional pet off/on without deleting history.

Profile/goal dialogs, notification and pet preferences, manual activity entry, Save/Cancel/Back, early ending/discard and local sample/empty/next-day controls are implemented. See [current status](../../PROJECT_STATUS.md) for evidence and limitations rather than assuming every possible path is verified.

## How to view

From the project root, install Node.js/npm, run `npm install`, then `npm run dev`, and open the printed Local URL. Keep the terminal running. Directly double-clicking index.html does not run the React application. A localhost link only reaches the viewer's own computer; it is not a shared hosted site.

## Actual screenshots

Captured on 2026-11-07 from the running local app through normal navigation, at a 1280 × 720 browser viewport. The existing phone design scales to fit at about 77%. These are viewport screenshots, so longer pages intentionally continue inside the phone's scrollable content. They are not full-page composites or generated mockups.

| View | Actual screenshot |
| --- | --- |
| Home | [home.png](screenshots/home.png) |
| Study | [study.png](screenshots/study.png) |
| Exercise | [exercise.png](screenshots/exercise.png) |
| Progress | [progress.png](screenshots/progress.png) |
| Personal Center | [personal-center.png](screenshots/personal-center.png) |

The screenshots preserve the existing local developer sample state: Student profile, 23 total points, one 3-minute study break and 20 moderate exercise minutes recorded on November 6, and a pending plan previously edited to 25 minutes. November 7 has no new record. This differs from a freshly reset seed's 20-minute pending plan. No participant data or fake feedback was inserted. Navigation screenshots do not reverify all flow branches.

## Simulation, limits and test readiness

Timers/fast-forward, in-app reminders, device toggle and pet line icon are demonstrations. All activity is self-reported and confirmed before credit; one minute/point and thirty points/stage are temporary demo rules. No backend, account, true push, sensing, sync or calendar connection exists.

Known limits remain documented: repeated future-goal scheduling can revert the current goal, unsaved plan drafts can be lost, initial intensity uses a name heuristic, saved-feedback navigation has edge cases, and local storage has limited schema/concurrency handling. Physical phones, full accessibility and background timing are not verified.

Earlier developer walkthroughs covered all 15 entrances and key A/B/C branches; this organization pass rechecks five main navigation views and captures screenshots. Existing model/English-validation tests and build are rerun; exact results are in [package verification](package-verification.md). Classroom testing remains **Not Yet Tested**. Use [feedback.md](feedback.md) or the [detailed blank template](../../docs/lo-fi-v1/testing-notes.md).

## Version preservation

The complete `SI684-Health-Technology-LoFiV1.zip` is a restorable source snapshot, including code, lockfile, design docs, stage records and screenshots. Preserve it before later editing src for V2/Hi-fi. An earlier pre-prototypes ZIP remains locally under outputs/archive. Future Git tags such as `lofi-v1` and `lofi-v2` can preserve stages after the group sets up Git; no tags/repository/push were created here.
