import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { UUIButton } from '@/components/payload-ui/UUIButton'
import { OptimizedImage } from '@/components/OptimizedImage'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, spacing } = props

  const colsSpanClasses = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const verticalAlignClasses = {
    top: 'self-start',
    middle: 'self-center',
    bottom: 'self-end',
  }

  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  return (
    <section className={cn('bg-primary', spacingClasses[spacing || 'normal'])}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const {
              contentType,
              enableLink,
              link,
              richText,
              image,
              imageOptions,
              size,
              verticalAlign
            } = col

            // Image styling classes
            const objectFitClasses = {
              cover: 'object-cover',
              contain: 'object-contain',
              fill: 'object-fill',
              none: 'object-none',
            }

            const aspectRatioClasses = {
              auto: '',
              square: 'aspect-square',
              video: 'aspect-video',
              portrait: 'aspect-[3/4]',
            }

            const stickyStyles = imageOptions?.isSticky && imageOptions.stickyTop
              ? { top: imageOptions.stickyTop }
              : undefined

            // When sticky is enabled, don't use vertical align classes (need full height)
            const shouldUseVerticalAlign = !(contentType === 'image' && imageOptions?.isSticky)

            return (
              <div
                className={cn(
                  'col-span-4',
                  colsSpanClasses[size!],
                  shouldUseVerticalAlign && verticalAlignClasses[verticalAlign || 'top'],
                  size !== 'full' && 'md:col-span-2',
                )}
                key={index}
              >
                {contentType === 'image' && image ? (
                  <div
                    className={cn('w-full', imageOptions?.isSticky && 'sticky top-20')}
                    style={stickyStyles}
                  >
                    <OptimizedImage
                      resource={typeof image === 'object' ? image : undefined}
                      alt={typeof image === 'object' && image.alt ? image.alt : ''}
                      className={cn(
                        'w-full rounded-2xl',
                        imageOptions?.ratio && aspectRatioClasses[imageOptions.ratio as keyof typeof aspectRatioClasses],
                        imageOptions?.fit && objectFitClasses[imageOptions.fit as keyof typeof objectFitClasses],
                      )}
                    />
                  </div>
                ) : (
                  richText && <RichText data={richText} enableGutter={false} />
                )}

                {enableLink && link && (
                  <div className="mt-6">
                    <UUIButton
                      label={link.label || undefined}
                      link={link}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
