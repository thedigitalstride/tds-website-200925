import { getClientSideURL } from '@/utilities/getURL'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 */
export const getMediaUrl = (url: string | null | undefined, cacheTag?: string | null): string => {
  if (!url) return ''

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  // Check if URL already has http/https protocol (external URL like Vercel Blob Storage)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // For external URLs (like Vercel Blob Storage), don't append cache tags
    // as they handle caching internally and additional query params can cause issues
    return url
  }

  // Otherwise prepend client-side URL and use cache tag for local files
  const baseUrl = getClientSideURL()
  return cacheTag ? `${baseUrl}${url}?${cacheTag}` : `${baseUrl}${url}`
}
