import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { UUICard, UUIButton } from '@/components/payload-ui'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container">
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
            // Use UUIButton for primary action, fallback to CMSLink for others
            if (i === 0) {
              return (
                <UUIButton
                  key={i}
                  label={link?.label || 'Learn More'}
                  link={link?.url || ''}
                  color="primary"
                  size="lg"
                />
              )
            }
            return <CMSLink key={i} size="lg" {...link} />
          })}
        </div>
      </UUICard>
    </div>
  )
}
