/**
 * Centralized Logger Utility
 * Automatically disabled in production builds
 */

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Logger that only outputs in development mode
 */
export const logger = {
  /**
   * Log informational messages (development only)
   */
  log: (...args: unknown[]): void => {
    if (!isProduction) {
      console.log(...args)
    }
  },

  /**
   * Log error messages
   * In production, errors are still logged but without sensitive details
   */
  error: (...args: unknown[]): void => {
    if (!isProduction) {
      console.error(...args)
    } else {
      // In production, only log generic error without details
      console.error('[Error occurred]')
    }
  },

  /**
   * Log warning messages (development only)
   */
  warn: (...args: unknown[]): void => {
    if (!isProduction) {
      console.warn(...args)
    }
  },

  /**
   * Log info messages (development only)
   */
  info: (...args: unknown[]): void => {
    if (!isProduction) {
      console.info(...args)
    }
  },

  /**
   * Log debug messages (development only)
   */
  debug: (...args: unknown[]): void => {
    if (!isProduction) {
      console.debug(...args)
    }
  },
}

/**
 * No-op logger for production (all methods do nothing)
 */
export const prodLogger = {
  log: () => {},
  error: () => {},
  warn: () => {},
  info: () => {},
  debug: () => {},
}

/**
 * Get the appropriate logger based on environment
 */
export const getLogger = () => (isProduction ? prodLogger : logger)
