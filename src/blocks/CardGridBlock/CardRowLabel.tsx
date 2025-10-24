'use client'

import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data } = useRowLabel<{ eyebrow?: string; icon?: string; title?: string }>()

  if (data?.title) {
    const parts: string[] = []

    // Add eyebrow if exists (in quotes for clarity)
    if (data.eyebrow) {
      parts.push(`"${data.eyebrow}"`)
    }

    // Add title
    parts.push(data.title)

    // Add icon info
    const iconInfo = data?.icon ? `Icon: ${data.icon}` : 'Icon: None'
    parts.push(iconInfo)

    return parts.join(' - ')
  }

  return 'Card'
}
