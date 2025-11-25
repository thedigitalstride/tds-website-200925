import type { AccordionBlock, Page } from '@/payload-types'
import type { PopulatedFAQ } from '@/blocks/AccordionBlock/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { generateFAQSchema } from './generateFAQSchema'
import type { FAQPageSchema } from './generateFAQSchema'

/**
 * Extract all FAQs from page layout blocks and generate FAQPage schema
 *
 * This function:
 * 1. Recursively walks through page layout blocks
 * 2. Finds all AccordionBlocks
 * 3. Replicates FAQ fetching logic from AccordionBlock component
 * 4. Deduplicates FAQs by ID
 * 5. Generates combined FAQPage schema
 *
 * @param layout - Page layout blocks array
 * @returns FAQPage schema or null if no FAQs found
 */
export async function generatePageFAQSchema(
  layout: Page['layout'],
): Promise<FAQPageSchema | null> {
  if (!layout || !Array.isArray(layout) || layout.length === 0) {
    return null
  }

  // Find all AccordionBlocks in layout
  const accordionBlocks = findAccordionBlocks(layout)

  if (accordionBlocks.length === 0) {
    return null
  }

  // Fetch FAQs for each AccordionBlock
  const allFAQs: PopulatedFAQ[] = []
  const payload = await getPayload({ config: configPromise })

  for (const block of accordionBlocks) {
    const blockFAQs = await fetchFAQsForBlock(block, payload)
    allFAQs.push(...blockFAQs)
  }

  // Deduplicate FAQs by ID (keep first occurrence)
  const uniqueFAQs = deduplicateFAQs(allFAQs)

  if (uniqueFAQs.length === 0) {
    return null
  }

  // Generate schema from unique FAQs
  return await generateFAQSchema(uniqueFAQs)
}

/**
 * Recursively find all AccordionBlocks in layout
 */
function findAccordionBlocks(layout: Page['layout']): AccordionBlock[] {
  if (!layout || !Array.isArray(layout)) {
    return []
  }

  const accordionBlocks: AccordionBlock[] = []

  for (const block of layout) {
    // Check if this is an AccordionBlock
    if (block && typeof block === 'object' && 'blockType' in block) {
      if (block.blockType === 'accordion') {
        accordionBlocks.push(block as AccordionBlock)
      }
    }
  }

  return accordionBlocks
}

/**
 * Fetch FAQs for an AccordionBlock using the same logic as AccordionBlock component
 */
async function fetchFAQsForBlock(
  block: AccordionBlock,
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<PopulatedFAQ[]> {
  const { contentSource, opts, selectedFAQs } = block

  let faqs: PopulatedFAQ[] = []

  if (contentSource === 'dynamic') {
    // Dynamic mode - query FAQs with filters
    const categoryFilter = opts?.categoryFilter
    const limit = opts?.limit === 'all' ? 1000 : parseInt(opts?.limit || '6')
    const sortBy = opts?.sortBy || 'order'
    const excludeFAQs = opts?.excludeFAQs

    // Build where clause
    const whereClause: Record<string, unknown> = {
      _status: { equals: 'published' },
    }

    // Add category filter if specified
    if (categoryFilter && Array.isArray(categoryFilter) && categoryFilter.length > 0) {
      const categoryIds = categoryFilter
        .map((cat) => (typeof cat === 'object' ? cat.id : cat))
        .filter((id): id is string => typeof id === 'string')

      if (categoryIds.length > 0) {
        whereClause.categories = { in: categoryIds }
      }
    }

    // Exclude specific FAQs
    if (excludeFAQs && Array.isArray(excludeFAQs) && excludeFAQs.length > 0) {
      const excludeIds = excludeFAQs
        .map((faq) => (typeof faq === 'object' ? faq.id : faq))
        .filter((id): id is string => typeof id === 'string')

      if (excludeIds.length > 0) {
        whereClause.id = { not_in: excludeIds }
      }
    }

    // Determine sort field
    let sortField = 'order'
    switch (sortBy) {
      case 'date':
        sortField = '-createdAt'
        break
      case 'question-asc':
        sortField = 'question'
        break
      case 'question-desc':
        sortField = '-question'
        break
      default:
        sortField = 'order'
    }

    const fetchedFAQs = await payload.find({
      collection: 'faqs',
      depth: 2,
      limit,
      where: whereClause as never,
      sort: sortField,
    })

    faqs = fetchedFAQs.docs as PopulatedFAQ[]

    // Post-fetch sorting: Featured FAQs always first
    faqs = faqs.sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order
      }
      return 0
    })
  } else if (contentSource === 'manual') {
    // Manual selection
    if (selectedFAQs && Array.isArray(selectedFAQs) && selectedFAQs.length > 0) {
      const faqIds = selectedFAQs
        .map((faq) => (typeof faq === 'object' ? faq.id : faq))
        .filter((id): id is string => typeof id === 'string')

      if (faqIds.length > 0) {
        const fetchedFAQs = await payload.find({
          collection: 'faqs',
          depth: 2,
          where: {
            id: { in: faqIds },
          },
          limit: faqIds.length,
        })

        faqs = fetchedFAQs.docs as PopulatedFAQ[]

        // Maintain manual selection order
        faqs.sort((a, b) => {
          const aIndex = faqIds.indexOf(a.id)
          const bIndex = faqIds.indexOf(b.id)
          return aIndex - bIndex
        })
      }
    }
  }

  return faqs
}

/**
 * Deduplicate FAQs by ID, keeping first occurrence
 */
function deduplicateFAQs(faqs: PopulatedFAQ[]): PopulatedFAQ[] {
  const seen = new Map<string, PopulatedFAQ>()
  const unique: PopulatedFAQ[] = []

  for (const faq of faqs) {
    if (!seen.has(faq.id)) {
      seen.set(faq.id, faq)
      unique.push(faq)
    }
  }

  return unique
}

