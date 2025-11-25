import type { Page } from '@/payload-types'
import { getServerSideURL } from './getURL'

type BreadcrumbItem = NonNullable<Page['breadcrumbs']>[number]

/**
 * Generic breadcrumb item structure (compatible with Page breadcrumbs and manual breadcrumbs)
 */
export interface GenericBreadcrumbItem {
  label?: string | null
  url?: string | null
  id?: string | null
}

/**
 * ListItem schema structure for BreadcrumbList
 */
export interface ListItemSchema {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string // Optional - omitted for last item (current page)
}

/**
 * BreadcrumbList schema structure for JSON-LD
 */
export interface BreadcrumbListSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: ListItemSchema[]
}

/**
 * Generate Google BreadcrumbList structured data (JSON-LD) from breadcrumbs array
 *
 * Converts breadcrumbs to BreadcrumbList schema format following Google's requirements:
 * - Always includes Home as position 1
 * - Each ListItem has: @type, position, name, item (URL)
 * - Last item (current page) omits item property (Google uses current page URL)
 * - Uses absolute URLs via getServerSideURL()
 * - Invalid breadcrumbs (missing label or URL) are skipped
 *
 * @param breadcrumbs - Array of breadcrumb items from page
 * @param currentPageUrl - Current page URL path (e.g., "/category/page")
 * @param currentPageName - Current page name/label (from last breadcrumb or page title)
 * @returns BreadcrumbList schema object or null if no valid breadcrumbs
 */
export function generateBreadcrumbSchema(
  breadcrumbs: (BreadcrumbItem | GenericBreadcrumbItem)[] | null | undefined,
  currentPageUrl: string,
  currentPageName?: string | null,
): BreadcrumbListSchema | null {
  const baseUrl = getServerSideURL()
  
  // Normalize current page URL (ensure it starts with /)
  const normalizedCurrentUrl = currentPageUrl.startsWith('/') 
    ? currentPageUrl 
    : `/${currentPageUrl}`

  // Build item list starting with Home
  const itemListElement: ListItemSchema[] = []

  // Always add Home as position 1
  itemListElement.push({
    '@type': 'ListItem',
    position: 1,
    name: 'Home',
    item: `${baseUrl}/`,
  })

  // Check if this is the home page
  const isHomePage = normalizedCurrentUrl === '/' || normalizedCurrentUrl === '/home'

  // If no breadcrumbs, handle home page case
  if (!breadcrumbs || breadcrumbs.length === 0) {
    // For home page, return schema with just Home (no item property)
    if (isHomePage) {
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            // No item - Google uses current page URL
          },
        ],
      }
    }
    
    // If no breadcrumbs but not home page, return null
    return null
  }

  // Check if the only breadcrumb is the home page itself
  if (breadcrumbs.length === 1) {
    const onlyBreadcrumb = breadcrumbs[0]
    const onlyBreadcrumbUrl = onlyBreadcrumb.url?.startsWith('/') 
      ? onlyBreadcrumb.url 
      : `/${onlyBreadcrumb.url || ''}`
    
    if (isHomePage || onlyBreadcrumbUrl === '/' || onlyBreadcrumbUrl === '/home') {
      // This is the home page, return schema with just Home
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            // No item - Google uses current page URL
          },
        ],
      }
    }
  }

  // Process breadcrumb items (excluding the last one which is the current page)
  let position = 2 // Start at 2 (Home is 1)

  for (let i = 0; i < breadcrumbs.length - 1; i++) {
    const crumb = breadcrumbs[i]

    // Skip if missing required fields
    if (!crumb.label || !crumb.url) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(
          `[Breadcrumb Schema] Skipping breadcrumb item ${i} - missing label or URL`,
        )
      }
      continue
    }

    // Normalize URL (ensure it starts with /)
    const normalizedUrl = crumb.url.startsWith('/') ? crumb.url : `/${crumb.url}`

    itemListElement.push({
      '@type': 'ListItem',
      position,
      name: crumb.label.trim(),
      item: `${baseUrl}${normalizedUrl}`,
    })

    position++
  }

  // Add current page as last item (without item property)
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length - 1]
  const currentPageLabel = currentPageName || lastBreadcrumb?.label || 'Page'

  itemListElement.push({
    '@type': 'ListItem',
    position,
    name: currentPageLabel.trim(),
    // No item - Google uses current page URL
  })

  // Return null if we only have Home (shouldn't happen, but safety check)
  if (itemListElement.length <= 1) {
    return null
  }

  // Build BreadcrumbList schema
  const schema: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  }

  return schema
}

