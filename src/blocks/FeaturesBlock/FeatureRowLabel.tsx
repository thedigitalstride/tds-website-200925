'use client'

import { useRowLabel } from '@payloadcms/ui'

export const FeatureRowLabel = () => {
  const { data } = useRowLabel<{ icon?: string; title?: string }>()

  if (data?.title) {
    const iconInfo = data?.icon ? `Icon: ${data.icon}` : 'Icon: None'
    return `${data.title} - ${iconInfo}`
  }

  return 'Feature'
}
