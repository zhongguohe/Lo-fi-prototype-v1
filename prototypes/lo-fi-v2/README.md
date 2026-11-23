# Lo-fi V2 — local iteration in progress

2026-11-23 current decision: the user authorized selecting reviewed grayscale V2 for main and the V2 submission. The color edition is fully preserved on `codex/color-prototype-2026-11-23` at39dae0d. See [branch decision](../../docs/lo-fi-v2/branch-decision-2026-11-23.md). Earlier local-only and owner-only merge statements below are historical.

The current shared `src/` contains the first user-authorized V2 repair batch, preserving V1's grayscale design. Changes are based on developer-audit findings; actual classroom findings have not been supplied. There is no second React application.

Start with [中文变更说明与走查](../../docs/lo-fi-v2/iteration-01-zh.md). The first repair batch and three user-approved interaction adjustments are locally implemented and verified. User authorized branch publication and a PR to main on November 20; [owner handoff instructions](../../docs/lo-fi-v2/owner-handoff-zh.md) cover review, walkthrough and merge. Merge/deployment are not part of this publication task.

Record actual observations, evidence-linked decisions and verification here. The V1 source snapshot was preserved before this iteration; proposed changes remain separate from approved implementation.

Existing planning notes are retained in [docs/lo-fi-v2](../../docs/lo-fi-v2/README.md). [Project status](../../PROJECT_STATUS.md) is the overall source of progress and issues.

2026-11-20: Added a [Chinese V1 flow baseline and walkthrough checklist](../../docs/lo-fi-v2/user-flow-baseline-zh.md) for reviewing later V2 changes. [Visual diagram review](../../docs/lo-fi-v2/user-flow-review-zh.html) provides navigation and zoom. This is source-grounded documentation; the checklist is unexecuted and product behavior remains V1.

2026-11-20 walkthrough follow-up: new plan time defaults to the local hour/minute when the editor opens (fixed until edited); draft values are preserved. Past schedules remain blocked at save. 22 tests and build passed; this default-value change has not been rechecked in browser.
