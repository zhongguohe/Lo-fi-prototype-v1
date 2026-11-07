# SI684 Move More — Low-Fidelity Prototype V1

A complete React mobile web wireframe for **Helping University Students Move More During and Beyond Study Time**. It supports adjustable study breaks, exercise plans with backups, and separate progress feedback with an optional virtual pet. The interface is in American English and uses grayscale wireframe components.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://localhost:5173). The design canvas is 390 × 844 CSS pixels. Short desktop windows scale the whole preview proportionally so the entire phone and bottom navigation remain visible. The caption shows the preview scale; sufficiently tall windows use 100%. App content scrolls inside the phone. On phones up to 450 pixels wide, the app fits the screen and uses the browser's available height.

```bash
npm test
npm run build
npm run preview
```

No backend, account, API key, deployment, or external service is required.

## Source documents and priority

The three supplied DOCX files were read through their document XML before implementation. Full text extracts are retained in `docs/`:

- `information-architecture.md`
- `problem-statement.md`
- `causal-diagrams.md`

The user's development prompt takes precedence over source-document instructions. In particular, this implementation is mobile web only, with no separate desktop Study interface. Document references to device integration, causal claims, or future features do not expand this prototype's scope. Embedded diagrams were not converted into Markdown images; their accompanying explanations are retained.

## Pages

| ID | Page | Route / entry |
| --- | --- | --- |
| P01 | Initial Setup | `/setup`, first visit |
| P02 | Home | `/` |
| P03 | Study Settings | `/study/settings` |
| P04 | Study Session | `/study` |
| P05 | Activity Session | `/activity`, after selecting a break or exercise |
| P06 | Activity Confirmation | `/confirm`, after finishing an activity |
| P07 | Exercise Plans | `/exercise` |
| P08 | Plan Editor | `/plan/new`, `/plan/:id/edit` |
| P09 | Backup Setup | `/backup`, after Next in a new plan |
| P10 | Plan Details | `/plan/:id` |
| P11 | Progress Overview | `/progress` |
| P12 | Activity History | `/history` |
| P13 | Record Details / Edit | `/record/:id`, `/record/new` for manual records |
| P14 | Virtual Pet | `/pet` |
| P15 | Personal Center | `/personal`, header avatar |

The bottom navigation has Home, Study, Exercise, and Progress. Activity and confirmation screens hide it to keep the current task focused. Headers and explicit Back / Cancel controls provide exits. Profile, weekly goal, reminder choices, rescheduling, skipping, early ending, device information, and reset use dialogs.

## Flow A — Study Break

1. Open Study → Break Settings. Save or cancel changes.
2. Start Studying. Pause Study freezes both the study timer and reminder countdown; Resume Study continues them.
3. Expand **Prototype time controls** → **Simulate Next Reminder** to avoid a real 45-minute wait.
4. Start Break → Start Activity. Pause / resume if needed. Advance activity time with the labeled prototype control, then Finish Activity or End Early.
5. Review Activity Confirmation. Edit actual activity, date, minutes, or intensity, then Save Activity. Only saving adds the record and points.
6. Review growth feedback → Continue Studying to begin the next interval, or end the study session.

Reminder alternatives:

- Remind Later → 5 or 10 Minutes keeps the session and displays the delayed countdown and next reminder time. Advance 5 Minutes to demonstrate the reminder appearing again.
- Pause Reminders → confirm keeps study time running and stops reminders for that session. Resume Reminders schedules a fresh interval.
- Personal Center's global notification switch controls in-app reminders independently of study pause. No old reminder is replayed when notifications are re-enabled.

## Flow B — Exercise Planning

1. Exercise → Create Exercise Plan → activity, date, time, duration → Next.
2. Set a possible barrier (optional), backup activity, and backup duration → Save Plan.
3. Plan Details → Start Activity, or I Can't Do This Now:
   - Use Backup starts the shared activity flow with the backup's actual activity and duration.
   - Reschedule saves a new date/time and marks the plan Rescheduled. Home and Exercise read the updated plan.
   - Skip requires confirmation and retains the plan in skipped history without adding activity or points.
4. Start, finish / end early, and confirm actual activity. Done returns to Plan Details with the updated status. Discarding an unsaved activity restores its previous plan status.

An in-progress plan can be resumed through its details. A saved activity cannot be repeatedly completed for extra points.

## Flow C — Progress and Virtual Pet

1. Progress → Activity History → select a record → Edit.
2. Correct actual duration, date, activity, or intensity → Save. The same record is replaced and all totals are recalculated.
3. Return to Progress → Virtual Pet. Toggle it off and back on; records and accumulated points remain.
4. Personal Center uses the same pet preference and includes the shared history shortcut.

## Data rules

- State is shared in React Context and persisted under `si684-wireframe-v1` in localStorage.
- Sample data includes a confirmed 3-minute light study break, a 20-minute moderate exercise record, and a planned brisk walk with a 10-minute stretching backup.
- Only confirmed saved records contribute: 1 actual minute = 1 growth point. Fractional minutes are supported to one decimal place.
- Stage = floor(total points / 30) + 1. Correcting records recalculates totals and the current stage; a day without activity never subtracts points. No decoration system is implemented.
- Study break count / minutes are all-time totals, while Home's break count is for the displayed day.
- Weekly moderate exercise includes only Moderate records in the Planned Exercise category whose actual date falls in the displayed Monday–Sunday week. Light backups and study breaks do not enter this total.
- Planning, rescheduling, skipping, device preferences, and opening the app earn nothing.
- Pet visibility never changes the data used for ordinary progress.
- Weekly goal changes default to next Monday. Applying to this week explicitly changes the goal line without changing minutes or points. This V1 stores the current goal and one future goal, not a full historical goal ledger.

## Simulated features and limits

- Timers run while this app is open and active; the browser may throttle background tabs. No background notifications or exact wall-clock tracking are promised.
- Prototype time controls are visibly labeled and are inside the relevant screens, not in a separate demo dashboard.
- Activity is self-reported. Timer values suggest a duration and never verify physical movement. Confirmation can correct the value.
- Device connection is an explanatory local toggle only. No sensor import, real permission request, synchronization, smartwatch, calendar, AI recommendation, or health-device API is implemented.
- The pet is a simple line icon; no animation, artwork, or decoration system is included.
- Saving is local to one browser. There is no cross-device sync or multi-tab coordination.

## Reset / empty / next-day testing

Personal Center → Device & Data → expand **Prototype data controls**:

- **Reset to Empty Start** → Confirm Reset clears local settings and records, then opens Initial Setup with no sample records or plans.
- **Reload Sample Data** → Confirm Reset returns to the initial example dataset and setup.
- **Preview Next Day · No New Activity** advances the displayed date without adding or deleting records. Home shows no records today and retains cumulative progress. Use **Return to Today's Date** afterward.

Alternatively, remove the `si684-wireframe-v1` localStorage key in browser developer tools and reload. A missing key loads the default sample dataset.

## Validation

`npm test` covers separation of activity categories / intensity, idempotent records, corrections, stage thresholds, timer pause behavior, delayed reminders, global notification behavior, actual-date weekly boundaries, future goals, plan completion, and no-activity days. Browser walkthrough checks and their results are recorded in `docs/verification.md`.

## Project structure

- `src/App.jsx`: shared state, layout, all pages, dialogs, and navigation
- `src/Form.jsx` / `src/validation.js`: shared form validation with English inline errors and no localized browser validation bubbles
- `src/model.js`: date helpers, sample data, timer updates, records, and derived totals
- `src/style.css`: grayscale mobile wireframe layout
- `tests/model.test.js`: deterministic data and timer tests
