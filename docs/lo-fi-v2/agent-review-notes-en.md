# Lo-fi V2: Agent Review Notes

## Context and responsibilities

The group is iterating on the existing V1 prototype for the Lo-fi V2 assignment. The local checkout uses `Valen_branch` in `zhongguohe/Lo-fi-prototype-v1`; the product baseline inspected for these documents is `c22e7a8`.

The implementation agent prepares changes on this branch. Code review is assigned to the responsible teammates and their agents. Teammates also perform a short user-task walkthrough to check that the resulting interaction flows remain coherent. A successful walkthrough is not evidence of sustained behavior change.

Read the repository's `AGENTS.md` and current status before reviewing code. This note explains the documentation; it does not authorize edits, commits, pushes, merges, or deployment.

## Review materials

- `user-flow-baseline-zh.md`: Chinese team guide, 12 primary walkthrough tasks, 14 detailed diagrams, and 61 optional investigation cases.
- `user-flow-review-zh.html`: generated view with navigation, zoom, and diagram source. Regenerate using `python scripts/build-flow-review.py` after changing the Markdown.
- `F00`–`F13`: flow identifiers; `F05-12` is a specific step. Preserve existing identifiers when updating a flow.
- `Txx.yy`: detailed walkthrough case identifiers, not executed test results.
- `A01`–`A07`: developer-audit findings mapped to flows and code areas. These are not classroom participant findings or approved implementation scope.

The diagrams describe the current V1 behavior, including known defects. The primary task table describes intended outcomes; some are not satisfied by the baseline. Review the actual branch diff before claiming that any issue has been fixed.

## Review focus after implementation

1. Saved activities must not block a subsequent task, and unsaved activity must not be silently discarded.
2. Actual records and future plans must remain distinct. Future-dated records must not receive completed-activity credit.
3. Back and Cancel behavior should preserve or discard drafts consistently with the documented choice.
4. Record corrections must replace the same record's contribution, not add it again.
5. Current goals and future scheduled goals must have consistent effective dates.
6. Study breaks and moderate planned exercise remain separate statistics. Planning, rescheduling, skipping, and opening the app earn no activity credit.
7. Pet visibility must not affect saved records or ordinary progress; missed days must not erase effort.

For code changes, follow repository-required tests and build checks, then inspect the affected browser paths. Keep source inspection, automated checks, browser walkthroughs, and participant observations separate in the review record.

## Reporting

For teammates, describe the user-visible problem, changed behavior, verification path, and remaining limitations in concise Chinese. Technical details may be recorded separately in English using this structure:

```text
Change:
Relevant flow / task / audit IDs:
Before:
After:
Files and functions:
Automated validation:
Browser validation:
Remaining limitations:
```

The later 2026-11-20 implementation batch is recorded in `iteration-01-zh.md` and `flow-changes-v2-zh.md`. The user explicitly approved the three core interaction choices in `interaction-proposals-zh.md`; those choices are now implemented locally. V1 diagrams remain historical references. The full 61-case checklist remains unexecuted; targeted browser checks and 22 automated tests are recorded separately. Review the actual branch diff and do not infer group-wide approval or a submitted V2 video.
