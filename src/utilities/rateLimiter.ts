/**
 * Rate Limiter for AI Generation Endpoints
 *
 * Memory-based rate limiting using sliding window algorithm.
 * Tracks requests per authenticated user over a configurable time window.
 */

import { logger } from '@/utilities/logger'

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number // Unix timestamp when the window resets
}

interface RateLimitConfig {
  limit?: number // Requests per window
  windowMinutes?: number // Time window in minutes
  enabled?: boolean // Enable/disable rate limiting
}

class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null
  private config: Required<RateLimitConfig>

  constructor(config: RateLimitConfig = {}) {
    this.config = {
      limit: parseInt(process.env.AI_RATE_LIMIT_PER_HOUR || '50'),
      windowMinutes: parseInt(process.env.AI_RATE_LIMIT_WINDOW_MINUTES || '60'),
      enabled: process.env.AI_RATE_LIMIT_ENABLED !== 'false', // Default to true
      ...config
    }

    // Start cleanup interval (every 10 minutes)
    if (this.config.enabled) {
      this.startCleanup()
    }

    logger.log(`[RateLimiter] Initialized with limit: ${this.config.limit} per ${this.config.windowMinutes} minutes`)
  }

  /**
   * Check if a user has exceeded the rate limit
   * @param userId - The authenticated user's ID
   * @returns RateLimitResult indicating if the request is allowed
   */
  check(userId: string): RateLimitResult {
    // If rate limiting is disabled, always allow
    if (!this.config.enabled) {
      return {
        success: true,
        limit: this.config.limit,
        remaining: this.config.limit,
        reset: 0
      }
    }

    const now = Date.now()
    const windowMs = this.config.windowMinutes * 60 * 1000
    const windowStart = now - windowMs

    // Get or create user's request history
    let userRequests = this.requests.get(userId) || []

    // Filter to only requests within the current window
    userRequests = userRequests.filter(timestamp => timestamp > windowStart)

    // Calculate reset time (when the oldest request in window expires)
    const reset = userRequests.length > 0
      ? Math.floor((userRequests[0] + windowMs) / 1000)
      : Math.floor((now + windowMs) / 1000)

    // Check if under limit
    if (userRequests.length < this.config.limit) {
      // Add current request
      userRequests.push(now)
      this.requests.set(userId, userRequests)

      const remaining = this.config.limit - userRequests.length

      // Log warning when approaching limit
      if (remaining <= 10) {
        logger.warn(`[RateLimiter] User ${userId} approaching limit: ${remaining} requests remaining`)
      }

      return {
        success: true,
        limit: this.config.limit,
        remaining,
        reset
      }
    }

    // Rate limit exceeded
    logger.warn(`[RateLimiter] Rate limit exceeded for user ${userId}`)
    return {
      success: false,
      limit: this.config.limit,
      remaining: 0,
      reset
    }
  }

  /**
   * Reset rate limit for a specific user (useful for testing)
   */
  reset(userId: string): void {
    this.requests.delete(userId)
    logger.log(`[RateLimiter] Reset limits for user ${userId}`)
  }

  /**
   * Clean up expired request records to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now()
    const windowMs = this.config.windowMinutes * 60 * 1000
    const windowStart = now - windowMs
    let cleaned = 0

    for (const [userId, timestamps] of this.requests.entries()) {
      const filtered = timestamps.filter(timestamp => timestamp > windowStart)

      if (filtered.length === 0) {
        // Remove user if no recent requests
        this.requests.delete(userId)
        cleaned++
      } else if (filtered.length < timestamps.length) {
        // Update with filtered timestamps
        this.requests.set(userId, filtered)
      }
    }

    if (cleaned > 0) {
      logger.log(`[RateLimiter] Cleaned up ${cleaned} expired user records`)
    }
  }

  /**
   * Start automatic cleanup interval
   */
  private startCleanup(): void {
    // Run cleanup every 10 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 10 * 60 * 1000)
  }

  /**
   * Stop cleanup interval (for graceful shutdown)
   */
  stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
  }

  /**
   * Get current usage statistics (for monitoring)
   */
  getStats(): { users: number; totalRequests: number } {
    let totalRequests = 0
    const now = Date.now()
    const windowMs = this.config.windowMinutes * 60 * 1000
    const windowStart = now - windowMs

    for (const timestamps of this.requests.values()) {
      const validRequests = timestamps.filter(t => t > windowStart)
      totalRequests += validRequests.length
    }

    return {
      users: this.requests.size,
      totalRequests
    }
  }
}

// Create singleton instance for AI endpoints
export const aiRateLimiter = new RateLimiter()

// Graceful shutdown
if (typeof process !== 'undefined') {
  process.on('SIGTERM', () => {
    aiRateLimiter.stopCleanup()
  })
  process.on('SIGINT', () => {
    aiRateLimiter.stopCleanup()
  })
}