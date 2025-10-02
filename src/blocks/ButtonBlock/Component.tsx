'use client'

import React from 'react'
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui/UUIButton'
import * as UUIIcons from '@untitledui/icons'

// Type for dynamic icon imports
type IconComponent = React.FC<{ className?: string }>

export const ButtonBlockComponent: React.FC<ButtonBlockProps & { className?: string }> = ({
  buttons,
  layout = 'horizontal',
  alignment = 'left',
  className,
}) => {
  if (!buttons || buttons.length === 0) {
    return null
  }

  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  const layoutClasses = {
    horizontal: 'flex-row gap-3',
    vertical: 'flex-col gap-2',
  }

  return (
    <div
      className={`flex ${layoutClasses[layout || 'horizontal']} ${alignmentClasses[alignment || 'left']} flex-wrap ${className || ''}`}
    >
      {buttons.map((button, index) => {
        const { link, icon, iconPosition } = button

        // Dynamic icon loading from @untitledui/icons
        let IconComponent: IconComponent | undefined

        if (icon && typeof icon === 'string') {
          // Get the icon component from the UUIIcons namespace
          IconComponent = (UUIIcons as Record<string, IconComponent>)[icon]

          if (!IconComponent) {
            console.warn(`Icon "${icon}" not found in @untitledui/icons. Available icons must match exact export names (e.g., "ArrowRight", "Download01").`)
          }
        }

        return (
          <UUIButton
            key={index}
            label={link?.label || `Button ${index + 1}`}
            link={link}
            icon={IconComponent}
            iconPosition={iconPosition || 'leading'}
          />
        )
      })}
    </div>
  )
}

export default ButtonBlockComponent