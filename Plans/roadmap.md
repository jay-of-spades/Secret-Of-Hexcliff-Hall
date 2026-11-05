# Migration Roadmap

## Strategy

Build beside the legacy app, migrate vertically by capability and room, and switch routes only after parity gates pass. Avoid a long-lived branch that rewrites everything before any playable result exists.

## Phase 0 — Alignment and safeguards

Deliverables:

- Confirm creative direction, target audience, devices, and release goal.
- Confirm account entry points, verification policy, recovery behavior, and privacy requirements.
- Approve the architecture and preservation rules.
- Document asset rights and identify restricted material.
- Record canonical puzzle rules and narrative outcomes.
- Tag a legacy baseline and create a small manual regression checklist.

Exit gate: all ambiguous Study rules have a written answer, especially whether page numbers, lyric order, or melody order is authoritative.

## Phase 1 — Foundation

Deliverables:

- pnpm workspace and TypeScript configuration.
- React web app and Fastify API skeletons.
- Mobile-first responsive shell beginning at 360 px, including safe-area behavior.
- Shared contracts, game-engine package, linting, formatting, tests, and CI.
- PostgreSQL schema and local development environment.
- Guest sessions, account registration/login/logout, verification, recovery, and guest-progress claiming.
- Asset manifest generator that reads the existing `assets/` tree without modifying it.
- App shell, responsive stage, preferences, and audio director prototypes.

Exit gate: a preview deployment creates and resumes a guest session, safely attaches it to an account, restores it on a second device, and loads one validated room manifest.

## Phase 2 — Study vertical slice

Deliverables:

- Deterministic Study puzzle generation and server validation.
- Search, collect, arrange, preview, submit, retry, success, and farewell states.
- Pointer, touch, and keyboard interaction.
- Captions and audio fallbacks.
- Unit, contract, integration, and end-to-end tests for every song definition.
- Instrumented attempt diagnostics without personal data.

Exit gate: 100 consecutive generated correct solutions pass; every tested incorrect permutation fails without resetting the room.

## Phase 3 — Entrance Hall migration

Deliverables:

- Data-driven hotspot discovery.
- Inventory and crest assembly puzzle.
- Responsive art stage and revised hint behavior.
- Checkpoint and resume support.

Exit gate: room completion is possible with keyboard only, touch only, muted audio, and reduced motion.

## Phase 4 — Greenhouse migration

Deliverables:

- Elementometer interaction and element/pot state machine.
- Clear preview, commit, feedback, and harmony states.
- Optimized environmental media and animation.

Exit gate: all generated states are solvable and the route cannot unlock prematurely.

## Phase 5 — Introduction, narrative, and full journey

Deliverables:

- New opening and preference onboarding.
- Journal/map, resume, room unlocks, ending, and credits.
- Complete narrative caption/transcript pass.
- Save-version migration and content-version behavior.

Exit gate: an end-to-end journey works from a new session through the farewell and survives reloads at every checkpoint.

## Phase 6 — Polish and release

Deliverables:

- Asset derivatives and CDN caching.
- Performance, accessibility, security, and rights audits.
- Cross-browser/device matrix.
- Usability sessions with first-time players.
- Monitoring dashboards, backups, runbook, and rollback plan.

Exit gate: all quality budgets pass and no critical/major defects remain.

## Suggested first implementation increment

After plan approval, the first coding increment should be deliberately small:

1. Add workspace scaffolding without moving legacy files or assets.
2. Implement the Study domain model and exhaustive tests with no UI.
3. Add the API session and attempt endpoints backed by a development database.
4. Build a plain accessible Study sequencer against that engine.
5. Apply the final visual treatment only after the interaction is proven.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Rewrite scope expands indefinitely | Vertical slices, explicit parity gates, backlog separation |
| Original charm is lost | Art direction review using preserved assets before repainting |
| Backend adds complexity without value | Keep API narrow and game engine framework-free |
| Saves break when content changes | Version every puzzle definition and checkpoint schema |
| Large media harms load time | Room manifests, derivatives, lazy loading, budgets |
| Audio/lyric rights block release | Early inventory and original replacement compositions |
| Random puzzle bugs cannot be reproduced | Persist seed, definition version, and attempt IDs |
