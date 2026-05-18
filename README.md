# target-repo

Reference codebase used by the [`autonomy`](../) agentic SDLC pipeline.

The agent reads:

- `CLAUDE.md` — coding standards + route table
- `TODO.md` — open work items
- `architecture.md` — service map
- `decisions.md` — past architecture decisions
- `dependencies.md` — external API quirks
- `security.md` — security and compliance constraints
- `featureFlags.js` — the flag pattern

…and writes to:

- `docs/specs/<jira-key>-<slug>-spec.md` — generated feature specs
- the codebase itself (routes/, services/, tests/)
- `changelog.md` — auto-prepended on each deploy

## Local commands

```bash
npm install
npm run dev       # boots Express on :3000 with /api/status
npm run lint      # ESLint check
npm test          # Jest with coverage
```

## Deploy

```bash
./deploy.sh staging
./deploy.sh production
./deploy.sh rollback
```
