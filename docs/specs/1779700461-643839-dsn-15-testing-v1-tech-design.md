# Tech Design: [DSN-15] Testing v1

> Part 1 — Problem Analysis & Solution Scoping

## 1. Context

### 1.1. Overview

| Title | [DSN-15] Testing v1 |
| --- | --- |
| Description | [DSN-15] Testing v1 |
| PRD | [PRD](https://coindcx.atlassian.net/wiki/spaces/OrcaDocs/pages/4260528794/DSN-15+PRD+DSN-15+Testing+v1) |
| Ticket | [DSN-15](https://coindcx.atlassian.net/browse/DSN-15) |
| Platform | TBD |
| Team | Product: TBD  EM: TBD  Staff: TBD  Developers: TBD  QA: TBD  Perf: TBD |
| Document Author | Ankur Raj |
| Requested Reviewers | TBD |
| Status | Proposed — Ankur Raj — 2026-05-25 — v1 |

### 1.2. Objective
We are building a simple GET /api/ping endpoint that returns a JSON response `{ "pong": true }` to enable reliable monitoring and debugging of our API infrastructure.

### 1.3. Problem Statement

#### 1.3.1 System Context
Our Express API service currently lacks a dedicated lightweight endpoint for connectivity testing. While `/api/status` exists for health checks, operations teams need an even simpler endpoint specifically for network connectivity verification.

#### 1.3.3 Customer / Business / Operational Impact
- Operations engineers cannot easily verify basic API connectivity without invoking business logic
- Monitoring tools require credential management to use authenticated endpoints
- Debugging network issues is complicated without a minimal test endpoint

#### 1.3.5 Constraints & Invariants
- Must not depend on any external services or databases
- Must maintain sub-100ms response times
- Must follow existing route registration patterns in `routes/api.js`

### 1.4. Goals
- Provide endpoint with >99.9% uptime
- Achieve p99 response time <100ms
- Enable adoption by >3 monitoring tools within 30 days
- Return consistent JSON format `{ "pong": true }` with 200 status

### 1.5. Non-Goals
- Authentication or authorization
- Request logging specific to this endpoint
- Rate limiting mechanisms
- Complex health check logic (use `/api/status` for that)

### 1.6. Actors / Personas
- Operations Engineers: Need to verify API connectivity
- Monitoring Systems: Automated tools checking service availability
- DevOps Teams: Debugging connectivity issues

### 1.7. Use Cases / Scenarios / User Stories
- As an operations engineer, I want a simple ping endpoint so that I can verify API connectivity
- As a monitoring tool developer, I want JSON responses so that I can easily parse the health check result
- As a monitoring system, I want unauthenticated access so that I can check connectivity without credential management

### 1.8. Success Metrics
| Metric | Target | Measurement |
| --- | --- | --- |
| Endpoint uptime | >99.9% | Monitoring tool reports |
| Response time (p99) | <100ms | APM metrics |
| Adoption | >3 monitoring tools | Usage analytics |

## 2. Detailed Background Analysis

### 2.2 Current Landscape
The Express application in `routes/api.js` currently handles:
- GET `/api/status` - Health check endpoint
- POST `/api/echo` - Echo endpoint for smoke tests  
- GET `/api/slack/ping` - Slack integration ping

The new `/api/ping` endpoint will follow the same patterns but with minimal logic.

## 3. Scope of the Solution

### 3.1. Assumptions / Premise
- The Express framework can handle the additional route without performance impact
- A JSON response with single boolean field is sufficient for connectivity testing
- No middleware or authentication is needed for this endpoint

### 3.2. Functional Requirements
- Return JSON response `{ "pong": true }`
- Return HTTP 200 status code
- Set Content-Type header to `application/json`
- Handle GET requests to `/api/ping`

### 3.3. Non-Functional Requirements (Explicit & Implicit)
- Response time p99 < 100ms
- No external dependencies
- No authentication required
- Must not log request details

### 3.5. Constraints
- Must be added to existing `routes/api.js` file
- Must follow project coding standards (async/await, error handling)
- Cannot break existing routes

## 4. Solution Proposals

### 4.1. Candidates Considered
1. Add new route in `routes/api.js`
2. Create separate ping router file
3. Add to existing `/api/status` endpoint

### 4.2. Candidate Chosen
Add new route in `routes/api.js` following existing patterns

### 4.3. Decision Rationale
- Maintains consistency with existing route structure
- Minimal code change required
- Follows established patterns in the codebase
- Simple to test and maintain

> Part 2 — Technical Design of the Final Solution

## 5. System Design

### 5.1. HLD

#### 5.1.1 System Architecture
The ping endpoint integrates into the existing Express route structure:

```
HTTP GET /api/ping → Express Router → Route Handler → JSON Response
```

The handler will:
1. Receive GET request
2. Set JSON content-type header
3. Return `{ "pong": true }` with 200 status

This addresses the functional requirements by providing a minimal, dependency-free endpoint that responds quickly with consistent JSON.

### 5.2. LLD

#### 5.2.1 Component & Workflow Design
Route handler implementation in `routes/api.js`:
```javascript
router.get("/ping", async (req, res) => {
  res.json({ pong: true });
});
```

#### 5.2.2 API Spec
- **Estimated RPS**: 10-100 (monitoring tools polling)
- **Compatibility**: REST/JSON
- **Performance**: No caching needed, minimal processing
- **Security**: No authentication required
- **Contract**:
  - Request: GET /api/ping
  - Response: 
    - Status: 200 OK
    - Headers: Content-Type: application/json
    - Body: `{ "pong": true }`

#### 5.2.8 Source Code — Repository
Changes to existing repository structure in `routes/api.js`

### 5.4. Non-Functional Decisions (tiered)

#### 5.4.1 Tier 1 (Critical)
- **Performance**: Direct JSON response ensures <10ms processing time
- **Availability**: No external dependencies ensures high availability
- **Reliability**: Simple logic minimizes failure points

#### 5.4.3 Tier 3 (Medium)
- **Debugability**: Standard Express logging will capture requests
- **Cost**: Negligible - minimal CPU/memory usage

### 5.5. Limitations
- No request validation or sanitization (not needed for GET)
- No customizable response (by design)
- No metrics collection specific to this endpoint

### 5.6. Future Work
- Could add request count metrics if usage patterns warrant it
- Could extend to support HEAD requests for even lighter checks

> Part 3 — Implementation

## 6. Operability

### 6.1 Deployment
- **Branching strategy**: Feature branch → main
- **Release Plan**: Standard deployment, no migration needed
- **Kill Switches**: Not applicable - no external dependencies

## 7. Execution

### 7.1 Development
- **Timeline**: 1 hour implementation + testing
- **Execution Plan**: 
  1. Add route handler to `routes/api.js`
  2. Add test case to `tests/api.test.js`
  3. Manual verification
  4. Deploy to staging

### 7.2 Testing
- **Functional Test Cases**:
  - GET /api/ping returns 200
  - Response body contains `{ "pong": true }`
  - Content-Type header is application/json
- **Performance**: Verify sub-100ms response time under normal load

## 8. Outcome

### 8.1 Impact
- **Business**: Improved operational visibility
- **System Operations**: 
  - Simplified connectivity testing
  - Reduced debugging time
  - Better monitoring coverage
- **Engineering**: Minimal tech debt addition

### 8.2 Learnings & Insights
(to be filled post-launch)

## 9. Appendix

### 9.4 FAQs
Q: Why not extend /api/status?
A: The ping endpoint serves a different purpose - pure connectivity vs health status.

Q: Why "pong" instead of "ping" in response?
A: Following common ping/pong naming convention.

### 9.5 Open Questions
- Should this endpoint be added before or after the existing /api/status endpoint in route registration order?
- How will this endpoint differ from the existing /api/slack/ping endpoint to avoid confusion?

## Appendix A: Files That Will Change
- `routes/api.js`
- `tests/api.test.js`