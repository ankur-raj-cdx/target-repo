/**
 * Single source of truth for feature flags.
 *
 * Each flag defaults to false. Reading process.env.<NAME>_ENABLED === "true"
 * is the only allowed way to enable a flag — never hard-code true.
 *
 * Pattern for new features:
 *
 *   const flags = require("./featureFlags");
 *   if (!flags.myNewFeatureEnabled) {
 *     return { ok: true, flagOff: true };
 *   }
 *
 * NEVER throw 5xx because a flag is off. Always return a graceful
 * `{ ok: true, flagOff: true }` response so callers can degrade.
 */

function flag(name) {
  return process.env[`${name}_ENABLED`] === "true";
}

module.exports = {
  slackPingEnabled: flag("SLACK_PING"),
  primeSumEnabled: flag("PRIME_SUM"), // Requires env var: PRIME_SUM_ENABLED
};