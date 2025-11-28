'use client'

import { cn } from '@/utilities/ui'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaUrl } from '@/utilities/getMediaUrl'

export const SvgMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    imgClassName,
    onClick,
    onLoad,
    resource,
  } = props

  if (resource && typeof resource === 'object') {
    const { alt: altFromResource, url, updatedAt } = resource
    const alt = altFromProps || altFromResource || ''
    const src = getMediaUrl(url, updatedAt)

    return (
      // SVGs don't need Next.js Image optimization - they're already vectors
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt}
        className={cn(imgClassName)}
        onClick={onClick}
        onLoad={onLoad}
        src={src}
      />
    )
  }

  return null
}
