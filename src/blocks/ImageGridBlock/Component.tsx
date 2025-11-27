'use client'

import React, { useState } from 'react'
import { cn } from '@/utilities/ui'
import type { ImageGridBlock as ImageGridBlockProps, Media } from '@/payload-types'
import { Lightbox } from '@/components/Lightbox'
import { OptimizedImage } from '@/components/OptimizedImage'

// Aspect ratio CSS classes
const aspectRatioClasses: Record<string, string> = {
  '1/1': 'aspect-square',
  '3/2': 'aspect-[3/2]',
  '16/9': 'aspect-video',
  '2/3': 'aspect-[2/3]',
}

// Grid column classes (responsive)
const gridColumnsClasses: Record<string, string> = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4',
}

// Spacing classes
const spacingClasses: Record<string, string> = {
  compact: 'gap-2',
  normal: 'gap-4',
  large: 'gap-6',
}

// Sizes attribute for Next.js Image optimization
const getSizesAttribute = (columns: string): string => {
  const sizesMap: Record<string, string> = {
    '1': '100vw',
    '2': '(max-width: 640px) 100vw, 50vw',
    '3': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    '4': '(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw',
  }
  return sizesMap[columns] || sizesMap['2']
}

// Get focal point style for object-position
const getFocalPointStyle = (media: Media): React.CSSProperties => {
  if (!media || typeof media !== 'object') return {}
  const { focalX, focalY } = media
  if (focalX === undefined || focalY === undefined) return {}
  return { objectPosition: `${focalX}% ${focalY}%` }
}

export const ImageGridBlock: React.FC<ImageGridBlockProps> = ({
  images,
  aspectRatio = 'auto',
  columns = '2',
  spacing = 'normal',
  enableLightbox = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  // Filter valid images
  const validImages = (images || [])
    .filter((item) => item.media && typeof item.media === 'object')
    .map((item, index) => ({
      id: item.id || `image-${index}`,
      media: item.media as Media,
      name: item.name || null,
    }))

  if (validImages.length === 0) return null

  const hasAspectRatio = aspectRatio !== 'auto'
  const columnsValue = columns || '2'
  const spacingValue = spacing || 'normal'
  const aspectRatioValue = aspectRatio || 'auto'
  const sizesAttr = getSizesAttribute(columnsValue)

  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      setInitialIndex(index)
      setIsOpen(true)
    }
  }

  // Grid classes - [&_img]:!m-0 overrides prose image margins for equal gaps
  const gridClasses = cn(
    'grid w-full [&_img]:!m-0',
    gridColumnsClasses[columnsValue],
    spacingClasses[spacingValue],
  )

  return (
    <div className="my-6">
      <div className={gridClasses}>
        {validImages.map((item, index) => {
          const { media } = item
          const imageAlt = media.alt || item.name || `Image ${index + 1}`
          const focalStyle = getFocalPointStyle(media)

          // Build CSS custom property for focal point
          const focalPointStyle = focalStyle.objectPosition
            ? ({ '--focal-position': focalStyle.objectPosition } as React.CSSProperties)
            : undefined

          // For Auto: simple responsive image (no fill)
          // For Forced: aspect-ratio container with fill
          const imageContent = hasAspectRatio ? (
            <div
              className={cn(
                'relative overflow-hidden rounded-lg',
                aspectRatioClasses[aspectRatioValue],
              )}
              style={focalPointStyle}
            >
              <OptimizedImage
                resource={media}
                alt={imageAlt}
                fill
                className="object-cover [object-position:var(--focal-position,center)]"
                sizes={sizesAttr}
              />
            </div>
          ) : (
            <OptimizedImage
              resource={media}
              alt={imageAlt}
              className="w-full h-auto rounded-lg"
              sizes={sizesAttr}
            />
          )

          // Wrap in button if lightbox enabled
          if (enableLightbox) {
            return (
              <button
                key={item.id}
                onClick={() => handleImageClick(index)}
                className={cn(
                  'w-full text-left cursor-pointer transition-opacity hover:opacity-90',
                  'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-lg',
                )}
                aria-label={`View ${imageAlt} in lightbox`}
              >
                {imageContent}
              </button>
            )
          }

          // No lightbox - render image directly with key
          return <div key={item.id}>{imageContent}</div>
        })}
      </div>

      {enableLightbox && (
        <Lightbox
          images={validImages.map((item) => ({
            id: item.id,
            media: item.media,
            caption: null,
          }))}
          initialIndex={initialIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
