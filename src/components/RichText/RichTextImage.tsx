'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utilities/ui'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Lightbox } from '@/components/Lightbox'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'

interface RichTextImageProps {
  uploadDoc: Media
  className?: string
  enableLightbox?: boolean
}

export const RichTextImage: React.FC<RichTextImageProps> = ({
  uploadDoc,
  className,
  enableLightbox = true,
}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const { alt, height, url, width, updatedAt, caption } = uploadDoc
  const src = getMediaUrl(url, updatedAt)

  const lightboxImage = enableLightbox
    ? {
        id: uploadDoc.id || 'richtext-image',
        media: uploadDoc,
        caption:
          caption && typeof caption === 'object' && 'root' in caption
            ? null // Rich text captions are rendered separately
            : null,
      }
    : null

  const handleImageClick = () => {
    if (enableLightbox && lightboxImage) {
      setIsLightboxOpen(true)
    }
  }

  const imageElement = (
    <Image
      alt={alt || ''}
      height={height || 800}
      src={src}
      width={width || 1200}
      className={cn(
        'w-full h-auto',
        enableLightbox && 'cursor-pointer transition-opacity hover:opacity-90',
        className,
      )}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    />
  )

  return (
    <>
      <figure className="richtext-inline-image col-start-2 my-8">
        {enableLightbox ? (
          <button
            onClick={handleImageClick}
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            aria-label={`View ${alt || 'image'} in lightbox`}
          >
            {imageElement}
          </button>
        ) : (
          imageElement
        )}
        {caption && typeof caption === 'object' && 'root' in caption && (
          <figcaption className="mt-4 text-sm text-tertiary">
            <ConvertRichText data={caption} />
          </figcaption>
        )}
      </figure>
      {enableLightbox && lightboxImage && (
        <Lightbox
          images={[lightboxImage]}
          initialIndex={0}
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  )
}
