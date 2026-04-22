# Project Memory Note

This repository is the frontend for `tzilt.nl`.

## Agent-Facing Documentation
- Keep `AGENTS.md`, `PLAN.md`, and other agent-facing docs plain ASCII.
- Use straight quotes, regular hyphens, and simple Markdown.
- Avoid smart punctuation, decorative Unicode, and emoji.

## Linked Repositories
- Frontend (this repo): `C:/dev/projects/tzilt/tzilt-react`
- Backend (Cloudflare Worker API): `C:/dev/projects/tzilt/tzilt-cloudflare`

## Deployment Intent
- Frontend serves website pages.
- Backend API will run on `api.tzilt.nl`.
- Public file storage/delivery will run on `files.tzilt.nl`.

## Product Scope
- Restaurant website migration away from WordPress.
- Plugin-free and dependency-light implementation.
- Avoid unnecessary npm packages.
- No current WordPress images should be copied yet.

## Frontend Notes
- Prefer the shared `--component-spacing` CSS variable for page/card spacing before introducing one-off spacing values.
- Planned next content model: move page rendering toward D1-backed `pages` + `content_blocks` instead of hardcoded React content.
- Recommended `content_blocks` shape: `page_slug`, `type`, `sort_order`, `active`, `payload_json`.
- Prefer JSON payloads per block type for now instead of over-normalizing many SQL tables too early.
- Intended first block types: `richText` and `documents`.
- `MenukaartenPage` is still hardcoded in React and should later migrate into D1-backed content blocks / R2-backed files.
- Reservation work is expected in two tracks:
  - simple event reservation requests
  - more complex daily table reservations
- The first public event-reservation integration should be tested here as the guinea pig customer website for `Reservaboard`.
- Event reservation UX assumptions:
  - guests stay on the customer website instead of being redirected to `reservaboard.com`
  - guests may select one or multiple venues by checkbox
  - guests should provide `start_at` and `end_at` for the intended booking range
- Future table reservation UI is expected to include:
  - background image or floorplan
  - overlaid tables with reservable status colors
  - filtering by table size
- Admin/owner UI will likely need controls for:
  - default table availability layout
  - per-day layout overrides
- Reservee sign-in is being considered for future features:
  - reusable customer identity/contact data
  - possible messaging/chat with staff later
  - possible Google/Microsoft calendar reminder/sync later
  - compatibility with deposit-based reservations
- Keep the current reservation frontend simple until the backend/domain model for reservations is designed more fully.
