# External Dependencies & API Quirks

Living document of every external API we depend on and the gotchas we've
learned the hard way. The Spec and Code agents read this before drafting
anything that touches an external service.

## Slack Web API

- **Auth:** Bot token via `SLACK_BOT_TOKEN`.
- **Rate limit:** Tier 3 — ~50 requests / minute / channel for chat.postMessage.
- **Quirk:** When the token is revoked Slack returns 200 with
  `ok: false, error: "invalid_auth"`. Always inspect `ok`, not the HTTP code.
- **Quirk:** `chat.postMessage` accepts either `channel` ID or name; name
  resolution is silently flaky — prefer IDs.

## (Future entries…)
