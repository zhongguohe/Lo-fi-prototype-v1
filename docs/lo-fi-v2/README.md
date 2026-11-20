# Lo-fi V2 — local iteration in progress

- [第一批变更说明与走查](iteration-01-zh.md): implemented repairs, verification and remaining issues.
- [核心交互方案](interaction-proposals-zh.md): user approved and locally implemented.
- [V2流程变化](flow-changes-v2-zh.md): current changes mapped to stable V1 flow IDs.

## V1 baseline for V2 review — 2026-11-20

- [Complete Chinese user-flow baseline and task walkthrough checklist](user-flow-baseline-zh.md): F00–F13, stable node/case IDs, current defects and change-log template.
- [Visual review document](user-flow-review-zh.html): the same diagrams with navigation and zoom; Mermaid loads from a public CDN. While Vite is running, open `/docs/lo-fi-v2/user-flow-review-zh.html`.
- Regenerate the visual document with `python scripts/build-flow-review.py` after editing the Markdown source.
- [English agent review notes](agent-review-notes-en.md): review responsibilities, document IDs, verification boundaries and reporting format.
- Documentation only. No V2 product behavior or approved design changes are implied; no participant test outcomes have been added.

The first user-authorized repair batch has started. The V1 baseline documents below remain unchanged as historical references; their unexecuted checklist is not the current verification record. Classroom participant results remain unavailable.

Future records should include:

- **Usability Findings:** anonymous observation references, task outcomes, recurring misunderstandings, uncertainties.
- **Design Changes:** prioritized proposal, group decision/date, rationale tied to evidence.
- **Updated User Flows:** explicit differences from V1 and confirmation that core behavior boundaries remain clear.
- **Prototype Iterations:** version, files changed, verification, remaining issues, and next tests.

Keep exploratory ideas separate from confirmed work. Do not assume a visual redesign or new intervention mechanism is required. Update PROJECT_STATUS, CHANGELOG and design-decisions after actual iteration work.
