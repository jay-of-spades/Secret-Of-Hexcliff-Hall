# Study Puzzle Remediation

## Intended rule

The player discovers the three fragments belonging to one song, places those three fragments in the song's correct order, and submits the sequence. A correct sequence proceeds to the guardian and farewell. An incorrect sequence provides feedback and permits a retry.

## Why the current experience feels like an unavoidable loop

The current code has a success branch, but the interaction and validator do not share a dependable model:

1. A chosen song and its three lyric strings are assigned randomly to room hotspots.
2. The player keeps three strings, which are copied into DOM datasets.
3. Dragging copies those strings again into three drop-frame datasets.
4. Submission uses exact string equality against the original array.
5. Any mismatch plays the failure sequence and redirects back to `study.html`.

This creates several failure paths that look identical to the player:

- The audio played on drop is chosen by destination slot (`01Pillar`, `02Pillar`, `03Pillar`), not by the fragment being moved. The audible cue therefore cannot reliably identify the piece.
- A fragment can be placed more than once; completeness only checks that all slots contain some string.
- Page numbers are random and not guaranteed unique. If the instruction implies ordering by page, the clue can be ambiguous.
- The validator compares prose rather than stable IDs.
- Dragging from the visible child text can yield an empty drag ID and broken state.
- The failure path erases the attempt, offers no comparison or targeted hint, and starts the entire room again.

The exact-string predicate itself can return true if the DOM contains the three expected strings in the expected order. That does not make the puzzle correct: the current UI does not make that state reliable, inspectable, or accessible.

## Immediate legacy remediation

If the legacy app must remain public during the rebuild, make one narrow patch before other work:

1. Give every fragment a stable `fragmentId` and `sequenceIndex`.
2. Generate three unique page numbers, or remove page numbers as an ordering rule.
3. Store slot contents in a JavaScript array, not only in DOM datasets.
4. Prevent the same fragment from occupying two slots; moving it should clear its previous slot.
5. Use `event.currentTarget` for drag identity and add tap/click placement.
6. Validate `[fragmentId, fragmentId, fragmentId]` against the selected song's ordered IDs.
7. Replace the redirect with an in-room retry that preserves the collected fragments.
8. Show a useful response such as “The second and third phrases are out of order” without revealing the whole answer.
9. Progress to the farewell on a validated result even if optional success audio cannot play.
10. Add a deterministic test fixture for every song.

## Replacement domain model

```ts
type SongId = string;
type FragmentId = string;

interface SongPuzzle {
  puzzleId: string;
  seed: string;
  songId: SongId;
  fragmentIds: [FragmentId, FragmentId, FragmentId];
  distractorIds: FragmentId[];
}

interface StudyState {
  phase: 'search' | 'arrange' | 'checking' | 'solved';
  collectedIds: FragmentId[];
  slots: [FragmentId | null, FragmentId | null, FragmentId | null];
  attempts: number;
}
```

Rendered lyrics, page labels, icons, and audio URLs are content associated with an ID. They never determine correctness.

## Authoritative validation

The client submits a puzzle ID and ordered fragment IDs:

```json
{
  "puzzleId": "study_01H...",
  "orderedFragmentIds": ["song-7-a", "song-7-b", "song-7-c"]
}
```

The API verifies that:

1. The puzzle belongs to the active session.
2. All three IDs are distinct and belong to that puzzle.
3. Their order matches the server-generated solution.
4. The attempt has not already been solved.

The response returns `correct`, optional positional hints, updated progress, and the next narrative state. The server records the seed and attempt so every report is reproducible.

## Interaction recommendation

- Tap/click a collected fragment, then tap/click a numbered slot.
- Offer Move Left, Move Right, and Remove actions.
- Keep drag-and-drop as a desktop enhancement.
- Play the fragment's own preview when selected. Play the assembled sequence only on explicit preview.
- Label each slot and fragment for screen readers and announce changes.
- Keep all three collected fragments visible during retry.
- Use a short transformation sequence for fertilizer failure, then restore the arrangement rather than reloading.

## Required tests

- All 15 songs accept their canonical order.
- Every adjacent swap and reverse order is rejected.
- Duplicate IDs are rejected.
- A fragment from another puzzle is rejected.
- A correct result advances even when audio playback rejects.
- An incorrect result preserves collection and slot state.
- Refresh restores the active Study state.
- Pointer, touch, and keyboard flows reach the same submitted sequence.
