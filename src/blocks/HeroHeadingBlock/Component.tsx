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
    brand: 'text-accent-500 dark:text-accent-500',
  }

  return (
    <section
      className={cn(
        'relative lg:flex lg:items-center',
        spacingClasses[spacing],
      )}
    >
      <div className="mx-auto max-w-container px-4 md:px-8 flex w-full items-center">
        <div className={cn('flex flex-col w-full', alignmentClasses[textAlignment])}>
          <h1
            className={cn(
              'mt-4 font-semibold',
              headlineColorClasses[headlineColor],
            )}
            style={{
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-poppins, Poppins)',
              fontSize: 'clamp(2.1rem, 5vw + 1rem, 6.5rem)',
              lineHeight: '1.2',
              fontWeight: '700',
            }}
          >
            {headline}
          </h1>
          {subtitle && (
            <h2
              className="text-brand-500 dark:text-white mt-10 font-normal"
              style={{
                fontSize: 'clamp(1.26rem, 3vw + 0.6rem, 3.9rem)',
                lineHeight: '1.3',
              }}
            >
              {subtitle}
            </h2>
          )}
        </div>
      </div>
    </section>
  )
}
