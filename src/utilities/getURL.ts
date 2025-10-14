import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  // Priority 1: Explicit override (if needed for special cases)
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  // Priority 2: VERCEL_URL (includes custom domains automatically!)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  // Priority 3: Fallback to Vercel project URL (shouldn't be needed)
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  // Priority 4: Development fallback
  return 'http://localhost:3000'
}

export const getClientSideURL = () => {
  // Client-side: Always use actual browser location (works with custom domains)
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  // Server-side fallback: Use same logic as getServerSideURL
  return getServerSideURL()
}
