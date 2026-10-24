# shared

Cross-cutting, feature-agnostic code. Anything here must be usable by
multiple layers without knowing about features.

- `ui/` — design-system components (shadcn/ui primitives land here)
- `lib/` — framework-agnostic utilities (formatting, dates, cn helper)
- `api/` — HTTP client shell over the FastAPI backend
- `config/` — env access, constants
- `types/` — OpenAPI-generated API types (`npm run api:types`)

Rules:

- No imports from `features/`, `pages/`, or `app/` — dependencies point inward only.
- Keep it small; if it only serves one feature, it belongs in that feature.
