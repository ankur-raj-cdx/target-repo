# TODO

Open work items the team has on its plate. The Issue Agent reads this to
avoid suggesting duplicates and to spot adjacent context.

## In flight

- (none — pipeline is idle)

## Backlog

- [ ] Add `/api/slack/optout` endpoint so users can suppress notifications.
- [ ] Migrate the Slack token to AWS Secrets Manager.
- [ ] Add request-id propagation through every external call.

## Tech debt

- [ ] `routes/api.js` is getting long — consider splitting per-domain.
- [ ] No structured logging — pino or winston needed.

## Known broken

- (none)
