# Dynamic Sitemap Implementation

## Overview

This project uses Next.js 15's native sitemap generation feature to create a fully dynamic XML sitemap that automatically updates based on your Payload CMS content. The implementation strictly follows Google's sitemap protocol and SEO best practices.

## Features

### 🚀 Key Features

- **Fully Dynamic**: Automatically includes all published pages and posts
- **Smart Prioritization**: Content priority based on type and recency
- **Automatic Change Frequency**: Intelligent frequency hints based on content age
- **Custom Controls**: Per-page/post sitemap settings for fine-tuning
- **ISR Enabled**: Incremental Static Regeneration for optimal performance
- **Type Safe**: Full TypeScript support with Payload types
- **SEO Optimized**: Follows Google's sitemap protocol exactly

## URLs Included

The sitemap automatically includes:

- Homepage (`/`)
- All published Pages from Payload CMS
- All published Posts (`/news-insights/[slug]`)
- Category pages (`/news-insights/category/[slug]`)
- Static routes (`/search`, `/news-insights`, `/style-guide`)
- Pagination pages (`/news-insights/page/[number]`)

## Configuration

### For Content Editors

Each Page and Post in the Payload admin panel now includes **Sitemap Settings** in the Meta tab:

#### Available Settings

1. **Exclude from Sitemap**
   - Checkbox to completely exclude a page/post from the sitemap
   - Useful for thank you pages, temporary content, or private pages

2. **Sitemap Priority** (0.0 - 1.0)
   - Override the automatic priority calculation
   - Higher values = more important pages
   - Leave empty to use automatic priority

3. **Change Frequency**
   - How often the page content typically changes
   - Options: Always, Hourly, Daily, Weekly, Monthly, Yearly, Never
   - Leave empty to use automatic frequency

### Automatic Priority System

If no custom priority is set, the system automatically assigns priorities:

| Content Type | Priority | Logic |
|-------------|----------|--------|
| Homepage | 1.0 | Most important page |
| Category Pages | 0.9 | Main navigation/listing pages |
| Featured Content | 0.9 | Manually featured items |
| Recent Posts (<30 days) | 0.8 | Fresh, relevant content |
| Standard Pages | 0.7 | Core site content |
| Posts (30-90 days) | 0.7 | Still relevant content |
| Older Posts (>90 days) | 0.6 | Archived content |
| Archive/Pagination | 0.5 | Navigation pages |
| FAQs | 0.4 | Support content |
| Style Guide | 0.3 | Internal/dev pages |

### Automatic Change Frequency

If no custom frequency is set, the system automatically determines frequency:

#### For Blog Posts
- **< 7 days old**: `daily` (actively being updated/commented)
- **7-30 days old**: `weekly` (occasional updates)
- **> 30 days old**: `monthly` (stable content)

#### For Pages
- **< 7 days since update**: `weekly`
- **> 7 days since update**: `monthly`

## Technical Implementation

### File Structure

```
src/app/
├── sitemap.ts        # Main sitemap generation
└── robots.ts         # Dynamic robots.txt with sitemap location
```

### Key Files

#### `/src/app/sitemap.ts`
The main sitemap generator that:
- Fetches content from Payload CMS
- Applies priority and frequency logic
- Respects custom sitemap settings
- Returns Next.js `MetadataRoute.Sitemap`

#### `/src/app/robots.ts`
Dynamic robots.txt that:
- Provides crawl directives
- Includes sitemap location
- Adapts to environment (local/staging/production)

### Environment Variables

The sitemap uses these environment variables for URL generation:

```bash
# Production URL (required for production)
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com

# Vercel auto-populated (fallback)
VERCEL_PROJECT_PRODUCTION_URL=your-project.vercel.app
```

Priority order:
1. `NEXT_PUBLIC_SERVER_URL` (if set)
2. `VERCEL_PROJECT_PRODUCTION_URL` (Vercel deployments)
3. `http://localhost:3000` (local development)

## Usage & Access

### Accessing the Sitemap

- **Local Development**: http://localhost:3000/sitemap.xml
- **Production**: https://yourdomain.com/sitemap.xml

### Accessing robots.txt

- **Local Development**: http://localhost:3000/robots.txt
- **Production**: https://yourdomain.com/robots.txt

## Performance

### Caching Strategy

The sitemap uses ISR (Incremental Static Regeneration) with a 1-hour cache:

```typescript
export const revalidate = 3600 // Revalidate every hour
```

This means:
- First request generates the sitemap
- Subsequent requests serve cached version for 1 hour
- After 1 hour, next request triggers regeneration
- Users always get fast responses

### Limits

Per Google's specifications:
- Maximum 50,000 URLs per sitemap
- Maximum 50MB uncompressed size
- Automatic gzip compression by Next.js

## Testing Your Sitemap

### Local Testing

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. View the sitemap:
   ```bash
   curl http://localhost:3000/sitemap.xml
   ```

3. Validate XML structure:
   ```bash
   curl -s http://localhost:3000/sitemap.xml | xmllint --format -
   ```

4. Count URLs:
   ```bash
   curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"
   ```

### Production Testing

After deployment:

1. Visit: `https://yourdomain.com/sitemap.xml`
2. Validate with online tools:
   - [XML Sitemaps Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
   - [Google's Sitemap Testing Tool](https://support.google.com/webmasters/answer/6062598)

## Google Search Console Integration

### Submitting Your Sitemap

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Navigate to **Sitemaps** in the sidebar
4. Enter: `sitemap.xml`
5. Click **Submit**

### Monitoring

Check regularly for:
- **Coverage**: How many URLs Google has indexed
- **Errors**: Any parsing or access issues
- **Warnings**: Potential improvements

## Troubleshooting

### Common Issues

#### Sitemap shows "undefined" URLs
**Problem**: Environment variables not configured
**Solution**: Set `NEXT_PUBLIC_SERVER_URL` in your `.env.local`:
```bash
NEXT_PUBLIC_SERVER_URL=https://yourdomain.com
```

#### Pages missing from sitemap
**Check**:
1. Page is published (not draft)
2. "Exclude from Sitemap" is not checked
3. Page has a valid slug

#### Sitemap not updating
**Solutions**:
1. Wait for cache to expire (1 hour)
2. Restart dev server
3. Clear Next.js cache: `rm -rf .next`

#### XML parsing errors
**Check**:
1. Special characters in content are properly escaped
2. URLs are valid and absolute
3. Dates are in correct format

### Debug Mode

To debug sitemap generation, add console logs to `/src/app/sitemap.ts`:

```typescript
console.log('Pages found:', pagesResult.totalDocs)
console.log('Posts found:', postsResult.totalDocs)
```

Then check server logs when accessing the sitemap.

## Advanced Configuration

### Customizing Revalidation Time

Edit `/src/app/sitemap.ts`:

```typescript
// Change from 1 hour to 30 minutes
export const revalidate = 1800
```

### Adding New Content Types

To include new collections in the sitemap:

1. Add the fetch query in `sitemap.ts`
2. Map the results with appropriate URL structure
3. Apply priority and frequency logic

Example for adding Products:

```typescript
const productsResult = await payload.find({
  collection: 'products',
  where: {
    _status: { equals: 'published' },
  },
  limit: 50000,
  depth: 0,
  select: {
    slug: true,
    updatedAt: true,
  },
})

// Add to sitemap
productsResult.docs.forEach((product) => {
  if (product.slug) {
    sitemap.push({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  }
})
```

### Creating a Sitemap Index

If you exceed 50,000 URLs, implement a sitemap index:

1. Create `/src/app/sitemap-index.xml/route.ts`
2. Split content into multiple sitemaps
3. Reference sub-sitemaps in the index

## Best Practices

### DO ✅

- Keep sitemap under 50,000 URLs
- Set meaningful priorities (don't set everything to 1.0)
- Use change frequency as hints, not promises
- Submit sitemap to Google Search Console
- Monitor indexing coverage regularly
- Test after major content changes

### DON'T ❌

- Include duplicate URLs
- Add session IDs or parameters
- Include non-canonical URLs
- Set all pages to same priority
- Forget to update production URL
- Include admin or private pages

## Migration from next-sitemap

If you're migrating from the `next-sitemap` package:

1. ✅ All functionality is preserved
2. ✅ Better performance with ISR
3. ✅ Simpler configuration
4. ✅ No build-time generation needed
5. ✅ Native Next.js integration

### Removed Files
- `next-sitemap.config.cjs`
- `public/sitemap.xml`
- `public/robots.txt`
- `src/app/(frontend)/(sitemaps)/`

### Removed Dependencies
- `next-sitemap` package
- `postbuild` script in package.json

## Related Documentation

- [Next.js Sitemap Documentation](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Google Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [Google Search Console Help](https://support.google.com/webmasters/answer/156184)

---

*Last updated: October 2024*
*Next.js version: 15.4.4*
*Implementation follows sitemaps.org protocol v0.9*