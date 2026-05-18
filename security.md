# Security & Compliance Constraints

These constraints are stored in agentmemory with importance=10 and never
decay. Every spec the Spec Agent writes must respect them.

## Secrets

- No secrets in source control. Use environment variables.
- Bot tokens, API keys, and any third-party credential must read from
  `process.env` and degrade gracefully when missing.

## PII

- We do not log request bodies on any endpoint that may receive user
  content (currently `/api/echo`).
- User identifiers (Slack `userId`, email) may be logged for debugging
  but must be masked beyond the first 3 characters.

## Network

- All outbound HTTPS only. No plaintext HTTP.
- External calls must time out within 10 seconds.

## Audit

- Every production deploy creates a changelog entry and a crystal in
  agentmemory. Never bypass `deploy.sh production`.
