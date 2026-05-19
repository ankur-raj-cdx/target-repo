# Spec: Add a GET /api/yin endpoint that returns { "yang": true }

**Request:** Add a GET /api/yin endpoint that returns { "yang": true }
**Date:** 2024-12-19

## 1. Summary

Add a new GET endpoint at `/api/yin` that returns a static JSON response `{ "yang": true }`. This provides a simple test endpoint for validating JSON response handling in the service. The endpoint requires no authentication, accepts no parameters, and has no external dependencies.

## 2. API Contract

| Method | Path | Auth | Request Body | Response | Status Codes |
|--------|------|------|--------------|----------|--------------|
| GET | `/api/yin` | none | none | `{ "yang": true }` | 200 |

## 3. Data Model Changes

None required.

## 4. Service Interactions

None. This endpoint is self-contained and calls no external services.

```
client → GET /api/yin → routes/api.js → return { "yang": true }
```

## 5. Feature Flag

Not applicable - this endpoint has no external dependencies.

## 6. Error Handling

| Failure Scenario | Expected Behaviour | HTTP Status | Logged? |
|------------------|-------------------|-------------|---------|
| Invalid HTTP method (POST, PUT, etc.) | Express default 404 | 404 | No |
| Server error during JSON serialization | Express default error handler | 500 | Yes |

Note: This endpoint should not be used as a health check. `/api/status` remains the canonical health check endpoint.

## 7. Tests Required

- [ ] [happy_path] GET /api/yin returns 200 with body `{ "yang": true }`
- [ ] [happy_path] Response Content-Type header is `application/json`
- [ ] [edge_case] Response body structure is exactly `{ "yang": true }` with no additional fields
- [ ] [regression] /api/status still returns healthy

## 8. Rollback Plan

- Remove the route handler from `routes/api.js`
- Remove the test from `tests/api.test.js`
- Update CLAUDE.md Routes table

## 9. Out of Scope

- Authentication or authorization
- Query parameters or request body handling
- Feature flag implementation
- Rate limiting
- Converting this to a health check endpoint

## 10. Open Questions

- Should this endpoint follow the feature flag pattern even though it has no external dependencies? (Current decision: No, as per coding standards flags are only for external API calls)
- Is this intended as a permanent endpoint or a temporary testing utility? (Implement as permanent unless instructed otherwise)