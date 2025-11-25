# Rate Limiting Design for AI Generation Endpoints

**Date**: January 26, 2025
**Priority**: HIGH
**Author**: Security Implementation Team

## Executive Summary

Implement rate limiting for AI generation endpoints to prevent abuse, control costs, and ensure fair usage among authenticated admin users.

## Context

### Current State
- Three AI generation endpoints: ALT tags, SEO titles, SEO descriptions
- All endpoints require authentication (admin users only)
- No rate limiting currently implemented
- Potential for cost overruns if automated or compromised

### Requirements
- Protect against excessive AI API usage (cost control)
- Prevent DoS attacks
- Ensure fair usage among admin users
- Simple implementation suitable for internal tools

## Design Decision

### Chosen Approach: Memory-Based Rate Limiting

**Rationale:**
- AI endpoints are admin-only (low traffic)
- Simple to implement and maintain
- No external dependencies
- Adequate for internal tool requirements
- Can upgrade to Redis if scaling needed

## Architecture

### Core Components

1. **Rate Limiter Utility** (`/src/utilities/rateLimiter.ts`)
   - Memory-based storage using Map data structure
   - Sliding window algorithm
   - Per-user request tracking
   - Automatic memory cleanup

2. **API Route Integration**
   - Applied after authentication check
   - Consistent across all AI endpoints
   - Standardized error responses

### Configuration

| Parameter | Value | Description |
|-----------|-------|-------------|
| Limit | 50 requests/hour | Per authenticated user |
| Window | Sliding 60 minutes | Counts requests in last hour |
| Identity | User ID | From authentication |
| Storage | In-memory Map | Resets on server restart |

## Implementation Details

### Rate Limiter Algorithm

```typescript
// Sliding window implementation
interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number; // Unix timestamp
}

// Storage structure
Map<userId, Array<timestamp>>
```

### Request Flow

1. User makes request to AI endpoint
2. Authentication check (existing)
3. Rate limiter check:
   - Count requests in last 60 minutes
   - If under limit: proceed
   - If over limit: return 429
4. Process AI generation (if allowed)
5. Add timestamp to user's request history

### Response Headers

**Success Response:**
```http
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1706293200
```

**Rate Limited Response (429):**
```http
HTTP/1.1 429 Too Many Requests
Retry-After: 3600
Content-Type: application/json

{
  "error": "Rate limit exceeded",
  "message": "You've reached the limit of 50 AI generations per hour",
  "retryAfter": 3600,
  "resetAt": "2025-01-26T16:00:00Z"
}
```

## Implementation Checklist

### Phase 1: Core Implementation
- [ ] Create rateLimiter utility with sliding window algorithm
- [ ] Add memory cleanup mechanism (10-minute interval)
- [ ] Implement RateLimitResult interface
- [ ] Add environment variable configuration

### Phase 2: API Integration
- [ ] Integrate into /api/generate-alt-tag
- [ ] Integrate into /api/generate-seo-title
- [ ] Integrate into /api/generate-seo-description
- [ ] Add rate limit headers to responses

### Phase 3: Error Handling
- [ ] Implement 429 error responses
- [ ] Add retry-after headers
- [ ] Ensure graceful degradation
- [ ] Add logging for rate limit events

### Phase 4: Testing
- [ ] Unit tests for rate limiter logic
- [ ] Integration tests for API endpoints
- [ ] Manual testing of rate limit triggers
- [ ] Verify header accuracy
- [ ] Test memory cleanup

### Phase 5: Monitoring
- [ ] Add usage logging
- [ ] Track rate limit hits
- [ ] Add console warnings at 80% usage
- [ ] Document monitoring approach

## Configuration

### Environment Variables

```env
# Rate Limiting Configuration
AI_RATE_LIMIT_PER_HOUR=50        # Requests per hour (default: 50)
AI_RATE_LIMIT_WINDOW_MINUTES=60  # Sliding window size (default: 60)
AI_RATE_LIMIT_ENABLED=true       # Enable/disable rate limiting
```

## Testing Strategy

### Unit Tests
- Sliding window calculation accuracy
- Memory cleanup doesn't affect active windows
- Edge cases (empty history, exact limit)

### Integration Tests
- API endpoints return 429 when limit exceeded
- Headers correctly calculated
- Authentication still required
- Graceful degradation

### Manual Testing
1. Make 50 requests within an hour
2. Verify 51st request returns 429
3. Wait for sliding window adjustment
4. Verify requests allowed again

## Monitoring & Observability

### Logging
- Each AI request: timestamp, user ID, endpoint
- Rate limit hits: user ID, timestamp, endpoint
- Memory cleanup events

### Metrics to Track
- Requests per user per hour
- Rate limit hits per day
- Most active users
- Peak usage times

## Security Considerations

1. **Memory Limits**: Cleanup prevents memory exhaustion
2. **User Isolation**: Each user has independent limit
3. **Graceful Degradation**: If limiter fails, log error but allow request
4. **No PII Logging**: Only log user IDs, not content

## Migration Path

### Initial Rollout
1. Deploy with generous limit (50/hour)
2. Monitor usage patterns for 1 week
3. Adjust limits based on actual usage

### Future Enhancements
- Redis backend for persistence
- Per-endpoint limits
- Role-based limits
- Usage analytics dashboard
- Webhook alerts for limit hits

## Rollback Plan

If issues arise:
1. Set `AI_RATE_LIMIT_ENABLED=false`
2. Restart application
3. Rate limiting bypassed, endpoints work normally

## Success Criteria

- [ ] No legitimate user workflows blocked
- [ ] AI API costs remain predictable
- [ ] No performance impact on endpoints
- [ ] Clear feedback when limits reached
- [ ] Easy to monitor and adjust

## Notes

- Rate limits apply per user, not per IP
- Limits reset on server restart (acceptable for internal tool)
- Can be disabled via environment variable for testing
- Designed for ~10 admin users, scales to ~100 users