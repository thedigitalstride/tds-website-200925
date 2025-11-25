import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { UUICard, UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText, spacing }) => {
  const spacingClasses: Record<string, string> = {
    none: '',
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  return (
    <section className={cn(spacingClasses[spacing || 'normal'])}>
      <div className="mx-auto max-w-container px-4 md:px-8">
        <UUICard
        className="flex flex-col gap-8 md:flex-row md:justify-between md:items-center"
        padding="lg"
        shadow={true}
        bordered={true}
      >
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
          {(links || []).map(({ link }, i) => {
            // Use UUIButton for all links to take advantage of the UUI styling
            return (
              <UUIButton
                key={i}
                label={link?.label || 'Learn More'}
                link={link}
              />
            )
          })}
        </div>
      </UUICard>
      </div>
    </section>
  )
}
