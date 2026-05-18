# Architecture

```
                  ┌──────────────┐
HTTP client ─────▶│  Express app │
                  │   (routes/)  │
                  └──────┬───────┘
                         │
                         ▼
                  ┌──────────────┐         ┌──────────────┐
                  │ services/*   │────────▶│ External API │
                  │ (mockable)   │  HTTPS  │ (Slack, ...) │
                  └──────────────┘         └──────────────┘
```

## Components

- **routes/api.js** — Express router. One file per high-level domain in
  the future; currently a single file.
- **services/slackService.js** — Encapsulates the Slack Web API.
  Returns `{ ok: true, flagOff: true }` when the bot token is missing
  so callers never get a 5xx.
- **featureFlags.js** — Single source of truth for boolean flags. Each
  flag reads `process.env.<NAME>_ENABLED` and defaults to false.

## Cross-cutting

- Health check: `/api/status`. Independent of any service.
- Deploys: `deploy.sh` script — staging, production, rollback.
- Tests: Jest under `tests/`, all externals mocked.

## Service Interactions

```
client → /api/slack/ping → routes/api.js → services/slackService.js → Slack
                                                      │
                                                      └─ if no token: returns flagOff
```
