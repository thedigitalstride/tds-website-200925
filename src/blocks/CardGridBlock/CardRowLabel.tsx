'use client'

import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data } = useRowLabel<{title?: string }>()

  if (data?.title) {
    return data.title
  }
}