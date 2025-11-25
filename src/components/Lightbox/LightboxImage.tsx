'use client'

import React, { useState, useEffect } from 'react'
import NextImage from 'next/image'
import { motion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getOptimalPayloadImageUrl } from '@/utilities/getPayloadImageSize'
import { PLACEHOLDER_BLUR } from '@/constants/imagePlaceholder'

interface LightboxImageProps {
  image: {
    id: string
    media: Media | string
    caption?: string | null
  }
  isActive: boolean
  className?: string
}

export const LightboxImage: React.FC<LightboxImageProps> = ({ image, isActive, className }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [viewportSize, setViewportSize] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateSize = () => {
        setViewportSize({ width: window.innerWidth, height: window.innerHeight })
      }
      updateSize()
      window.addEventListener('resize', updateSize)
      return () => window.removeEventListener('resize', updateSize)
    }
  }, [])

  if (!image.media || typeof image.media !== 'object') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <p className="text-tertiary">Invalid image data</p>
      </div>
    )
  }

  // Validate that URL exists
  const { alt, height, url, width } = image.media
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <p className="text-tertiary">Image URL is missing</p>
      </div>
    )
  }

  const cacheTag = image.media.updatedAt
  let src = getMediaUrl(url, cacheTag)
  const imageAlt = alt || image.caption || ''

  // Check if this is a blob storage URL or proxy route
  const isBlobStorage =
    typeof src === 'string' &&
    (src.includes('.blob.vercel-storage.com') || src.includes('/api/media/file/'))

  // When using blob storage, manually select the optimal Payload-generated image size
  // For lightbox (full-screen), use 'large' or 'xlarge' size for best quality
  if (isBlobStorage && image.media.sizes) {
    // Use '100vw' to get 'large' or 'xlarge' size for lightbox since it's full-screen display
    const optimalUrl = getOptimalPayloadImageUrl(image.media, '100vw')
    if (optimalUrl) {
      src = getMediaUrl(optimalUrl, cacheTag)
    }
  }

  // Final validation: ensure src is not empty after processing
  if (!src || (typeof src === 'string' && src.trim() === '')) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <p className="text-tertiary">Unable to load image: URL is invalid</p>
      </div>
    )
  }

  const maxWidth = Math.min(viewportSize.width - 64, width || 1920)
  const maxHeight = Math.min(viewportSize.height - 200, height || 1080)

  // Maintain aspect ratio
  const aspectRatio = width && height ? width / height : 16 / 9
  const displayWidth = Math.min(maxWidth, maxHeight * aspectRatio)
  const displayHeight = displayWidth / aspectRatio

  if (hasError) {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <p className="text-tertiary">Failed to load image</p>
      </div>
    )
  }

  return (
    <div className={cn('relative flex flex-col items-center justify-center', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
        style={{ width: displayWidth, height: displayHeight }}
      >
        <NextImage
          src={src}
          alt={imageAlt}
          width={width || 1920}
          height={height || 1080}
          className="object-contain"
          quality={95}
          priority={isActive}
          placeholder="blur"
          blurDataURL={PLACEHOLDER_BLUR}
          sizes="100vw"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      </motion.div>
      {image.caption && (
        <motion.figcaption
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-4 max-w-3xl text-center text-sm text-tertiary"
        >
          {image.caption}
        </motion.figcaption>
      )}
    </div>
  )
}
