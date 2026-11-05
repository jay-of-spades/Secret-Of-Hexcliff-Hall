# Current-State Audit

## Executive assessment

The concept, narration, room art, and audio library give Hexcliff Hall a distinctive identity. The current implementation is a proof of concept: four HTML pages, four global JavaScript files, and room-specific CSS. It can demonstrate the story, but its state model is too implicit to support reliable puzzles, responsive design, persistence, testing, or further rooms.

The recommended approach is a controlled rewrite with incremental room migration. Retrofitting a backend or framework into the current scripts would preserve their failure modes and cost more over time.

## Inventory

- Four pages: introduction, entrance hall, greenhouse, and study.
- 2,062 lines of JavaScript, including a 973-line Study script.
- 1,774 lines of CSS with no responsive media queries.
- 775 lines of HTML dominated by non-semantic `div` interactions.
- Approximately 227 MB of source assets.
- 60 JPG, 23 PNG, 3 GIF, 5 SVG, 51 MP3, 86 M4A, 5 TTF, and one 45 MB PSD file.
- No package manifest, build pipeline, backend, database, automated tests, linting, or CI.

## Critical findings

### 1. Puzzle state lives in the DOM

Progress is stored across global variables, classes, inline styles, `data-*` attributes, and element visibility. The DOM is simultaneously the view, database, and rule engine. This makes invalid states easy to create and nearly impossible to reproduce.

Recommendation: define serializable room state and pure transition functions. The UI should render state rather than manufacture it.

### 2. The Study uses presentation text as identity

The final validator compares `frame.dataset.line` directly with lyric strings in `selectedPillarSong.lines`. Copy edits, punctuation changes, whitespace, or the wrong drag target can change game behavior.

Recommendation: assign stable IDs to songs, fragments, slots, and attempts. Validate IDs, never rendered prose.

### 3. Random games are not reproducible

Rooms use `Math.random()` directly and do not record a seed or generated configuration. A failed playthrough cannot be replayed in a test or investigated from a support report. Page numbers can also collide.

Recommendation: generate each puzzle from a recorded seed and validate generated invariants before a session begins.

### 4. Navigation is not progression

Rooms are plain links. There is no authoritative progress record, route guard, resume flow, checkpoint, or versioned save state.

Recommendation: use a session model with explicit room states (`locked`, `available`, `active`, `solved`) and server persistence.

### 5. Interaction is mouse-first and fragile

Core puzzles rely on HTML drag-and-drop, hover, image clicks, and invisible hotspots. There is no touch or keyboard equivalent, and most controls are not semantic buttons. Twenty-seven image tags lack an `alt` attribute.

Recommendation: provide click/tap selection plus ordered placement as the primary pattern, with drag as an enhancement. Use semantic controls, visible focus, captions, and status announcements.

### 6. Layout is a fixed canvas

The shared container is hard-coded to 1440 × 900 pixels and room layouts depend heavily on absolute positioning. There are no media queries.

Recommendation: use a responsive stage with a preserved art aspect ratio, scalable hotspots, and separate adaptive UI chrome.

### 7. Audio lifecycle is unmanaged

Many `Audio` objects are created ad hoc. Playback, interruption, volume, captions, simultaneous sounds, loading failures, and browser autoplay restrictions are not centrally managed.

Recommendation: introduce an audio director with named channels, preload policy, cancellation, captions/transcripts, and global user preferences.

### 8. Event handlers accumulate

Anonymous callbacks are added repeatedly, then removal is attempted with newly created function objects. Those listeners are not removed. Timers and audio-ended handlers also lack lifecycle ownership.

Recommendation: let component lifecycle manage listeners, and keep narrative timers cancellable.

### 9. Asset delivery is unnecessarily heavy

The source library includes a 45.2 MB PSD, a 13.9 MB PNG, GIFs of 18.1 MB and 6.3 MB, and many multi-megabyte instruction images. A room can load far more than it needs.

Recommendation: preserve originals but build optimized WebP/AVIF images, WebM/MP4 motion assets, and standardized audio derivatives. Lazy-load by room.

### 10. Deployment assumptions leak into gameplay code

Each script detects a specific GitHub Pages hostname and constructs paths manually. There is also a case inconsistency between `07study` and `07Study`, which is platform-dependent.

Recommendation: resolve assets through a manifest and environment configuration; enforce exact-case asset checks in CI.

## Concrete code defects observed

- `disbaled` is misspelled in two Study assignments, so the control is not actually disabled there.
- `pointerEvents = 'cursor'` is invalid CSS.
- `if (easyMode)` tests the element rather than `isEasyMode`, so the easy-mode jukebox behavior is installed in both modes.
- Event-listener removal uses a different anonymous function and therefore does nothing.
- Entrance assigns `style.display = '0'`, which is invalid.
- Study drag start reads `event.target`; dragging a child span can produce an empty element ID and a null lookup during drop.
- The same Study fragment can be placed in multiple slots.
- Incorrect Study submissions force a complete page reload after the fertilizer audio.
- Audio success depends on an `ended` event; a load or decode failure can stall progression.

## Prioritized recommendations

### Now

1. Freeze feature work in the legacy scripts.
2. Document and test the Study rules independently of the DOM.
3. Establish the workspace, type system, linting, tests, and CI.
4. Inventory asset ownership and licensing, especially commercial recordings and lyric text.

### Next

1. Build the shared game engine, audio director, responsive stage, and accessible puzzle controls.
2. Migrate the Study first because it exercises the most important architecture.
3. Add persisted anonymous sessions and deterministic puzzle seeds.
4. Migrate the entrance and greenhouse after the Study engine is proven.

### Later

1. Add optional accounts, cross-device saves, localization, and content authoring tools only after the core experience is stable.
2. Add analytics at decision points, never as a substitute for usability testing.
