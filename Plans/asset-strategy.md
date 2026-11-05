# Asset Preservation and Modernization

## Non-negotiable preservation rule

The existing `assets/` directory remains in place and unchanged. It is the source archive. Optimization creates derived files elsewhere; it never overwrites originals.

## Current observations

- The asset tree is approximately 227 MB.
- It includes source material such as a 45.2 MB PSD that should never ship to players.
- Individual raster files reach 13.9 MB.
- Two instructional GIFs are approximately 18.1 MB and 6.3 MB.
- Room backgrounds and instruction sequences contain multiple multi-megabyte images.
- Audio mixes MP3 and M4A and lacks a manifest of duration, transcript, loudness, and usage.
- Path casing is inconsistent in code (`07study` versus `07Study`).

## Pipeline

1. Scan `assets/` and generate a checksummed manifest.
2. Assign a stable logical ID and usage metadata to every referenced asset.
3. Validate exact-case paths on all platforms.
4. Produce derivatives in `generated/assets/`:
   - AVIF and WebP for photographic art.
   - Optimized PNG only where alpha quality requires it.
   - WebM/MP4 for large GIF sequences.
   - SVG for newly created interface icons.
   - Standardized AAC/Opus delivery formats with measured loudness.
5. Generate width variants for responsive images.
6. Publish only assets referenced by the current content manifest.
7. Cache immutable derivatives by content hash.

## Asset manifest fields

```ts
interface AssetRecord {
  id: string;
  sourcePath: string;
  kind: 'image' | 'audio' | 'video' | 'font';
  room?: string;
  purpose: string;
  derivatives: Record<string, string>;
  preload: 'never' | 'on-room-entry' | 'critical';
  altText?: string;
  transcriptId?: string;
  licenseStatus: 'verified' | 'review-needed' | 'restricted';
}
```

## Art modernization order

1. UI icons and typography: highest leverage and lowest risk.
2. Color grading and overlays: unify existing room art without repainting it.
3. Layer extraction: separate fog, foreground, props, and lighting where source quality permits.
4. Motion derivatives: replace instructional GIFs and add subtle environmental loops.
5. Selective repainting: commission only assets that remain visually weak after composition and grading.

## Audio and rights review

The Study contains recognizable song titles, lyric excerpts, and recorded fragments. Before a public relaunch, document ownership or licenses for:

- Song compositions and quoted lyrics.
- Recorded music and performance rights.
- Narration voices and reuse scope.
- Fonts, photographs, illustrations, and sound effects.

If rights are incomplete, replace commercial songs with original in-world melodies and fragments. This could strengthen the fiction while eliminating a release risk.

## Performance budgets

- Initial shell: no room media beyond the current loading scene.
- Room-entry critical media: target 3 MB or less on modern formats.
- Lazy-load noncritical instruction and ending media.
- No PSD or GIF source file in production output.
- Avoid preloading all narration or all 15 Study songs.
- Provide visible progress and a low-bandwidth mode for large narrative media.
