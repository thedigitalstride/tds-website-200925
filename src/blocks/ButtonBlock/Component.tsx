'use client'

import React from 'react'
import type { ButtonBlock as ButtonBlockProps } from '@/payload-types'
import { UUIButton } from '@/components/payload-ui/UUIButton'

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
      className={`not-prose flex ${layoutClasses[layout || 'horizontal']} ${alignmentClasses[alignment || 'left']} flex-wrap ${className || ''}`}
    >
      {buttons.map((button, index) => {
        const { link } = button

        return (
          <UUIButton
            key={index}
            label={link?.label || `Button ${index + 1}`}
            link={link}
          />
        )
      })}
    </div>
  )
}

export default ButtonBlockComponent