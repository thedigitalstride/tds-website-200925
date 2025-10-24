'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React, { useState } from 'react'
import { motion } from 'motion/react'

import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { cn } from '@/utilities/ui'
import { PLACEHOLDER_BLUR } from '@/constants/imagePlaceholder'

// Motion configuration for fade-in effect - smoother transition
const motionConfig = {
  duration: 0.5, // Longer for smoother fade
  ease: [0.25, 0.1, 0.25, 1] as const, // Smoother ease curve
}


export interface OptimizedImageProps {
  // Image source - can be external URL, static import, or Payload Media resource
  src?: string | StaticImageData
  resource?: Media

  // Standard img attributes
  alt: string
  className?: string

  // Next.js Image optimization props
  width?: number
  height?: number
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  fill?: boolean
  quality?: number

  // Additional styling
  pictureClassName?: string

  // Blur placeholder
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export const OptimizedImage: React.FC<OptimizedImageProps> = (props) => {
  const {
    src,
    resource,
    alt,
    className,
    width,
    height,
    priority = false,
    loading,
    sizes,
    fill = false,
    quality = 100,
    pictureClassName,
    placeholder = 'blur',
    blurDataURL = PLACEHOLDER_BLUR,
  } = props

  const [isLoaded, setIsLoaded] = useState(false)

  // If we have a Payload Media resource, use the existing ImageMedia component
  if (resource && typeof resource === 'object') {
    return (
      <ImageMedia
        resource={resource}
        alt={alt}
        imgClassName={className}
        pictureClassName={pictureClassName}
        priority={priority}
        loading={loading}
        size={sizes}
        fill={fill}
      />
    )
  }

  // For external URLs or static imports, use Next.js Image directly
  if (src) {
    const imageElement = (
      <NextImage
        src={src}
        alt={alt}
        className={cn(className)}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority}
        loading={loading || (!priority ? 'lazy' : undefined)}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
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

  // Fallback - render empty div with background color if no image provided
  return <div className={cn('bg-secondary', className)} aria-label={alt} />
}