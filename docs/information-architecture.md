# Current information architecture

This describes the inspected React implementation, not every future idea in the original documents. The unmodified source IA text is retained in [original-documents/extracts/information-architecture.md](original-documents/extracts/information-architecture.md).

## Navigation

- **Home:** today's break count, weekly moderate exercise, current study status, next pending plan, growth preview, and an unfinished-activity return card.
- **Study:** session timer, reminder state, settings, session controls, and labeled prototype time controls.
- **Exercise:** weekly goal; Planned / In Progress, Rescheduled, Completed / Ended Early, and Skipped groups; plan creation and details.
- **Progress:** all-time study breaks/minutes, current-week moderate planned exercise, goal, growth, history, and pet.
- **Personal Center:** header avatar entry; profile, weekly goal, study preferences, notification and pet preferences, device/data dialog, history shortcut, and help. It is not a fifth navigation tab.

The bottom navigation is hidden during Initial Setup, Activity Session, and Activity Confirmation. The header offers explicit return behavior. No login gates exist. Initial Setup is required when saved setup has not been completed.

## Primary interfaces and actual source mapping

All page components below are functions in `src/App.jsx`. Different modes of the same component are not duplicate pages.

| ID | Interface | Component | Route / entry |
| --- | --- | --- | --- |
| P01 | Initial Setup | Setup | `/setup` |
| P02 | Home | Home | `/` |
| P03 | Study Settings | StudySettings | `/study/settings` |
| P04 | Study Session | Study | `/study` |
| P05 | Activity Session | Activity | `/activity`, break or plan selection |
| P06 | Activity Confirmation | Confirmation | `/confirm`, activity finish / early end |
| P07 | Exercise Plans | Plans | `/exercise` |
| P08 | Plan Editor | PlanEditor | `/plan/new` or `/plan/:id/edit` |
| P09 | Backup Setup | Backup | `/backup`, from P08 Next |
| P10 | Plan Details | PlanDetails | `/plan/:id` |
| P11 | Progress Overview | Progress | `/progress` |
| P12 | Activity History | History | `/history` |
| P13 | Record Details and Edit | Record | `/record/:id`; `/record/new` for manual entry |
| P14 | Virtual Pet | Pet | `/pet` |
| P15 | Personal Center | Personal | `/personal` |

P05/P06 share the study/exercise activity state. P08's creation and editing modes share a component. P13's view, edit, and manual-create modes share a component. Pages needing a plan, draft, or active record show a fallback if the prerequisite is absent; visiting their raw URL is not a substitute for the normal task flow.

## Main relationships

Home → Study → Study Settings / Reminder → Activity → Confirmation → Continue Studying.  
Home / Exercise → Plan Editor → Backup Setup → Plan Details → Activity → Confirmation → Plan Details.  
Progress → History → Record Details / Edit → History; Progress → Pet → Progress.  
Header avatar → Personal Center → shared preferences, Study Settings, History, Pet, and dialogs.

## Dialogs rather than additional pages

`Modal` renders Break Reminder, Remind Later (5/10 minutes), Pause Reminders confirmation, disruption choices, reschedule date/time, Skip confirmation, End Early, discard/leave activity, End Study, Edit Profile, Edit Weekly Goal, Device & Data, Help, and reset/sample-data confirmations. Field errors are English inline messages from `Form`, not browser-native validation bubbles.

## States rather than additional pages

No Data, Studying, Reminder Delayed, Reminders Paused, Study Paused, Taking a Break, Activity Ready / In Progress / Paused, Pending Confirmation / Saved, Plan Rescheduled / Skipped / Completed / Ended Early, Pet Disabled, and next-day no-new-activity are state variations. They do not increase the 15-page count.

## Differences from the source IA

The source proposed computer and phone surfaces; the explicit V1 development brief selected mobile web only. Device suggestions/import and pet decorations remain absent. History is date-sorted with a category filter; there is no date-range search. Snooze choices are fixed 5/10 minutes rather than an editable default snooze preference. Skip stays on Plan Details instead of automatically returning Home. Full discrepancies and issues are in [design-decisions.md](design-decisions.md) and [PROJECT_STATUS.md](../PROJECT_STATUS.md).
