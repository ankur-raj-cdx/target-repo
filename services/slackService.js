/**
 * Thin wrapper around the Slack Web API.
 *
 * If SLACK_BOT_TOKEN is missing OR the slackPingEnabled flag is off, we
 * return `{ ok: true, flagOff: true }` rather than throwing. This is the
 * graceful-degradation contract every external service in this repo must
 * honour (see security.md, decisions.md).
 */
const flags = require("../featureFlags");

async function ping() {
  if (!flags.slackPingEnabled) {
    return { ok: true, flagOff: true };
  }

  const token = process.env.SLACK_BOT_TOKEN;
  if (!token) {
    return { ok: true, flagOff: true, reason: "missing_token" };
  }

  // Real implementation would call https://slack.com/api/chat.postMessage
  // For the demo we just acknowledge.
  return { ok: true, posted: true };
}

module.exports = { ping };
