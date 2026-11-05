# Experience Direction

## Creative recommendation

Lean into a **Gothic botanical mystery**: a decaying manor overtaken by intelligent, otherworldly plant life. The visual language should feel authored and atmospheric, not like a collection of glowing image hotspots.

The original art and narration are the game's identity. The redesign should improve composition, typography, pacing, and interaction clarity without sanding away its eccentricity.

## Experience principles

1. **The room is the interface.** Standard UI recedes until the player needs it.
2. **Mystery without confusion.** The answer may be hidden; the available actions should not be.
3. **Consequences, not punishment.** Failure advances atmosphere and learning, then returns control quickly.
4. **Audio enriches; it never gates.** Captions and visual equivalents preserve the full puzzle.
5. **Motion communicates state.** Animation signals discovery, causality, danger, and completion.
6. **The player keeps context.** No unexplained page reloads or lost arrangements.

## App shell

- Design first for a 360–430 px portrait viewport, touch input, browser chrome, and safe-area insets.
- A restrained top layer for home, room map, journal, sound, captions, and pause.
- A room stage that maintains the source-art aspect ratio.
- Hotspots defined in normalized coordinates and rendered over the stage.
- A bottom or side inventory/journal that adapts by viewport.
- A consistent narrative panel for voice, captions, and skip/replay controls.
- Explicit loading, save, offline, and error states styled within the fiction.

## Mobile-first interaction model

- The room stage can pan or present guided focus regions when the source composition is wider than the viewport; do not shrink a 1440 px scene until hotspots become untappable.
- Primary actions live within thumb reach and remain outside device safe areas.
- Tap selects an object and opens a concise action sheet. Drag is optional enhancement, never the only control.
- The journal/inventory uses a bottom sheet on phones, a side panel on tablets, and a persistent rail only on wide desktop layouts.
- Narrative captions use short, readable segments with an expandable transcript.
- Orientation changes preserve puzzle state and current focus.
- Mobile media loading is staged by room and network conditions.

## Room treatment

### Introduction

- Replace the long, continuously highlighted passage with paced narrative cards and optional full transcript.
- Introduce the key fob as an inspectable object.
- Establish caption, sound, and motion preferences before the first room.
- Let players skip or replay without losing their place.

### Entrance Hall

- Use a subtle camera settle and layered dust/mist on entry.
- Replace indiscriminate blinking hotspots with a focus pulse after inactivity.
- Show found crest pieces as tangible inventory objects.
- Make crest placement snap, rotate, and acknowledge correct adjacency.
- Support select-and-place as well as drag.

### Greenhouse

- Make the elementometer the visual focal point and clarify the relationship between element, pot, and harmony.
- Use restrained leaf movement, condensation, particles, and colored light response.
- Preview consequences before committing an element where appropriate.
- Keep the chosen element and remaining possibilities legible.

### Study

- Let the player collect tangible music fragments with stable labels.
- Preview the selected fragment itself, not the destination slot.
- Use a three-slot sequencer with reorder controls and a clear “Play sequence” action.
- Separate “preview” from “submit to the vault.”
- On failure, briefly animate the Wardenweed threat, provide a positional hint, and retain the sequence.
- On success, synchronize vault, mist, guardian, and music beats through a cancellable timeline.

## Motion system

Use four motion levels:

- **Ambient:** fog, dust, plant movement, light flicker; low amplitude and pausable.
- **Attention:** a single localized cue after player inactivity; never make every object blink.
- **Interaction:** 120–240 ms hover, press, pickup, snap, and inventory transitions.
- **Narrative:** authored room-entry and completion sequences with skip controls.

Implement motion through transforms and opacity. Avoid layout animation for hotspots. Respect `prefers-reduced-motion`; reduced mode should use crossfades and static state changes.

## Audio system

- Music, ambience, narration, effects, and puzzle previews use separate channels.
- Provide master mute plus channel controls.
- Duck ambience beneath narration and puzzle previews.
- Only one narration item plays at a time.
- Every spoken line has synchronized text and a full transcript.
- Audio decode or playback failure must never block progression.

## Visual modernization

- Establish a coherent palette: charcoal timber, aged parchment, oxidized brass, moonlit violet, and botanical green.
- Limit glow colors to meaningful states: discoverable, selected, invalid, and solved.
- Use one display face and one highly readable text face; retain the current typefaces only after legibility and license review.
- Replace raster UI icons with a consistent SVG set.
- Build depth with layered source art and CSS/Canvas effects before commissioning wholesale image replacement.
- Prefer tasteful parallax and masks over constant GIF animation.

## Accessibility baseline

- WCAG 2.2 AA target.
- Complete keyboard path and visible focus.
- Touch targets at least 44 × 44 CSS pixels.
- No puzzle outcome dependent on color, sound, hover, or drag alone.
- Captions, transcripts, pause, replay, reduced motion, and no-flash mode.
- Meaningful alternative text for scene art; decorative layers hidden from assistive technology.
- Live announcements for collection, placement, validation, and room completion.

## Brainstorm candidates

- A diegetic journal that records discovered lore and doubles as the resume/progress interface.
- The violet mist as a cross-room continuity device whose behavior reflects progress.
- Hawthorne as a subtle hint system rather than a conventional hint button.
- Room-specific ambient loops that layer new stems as puzzles approach completion.
- A post-game manor map that makes later room expansion natural.
