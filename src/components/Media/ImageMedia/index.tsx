'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
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
  let srcset: string | undefined

  let isSvg = false

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      height: fullHeight,
      url,
      width: fullWidth,
      mimeType,
      sizes: payloadSizes,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    // Detect SVG images - they can't be optimized
    isSvg = mimeType === 'image/svg+xml' || url?.endsWith('.svg') || false

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)

    // Build srcset from Payload's pre-generated sizes for browser to select appropriate size
    // Sizes: thumbnail (300w), card-mobile (400w), small (600w), card (750w), medium (900w), large (1400w), xlarge (1920w)
    if (!isSvg && payloadSizes && typeof payloadSizes === 'object') {
      const srcsetParts: string[] = []
      for (const [, sizeData] of Object.entries(payloadSizes)) {
        if (sizeData && typeof sizeData === 'object' && 'url' in sizeData && 'width' in sizeData) {
          const sizeUrl = sizeData.url as string | undefined
          const sizeWidth = sizeData.width as number | undefined
          if (sizeUrl && sizeWidth) {
            srcsetParts.push(`${getMediaUrl(sizeUrl, cacheTag)} ${sizeWidth}w`)
          }
        }
      }
      // Add original as largest option
      if (url && fullWidth) {
        srcsetParts.push(`${getMediaUrl(url, cacheTag)} ${fullWidth}w`)
      }
      if (srcsetParts.length > 0) {
        srcset = srcsetParts.join(', ')
      }
    }
  } else if (src) {
    // Check if external src is SVG
    isSvg = src.toString().endsWith('.svg')
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // Browser uses sizes attribute to determine which srcset image to download
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // Use native img with srcset for proper responsive image selection
  // Payload provides WebP conversion and 8 responsive sizes - no Next.js optimization needed
  const imageElement = (
    <img
      alt={alt || ''}
      className={cn(
        imgClassName,
        'transition-opacity duration-500 ease-out',
        isLoaded ? 'opacity-100' : 'opacity-0',
      )}
      height={!fill ? height : undefined}
      width={!fill ? width : undefined}
      loading={priority ? 'eager' : loading}
      sizes={sizes}
      src={src as string}
      srcSet={srcset}
      onLoad={() => setIsLoaded(true)}
      style={
        fill
          ? { position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }
          : undefined
      }
    />
  )

  // Wrapper with blur placeholder background
  const blurStyle = !isSvg
    ? {
        backgroundImage: `url(${PLACEHOLDER_BLUR})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined

  // Priority images (hero, above-fold): Skip animation for PageSpeed optimization
  if (priority) {
    return (
      <picture className={cn(pictureClassName)} style={blurStyle}>
        {imageElement}
      </picture>
    )
  }

  // Lazy-loaded images (below-fold): Apply smooth fade-in with blur placeholder
  return (
    <picture className={cn(pictureClassName)} style={blurStyle}>
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
