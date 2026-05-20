# CLAUDE.md — Project Context

This file gives any agent (or new engineer) the canonical context for this codebase.
**Keep it accurate. The Issue, Spec, and Code agents all read it before acting.**

## Project

A small Node.js / Express service that exposes a handful of HTTP endpoints
backed by external services (Slack, etc.). It's our reference target for the
`autonomy` agentic SDLC pipeline.

- **Language:** JavaScript (Node.js 20+)
- **Framework:** Express 4
- **Test runner:** Jest
- **Linter:** ESLint
- **Style:** 2-space indent, double quotes, async/await, no callbacks.

## Directory Layout

```
.
├── routes/        # Express route handlers
│   └── api.js     # all /api/* routes
├── services/      # external integrations + business logic
│   └── slackService.js
├── tests/         # *.test.js — Jest, mocked externals
├── featureFlags.js
├── deploy.sh
├── package.json
├── docs/specs/    # agent-authored feature specs
└── ...
```

## Routes

| Method | Path             | Auth | Description                                       |
|--------|------------------|------|---------------------------------------------------|
| GET    | `/api/status`    | none | Health check — must always return 200             |
| POST   | `/api/echo`      | none | Echoes the JSON body back (for smoke tests)       |
| GET    | `/api/slack/ping`| none | Posts a ping to the configured Slack channel      |
| GET    | `/api/hello`     | none | Demo endpoint returning hello message              |

## Services

| File                            | Wraps                | Notes                                              |
|---------------------------------|----------------------|----------------------------------------------------|
| `services/slackService.js`      | Slack Web API         | Reads `SLACK_BOT_TOKEN`. Returns flag-off response if absent. |

## Feature Flag Pattern

All flags live in `featureFlags.js`. Read `process.env.<NAME>_ENABLED` and
fall back to `false`. Wrap every new external API call:

```js
const flags = require("./featureFlags");

if (!flags.slackPingEnabled) {
  return { ok: true, flagOff: true };
}
```

## Coding Standards

- Validate inputs at the top of handlers. Return 400 early.
- Wrap every external call in `try/catch` and log the error.
- Never throw 500 due to a missing API key — return 200 + `flagOff: true`.
- Mock externals in tests via `nock` or `jest.mock`.

## Health Check

`GET /api/status` is sacred. It must:
- Always return 200.
- Never depend on an external service.
- Be the first route registered.

The deploy script polls it for 5 minutes after deploy; a non-200 triggers
automatic rollback.

## Deployment

`./deploy.sh staging|production|rollback` — see the script for details. It
must print a URL on the last line of stdout on success.