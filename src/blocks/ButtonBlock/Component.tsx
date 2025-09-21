import React from 'react'
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui/UUIButton'

// Type for dynamic icon imports
type IconComponent = React.ComponentType<{ className?: string }>

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

        // For now, we'll handle icons as a future enhancement
        // This would require dynamic imports of @untitledui/icons
        let IconComponent: IconComponent | undefined

        // TODO: Implement dynamic icon loading
        // if (icon) {
        //   try {
        //     IconComponent = require(`@untitledui/icons/${icon}`).default
        //   } catch (error) {
        //     console.warn(`Icon ${icon} not found`)
        //   }
        // }

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