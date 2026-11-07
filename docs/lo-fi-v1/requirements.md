# Lo-fi V1 requirements baseline

This is a durable summary of the user's supplied V1 implementation instructions, not a claim that all possible future features were developed. Consult PROJECT_STATUS for actual verification and exceptions. Original source text is preserved under `docs/original-documents/`.

## Purpose and priorities

A complete, interactive, English-language phone web wireframe for SI684 classroom testing and a walkthrough video. Completeness over polish: page coverage, task completion, correct state/data, clear layout, then visual consistency. The prototype is not a production health product or proof of behavior change.

## Required implementation

- React + Vite + JavaScript + CSS, React Router as needed, Lucide icons; local state/localStorage without a backend.
- Logical 390 × 844 mobile display centered on gray desktop surroundings; internal content scroll and bottom navigation. Follow-up correction: scale the whole desktop preview to fit short windows, preserve actual-phone responsiveness, use English application validation instead of localized browser bubbles.
- Home, Study, Exercise, Progress bottom tabs; avatar opens Personal Center. All 15 P01–P15 interfaces in the current IA must be reachable with reasonable exits.
- Flow A: adjustable study settings, start/pause/resume/end study, break reminder with Start Break / Remind Later 5 or 10 / Pause Reminders, a shared activity timer, early-end/discard/confirmation, feedback, and explicit Continue Studying.
- Flow B: exercise plan plus prepared backup, edit/detail, disruption choices, actual activity confirmation, rescheduled/skipped/completed distinctions.
- Flow C: separate statistics, history/detail/manual entry/correction, recalculated growth, optional pet and synchronized preferences.
- Save is required before activity credit. Same-ID edits replace old contributions; plans and skips earn none. Light breaks are not moderate exercise.
- Demo growth: one point per minute; thirty per stage. Missing a day has no punishment. Pet off retains progress.
- Profile/goal/device/help dialogs and shared Personal Center settings; no account system. Some finer source-IA extras are not implemented; see the discrepancy register.
- Reasonable sample data plus empty and next-day testing controls, clearly labeled as prototypes without a separate demo dashboard.

## Explicit exclusions

No backend/database/account, real push, device sensing/watch connection, actual calendar or device sync, AI recommendations, public deployment, separate desktop product, high-fidelity art/animation, or complex pet customization.

## Delivery checks

`npm install`, `npm run dev`, `npm run build`; meaningful existing tests and practical developer walkthroughs. Verify all page entrances and major flow alternatives, Save/Cancel/Back behavior, shared data, non-duplication, and phone-frame overflow. Preserve known issues rather than claiming exhaustive verification. No classroom feedback or completed video is assumed until actual artifacts are added.
