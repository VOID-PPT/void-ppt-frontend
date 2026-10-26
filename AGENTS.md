# AGENTS.md — void-ppt-frontend

> **Product vision**: VOID is an AI learning-tutor platform. A user picks any subject —
> business analysis, gym training, IELTS, economics, Binance, blockchain, anything —
> and VOID generates a structured learning path with slides, study materials, and
> knowledge grounded in the documents the user uploads (RAG). The same engine powers
> custom features we ship on top.
>
> This file is the contract for every AI agent (Antigravity, Cursor, Claude, Copilot...)
> and human working in this repo. The **backend repo** (`void-ptt-backend`) has a
> mirrored AGENTS.md — keep both in sync when rules change.

## Project facts

|              |                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Role         | SPA client for the VOID AI learning platform                                                                            |
| Stack        | React 19 · TypeScript strict · Vite · TanStack Router + Query · Zustand · Tailwind v4 · shadcn/ui · Vitest · Playwright |
| Backend      | `void-ptt-backend` (FastAPI). Dev proxy: `/api/v1` → `localhost:8000`                                                   |
| Architecture | Feature-sliced: `routes → pages → features → entities → shared`, imports point inward only                              |
| Team         | 2 people, free-tier infrastructure only                                                                                 |

## Layout

```
src/
├── main.tsx                    Entry → AppProviders → AppRouter
├── app/                        Providers (Query), layouts, devtools overlay
├── routes/                     TanStack file routes (auto code-splitting)
├── features/
│   ├── auth/api/               useSession() — COMPLETE pattern reference
│   └── presentations/api/      usePresentations() — query-key factory pattern
├── entities/                   Shared domain models (pending)
└── shared/
    ├── api/client.ts           Thin fetch wrapper + ApiError
    ├── config/env.ts           The ONLY env-var access point
    ├── types/api.d.ts          OpenAPI-generated (npm run api:types) — never hand-edit
    └── ui/                     shadcn/ui primitives (design system)
```

New feature = new folder in `features/<name>/` with `api/` (Query hooks),
`components/`, `model/` (types + Zustand where needed). Copy the auth pattern.

## Skills to use (~/.agents/skills)

> **Onboarding / first run**: if a skill below is missing, read **`SKILLS.md`** and
> run its install block first (one package per CLI call, loop provided there).
> Do this automatically, then continue the task — do not ask the user to install them.

| Skill                                       | When                                                          |
| ------------------------------------------- | ------------------------------------------------------------- |
| `vercel-react-best-practices`               | ALL React component/hook work                                 |
| `vercel-composition-patterns`               | Designing component APIs (compound components, render props)  |
| `frontend-design` + `web-design-guidelines` | Before building any UI surface                                |
| `figma-design-to-code` + `figma-use`        | Implementing screens from Figma (requires Figma Dev Mode MCP) |
| `figma-generate-design`                     | Pushing code-built screens back into Figma                    |
| `github-actions`                            | Writing/changing CI workflows in `.github/workflows/`         |
| `gh-fix-ci`                                 | When a CI check fails — diagnose from logs, fix, push         |
| `code-review`                               | Before reporting ANY task complete                            |

## Hard rules

1. **Server state only in TanStack Query hooks** under `features/<f>/api/`. Components never call the API client directly. Zustand is UI state only.
2. **Env vars only via** `src/shared/config/env.ts`.
3. **API types only from** `src/shared/types/api.d.ts` (generated via `npm run api:types` with the backend running). Never hand-edit.
4. **`@/` alias everywhere**; no relative imports across layers.
5. **Never edit generated files**: `routeTree.gen.ts`, `api.d.ts`.
6. **Gate before completion**: `npm run build && npm run lint && npm test`.

## CI/CD

- `.github/workflows/ci.yml` — build + lint + test on every push/PR (Node 22). Must stay green.
- Deployment target: Cloudflare Pages free tier (`dist/`), or Vercel free tier —
  both use `wrangler`/vercel skills. Use the `gh-fix-ci` skill when checks fail; never merge red.

## Definition of done

Gate passes · new behavior has a test · API types regenerated if the backend contract
changed · AGENTS.md/README.md updated if conventions changed · backend repo notified
of any contract change needed.
