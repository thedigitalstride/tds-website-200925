import React from 'react'
import { cn } from '@/utilities/ui'

export interface SectionHeaderProps {
  eyebrow?: string
  heading?: string
  description?: string
  alignment?: 'left' | 'center'
  colorMode?: 'default' | 'light' | 'dark'
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  description,
  alignment = 'left',
  colorMode = 'default',
  headingLevel = 'h3',
  className,
}) => {
  const isCentered = alignment === 'center'

  // Color mode classes
  const colorClasses = {
    default: {
      eyebrow: 'text-brand-secondary',
      heading: 'text-primary',
      description: 'text-tertiary',
    },
    light: {
      eyebrow: 'text-white/80',
      heading: 'text-white',
      description: 'text-white/80',
    },
    dark: {
      eyebrow: 'text-brand-secondary',
      heading: 'text-brand-primary',
      description: 'text-tertiary',
    },
  }

  const colors = colorClasses[colorMode]

  // Don't render if no content
  if (!eyebrow && !heading && !description) {
    return null
  }

  const HeadingTag = headingLevel

  return (
    <div
      className={cn(
        'flex w-full max-w-3xl flex-col',
        isCentered && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <span className={cn('text-sm font-semibold md:text-md', colors.eyebrow)}>{eyebrow}</span>
      )}
      {heading && (
        <HeadingTag
          className={cn(
            'text-display-xs font-semibold md:text-display-sm',
            eyebrow && 'mt-3',
            colors.heading,
          )}
        >
          {heading}
        </HeadingTag>
      )}
      {description && (
        <p className={cn('mt-4 text-lg md:mt-5 md:text-xl', colors.description)}>{description}</p>
      )}
    </div>
  )
}
