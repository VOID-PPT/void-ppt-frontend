# void-ppt-frontend

**VOID** is an AI learning-tutor platform: a user picks any subject — business analysis,
gym, IELTS, economics, Binance, blockchain, anything — and VOID builds a structured
learning path with slides and study materials grounded in the user's own uploaded
documents (RAG).

This repo is the SPA client. The API service and AI engine live in
[`void-ptt-backend`](../void-ptt-backend) (mirrored README/AGENTS.md — keep in sync).

## Stack

React 19 · TypeScript (strict) · Vite · TanStack Router (file-based, auto code-split) ·
TanStack Query (server state) · Zustand (UI state) · Tailwind CSS v4 · shadcn/ui ·
Vitest + Testing Library · Playwright

## Status

| Area                                                                 | State       |
| -------------------------------------------------------------------- | ----------- |
| Scaffold, app shell, providers, design system (11 shadcn primitives) | ✅ complete |
| Auth session + presentations query hook patterns                     | ✅ complete |
| OpenAPI types generated from backend                                 | ✅ complete |
| Dashboard, deck editor, upload flow, learning-path UI                | 🚧 next     |

Architecture: **[AGENTS.md](AGENTS.md)** — feature-sliced layers, working agreement,
and the verification gate. Agent skills (machine-local, install once):
**[SKILLS.md](SKILLS.md)**.

## Getting started

Requires Node 22+.

```bash
npm install
cp .env.example .env
npm run dev           # http://localhost:5173 — proxies /api/v1 → localhost:8000
```

## Commands

| Command                           | Purpose                                                                     |
| --------------------------------- | --------------------------------------------------------------------------- |
| `npm run dev`                     | Dev server with HMR                                                         |
| `npm run build`                   | Typecheck + production build                                                |
| `npm run lint` / `npm run format` | ESLint / Prettier                                                           |
| `npm test`                        | Vitest unit tests                                                           |
| `npm run e2e`                     | Playwright e2e (boots dev server)                                           |
| `npm run api:types`               | Regenerate `src/shared/types/api.d.ts` from the backend (must run on :8000) |

## Architecture

Feature-sliced — dependencies point inward only:

```
src/
├── app/         Providers (Query client), layouts, devtools overlay
├── routes/      TanStack file routes (auto code-splitting)
├── features/    Vertical slices: auth, presentations, ... (api/components/model)
├── entities/    Shared domain models
└── shared/      Design system (shadcn/ui), API client, env config, generated API types
```

Rules: server state only in Query hooks · env only via `shared/config/env.ts` ·
types only from generated `api.d.ts` · never edit generated files.

## Design system

Tailwind v4 CSS-first tokens (`@theme` in `src/index.css`), Geist font, shadcn/ui in
`src/shared/ui/`. Add primitives: `npx shadcn@latest add <name>` (the CLI may emit into
a literal `@/` folder — move files into `src/shared/ui/` when it does).

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`): build + lint + test on every push/PR.
Deploy: Cloudflare Pages free tier (`dist/`). Gate: `npm run build && npm run lint && npm test`.
