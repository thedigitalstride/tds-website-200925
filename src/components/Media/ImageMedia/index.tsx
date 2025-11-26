'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { generatePayloadSrcSet, getDefaultSrcFromPayload } from '@/utilities/getPayloadSrcSet'
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

  // Check if this is a blob storage URL or proxy route
  const isBlobStorage = typeof src === 'string' && (
    src.includes('.blob.vercel-storage.com') ||
    src.includes('/api/media/file/')
  )

  // Generate srcset from Payload's pre-generated sizes for blob storage images
  // This enables responsive image loading based on viewport and device pixel ratio
  // Smart filtering: Pass sizes attribute to cap srcset to only include sizes needed for context
  let srcSet: string | undefined
  if (isBlobStorage && resource && typeof resource === 'object' && resource.sizes) {
    srcSet = generatePayloadSrcSet(resource, sizeFromProps)
    // Use an appropriate default size for the src attribute (fallback)
    const defaultUrl = getDefaultSrcFromPayload(resource, sizeFromProps)
    if (defaultUrl) {
      src = getMediaUrl(defaultUrl, resource.updatedAt)
    }
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
        .join(', ')

  // For blob storage with srcset, use native img element since Next.js Image
  // doesn't support custom srcset when unoptimized={true}
  // This allows browsers to select optimal image size from Payload's pre-generated sizes
  if (isBlobStorage && srcSet) {
    const nativeImageElement = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={alt || ''}
        className={cn(
          imgClassName,
          fill && 'absolute inset-0 h-full w-full object-cover',
        )}
        height={!fill ? height : undefined}
        loading={loading || 'lazy'}
        sizes={sizes}
        src={typeof src === 'string' ? src : ''}
        srcSet={srcSet}
        width={!fill ? width : undefined}
        onLoad={() => setIsLoaded(true)}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    )

    // Priority images: Skip animation for PageSpeed optimization
    if (priority) {
      return <picture className={cn(pictureClassName)}>{nativeImageElement}</picture>
    }

    // Lazy-loaded images: Apply smooth fade-in
    return (
      <picture className={cn(pictureClassName)}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={motionConfig}
          style={{ display: 'contents' }}
        >
          {nativeImageElement}
        </motion.span>
      </picture>
    )
  }

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
      unoptimized={isBlobStorage}
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
