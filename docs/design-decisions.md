# Design decision register

## 2026-11-23 — Preserve color edition; main uses grayscale V2

The user reported the final group decision to submit reviewed grayscale V2, then explicitly directed preserving the color edition on its own branch and keeping main's grayscale V1→V2 progression. Remote `codex/color-prototype-2026-11-23` preserves the complete color tree/history at39dae0d. Conflict resolution selects reviewed grayscale product files at457e138 with current version-routing documentation. Both histories are retained through merge ancestry; no force push, history rewrite or silent integration of color-only features. Earlier instructions to leave merge to the owner are superseded by this task.

Updated 2026-11-07. “Confirmed” below means explicitly fixed by the supplied project brief and/or the user's development instructions. No independent group vote, signed approval, or meeting decision is inferred. If the group changes these decisions, record the new source and date rather than replacing the historical source documents.

## Confirmed decisions

| ID | Decision | Evidence / consequence |
| --- | --- | --- |
| C01 | Target students aged 18+ who study for long periods; preserve the two distinct target behaviors | Problem statement and current user brief; no target-population expansion |
| C02 | Preserve the three named components: Adjustable Study-Break Prompts; Backup Exercise Plans and Rescheduling; Cumulative Progress Feedback and Optional Virtual Pet | Current user brief and IA; a draft alternative in causal notes does not authorize replacing the third component |
| C03 | Four bottom tabs, header avatar for Personal Center, 15 primary interfaces | Original IA plus V1 development instructions |
| C04 | Mobile web only for this implementation; grayscale Lo-fi and American English app text | Explicit V1 instructions override source suggestions for a separate desktop surface |
| C05 | Study breaks and moderate planned exercise are separate statistics | Problem statement, IA, and development requirements |
| C06 | Only confirmed actual activity contributes; creating, rescheduling, skipping, or opening earns nothing | IA and V1 rules; record edits replace the same ID's contribution |
| C07 | Pet is optional; hiding it retains ordinary progress/history; no missed-day punishment | IA and V1 rules |
| C08 | Local prototype with no real backend, account, push delivery, sensor integration, sync, AI recommendation, or public deployment | Explicit V1 exclusions |
| C09 | English inline validation replaces OS-localized browser validation bubbles | User's follow-up screenshot correction; shared Form/Field implementation |
| C10 | 390 × 844 logical canvas; desktop previews scale to fit short windows; actual phones fill their available viewport | Follow-up sizing check and correction; preview percentage is shown outside the app |

## Prototype assumptions and implementation choices

These are not scientifically established best settings or evidence that the intervention works.

| ID | Assumption / choice | Current implementation |
| --- | --- | --- |
| A01 | Initial study interval 45 minutes and break 3 minutes | Adjustable; activity defaults to Short walk |
| A02 | 1 actual minute = 1 growth point, 30 points per stage | Derived from saved records; fractional minutes to one decimal; stage begins at 1 |
| A03 | Initial weekly goal 60 minutes | Editable; no claim this is a clinical recommendation |
| A04 | Monday–Sunday week; only category exercise plus intensity Moderate enters weekly totals | Study totals are all-time, with a separate daily Home break count; vigorous activity is not modeled |
| A05 | All current records are self-reported | No verified sensor data, duplicate-device merge, or imported suggestion audit trail |
| A06 | Initial planned-activity intensity is inferred by a small activity-name regex | Keywords such as brisk/cycl/jogg/running/swim/aerobic suggest Moderate; other names suggest Light. Users can edit during confirmation. This is a fragile demo heuristic, not sensing or AI |
| A07 | Timer suggests at least 0.1 minute; Finish and End Early are user-selected outcomes | No automatic verification of planned duration or actual movement |
| A08 | One current goal plus one future scheduled goal; one active activity; memory-only new-plan draft | Simplified state model; see known issue K01 and refresh limitations |
| A09 | Sample data appears after setup by default | 3-minute light break + 20-minute moderate exercise = 23 points, plus one pending plan with stretching backup; dates are generated locally |
| A10 | No pet decorations/unlock persistence | Simple line icon and calculated stage only; missed days do not alter records |

## Open questions for the group

- Which actual classroom observations should drive V2 priorities? No participant results exist yet.
- How should intensity be explicitly chosen or explained, replacing the name-based default if it confuses users?
- Should a moderate study-context activity ever contribute to weekly exercise, or should this strict category split remain? The current code uses the strict split; do not silently change it.
- Should Completed denote completion of a backup or completion of the original intention, and is the actual-activity summary clear enough?
- What goal history/effective-date model should replace the single future slot if longer-term use is tested?
- Should saved feedback immediately clear the active task when navigating to Progress, and should all unsaved plan drafts survive refresh?
- Are date filtering, default snooze preferences, feedback submission, pet decorations, or additional device explanations needed in a later phase? They are not approved new V2 scope.
- What are the later course deliverables, visual direction, evaluation protocol, and repository ownership/licensing arrangements? Confirm with the group and course sources.

## Source / implementation differences to retain

| Source idea | Current V1 behavior | Disposition |
| --- | --- | --- |
| Separate computer Study + mobile flows | One mobile web implementation, desktop used as preview | Authorized scope override, not an omitted desktop deliverable |
| Source text suggests skip returns Home | Skip stays on Plan Details and remains in skipped history | Recorded behavioral difference; no redesign in this maintenance task |
| Date/type lookup in history | Date sorting and category filter, no date-range search | Partial compared with source wording |
| User-adjustable default snooze duration | Fixed 5/10-minute choices | Source detail not implemented |
| Device suggestions, source correction distinctions, multi-device merge | Self-reported records and a device explanation toggle only | Production/device behavior excluded; no sensor accuracy claim |
| Growth customization / decorations | Placeholder pet, points and calculated stage | Complex decorations explicitly unnecessary for V1 |
| Feedback entry in Help | Explanatory Help/About dialog only | Feedback submission not implemented |

Research summaries and references in the original documents are preserved without adding causal proof. The named product mechanisms remain hypotheses to evaluate.


## Publication authorization — 2026-11-07

The user supplied the existing public group repository and authorized uploading the project and Pages configuration, then explicitly chose to wait for the owner to enable Pages. Public demonstration is now authorized as that limited follow-up scope; earlier maintenance-only no-upload statements remain historical. No intervention or visual redesign is authorized. Production-only HashRouter and a Vite deployment base resolve static-host refresh/resource paths; local development keeps its original paths. No live URL is considered verified until a deployment succeeds and is opened.

## V2 local repair authorization — 2026-11-20

The user authorized local changes on the existing grayscale implementation, with approval requested before key interaction changes. The first batch repairs developer-audit A01/A02/A03/A05/A06/A07 without adding an intervention or changing reward rules. Leaving saved feedback pauses an on-break study session; unsaved activity remains protected. Backup fields share the existing in-memory plan draft; refresh persistence is still out of scope. When a future goal has taken effect, its value is promoted to the current base before storing the next appointment; this is not a full goal-history model. Actual records must be dated no later than the displayed day; past schedules require a valid new date/time. Legacy future records are retained for correction but excluded from current totals.

The user subsequently approved all three proposals in `lo-fi-v2/interaction-proposals-zh.md`: explicit actual-intensity choice for planned exercise (including manual entry), accurate preparation labels without automatic timing, and activity-first saved feedback with pet-off levels hidden. These are implemented locally. Intensity inference A06 in the historical V1 assumptions is superseded for new V2 exercise records; already-saved records are not silently reclassified. Code review remains assigned to other teammates' agents. This authorization does not include pushing or merging changes.

### 2026-11-20 — Plan time and backup provenance
User requested new plans default to today and the time the editor opens, without automatic ticking; implemented. Save-time past-date/time checks remain. The formally submitted SI684_Causal_Diagrams_Revised.pdf, page 1, component 2 explicitly describes choosing a shorter backup and making an if-then plan while planning a workout. It does not prescribe a mandatory separate page or form validation. Existing required backup fields remain pending any explicit change to that interaction.

### 2026-11-20 — Publication authorized

After the walkthrough discussion, the user accepted the remaining contents and explicitly requested committing/pushing Valen_branch and opening a PR to main. Required backup behavior is retained. The owner/teammates handle code review, task walkthrough and merge; no merge or deployment is authorized by this request.
