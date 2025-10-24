'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'

import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'
import { cn } from '@/utilities/ui'
import { PLACEHOLDER_BLUR } from '@/constants/imagePlaceholder'


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
    return (
      <picture className={cn(pictureClassName)}>
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
        />
      </picture>
    )
  }

  // Fallback - render empty div with background color if no image provided
  return <div className={cn('bg-secondary', className)} aria-label={alt} />
}