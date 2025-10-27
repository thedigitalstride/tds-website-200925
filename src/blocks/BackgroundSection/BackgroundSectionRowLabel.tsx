'use client'

import React from 'react'

export const BackgroundSectionRowLabel: React.FC<{
  data: {
    header?: { heading?: string }
    backgroundType?: string
    contentBlocks?: unknown[]
  }
}> = ({ data }) => {
  // Determine the label based on the configuration
  let label = 'Background Section'

  if (data?.header?.heading) {
    label = data.header.heading
  } else if (data?.backgroundType && data.backgroundType !== 'none') {
    const backgroundLabels: Record<string, string> = {
      solid: 'Solid Background',
      gradient: 'Gradient Background',
      image: 'Image Background',
      custom: 'Animated Background',
    }
    label = backgroundLabels[data.backgroundType] || 'Background Section'
  }

  // Add content count if available
  const blockCount = data?.contentBlocks?.length || 0
  if (blockCount > 0) {
    label += ` (${blockCount} block${blockCount !== 1 ? 's' : ''})`
  }

  return <div>{label}</div>
}