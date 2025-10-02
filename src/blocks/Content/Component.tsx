import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { UUIButton } from '@/components/payload-ui/UUIButton'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, spacing } = props

  const colsSpanClasses = {
    full: 'lg:col-span-12',
    half: 'lg:col-span-6',
    oneThird: 'lg:col-span-4',
    twoThirds: 'lg:col-span-8',
  }

  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  return (
    <section className={cn(spacingClasses[spacing || 'normal'])}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 ${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && <RichText data={richText} enableGutter={false} />}

                {enableLink && link && (
                  <UUIButton
                    label={link.label || undefined}
                    link={link}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
