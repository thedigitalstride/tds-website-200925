'use client'

import React, { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/utilities/ui'
import type { LightboxBlock as LightboxBlockProps } from '@/payload-types'
import { Lightbox } from '@/components/Lightbox'
import { OptimizedImage } from '@/components/OptimizedImage'

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 200ms gap between images
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 }, // 2rem = 32px (slide up from below)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

interface ExtendedLightboxBlockProps extends LightboxBlockProps {
  disableInnerContainer?: boolean
}

export const LightboxBlock: React.FC<ExtendedLightboxBlockProps> = ({
  images,
  thumbnailColumns = '3',
  thumbnailSpacing = 'normal',
  enableLightbox = true,
  enableAnimation = true,
  disableInnerContainer,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [initialIndex, setInitialIndex] = useState(0)

  // Animation hooks
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  // Determine if animation should be active
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  if (!images || images.length === 0) {
    return null
  }

  // Convert images to Lightbox format
  const lightboxImages = images
    .filter((item) => item.media && typeof item.media === 'object')
    .map((item, index) => ({
      id: item.id || `lightbox-${index}`,
      media: item.media,
      caption: item.caption || null,
    }))

  if (lightboxImages.length === 0) {
    return null
  }

  // Grid column classes
  const gridColumnsClasses: Record<string, string> = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }

  // Spacing classes
  const spacingClasses: Record<string, string> = {
    compact: 'gap-2',
    normal: 'gap-4',
    large: 'gap-6',
  }

  const handleImageClick = (index: number) => {
    if (enableLightbox) {
      setInitialIndex(index)
      setIsOpen(true)
    }
  }

  const gridClasses = cn(
    'grid w-full',
    gridColumnsClasses[thumbnailColumns || '3'],
    spacingClasses[thumbnailSpacing || 'normal'],
  )

  const content = (
    <motion.div
      ref={containerRef}
      className={gridClasses}
      variants={shouldAnimate ? containerVariants : undefined}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate={isInView ? 'visible' : 'hidden'}
    >
      {lightboxImages.map((item, index) => {
        const media = item.media
        if (!media || typeof media !== 'object') return null

        const { alt } = media
        const imageAlt = alt || item.caption || `Image ${index + 1}`

        const imageElement = (
          <OptimizedImage
            resource={media}
            alt={imageAlt}
            className={cn(
              'w-full h-auto rounded-xl cursor-pointer transition-opacity',
              enableLightbox && 'hover:opacity-90',
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )

        return (
          <motion.div
            key={item.id}
            className="relative group"
            variants={shouldAnimate ? itemVariants : undefined}
          >
            {enableLightbox ? (
              <button
                onClick={() => handleImageClick(index)}
                className="w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-xl"
                aria-label={`View ${imageAlt} in lightbox`}
              >
                {imageElement}
              </button>
            ) : (
              imageElement
            )}
            {item.caption && (
              <figcaption className="mt-2 text-sm text-tertiary">{item.caption}</figcaption>
            )}
          </motion.div>
        )
      })}
    </motion.div>
  )

  if (disableInnerContainer) {
    return (
      <>
        {content}
        {enableLightbox && (
          <Lightbox
            images={lightboxImages}
            initialIndex={initialIndex}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </>
    )
  }

  return (
    <section>
      <div className="mx-auto max-w-container">{content}</div>
      {enableLightbox && (
        <Lightbox
          images={lightboxImages}
          initialIndex={initialIndex}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </section>
  )
}
