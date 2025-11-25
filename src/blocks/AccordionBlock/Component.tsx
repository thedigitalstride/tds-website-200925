import React from 'react'
import type { Faq, AccordionBlock as AccordionBlockProps } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { AccordionList } from './AccordionList'
import { cn } from '@/utilities/ui'
import { ANIMATION_SPEEDS, type PopulatedFAQ } from './types'

/**
 * Accordion Block Component
 *
 * Server component that fetches FAQs from the database and renders
 * an interactive accordion list with motion animations.
 *
 * Supports:
 * - Dynamic content (query by categories/filters)
 * - Manual selection (specific FAQs)
 * - Smart sorting (featured first, then by order/date/question)
 * - Category filtering
 * - Search/filter UI (optional)
 */
export const AccordionBlock: React.FC<
  AccordionBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, header, contentSource, opts, selectedFAQs, displayOptions, layoutOptions } = props

  const spacing = layoutOptions?.spacing || 'normal'

  let faqs: Faq[] = []

  const payload = await getPayload({ config: configPromise })

  // Fetch FAQs based on content source
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

    // Add category filter if specified (multiple categories with OR logic)
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

    // Determine initial sort field (featured sorting happens post-fetch)
    let sortField = 'order' // Default
    switch (sortBy) {
      case 'date':
        sortField = '-createdAt' // Newest first
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
      depth: 2, // Populate relationships (categories, relatedContent, resources)
      limit,
      where: whereClause as never,
      sort: sortField,
    })

    faqs = fetchedFAQs.docs

    // Post-fetch sorting: Featured FAQs always first
    faqs = faqs.sort((a, b) => {
      // 1. Featured first
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1

      // 2. Then by order (if both have order values)
      if (typeof a.order === 'number' && typeof b.order === 'number') {
        return a.order - b.order
      }

      // 3. Otherwise maintain original sort order
      return 0
    })
  } else {
    // Manual selection - need to fetch full FAQs with relationships
    if (selectedFAQs?.length) {
      // Extract FAQ IDs from selectedFAQs
      const faqIds = selectedFAQs
        .map((faq) => (typeof faq === 'object' ? faq.id : faq))
        .filter((id): id is string => typeof id === 'string')

      // Fetch full FAQs with relationships populated
      if (faqIds.length > 0) {
        const fetchedFAQs = await payload.find({
          collection: 'faqs',
          depth: 2, // Populate relationships
          where: {
            id: { in: faqIds },
          },
          limit: faqIds.length,
        })

        faqs = fetchedFAQs.docs

        // Maintain manual selection order
        faqs.sort((a, b) => {
          const aIndex = faqIds.indexOf(a.id)
          const bIndex = faqIds.indexOf(b.id)
          return aIndex - bIndex
        })
      }
    }
  }

  // If no FAQs found, don't render the block
  if (faqs.length === 0) {
    return null
  }

  // Extract display options
  const defaultState = displayOptions?.defaultState || 'all-collapsed'
  const allowMultipleOpen = displayOptions?.allowMultipleOpen || false
  const enableSearch = displayOptions?.enableSearch || false
  const iconPosition = displayOptions?.iconPosition || 'right'
  const iconStyle = displayOptions?.iconStyle || 'chevron'

  // Extract layout options
  const animationSpeedKey = layoutOptions?.animationSpeed || 'normal'
  const animationSpeed = ANIMATION_SPEEDS[animationSpeedKey as keyof typeof ANIMATION_SPEEDS]

  // Spacing classes
  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  // Header alignment classes
  const headerAlignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  }

  const headerAlignment = header?.headerAlignment || 'left'

  return (
    <section className={cn(spacingClasses[spacing])} id={`block-${id}`}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        {/* Header */}
        {header?.showHeader && (
          <div className={cn('max-w-3xl', headerAlignmentClasses[headerAlignment])}>
            {header.eyebrow && (
              <p className="text-sm font-semibold text-brand-secondary md:text-md">
                {header.eyebrow}
              </p>
            )}
            {header.heading && (
              <h2 className="mt-3 text-display-sm font-semibold text-primary md:text-display-md">
                {header.heading}
              </h2>
            )}
            {header.description && (
              <p className="mt-4 text-lg text-secondary md:mt-5 md:text-xl">{header.description}</p>
            )}
          </div>
        )}

        {/* Accordion List (Client Component) */}
        <div className={cn('mt-12 md:mt-16', !header?.showHeader && 'mt-0')}>
          <AccordionList
            faqs={faqs as PopulatedFAQ[]}
            defaultState={defaultState}
            allowMultipleOpen={allowMultipleOpen}
            enableSearch={enableSearch}
            iconPosition={iconPosition as 'left' | 'right' | 'none'}
            iconStyle={iconStyle as 'chevron' | 'plus-minus'}
            animationSpeed={animationSpeed}
          />
        </div>
      </div>
    </section>
  )
}
