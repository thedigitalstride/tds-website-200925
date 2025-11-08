import React from 'react'
import type { SpacerBlock as SpacerBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SpacerBlock: React.FC<SpacerBlockProps> = ({ height }) => {
  const heightClasses: Record<string, string> = {
    xs: 'h-4',      // 1rem / 16px
    sm: 'h-6',      // 1.5rem / 24px
    normal: 'h-8',  // 2rem / 32px
    md: 'h-12',     // 3rem / 48px
    lg: 'h-16',     // 4rem / 64px
    xl: 'h-24',     // 6rem / 96px
    '2xl': 'h-32',  // 8rem / 128px
  }

  return <div className={cn(heightClasses[height || 'normal'])} aria-hidden="true" />
}

