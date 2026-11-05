# Secret of Hexcliff Hall — Revamp Plan

This folder is the working blueprint for rebuilding Hexcliff Hall as a polished, dynamic, full-stack narrative puzzle game while preserving the original concept, story, and source assets.

## Recommendation in one sentence

Rebuild the game around a deterministic TypeScript game engine, a React front end, and a small Fastify API that owns sessions, puzzle configuration, validation, and progress; migrate one room at a time and keep the current app playable until the replacement reaches parity.

## Documents

- [current-state-audit.md](current-state-audit.md) — findings from the source-code sweep and prioritized recommendations.
- [study-puzzle-remediation.md](study-puzzle-remediation.md) — why the fertilizer loop happens and how the last room should work.
- [architecture.md](architecture.md) — target repository, front-end, back-end, data, and deployment architecture.
- [experience-direction.md](experience-direction.md) — visual, interaction, audio, animation, accessibility, and narrative direction.
- [asset-strategy.md](asset-strategy.md) — preservation and non-destructive modernization of the 227 MB asset library.
- [roadmap.md](roadmap.md) — phased delivery plan, gates, and suggested sequence.
- [quality-plan.md](quality-plan.md) — automated testing, observability, performance, and acceptance criteria.

## Agreed direction and constraints

1. Preserve the existing `assets/` tree in its current location. Do not rename, move, overwrite, or delete source assets during the migration.
2. Build the new front end in React.
3. Design mobile-first, then progressively enhance tablet and desktop layouts.
4. Use a Node.js backend and support player accounts with durable saved progress.
5. Let a new player begin as a guest and offer account creation before or after the first checkpoint; do not put registration in front of the opening experience.
6. Treat the current four-page app as the legacy reference, not as the foundation of the new architecture.
7. Fix the Study outcome model before expanding the game.
8. Make all essential interactions work with mouse, touch, and keyboard.
9. Respect reduced-motion and muted-audio preferences.
10. Keep room content data-driven so new rooms do not require another monolithic script.

## Decisions to make together

The recommended defaults are marked below. These are product choices, not blockers for the initial technical foundation.

| Question | Recommended default | Alternative |
| --- | --- | --- |
| Art direction | Gothic botanical mystery with restrained supernatural motion | Darker horror or lighter storybook fantasy |
| Difficulty | One core puzzle with contextual hints | Separate easy/hard rule sets |
| Failure | Retry with a useful clue and state preserved | Room reset |
| Narrative delivery | Captions plus optional voice playback | Voice-led only |
| Initial deployment | One web service, one API service, managed PostgreSQL | Serverless functions and database |
| Account entry | Guest-first with a save/account prompt at a natural checkpoint | Registration before play |

## Definition of success

- A new player can understand and finish all three rooms without developer guidance.
- A correct Study sequence always reaches the ending; an incorrect sequence never destroys progress.
- Reloading or changing devices can restore an active session.
- The app works from 360 px mobile widths through large desktop displays.
- Every room has deterministic unit tests and an end-to-end happy path.
- Core interaction is usable without sound, drag-and-drop, or animation.
- Initial page payload excludes unused room assets and meets the performance budgets in the quality plan.
