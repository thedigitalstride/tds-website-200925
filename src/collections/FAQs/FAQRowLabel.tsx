'use client'

import { useRowLabel } from '@payloadcms/ui'
import type { Faq } from '@/payload-types'

export const FAQRowLabel = () => {
  const { data } = useRowLabel<Faq>()

  if (data?.question) {
    // Truncate long questions for readability
    const truncatedQuestion =
      data.question.length > 50 ? `${data.question.substring(0, 50)}...` : data.question

    // Show featured badge
    const featuredBadge = data.featured ? ' ⭐' : ''

    return `FAQ: ${truncatedQuestion}${featuredBadge}`
  }

  return 'FAQ (Untitled)'
}
