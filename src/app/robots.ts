import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Get the base URL from environment
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ||
                  (process.env.VERCEL_PROJECT_PRODUCTION_URL
                    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
                    : 'http://localhost:3000')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/admin/*',
          '/api/',
          '/api/*',
          '/_next/',
          '/_next/*',
          '/next/',
          '/next/*',
        ],
      },
      // Specific rules for search engine bots
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// Optional: Export revalidation time (in seconds)
// This ensures the robots.txt stays up-to-date with environment changes
export const revalidate = 86400 // Revalidate once per day