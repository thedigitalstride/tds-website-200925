'use client'

import { useRowLabel } from '@payloadcms/ui'

export const CardRowLabel = () => {
  const { data } = useRowLabel<{ title?: string }>()

  return data?.title || 'Card'
}
