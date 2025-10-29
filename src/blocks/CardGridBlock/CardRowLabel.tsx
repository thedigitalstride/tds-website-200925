'use client'

import { useRowLabel } from '@payloadcms/ui'

type IconType = string | { name?: string; label?: string }

export const CardRowLabel = () => {
  const { data } = useRowLabel<{title?: string }>()

  if (data?.title) {
    return data.title
  }
}