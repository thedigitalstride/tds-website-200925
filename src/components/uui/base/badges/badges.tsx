'use client'

import type { ReactNode } from 'react'
import { cx } from '@/utils/cx'
import { BadgeGroup } from './badge-groups'

type Sizes = 'sm' | 'md' | 'lg'

interface BadgeProps {
  size?: Sizes
  children: ReactNode
  className?: string
}

export const Badge = (props: BadgeProps) => {
  const { size = 'sm', children, className } = props

  const sizes = {
    sm: 'py-0.5 px-1.5 text-xs font-medium',
    md: 'py-0.5 px-2 text-sm font-medium',
    lg: 'py-1 px-2.5 text-sm font-medium rounded-lg',
  }

  return (
    <span
      className={cx(
        'size-max flex items-center whitespace-nowrap rounded-md shadow-xs',
        'bg-transparent ring-1 ring-outline ring-inset text-brand-500 dark:text-white',
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  )
}

// Export BadgeWithDot as an alias to BadgeGroup with modern theme
export const BadgeWithDot = ({ children, ...props }: React.ComponentProps<typeof BadgeGroup>) => (
  <BadgeGroup {...props} theme="modern">
    {children}
  </BadgeGroup>
)
