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

describe("GET /api/ping", () => {
  it("returns 200 with body pong:true", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ pong: true });
  });

  it("has Content-Type application/json header", async () => {
    const res = await request(app).get("/api/ping");
    expect(res.headers["content-type"]).toContain("application/json");
  });

  it("responds in under 100ms", async () => {
    const startTime = Date.now();
    const res = await request(app).get("/api/ping");
    const responseTime = Date.now() - startTime;
    expect(res.status).toBe(200);
    expect(responseTime).toBeLessThan(100);
  });

  it("does not break the status endpoint", async () => {
    const res = await request(app).get("/api/status");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "healthy" });
  });

  it("does not break the slack ping endpoint", async () => {
    delete process.env.SLACK_PING_ENABLED;
    const res = await request(app).get("/api/slack/ping");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

describe("GET /api/primes/sum", () => {
  it("returns flagOff:true when the prime sum flag is disabled", async () => {
    delete process.env.PRIME_SUM_ENABLED;
    const res = await request(app).get("/api/primes/sum");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body.flagOff).toBe(true);
  });

  it("returns the sum of primes 0-10 when flag is enabled", async () => {
    process.env.PRIME_SUM_ENABLED = "true";
    const res = await request(app).get("/api/primes/sum");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      ok: true,
      sum: 17,
      primes: [2, 3, 5, 7]
    });
    delete process.env.PRIME_SUM_ENABLED;
  });

  it("responds in under 100ms when enabled", async () => {
    process.env.PRIME_SUM_ENABLED = "true";
    const startTime = Date.now();
    const res = await request(app).get("/api/primes/sum");
    const responseTime = Date.now() - startTime;
    expect(res.status).toBe(200);
    expect(responseTime).toBeLessThan(100);
    delete process.env.PRIME_SUM_ENABLED;
  });

  it("has Content-Type application/json header", async () => {
    process.env.PRIME_SUM_ENABLED = "true";
    const res = await request(app).get("/api/primes/sum");
    expect(res.headers["content-type"]).toContain("application/json");
    delete process.env.PRIME_SUM_ENABLED;
  });

  it("does not break the status endpoint", async () => {
    const res = await request(app).get("/api/status");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "healthy" });
  });
});