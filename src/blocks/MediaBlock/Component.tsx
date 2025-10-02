import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Link01 } from "@untitledui/icons"

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
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
    caption,
  } = props

  // Use the new caption structure or fallback to media caption
  const blockCaption = caption || (media && typeof media === 'object' ? media.caption : null)

  return (
    <figure
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn('w-full', 'border border-border rounded-[0.8rem]', imgClassName)}
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
              <Link01 className="size-4 text-utility-gray-400 mt-0.5" />
              <span>
                {String(blockCaption.text || '')}
                {(() => {
                  if (blockCaption.link &&
                      typeof blockCaption.link === 'object' &&
                      'url' in blockCaption.link &&
                      'text' in blockCaption.link &&
                      blockCaption.link.url &&
                      blockCaption.link.text) {
                    return (
                      <>
                        {' '}
                        <a
                          href={String(blockCaption.link.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                          {String(blockCaption.link.text)}
                        </a>
                      </>
                    );
                  }
                  return null;
                })()}
              </span>
            </div>
          ) : (
            // Fallback to rich text caption
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <RichText data={blockCaption as any} enableGutter={false} />
          )}
        </figcaption>
      )}
    </figure>
  )
}
