'use client'

import React from 'react'
import type { MediaBlock } from '@/payload-types'

interface MediaBlockLabelProps {
  value?: MediaBlock
}

export const MediaBlockRowLabel: React.FC<MediaBlockLabelProps> = ({ value }) => {
  // Get blockName (editable field provided by Payload)
  const blockName = value?.blockName

  // Format: "Image: [blockName or 'untitled']"
  const label = blockName ? `Image: ${blockName}` : 'Image: untitled'

  return <span>{label}</span>
}
