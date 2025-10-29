'use client'

import { useRowLabel } from '@payloadcms/ui'

type IconType = string | { name?: string; label?: string }

export const FeatureRowLabel = () => {
  const { data } = useRowLabel<{ icon?: IconType; title?: string }>()

  if (data?.title) {
    let iconInfo = 'Icon: None'
    if (data?.icon) {
      if (typeof data.icon === 'string') {
        // Icon is just an ID (unpopulated relationship)
        iconInfo = `Icon: ${data.icon}`
      } else if (data.icon.name) {
        // Icon is populated - show the name
        iconInfo = `Icon: ${data.icon.name}`
      } else if (data.icon.label) {
        // Fallback to label if name isn't available
        iconInfo = `Icon: ${data.icon.label}`
      }
    }
    return `${data.title} - ${iconInfo}`
  }

  return 'Feature'
}
