import { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

// Define change frequency based on content age
function getChangeFrequency(updatedAt: string | Date, contentType: 'page' | 'post' | 'faq'):
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {

  const lastUpdate = new Date(updatedAt)
  const now = new Date()
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))

  if (contentType === 'post') {
    if (daysSinceUpdate < 7) return 'daily'
    if (daysSinceUpdate < 30) return 'weekly'
    return 'monthly'
  }

  // For pages and FAQs
  if (daysSinceUpdate < 7) return 'weekly'
  if (daysSinceUpdate < 30) return 'weekly'
  return 'monthly'
}

// Define priority based on content type and recency
function getPriority(
  contentType: 'home' | 'page' | 'post' | 'faq' | 'category' | 'archive',
  updatedAt?: string | Date,
  featured?: boolean
): number {
  // Homepage gets highest priority
  if (contentType === 'home') return 1.0

  // Category and main listing pages
  if (contentType === 'category') return 0.9
  if (contentType === 'archive') return 0.5

  // For posts, consider recency
  if (contentType === 'post' && updatedAt) {
    const lastUpdate = new Date(updatedAt)
    const now = new Date()
    const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))

    if (featured) return 0.9
    if (daysSinceUpdate < 30) return 0.8
    if (daysSinceUpdate < 90) return 0.7
    return 0.6
  }

  // Standard pages
  if (contentType === 'page') {
    if (featured) return 0.8
    return 0.7
  }

  // FAQs get lower priority
  if (contentType === 'faq') return 0.4

  return 0.5
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const payload = await getPayload({ config })

    // Get the base URL from environment
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ||
                    (process.env.VERCEL_PROJECT_PRODUCTION_URL
                      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
                      : 'http://localhost:3000')

    // Fetch all content in parallel for better performance
    const [pagesResult, postsResult, categoriesResult] = await Promise.all([
      // Fetch published pages
      payload.find({
        collection: 'pages',
        where: {
          _status: {
            equals: 'published',
          },
          excludeFromSitemap: {
            not_equals: true,
          },
        },
        limit: 50000, // Sitemap limit per file
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
          createdAt: true,
          sitemapPriority: true,
          sitemapChangefreq: true,
          excludeFromSitemap: true,
        },
      }),

      // Fetch published posts
      payload.find({
        collection: 'posts',
        where: {
          _status: {
            equals: 'published',
          },
          excludeFromSitemap: {
            not_equals: true,
          },
        },
        limit: 50000,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
          createdAt: true,
          sitemapPriority: true,
          sitemapChangefreq: true,
          excludeFromSitemap: true,
        },
      }),

      // Fetch categories (if they have their own pages)
      payload.find({
        collection: 'categories',
        limit: 1000,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
          createdAt: true,
        },
      }),
    ])

    const sitemap: MetadataRoute.Sitemap = []

    // Add homepage
    sitemap.push({
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: getPriority('home'),
    })

    // Add static routes
    const staticRoutes = [
      {
        path: '/news-insights',
        changeFreq: 'daily' as const,
        priority: getPriority('archive'),
      },
      {
        path: '/search',
        changeFreq: 'weekly' as const,
        priority: 0.5,
      },
      {
        path: '/style-guide',
        changeFreq: 'monthly' as const,
        priority: 0.3,
      },
    ]

    staticRoutes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
      })
    })

    // Add pages
    if (pagesResult.docs && pagesResult.docs.length > 0) {
      pagesResult.docs.forEach((page) => {
        if (page.slug && page.slug !== 'home' && !page.excludeFromSitemap) {
          const lastModified = page.updatedAt || page.createdAt || new Date()

          sitemap.push({
            url: `${baseUrl}/${page.slug}`,
            lastModified: new Date(lastModified),
            changeFrequency: (page.sitemapChangefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never') || getChangeFrequency(lastModified, 'page'),
            priority: page.sitemapPriority ?? getPriority('page', lastModified),
          })
        }
      })
    }

    // Add posts
    if (postsResult.docs && postsResult.docs.length > 0) {
      postsResult.docs.forEach((post) => {
        if (post.slug && !post.excludeFromSitemap) {
          const lastModified = post.updatedAt || post.createdAt || new Date()

          sitemap.push({
            url: `${baseUrl}/news-insights/${post.slug}`,
            lastModified: new Date(lastModified),
            changeFrequency: (post.sitemapChangefreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never') || getChangeFrequency(lastModified, 'post'),
            priority: post.sitemapPriority ?? getPriority('post', lastModified),
          })
        }
      })
    }

    // Add category pages if they exist as standalone pages
    if (categoriesResult.docs && categoriesResult.docs.length > 0) {
      categoriesResult.docs.forEach((category) => {
        if (category.slug) {
          const lastModified = category.updatedAt || category.createdAt || new Date()

          sitemap.push({
            url: `${baseUrl}/news-insights/category/${category.slug}`,
            lastModified: new Date(lastModified),
            changeFrequency: 'weekly',
            priority: getPriority('category'),
          })
        }
      })
    }

    // Add pagination pages for posts (if we know there are multiple pages)
    const postsPerPage = 10
    const totalPages = Math.ceil(postsResult.totalDocs / postsPerPage)

    if (totalPages > 1) {
      for (let i = 2; i <= Math.min(totalPages, 100); i++) {
        sitemap.push({
          url: `${baseUrl}/news-insights/page/${i}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: getPriority('archive'),
        })
      }
    }

    return sitemap

  } catch (error) {
    console.error('Error generating sitemap:', error)

    // Return minimal sitemap on error
    return [
      {
        url: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ]
  }
}

// Next.js will automatically handle:
// - XML generation with proper formatting and escaping
// - Content-Type headers
// - Gzip compression
// - Caching based on revalidation settings

// Optional: Export revalidation time (in seconds)
// This will use ISR to regenerate the sitemap
export const revalidate = 3600 // Revalidate every hour