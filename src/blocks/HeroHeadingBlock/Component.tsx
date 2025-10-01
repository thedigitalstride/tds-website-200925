import React from 'react'
import type { HeroHeadingBlock as HeroHeadingBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const HeroHeadingBlock: React.FC<HeroHeadingBlockProps> = ({
  headline,
  subtitle,
  layoutOptions,
}) => {
  // Don't render if no headline content
  if (!headline?.trim()) {
    return null
  }

  const textAlignment = layoutOptions?.textAlignment || 'left'
  const spacing = layoutOptions?.spacing || 'normal'
  const headlineColor = layoutOptions?.headlineColor || 'primary'

  const spacingClasses: Record<string, string> = {
    compact: 'py-12 lg:py-16',
    normal: 'py-16 lg:py-24',
    spacious: 'py-24 lg:py-32',
  }

  const alignmentClasses: Record<string, string> = {
    left: 'items-start text-left',
    center: 'items-center text-center',
  }

  // Brand color uses text-brand-700 which is dark blue in light mode
  // and automatically switches to lighter brand color in dark mode via theme
  const headlineColorClasses: Record<string, string> = {
    primary: 'text-primary',
    brand: 'text-brand-700 dark:text-brand-500',
  }

  return (
    <section
      className={cn(
        'relative lg:flex lg:min-h-[720px] lg:items-center',
        spacingClasses[spacing],
      )}
    >
      <div className="container mx-auto flex w-full items-center">
        <div className={cn('flex flex-col w-full', alignmentClasses[textAlignment])}>
          <h1
            className={cn(
              'mt-4 text-display-lg md:text-display-xl lg:text-display-2xl font-semibold',
              headlineColorClasses[headlineColor],
            )}
            style={{ whiteSpace: 'pre-line' }}
          >
            {headline}
          </h1>
          {subtitle && (
            <h2 className="text-secondary mt-10 text-xl md:text-display-xs font-normal">
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
