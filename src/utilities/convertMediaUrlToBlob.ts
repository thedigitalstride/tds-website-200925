/**
 * Converts Payload media URLs to Vercel Blob Storage URLs
 * Handles localhost, proxy routes, and relative URLs
 *
 * @param url - The media URL from Payload (can be localhost, proxy, or blob URL)
 * @returns The blob storage URL that OpenAI/external services can access
 */
export function convertMediaUrlToBlob(url: string): string {
  if (!url || typeof url !== 'string') {
    return url
  }

  // Blob storage base URL
  const blobBaseUrl =
    process.env.BLOB_BASE_URL || 'https://ov6vgo85vq4jfktd.public.blob.vercel-storage.com'

  // Already a blob storage URL - return as is
  if (url.includes('.blob.vercel-storage.com')) {
    return url
  }

  // Handle localhost URLs (http://localhost:3000/api/media/file/...)
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Extract filename from URL (strip query parameters)
    const match = url.match(/\/api\/media\/file\/([^?]+)/)
    if (match && match[1]) {
      const blobFilename = match[1]
      return `${blobBaseUrl}/${blobFilename}`
    }
  }

  // Handle proxy routes (/api/media/file/...)
  if (url.startsWith('/api/media/file/')) {
    // Extract filename and strip query parameters
    const blobFilename = url.replace('/api/media/file/', '').split('?')[0]
    return `${blobBaseUrl}/${blobFilename}`
  }

  // Handle full URLs with /api/media/file/ path
  // (e.g., http://example.com/api/media/file/filename.webp)
  if (url.includes('/api/media/file/')) {
    const parts = url.split('/api/media/file/')
    if (parts[1]) {
      // Strip query parameters
      const blobFilename = parts[1].split('?')[0]
      return `${blobBaseUrl}/${blobFilename}`
    }
  }

  // If it's already an absolute URL that's not localhost, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // For any other case, return the original URL
  // (This shouldn't happen, but better safe than sorry)
  return url
}

