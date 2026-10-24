# features

Feature modules — self-contained vertical slices (auth, presentations, slides, editor).

Each feature may contain:

- `api/` — TanStack Query hooks wrapping `shared/api` (the ONLY server-state layer)
- `components/` — feature-scoped UI, composed from `shared/ui`
- `model/` — feature state (Zustand stores only where TanStack Query doesn't fit) and domain logic

Rules:

- Features may import from `entities/` and `shared/`, never from each other.
- Components never call the API client directly; they consume Query hooks.
- Route files (`src/routes/`) wire features into the router via loaders.
