# Decisions Log

Architecturally-significant decisions made by the team (or approved through
the agent pipeline). The Issue and Spec agents read these to ensure new
work is consistent with what's already been decided.

## 2026-01-15 — All external calls must be feature-flagged
**Context:** A misconfigured Slack token caused a 30 minute outage on Jan 14.
**Decision:** Every new integration must read its credentials lazily and fall
back to a no-op response (returning `flagOff: true`) when missing.
**Approved by:** Dev Manager

## 2026-02-02 — `/api/status` must never depend on external services
**Context:** A Slack rate-limit cascade took the health check down.
**Decision:** `/api/status` returns a static healthy payload. Anything richer
goes behind `/api/status/full` and is allowed to fail.
**Approved by:** Dev Manager
