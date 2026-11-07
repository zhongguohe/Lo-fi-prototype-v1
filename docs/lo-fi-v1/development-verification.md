# Verification record

Verified locally with Vite and the Codex in-app browser. These checks use disposable prototype sample data, not user activity data.

## Automated data tests

11 Node test cases pass. The tests cover sample statistics; light backups; duplicate save and edited record contributions; plan / pet actions without credit; study versus reminder pause; delayed reminders; notifications off; active timer pause; Monday-based weeks; next-week goals; plan status on confirmation; and an empty / next-day dataset.

## Browser walkthrough results

- P01–P15 were accessed through normal interface navigation.
- Initial Setup saved preferences and opened Home. Refresh retained saved settings and records.
- Study Settings Save applied the new interval; Cancel retained the original after the default form-button behavior was fixed.
- Started study, displayed reminder, selected a 10-minute delay, and advanced two 5-minute steps to see the reminder again.
- Confirmed Pause Reminders, verified study time continued, resumed reminders, and checked the distinct Study Paused display.
- Started a break, paused and resumed activity, ended early, corrected actual duration to 3 minutes, and saved. Feedback showed +3 points. Refresh kept saved feedback; Continue Studying restarted the 45-minute reminder interval.
- Created a Cycling plan with a stretching backup, changed its date and time, saved Rescheduled, and found it again in the exercise list. A date/time input update issue was fixed and the new schedule was verified visibly.
- Used the light stretching backup, confirmed 10 minutes, saved, and returned to a Completed plan. Total points increased to 36 while moderate exercise remained 20 minutes.
- Confirmed Skip on another plan; progress remained unchanged.
- Filtered history to planned exercise, edited a sample exercise from 20 to 6 minutes, and saved. Progress showed 6 moderate exercise minutes and 22 total points, with no duplicate record credit.
- Opened Virtual Pet, disabled it, returned to Progress, and verified ordinary totals remained. Personal Center reflected the same disabled preference.
- Canceled a nickname edit and reopened the dialog to verify Student remained. Saved Alex and verified it on Home.
- Saved a 90-minute goal for next week. Exercise showed the current 60-minute target plus the scheduled 90-minute goal starting Monday.

Additional final checks are appended below after execution. Browser timer controls are simulations; these checks do not validate real notifications, physical activity detection, or background timing.

## Final checks

- Re-enabled the pet from Personal Center and verified the existing 22 points were shown again.
- Previewed the next day: Home showed no recorded activity that day while retaining 22 total points.
- Reset disposable test data to an empty start, completed setup, and verified empty Home, Progress, and History entries. Added a manual 3-minute light study break and verified 1 break, 3 points, and 0 moderate exercise minutes.
- Reloaded sample data, canceled a plan duration edit (saved duration remained 20), then saved a 25-minute edit and verified Home showed 25 minutes.
- Started and discarded an original planned exercise. Its plan returned to Planned with no additional record.
- Read-only DOM measurement confirmed a 390 × 844 desktop phone frame, no horizontal overflow in main content, and navigation within the frame. The grayscale Home layout was visually inspected.
- Final browser error log was empty. Physical phone browsers and real background timing were not tested.
- `npm install` completed successfully. `npm test`: 11 passed, 0 failed. `npm run build` completed successfully. React Router's `use client` directives produced nonblocking Vite warnings.
- Local server returned HTTP 200. No public deployment was created.


## Follow-up fixes for sizing and English validation

- Preserved the logical 390 × 844 canvas and added proportional fitting for short desktop preview windows. At a 1280 × 720 viewport, the complete phone fits at 77%; the document height is 720, without outer vertical overflow. Mobile CSS still uses screen width and available viewport height.
- Replaced every form with the shared Form component. Native browser validation bubbles are disabled with noValidate, while required, whitespace, number, range, step, and format checks generate English inline messages. Invalid fields receive focus and accessible error descriptions.
- Verified an unselected pet preference shows “Please choose an option.”; an interval of 0 shows “Enter a value of 1 or more.”; an empty nickname dialog shows “Please fill out this field.” No localized browser bubble appeared. Valid setup still saved, and Cancel kept profile data intact.
- Increased form control font size to 16px to avoid automatic focus zoom in mobile Safari.
- Added four validation tests: final suite has 15 passing tests. Browser console error log remains empty.
