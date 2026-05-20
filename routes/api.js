/**
 * /api/* routes.
 *
 * Style rules (see CLAUDE.md):
 *   - validate inputs at the top of the handler
 *   - try/catch around every external call
 *   - never throw 5xx because a flag is off
 */
const express = require("express");
const slackService = require("../services/slackService");

const router = express.Router();

router.get("/status", (_req, res) => {
  res.status(200).json({ status: "healthy" });
});

router.post("/echo", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ ok: false, error: "body must be JSON object" });
  }
  return res.status(200).json({ ok: true, echo: req.body });
});

router.get("/slack/ping", async (_req, res) => {
  try {
    const result = await slackService.ping();
    return res.status(200).json(result);
  } catch (err) {
    console.error("slack ping failed", err);
    return res.status(200).json({ ok: true, flagOff: true, reason: "slack_unavailable" });
  }
});

router.get("/ping", (_req, res) => {
  res.status(200).json({ pong: true });
});

router.get("/piing", (_req, res) => {
  res.status(200).json({ pongg: true });
});

module.exports = router;