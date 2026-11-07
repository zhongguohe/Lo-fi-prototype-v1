# Project overview

**Project:** Helping University Students Move More During and Beyond Study Time  
**Course:** SI/HBHE 684 — Prototyping and Evaluation of Consumer Health Technologies  
**Current phase:** Lo-fi Prototype V1 — Initial Implementation / Preparation for Classroom Testing.

The group project explores how students can fit movement into long study periods and follow through on exercise outside study time. Target users are undergraduate and graduate students aged 18+ who often study for extended periods. Common contexts include libraries, study rooms, and home study spaces. Forgetting, focus demands, changing schedules, and distant perceived benefits are design hypotheses to investigate, not established findings from participant research in this repository.

## Target behaviors

- **Study Breaks:** short movement during independent study to interrupt prolonged sitting.
- **Planned Exercise:** scheduling and completing exercise outside study, with a view toward increasing weekly moderate aerobic activity.

These remain distinct. Light breaks must not automatically enter moderate exercise totals. The prototype supports self-report and correction; it does not verify movement or demonstrate health improvement.

## Core intervention components

1. **Adjustable Study-Break Prompts:** adjustable interval, duration, activity, and control over when reminders appear.
2. **Backup Exercise Plans and Rescheduling:** a prepared backup, a user-chosen new time, or skipping without penalty when a plan is blocked.
3. **Cumulative Progress Feedback and Optional Virtual Pet:** separate behavior feedback and cumulative growth from confirmed activity, with a pet that users can disable.

The causal explanations in the source diagrams are working hypotheses. Successful navigation, more growth points, or favorable classroom feedback would not establish sustained behavior change or clinical effectiveness.

## Current scope

A grayscale, English-language, mobile web prototype using React, Vite, and JavaScript. Four bottom navigation areas and Personal Center connect 15 primary interfaces. The logical phone canvas is 390 × 844 CSS pixels; short desktop previews scale proportionally and actual phone layouts fill available width/height. There is no separate desktop product.

No backend, account, database, real notification delivery, sensing, smartwatch integration, device sync, calendar sync, AI recommendation, or public deployment is included. Sample data and explicitly labeled timer/data controls support walkthroughs. Future Lo-fi V2 and Hi-fi work depends on actual course guidance and evaluation findings.

## Evidence and source documents

The supplied source documents name Weichen Liu, Zhongguo He, Zhengbin Song, Qiuyuan Chen, and Valen Hu as group members. No roles, approval votes, or participant recruitment are inferred from those names.

- [Original documents and provenance](original-documents/README.md)
- [Problem statement text](original-documents/extracts/problem-statement.md)
- [Original IA and flows text](original-documents/extracts/information-architecture.md)
- [Causal diagram draft text](original-documents/extracts/causal-diagrams.md)
- [Current IA](information-architecture.md), [flows](user-flows.md), and [decision register](design-decisions.md)

Original DOCX files preserve embedded visuals. Markdown extracts contain paragraph text, not diagram images or a page-faithful reproduction. Literature references are retained from the supplied documents; they were not independently re-reviewed during this maintenance task. Course submission dates in historical sources must be checked against Canvas rather than treated as current instructions.
