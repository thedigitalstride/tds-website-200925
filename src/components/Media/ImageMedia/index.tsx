'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { PLACEHOLDER_BLUR } from '@/constants/imagePlaceholder'

// Motion configuration for fade-in effect - smoother transition
const motionConfig = {
  duration: 0.5, // Longer for smoother fade
  ease: [0.25, 0.1, 0.25, 1] as const, // Smoother ease curve
}

const { breakpoints } = cssVariables


export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  const [isLoaded, setIsLoaded] = useState(false)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // Use Next.js Image optimization for all images (including blob storage)
  // Next.js will dynamically generate the exact sizes needed via /_next/image
  // Payload's pre-generated sizes (300w, 400w, 600w, 750w, 900w, etc.) are kept as fallback
  const imageElement = (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      placeholder="blur"
      blurDataURL={PLACEHOLDER_BLUR}
      priority={priority}
      quality={85}
      loading={loading}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
      onLoad={() => setIsLoaded(true)}
    />
  )

  // Priority images (hero, above-fold): Skip animation for PageSpeed optimization
  if (priority) {
    return <picture className={cn(pictureClassName)}>{imageElement}</picture>
  }

  // Lazy-loaded images (below-fold): Apply smooth fade-in
  return (
    <picture className={cn(pictureClassName)}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={motionConfig}
        style={{ display: 'contents' }}
      >
        {imageElement}
      </motion.span>
    </picture>
  )
}
