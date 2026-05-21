# Tech Design: [AAW-13] Sum of Prime

> Part 1 — Problem Analysis & Solution Scoping

## 1. Context

### 1.1. Overview

| Title | [AAW-13] Sum of Prime |
| --- | --- |
| Description | [AAW-13] Sum of Prime |
| PRD | [PRD](https://coindcx.atlassian.net/wiki/spaces/OrcaDocs/pages/4256268336/AAW-13+PRD+AAW-13+Sum+of+Prime) |
| Ticket | [AAW-13](https://coindcx.atlassian.net/browse/AAW-13) |
| Platform | TBD |
| Team | Product: TBD  EM: TBD  Staff: TBD  Developers: TBD  QA: TBD  Perf: TBD |
| Document Author | Ankur Raj |
| Requested Reviewers | TBD |
| Status | Proposed — Ankur Raj — 2026-05-21 — v1 |

### 1.2. Objective
We are building a simple HTTP endpoint that calculates and returns the sum of prime numbers between 0 and 10, integrated into our existing Node.js/Express service architecture.

### 1.3. Problem Statement

#### 1.3.5 Constraints & Invariants
- The PRD specifies C++ but our service is Node.js/Express
- Fixed range of 0-10 (expected result: 17)
- Must integrate with existing HTTP API pattern

### 1.4. Goals
- Implement prime number calculation functionality returning sum of primes 0-10
- Expose via RESTful HTTP endpoint following existing patterns
- Maintain 100% test coverage for new code
- Ensure consistent API response format

### 1.5. Non-Goals
- C++ implementation (adapting to Node.js)
- User-configurable ranges
- Performance optimization for large numbers
- Database storage of results

### 1.6. Actors / Personas
- API consumers requiring prime sum calculations

### 1.7. Use Cases / Scenarios / User Stories
- As an API consumer, I want to get the sum of prime numbers 0-10 via HTTP GET

### 1.8. Success Metrics
- Endpoint returns correct sum (17)
- 100% uptime for the endpoint
- Sub-100ms response time

## 2. Detailed Background Analysis

### 2.1 Documentation Referenced and Pre-Reads
- CLAUDE.md (project structure and patterns)
- Existing route patterns in routes/api.js

## 3. Scope of the Solution

### 3.1. Assumptions / Premise
- We're adapting the C++ requirement to Node.js to fit our architecture
- The fixed range (0-10) is sufficient
- No authentication required (following existing patterns)

### 3.2. Functional Requirements
- GET endpoint that returns sum of primes 0-10
- Response format consistent with existing endpoints
- Prime identification logic (2, 3, 5, 7)

### 3.3. Non-Functional Requirements (Explicit & Implicit)
- Response time < 100ms
- No external dependencies
- Follow existing code style (2-space, double quotes, async/await)

### 3.5. Constraints
- Must integrate into existing Express router structure
- Must follow existing error handling patterns

## 4. Solution Proposals

### 4.1. Candidates Considered
1. Standalone C++ binary with Node.js wrapper
2. Native Node.js implementation in routes
3. Separate service module with route handler

### 4.2. Candidate Chosen
Native Node.js implementation following existing patterns (option 3)

### 4.3. Decision Rationale
- Maintains architectural consistency
- No additional toolchain requirements
- Testable with existing Jest setup
- Follows established service/route separation

> Part 2 — Technical Design of the Final Solution

## 5. System Design

### 5.1. HLD

#### 5.1.1 System Architecture

```
client → GET /api/primes/sum → routes/api.js → services/primeService.js
                                                         │
                                                         └─ calculates sum
```

Components:
- New route handler in `routes/api.js`
- New service module `services/primeService.js` for business logic
- Feature flag `PRIME_SUM_ENABLED` with default `false`

#### 5.1.3 Feasibility Assessment
Straightforward implementation using existing patterns. No technical blockers.

### 5.2. LLD

#### 5.2.1 Component & Workflow Design
1. Client sends GET /api/primes/sum
2. Route handler checks feature flag
3. If enabled, calls primeService.calculateSum()
4. Service calculates primes 0-10 and returns sum
5. Route returns JSON response

#### 5.2.2 API Spec
- **Endpoint**: GET /api/primes/sum
- **Estimated RPS**: < 10
- **Request**: No parameters
- **Response**:
  ```json
  {
    "ok": true,
    "sum": 17,
    "primes": [2, 3, 5, 7]
  }
  ```
- **Feature flag disabled response**:
  ```json
  {
    "ok": true,
    "flagOff": true
  }
  ```
- **Status codes**: 200 (always)

#### 5.2.8 Source Code
Repository: Current repository

### 5.3. Dependency

### 5.4. Non-Functional Decisions (tiered)

#### 5.4.3 Tier 3 (Medium)
- **Debugability**: Console logging for calculation steps
- **Cost**: Negligible (simple computation)

### 5.5. Limitations
- Fixed range 0-10 only
- No caching (unnecessary for simple calculation)

### 5.6. Future Work
- Parameterizable ranges
- Prime factorization endpoints

> Part 3 — Implementation

## 6. Operability

### 6.1 Deployment
- **Pre-Release**: Add `PRIME_SUM_ENABLED=false` to environment
- **Release Plan**: Standard deployment via deploy.sh
- **Kill Switch**: `PRIME_SUM_ENABLED` environment variable

## 7. Execution

### 7.1 Development
- **Timeline**: 1 day
- **Execution Plan**:
  1. Add feature flag to featureFlags.js
  2. Create services/primeService.js
  3. Add route to routes/api.js
  4. Write tests in tests/

### 7.2 Testing
- Unit tests for prime calculation logic
- Integration test for endpoint
- Test feature flag behavior

## 8. Outcome

### 8.1 Impact
- **Business**: New mathematical computation capability
- **System Operations**: Minimal impact, no external dependencies

## 9. Appendix

### 9.1 References
- Prime numbers: 2, 3, 5, 7 (between 0-10)
- Expected sum: 17

### 9.5 Open Questions
- Should we support custom ranges in future?

## Appendix A: Files That Will Change
- `featureFlags.js`
- `routes/api.js`
- `services/primeService.js`
- `tests/api.test.js`
- `tests/primeService.test.js`