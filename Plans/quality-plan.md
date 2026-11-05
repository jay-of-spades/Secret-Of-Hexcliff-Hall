# Quality Plan

## Testing pyramid

### Unit tests

- Pure room transitions and invariants.
- Seeded generators and uniqueness/solvability checks.
- Study sequence validation for every definition and permutation class.
- Save serialization and version migration.
- Audio director state independent of actual playback.

### Contract tests

- Shared request and response schemas against the live API.
- Rejection of malformed, duplicate, foreign, or stale puzzle IDs.
- Idempotent checkpoint behavior.
- Content-manifest compatibility.

### Component tests

- Keyboard, touch-equivalent, and pointer selection flows.
- Focus management and live announcements.
- Reduced motion, mute, captions, and loading/error states.
- Retry behavior that preserves the arrangement.

### End-to-end tests

- New session to final farewell.
- Resume at each room and each significant puzzle phase.
- Correct and incorrect Study sequences.
- Audio unavailable, slow network, API retry, and stale content version.
- Mobile and desktop viewport representatives.
- Guest registration, login, logout, recovery, and cross-device resume.
- Guest-to-account progress claiming without duplication or data loss.

## Study acceptance criteria

1. A canonical sequence always validates as correct for all song definitions.
2. Reverse order, adjacent swaps, duplicates, and foreign fragments never validate.
3. Incorrect submission leaves all collected fragments available and preserves the submitted order.
4. A player can revise one slot without rebuilding the entire sequence.
5. Success progression does not depend on audio `ended` events.
6. Refresh restores the current phase and arrangement.
7. The same seed recreates the same puzzle configuration.
8. A support event can identify session, puzzle definition, seed, attempt number, and result without storing personal data.

## Automated repository gates

- Type checking, linting, formatting, and dead-code checks.
- Unit, component, API, and selected end-to-end tests.
- Exact-case asset-reference validation.
- Content-schema and puzzle-solvability validation.
- Accessibility scan plus manual keyboard gate.
- Bundle size and room-media budgets.
- Dependency vulnerability, secret, and license scans.
- Database migration verification.
- Authentication abuse tests covering rate limits, session rotation/revocation, CSRF, and account enumeration responses.

## Observability

Record allow-listed events:

- Session created/resumed.
- Room started/checkpointed/solved.
- Hint requested.
- Puzzle attempt result and positional error code.
- Media load/playback failure by asset ID.
- Unhandled client/API error with release and content versions.

Do not record full browsing history, free text, raw cookies, or unnecessary device fingerprints.

## Performance targets

- Responsive input while room media loads.
- Mobile-first budgets measured on a throttled mid-range phone profile.
- No layout shift when overlays or captions appear.
- Lazy-load future rooms.
- Decode large visual media off the critical path.
- Maintain animation responsiveness on mid-range mobile devices.
- Enforce per-route JavaScript and media budgets in CI rather than relying on a one-time audit.

## Manual playtest protocol

For each milestone, test with players who have not seen the rules:

1. Observe silently until they stop progressing.
2. Record the last state they understood and the next action they expected.
3. Distinguish puzzle difficulty from interface ambiguity.
4. Ask them to explain the rule after completion.
5. Test muted audio, keyboard-only, touch, reduced motion, and interrupted/resumed play.

The main success metric is not merely completion rate. It is whether players attribute failure to their reasoning rather than to the interface.
