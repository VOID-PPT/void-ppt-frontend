# SKILLS.md — void-ppt-frontend

Agent skills for this repo. Skills are **machine-local tools** (installed to
`~/.agents/skills/`), not source code — they are never committed. Any agent or
new teammate must install them once per machine.

> **Agents (Antigravity, Cursor, Claude Code, Copilot, Junie...)**: if a skill listed
> below is missing, install it before starting work, then continue the task.
> `AGENTS.md` is the authority on _when_ each skill applies.

## Install (copy-paste this block)

The skills CLI installs **one package per invocation**, so use this loop:

```bash
for p in \
  vercel-labs/agent-skills@vercel-react-best-practices \
  vercel-labs/agent-skills@vercel-composition-patterns \
  anthropics/skills@frontend-design \
  vercel-labs/agent-skills@web-design-guidelines \
  mattpocock/skills@code-review \
  callstackincubator/agent-skills@github-actions \
  openai/skills@gh-fix-ci \
  figma/mcp-server-guide@figma-design-to-code \
  figma/mcp-server-guide@figma-generate-design \
  figma/mcp-server-guide@figma-use \
  vercel-labs/agent-skills@deploy-to-vercel \
  cloudflare/skills@wrangler \
  vercel-labs/skills@find-skills \
; do npx -y skills add "$p" -g -y; done
```

Verify:

```bash
npx skills list -g
```

Update all later:

```bash
npx skills update -g
```

## Frontend skills

| Skill                         | Source                   | Use when                                                                       |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------ |
| `vercel-react-best-practices` | vercel-labs/agent-skills | Any React component or hook work — performance, rendering, data flow           |
| `vercel-composition-patterns` | vercel-labs/agent-skills | Designing component APIs; compound components, render props, React 19 patterns |
| `frontend-design`             | anthropics/skills        | Before building any new UI surface — avoids generic/templated aesthetics       |
| `web-design-guidelines`       | vercel-labs/agent-skills | Auditing UI for accessibility, layout, and design-system compliance            |
| `figma-design-to-code`        | figma/mcp-server-guide   | Implementing a screen from a Figma file (pixel-accurate)                       |
| `figma-use`                   | figma/mcp-server-guide   | Required companion for any Figma MCP write/read action                         |
| `figma-generate-design`       | figma/mcp-server-guide   | Pushing code-built screens back into Figma                                     |
| `deploy-to-vercel`            | vercel-labs/agent-skills | Deploying previews/production to Vercel                                        |
| `wrangler`                    | cloudflare/skills        | Cloudflare Pages deployment and Wrangler CLI                                   |

## Shared process skills

| Skill            | Source                          | Use when                                          |
| ---------------- | ------------------------------- | ------------------------------------------------- |
| `code-review`    | mattpocock/skills               | Before reporting any non-trivial task complete    |
| `github-actions` | callstackincubator/agent-skills | Writing or changing `.github/workflows/`          |
| `gh-fix-ci`      | openai/skills                   | A CI check failed — diagnose from logs, fix, push |
| `find-skills`    | vercel-labs/skills              | A task needs a capability not covered here        |

## Prerequisites for Figma skills

The three `figma-*` skills drive the **Figma MCP server**, which must be enabled in
the Figma desktop app (Preferences → _Enable Dev Mode MCP server_) or connected via
the remote `https://mcp.figma.com/mcp` endpoint with OAuth. No token is stored in
this repo.

## Backend repo

`../void-ptt-backend` has its own `SKILLS.md` (RAG, LLM, observability, Postgres).
If a task touches the API contract, install those too and regenerate types with
`npm run api:types` after the backend change lands.
