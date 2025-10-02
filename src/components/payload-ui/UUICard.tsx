import React from 'react'
import { cn } from '@/utilities/ui'

/**
 * UUI-styled Card component for Payload blocks
 *
 * A simple card component using UntitledUI design patterns
 * and the project's existing design tokens.
 */

export interface UUICardProps {
  /** Card content */
  children: React.ReactNode
  /** Custom class names */
  className?: string
  /** Card padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Whether to show shadow */
  shadow?: boolean
  /** Whether to show border */
  bordered?: boolean
  /** Background variant */
  background?: 'default' | 'muted' | 'card'
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
}

const backgroundClasses = {
  default: 'bg-background',
  muted: 'bg-muted',
  card: 'bg-card'
}

export const UUICard: React.FC<UUICardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = true,
  bordered = true,
  background = 'card',
  ...props
}) => {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-lg transition-colors',

        // Background
        backgroundClasses[background],

        // Padding
        paddingClasses[padding],

        // Border
        bordered && 'border border-border',

        // Shadow
        shadow && 'shadow-xs',

        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default UUICard