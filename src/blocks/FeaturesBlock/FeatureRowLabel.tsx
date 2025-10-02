'use client'

import { useRowLabel } from '@payloadcms/ui'

export const FeatureRowLabel = () => {
  const { data } = useRowLabel<{ icon?: string; title?: string }>()

  if (data?.icon && data?.title) {
    return `${data.icon} - ${data.title}`
  }

  if (data?.title) {
    return data.title
  }

  return 'Feature'
}
