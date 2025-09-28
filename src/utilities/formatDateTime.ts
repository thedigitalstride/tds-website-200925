/**
 * Format date to UK format: "20 Jan 2025"
 * Uses GMT timezone for consistency
 */
export const formatDateTime = (timestamp: string): string => {
  if (!timestamp) return ''

  try {
    const date = new Date(timestamp)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      return ''
    }

    // Format as "20 Jan 2025" using en-GB locale with GMT timezone
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'GMT'
    })
  } catch (error) {
    console.warn('Error formatting date:', error)
    return ''
  }
}
