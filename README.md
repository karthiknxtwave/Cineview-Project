# CineView

A TMDB-powered movie and TV browsing app built with React, TypeScript, Vite, MobX, and Styled Components.

## Prerequisites

- Node.js 18+
- A [TMDB API key](https://www.themoviedb.org/settings/api)

## Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy the environment template and add your TMDB credentials:

```bash
cp .env.example .env
```

3. Set `VITE_TMDB_API_KEY` in `.env` to your TMDB API key.

## Development

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Testing

```bash
npm test
```

## Build

```bash
npm run build
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_TMDB_BASE_URL` | TMDB API base URL (default: `https://api.themoviedb.org/3`) |
| `VITE_TMDB_API_KEY` | Your TMDB API key |

Never commit `.env` — it is gitignored. Use `.env.example` as a reference.

## Default Login

Use the hardcoded credentials defined in the Auth module constants to sign in during development.
