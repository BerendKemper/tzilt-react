# tzilt-react

React frontend for `tzilt.nl` backed by the Cloudflare worker API.

## Goals
- Keep implementation dependency-light.
- No WordPress plugins or copied images.
- Mirror current site information with a clean custom layout.

## Routes
- `/`
- `/about-us`
- `/opening-hours`
- `/menukaart`
- `/reserveren`
- `/groepen-en-partijen`

## Local dev
```bash
npm install
npm run dev
```

## Backend API
On localhost the app defaults to:
- API: `http://127.0.0.1:8787`
- files: `http://127.0.0.1:8787/media`

Live defaults are:
- API: `https://api.tzilt.nl`
- files: `https://files.tzilt.nl`

Override when needed:
```bash
VITE_API_BASE=https://api.tzilt.nl npm run dev
VITE_FILES_BASE=https://files.tzilt.nl npm run dev
```
