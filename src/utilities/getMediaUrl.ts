import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  // Preserve absolute URLs (blob storage URLs, external URLs)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (cacheTag && cacheTag !== '') {
      const separator = url.includes('?') ? '&' : '?'
      return `${url}${separator}${encodeURIComponent(cacheTag)}`
    }
    return url
  }

  // Handle Payload media proxy routes - these are relative paths designed to work on any domain
  // Example: /api/media/file/media/filename.webp
  // Do not prepend base URL as they resolve correctly relative to current domain
  if (url.startsWith('/api/media/')) {
    return cacheTag ? `${url}?${encodeURIComponent(cacheTag)}` : url
  }

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Only prepend base URL for other relative paths
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
