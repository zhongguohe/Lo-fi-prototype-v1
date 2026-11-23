# User flows for the current prototype

These are implementation walkthroughs. They are not evidence from classroom participants. See [PROJECT_STATUS.md](../PROJECT_STATUS.md) for verification levels.

## Flow A — Study Break

**Entry point:** Home → Start Studying, or Study tab. Initial Setup has already saved preferences.

**Main path:** P04 → optional P03 Break Settings → Save → Start Studying → in-app Break Reminder → Start Break → P05 → Start Activity → Finish Activity → P06 review actual type/date/duration/intensity/source/status → optional Edit → Save Activity → growth feedback → Continue Studying → P04 with a new reminder interval. The elapsed study total continues until the session is ended.

**Alternative paths:**

- Settings Cancel discards unsaved changes. Saving settings resets the next reminder interval to the new saved interval.
- Remind Later → choose 5 or 10 Minutes → P04 Reminder Delayed, with remaining countdown and next reminder time → reminder returns at zero. This does not reset study elapsed time or create activity credit.
- Pause Reminders → confirm → P04 Reminders Paused. Study elapsed time continues. Resume Reminders schedules a fresh saved interval.
- Pause Study freezes study elapsed time and reminder countdown. Resume Study continues both, subject to reminder/global notification settings.
- Global in-app reminders off keeps study time running. Turning them on schedules a future interval; it does not replay missed notifications.
- P05 Pause / Resume affects the activity timer. End Early opens a dialog: save actual activity for review, discard/no activity, or Cancel.
- P06 Back to Activity resumes the paused draft; Discard removes the unsaved draft and returns to a paused study session. Saved feedback also offers End Study Session.
- End Study stops reminders and returns Home while preserving confirmed records.

**Completion state:** one saved self-reported activity record, corresponding growth contribution, and either a resumed study round or ended session.

**Important rules:** no automatic credit on timer completion or reminder click; user confirms actual movement. The study-break category stays distinct from moderate exercise. Prototype time controls are labeled simulations and never themselves save records. A short recorded duration is rounded to one decimal minute with a 0.1-minute minimum suggestion; confirmation can correct it.

## Flow B — Exercise Planning

**Entry point:** Exercise → Create Exercise Plan, or Home → next plan / create plan.

**Main path:** P07 → P08 choose activity/date/time/duration → Next → P09 possible barrier (optional), backup activity/duration → Save Plan → P10 Planned → Start Activity → P05 Start / Pause / Resume / Finish → P06 confirm actual activity → Save Activity → feedback → Done → P10 updated status and actual record summary.

**Alternative paths:**

- P08 Cancel creates no plan; P09 Back retains its draft via the explicit Back button; Cancel abandons it. The unsaved plan draft is memory-only and is lost on refresh.
- Edit Plan reuses P08 and exposes backup fields; Save Changes updates the shared plan and Home; Cancel keeps saved values.
- I Can't Do This Now → Use Backup → P05 with backup mode and prepared type/duration → same confirmation flow. Light backups earn growth only, not moderate exercise minutes.
- Disruption → Reschedule → new date/time → Save → Rescheduled, still awaiting execution. Exercise lists and Home use the latest schedule. The first original date/time is retained; intermediate reschedules are not a complete audit trail.
- Disruption → Skip → Confirm Skip → Skipped on P10; it stays accessible in the skipped group. No activity or growth is added.
- Starting an exercise marks its plan In Progress. Discard before saving restores the previous plan status. End Early saves the confirmed actual record as Ended Early.

**Completion state:** creating a plan yields only a plan. Rescheduling/skipping yields only a changed plan. Actual completion yields a saved record and status Completed or Ended Early.

**Important rules:** the original plan and actual backup activity are not interchangeable. Confirmation can correct inferred initial intensity. Only saved Moderate records in the exercise category and displayed Monday–Sunday week enter weekly moderate totals. A single active activity is supported at a time. Complete the saved feedback's Done/Continue step before starting a different task; see active-state limitations in PROJECT_STATUS.

## Flow C — Progress and Virtual Pet

**Entry point:** Progress tab, Home → View Progress, or saved activity feedback → View Progress.

**Main path:** P11 separate study and weekly moderate statistics → P12 Activity History → choose record → P13 inspect duration/intensity/date/source/growth → Edit → Save → History → return Progress to see recalculated totals. Then P14 View Virtual Pet → inspect stage/points → toggle off → return Progress with ordinary totals preserved.

**Alternative paths:**

- History filters All / Study Breaks / Planned Exercise and sorts by date; Add Manual Record opens P13 new mode. Explicit Save confirms that self-reported record.
- Edit Cancel restores the saved record. Record identity is preserved on Save, so its old contribution is replaced.
- Pet can be re-enabled on P14 or Personal Center; both use the same preference and preserve cumulative data.
- Device & Data → Prototype data controls → Preview Next Day advances the displayed date only. No new record is created and accumulated points stay. Return to Today's Date reverses the preview offset.
- Reset to Empty Start and Reload Sample Data are explicit prototype-only destructive resets with confirmation; they are not ordinary pet-off behavior.

**Completion state:** corrected record totals or updated display preference; history and ordinary progress remain available.

**Important rules:** 1 actual minute = 1 demonstration growth point; stage = floor(total/30) + 1. Correcting records can change calculated stage; merely missing a day does not. No decoration system or retained-unlock ledger exists. No evidence of health effectiveness follows from points or successful navigation.
