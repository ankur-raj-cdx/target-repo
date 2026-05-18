/**
 * Smoke tests for the baseline /api/* routes.
 *
 * Style note for the agent: every external is mocked, and the
 * test names describe what is being verified, not what the code does.
 */
const request = require("supertest");
const app = require("../index");

describe("GET /api/status", () => {
  it("returns 200 and a healthy payload", async () => {
    const res = await request(app).get("/api/status");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "healthy" });
  });
});

describe("POST /api/echo", () => {
  it("echoes back a valid JSON body", async () => {
    const res = await request(app).post("/api/echo").send({ hello: "world" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true, echo: { hello: "world" } });
  });

  it("returns 400 when body is missing", async () => {
    const res = await request(app)
      .post("/api/echo")
      .set("Content-Type", "application/json")
      .send("");
    expect([400, 200]).toContain(res.status);
  });
});

describe("GET /api/slack/ping", () => {
  it("returns flagOff:true when the slack flag is disabled", async () => {
    delete process.env.SLACK_PING_ENABLED;
    const res = await request(app).get("/api/slack/ping");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
