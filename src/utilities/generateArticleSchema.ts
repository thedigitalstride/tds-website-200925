import type { Post, Media } from '@/payload-types'
import { getServerSideURL } from './getURL'

/**
 * Person schema for Article author
 */
export interface PersonSchema {
  '@type': 'Person'
  name: string
  url?: string
}

/**
 * ImageObject schema for Article
 */
export interface ImageObjectSchema {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
}

/**
 * Organization schema for publisher
 */
export interface OrganizationSchema {
  '@type': 'Organization'
  name: string
  url: string
}

/**
 * BlogPosting schema structure for JSON-LD
 */
export interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  headline: string
  description?: string
  image?: ImageObjectSchema
  datePublished?: string
  dateModified: string
  author?: PersonSchema | PersonSchema[]
  publisher: OrganizationSchema
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
}

/**
 * Site configuration for publisher info
 */
const SITE_CONFIG = {
  name: 'The Digital Stride',
}

/**
 * Generate Google Article structured data (JSON-LD) from Post
 *
 * Converts post data to BlogPosting schema format following Google's requirements:
 * - headline: Article title (required)
 * - image: Hero image with absolute URL (recommended)
 * - datePublished: ISO 8601 format (recommended)
 * - dateModified: ISO 8601 format (recommended)
 * - author: Person with name (recommended)
 * - publisher: Organization with name and url
 * - mainEntityOfPage: URL of the article page
 *
 * @param post - Post object with populated fields
 * @param slug - Post slug for URL construction
 * @returns ArticleSchema object or null if title is missing
 */
export function generateArticleSchema(post: Post, slug: string): ArticleSchema | null {
  const baseUrl = getServerSideURL()

  // Title is required - return null if missing
  if (!post.title || post.title.trim().length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Article Schema] Post missing title - skipping schema generation')
    }
    return null
  }

  // Build article URL
  const articleUrl = `${baseUrl}/news-insights/${slug}`

  // Process hero image
  let image: ImageObjectSchema | undefined
  if (post.heroImage && typeof post.heroImage === 'object') {
    const heroMedia = post.heroImage as Media

    // Prefer larger sizes for better SEO (Google recommends high-res images)
    const imageSize = heroMedia.sizes?.large || heroMedia.sizes?.medium || heroMedia.sizes?.small

    const imageUrl = imageSize?.url || heroMedia.url
    const width = imageSize?.width || heroMedia.width
    const height = imageSize?.height || heroMedia.height

    if (imageUrl) {
      // Construct absolute URL
      const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`

      image = {
        '@type': 'ImageObject',
        url: absoluteImageUrl,
        ...(width && { width }),
        ...(height && { height }),
      }
    }
  }

  // Log warning if no image (still valid but less optimal)
  if (!image && process.env.NODE_ENV === 'development') {
    console.warn(`[Article Schema] Post "${post.title}" has no hero image - schema will be less complete`)
  }

  // Process authors from populatedAuthors
  let authors: PersonSchema[] = []
  if (post.populatedAuthors && post.populatedAuthors.length > 0) {
    authors = post.populatedAuthors
      .filter((author) => author.name || author.nickname)
      .map((author) => ({
        '@type': 'Person' as const,
        name: (author.nickname || author.name || '').trim(),
      }))
  }

  // Log warning if no authors (still valid)
  if (authors.length === 0 && process.env.NODE_ENV === 'development') {
    console.warn(`[Article Schema] Post "${post.title}" has no authors - proceeding without author info`)
  }

  // Build publisher
  const publisher: OrganizationSchema = {
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: `${baseUrl}/`,
  }

  // Get description from meta or subtitle
  const description = post.meta?.description || post.subtitle || undefined

  // Build the schema
  const schema: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title.trim(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    publisher,
    dateModified: post.updatedAt,
    ...(description && { description: description.trim() }),
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    ...(image && { image }),
    ...(authors.length > 0 && {
      author: authors.length === 1 ? authors[0] : authors,
    }),
  }

  return schema
}
