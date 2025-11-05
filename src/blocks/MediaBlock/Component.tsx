import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import { Link01 } from '@untitledui/icons'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

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
  } = props

  // Use the new caption structure or fallback to media caption
  const blockCaption = caption || (media && typeof media === 'object' ? media.caption : null)

  return (
    <figure className={className}>
      {(media || staticImage) && (
        <Media
          imgClassName={cn('w-full !rounded-2xl !my-0', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {blockCaption && (
        <figcaption
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {typeof blockCaption === 'object' && 'text' in blockCaption ? (
            // New caption structure with optional link
            <div className="flex items-start gap-2">
              <Link01 className="size-4 text-utility-gray-400 mt-0.5 flex-shrink-0" />
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
  )
}
