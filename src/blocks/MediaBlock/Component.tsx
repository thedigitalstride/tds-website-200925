'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import { Link01 } from '@untitledui/icons'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'
import { Lightbox } from '@/components/Lightbox'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
  disableSpacing?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    caption,
    enableLightbox = false,
  } = props

  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Use the new caption structure or fallback to media caption
  const blockCaption = caption || (media && typeof media === 'object' ? media.caption : null)

  // Helper to check if caption has actual content
  const hasCaptionContent = (cap: typeof blockCaption): boolean => {
    if (!cap) return false
    if (typeof cap === 'object' && 'text' in cap) {
      const hasText = Boolean(cap.text && String(cap.text).trim())
      const hasLink =
        cap.link &&
        typeof cap.link === 'object' &&
        'url' in cap.link &&
        'text' in cap.link &&
        Boolean(cap.link.url) &&
        Boolean(cap.link.text)
      return hasText || Boolean(hasLink)
    }
    return false
  }

  // Prepare lightbox image if lightbox is enabled
  const lightboxImage =
    enableLightbox && media && typeof media === 'object'
      ? {
          id: media.id || 'media-block',
          media: media,
          caption:
            typeof blockCaption === 'object' && blockCaption !== null && 'text' in blockCaption
              ? typeof blockCaption.text === 'string'
                ? blockCaption.text
                : null
              : null,
        }
      : null

  const handleImageClick = () => {
    if (enableLightbox && lightboxImage) {
      setIsLightboxOpen(true)
    }
  }

  const imageElement =
    media || staticImage ? (
      <Media
        imgClassName={cn(
          'w-full !rounded-xl !my-0',
          enableLightbox && 'cursor-pointer transition-opacity hover:opacity-90',
          imgClassName,
        )}
        resource={media}
        src={staticImage}
      />
    ) : null

  return (
    <>
      <figure className={className}>
        {imageElement && enableLightbox ? (
          <button
            onClick={handleImageClick}
            className="w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded-xl"
            aria-label={`View ${typeof media === 'object' ? media.alt || 'image' : 'image'} in lightbox`}
          >
            {imageElement}
          </button>
        ) : (
          imageElement
        )}
        {hasCaptionContent(blockCaption) && (
          <figcaption
            className={cn(
              'mt-6',
              {
                container: !disableInnerContainer,
              },
              captionClassName,
            )}
          >
            {blockCaption && typeof blockCaption === 'object' && 'text' in blockCaption ? (
              // New caption structure with optional link
              <div className="flex items-start gap-2">
                <Link01 className="size-4 text-utility-gray-400 mt-0.5 shrink-0" />
                <span className="text-sm text-secondary">
                  {String(blockCaption.text || '')}
                  {(() => {
                    if (
                      blockCaption.link &&
                      typeof blockCaption.link === 'object' &&
                      'url' in blockCaption.link &&
                      'text' in blockCaption.link &&
                      blockCaption.link.url &&
                      blockCaption.link.text
                    ) {
                      return (
                        <>
                          {' '}
                          <a
                            href={String(blockCaption.link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-dark transition-colors rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                          >
                            {String(blockCaption.link.text)}
                          </a>
                        </>
                      )
                    }
                    return null
                  })()}
                </span>
              </div>
            ) : null}
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
