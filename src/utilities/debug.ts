import type { Payload } from 'payload'

/**
 * Debug logging utility that respects environment settings
 *
 * Logs will appear in:
 * - Terminal during local development
 * - Vercel Dashboard Logs tab in production (if enabled)
 * - Can be viewed via `vercel logs --follow` CLI
 *
 * Environment Variables:
 * - PAYLOAD_DEBUG=true: Enable debug logging
 * - PAYLOAD_DEBUG=false: Disable debug logging (production default)
 */

export const debugLog = {
  /**
   * Log debug information (only when PAYLOAD_DEBUG is true)
   * This will appear in Vercel's Function Logs when enabled
   */
  info: (payload: Payload, message: string, ...args: unknown[]) => {
    if (process.env.PAYLOAD_DEBUG === 'true') {
      payload.logger.info(message, ...args)
    }
  },

  /**
   * Log warnings when debug is enabled
   */
  warn: (payload: Payload, message: string, ...args: unknown[]) => {
    if (process.env.PAYLOAD_DEBUG === 'true') {
      payload.logger.warn(message, ...args)
    }
  },

  /**
   * Always log errors regardless of debug setting
   * Errors should always be visible for troubleshooting
   */
  error: (payload: Payload, error: Error | unknown, message: string) => {
    payload.logger.error({ err: error }, message)
  },

  /**
   * Check if debug mode is enabled
   */
  isEnabled: (): boolean => process.env.PAYLOAD_DEBUG === 'true',

  /**
   * Get current debug status for logging
   */
  getStatus: (): string => {
    const enabled = process.env.PAYLOAD_DEBUG === 'true'
    const env = process.env.NODE_ENV || 'development'
    return `Debug logging: ${enabled ? 'ENABLED' : 'DISABLED'} (NODE_ENV: ${env})`
  }
}

/**
 * Alternative simplified functions for direct use
 */
export const debugInfo = (payload: Payload, message: string, ...args: unknown[]) => {
  debugLog.info(payload, message, ...args)
}

export const debugWarn = (payload: Payload, message: string, ...args: unknown[]) => {
  debugLog.warn(payload, message, ...args)
}

export const debugError = (payload: Payload, error: Error | unknown, message: string) => {
  debugLog.error(payload, error, message)
}

export const isDebugEnabled = (): boolean => {
  return debugLog.isEnabled()
}