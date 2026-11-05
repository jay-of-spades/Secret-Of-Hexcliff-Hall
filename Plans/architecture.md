# Target Architecture

## Decision

Use a pnpm TypeScript workspace with a mobile-first React/Vite web application, a Node.js/Fastify API, a pure shared game engine, PostgreSQL persistence, schema-validated contracts, and first-class player accounts.

This is intentionally a separated front end and back end. The game does not benefit enough from server-rendered React to couple both halves to a full-stack page framework, while a dedicated API gives puzzle validation, persistence, content versioning, and observability clear ownership.

## Repository layout

```text
Hexcliff/
├── assets/                    # Existing originals; preserved in place
├── apps/
│   ├── web/                   # React, Vite, routes, room rendering
│   └── api/                   # Fastify API and persistence adapters
├── packages/
│   ├── game-engine/           # Pure room states, commands, transitions
│   ├── contracts/             # Shared schemas and API types
│   ├── content/               # Typed room manifests and narrative data
│   ├── ui/                    # Design system and accessible controls
│   └── tooling/               # Asset manifest and validation scripts
├── generated/                 # Ignored/rebuildable optimized derivatives
├── legacy/                    # Current HTML/CSS/JS after migration parity
├── Plans/
├── package.json
├── pnpm-workspace.yaml
└── compose.yaml               # Local API/database development
```

The legacy files remain at the root until the replacement can serve every current path. Moving them to `legacy/` is a later, explicit migration step. The `assets/` source tree never moves.

## Runtime view

```text
Player
  │
  ▼
React web app ─────── asset manifest ──────► preserved/derived media
  │
  │ typed HTTPS API
  ▼
Fastify API ───────► game-engine rules
  │                         │
  │                         └── deterministic seed + validation
  ▼
PostgreSQL
  ├── sessions and preferences
  ├── room progress/checkpoints
  ├── puzzle instances/attempts
  └── versioned content references
```

## Front-end responsibilities

- Route shell, room loading, error boundaries, and resume flow.
- Mobile-first layouts and input behavior, progressively enhanced for larger screens.
- Render state received from the engine/API.
- Accessible input mapping for pointer, touch, and keyboard.
- Audio direction, captions, user volume/mute preferences, and interruption.
- Responsive stage and overlays.
- Optimistic local transitions that are safe to replay.
- Save queue and offline-tolerant retry for non-authoritative progress events.

Recommended libraries should stay minimal: React, React Router, TanStack Query, a schema validator, and a focused animation library. Do not add a global UI framework that fights the art direction.

## Game-engine responsibilities

The engine is a framework-free TypeScript package. Each room exposes:

- Initial state creation from a validated puzzle configuration.
- A closed set of commands (`inspect`, `collect`, `place`, `remove`, `submit`).
- Pure transitions that return new state and domain events.
- Invariants and serialized checkpoint schemas.
- Deterministic generation from a seed.

This package must run in unit tests, the browser, and the API. The API remains authoritative for puzzle completion.

## Back-end responsibilities

- Create and resume anonymous sessions.
- Register, authenticate, verify, recover, and securely sign out player accounts.
- Attach an existing guest session to a new or returning account without losing progress.
- Generate deterministic puzzle instances.
- Validate authoritative submissions.
- Persist room checkpoints and completion.
- Serve versioned content manifests and compatible save migrations.
- Record privacy-conscious operational events and errors.
- Apply rate limits and input validation.

Accounts are part of the core backend, but registration should not block discovery. Start every new player with a secure guest session. At a natural checkpoint, invite the player to create an account or sign in and atomically attach that guest progress. Returning authenticated players can resume across devices.

Use server-managed sessions in secure, HTTP-only, same-site cookies. Support email verification and recovery. Passwords, if offered, must be hashed with a current memory-hard algorithm; passkeys or an external OpenID Connect provider can be added without changing the game-session model. Authentication logic should use a maintained, audited implementation rather than custom cryptography.

## Initial API surface

| Method | Route | Purpose |
| --- | --- | --- |
| `POST` | `/v1/sessions` | Create an anonymous game session |
| `GET` | `/v1/sessions/:id` | Resume compatible progress |
| `POST` | `/v1/auth/register` | Create an account and attach guest progress |
| `POST` | `/v1/auth/login` | Start an authenticated session |
| `POST` | `/v1/auth/logout` | Revoke the active authenticated session |
| `POST` | `/v1/auth/verify-email` | Verify account ownership |
| `POST` | `/v1/auth/recovery` | Begin account recovery |
| `GET` | `/v1/me` | Return the current player and save summary |
| `POST` | `/v1/rooms/:roomId/start` | Create or return a seeded room instance |
| `PUT` | `/v1/rooms/:roomId/checkpoint` | Persist a validated checkpoint |
| `POST` | `/v1/puzzles/:puzzleId/attempts` | Validate an ordered solution |
| `GET` | `/v1/content/manifest` | Return current room/content versions |
| `POST` | `/v1/events` | Record allow-listed gameplay diagnostics |
| `GET` | `/health` | Deployment health check |

## Data model

### `player_account`

- `id`, normalized email, display name, verification state
- credential/provider reference, `created_at`, `updated_at`
- no gameplay state embedded in the account record

### `auth_session`

- `id`, `player_account_id`, hashed session token
- `created_at`, `last_seen_at`, `expires_at`, `revoked_at`
- coarse security metadata needed for session management

### `game_session`

- `id`, `created_at`, `last_seen_at`
- nullable `player_account_id` while playing as a guest
- `content_version`, `current_room_id`
- audio, caption, motion, and difficulty preferences

### `room_progress`

- `session_id`, `room_id`, `status`
- `state_version`, validated checkpoint JSON
- `started_at`, `solved_at`, `updated_at`

### `puzzle_instance`

- `id`, `session_id`, `room_id`, `puzzle_type`
- `seed`, `definition_version`, encrypted or server-only solution data
- `created_at`, `solved_at`

### `puzzle_attempt`

- `id`, `puzzle_instance_id`, `attempt_number`
- submitted stable IDs, result, optional hint code, `created_at`

## Content architecture

Narrative text, hotspot definitions, audio cues, instruction steps, and puzzle data should live in typed content manifests—not component code. A build-time validator must check:

- Stable unique IDs.
- Exact-case asset existence.
- Referenced captions/transcripts.
- Valid hotspot coordinates and responsive fallback descriptions.
- Puzzle solvability and uniqueness.
- Save/content-version compatibility.

## Asset delivery while preserving `assets/`

Vite development configuration can expose the root `assets/` directory read-only. The tooling package generates a manifest and optimized derivatives into `generated/`. Production bundles publish only referenced derivatives plus any source files that must remain exact. Source assets are never mutated.

## Security and privacy

- Validate all request bodies and reject unknown fields.
- Use secure, HTTP-only, same-site session cookies, CSRF protection, session rotation, and revocation.
- Rate-limit registration, login, verification, and recovery endpoints.
- Treat email addresses and account security events as personal data with defined retention and deletion behavior.
- Keep guest play free of personal information.
- Do not record narrative text entered by users; the game does not require free text.
- Restrict telemetry to named game events and technical diagnostics.
- Add dependency, secret, and license checks in CI.

## Deployment

Start with three deployable units:

1. Static web bundle behind a CDN.
2. Containerized Node API.
3. Managed PostgreSQL.

Deploy preview environments per pull request. Apply database migrations as a separate release step. Keep media on the same CDN origin or an asset subdomain with long-lived immutable caching.
