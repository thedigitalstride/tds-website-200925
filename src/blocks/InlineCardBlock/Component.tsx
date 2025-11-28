'use client'

import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import type { InlineCardBlock as InlineCardBlockProps } from '@/payload-types'
import { InlineCard } from '@/components/cards/InlineCard'
import { UUIButton } from '@/components/payload-ui'
import { cn } from '@/utilities/ui'
import type { BackgroundVariant } from '@/utilities/backgroundVariants'

// Animation variants (single card - no stagger needed)
const itemVariants = {
  hidden: { opacity: 0, y: 32 }, // 2rem = 32px (slide up from below)
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  },
}

export const InlineCardBlock: React.FC<InlineCardBlockProps> = ({
  icon,
  content,
  enableLink,
  link,
  cardStyle,
  cardBackground,
  iconColor,
  iconTheme,
  enableAnimation = true,
}) => {
  // Animation hooks
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()

  // Determine if animation should be active
  const shouldAnimate = enableAnimation && !prefersReducedMotion

  const iconData = typeof icon === 'object' ? icon : null
  const hasIcon = !!iconData?.svgCode

  const cardStyleValue = (cardBackground || 'none') as BackgroundVariant
  const cardLayout = cardStyle || 'card'
  const iconColorValue = (iconColor || 'primary') as 'primary' | 'primary-reversed' | 'accent' | 'secondary' | 'tertiary' | 'outline'
  const iconShape = (iconTheme || 'rounded-square') as 'rounded-square' | 'round'

  // Render footer button if link is enabled
  const footer =
    enableLink && link ? (
      <UUIButton
        label={link.label || 'Learn more'}
        link={link}
        className={cn(
          // Override link variant colors for special backgrounds
          (cardStyleValue === 'tertiary' ||
            cardStyleValue === 'primary-reversed' ||
            cardStyleValue === 'accent') &&
            typeof link === 'object' &&
            link.uuiColor === 'link' && [
              // Tertiary: dark text on light gray background (both modes)
              cardStyleValue === 'tertiary' &&
                '[&]:text-brand-700! [&_*[data-text]]:text-brand-700! [&_*[data-icon]]:text-brand-700! hover:[&]:text-brand-900! hover:[&_*[data-text]]:text-brand-900! hover:[&_*[data-icon]]:text-brand-900!',
              // Primary-reversed: white text on dark bg (light mode), dark text on white bg (dark mode)
              cardStyleValue === 'primary-reversed' &&
                '[&]:text-white! dark:[&]:text-brand-700! [&_*[data-text]]:text-white! dark:[&_*[data-text]]:text-brand-700! [&_*[data-icon]]:text-white! dark:[&_*[data-icon]]:text-brand-700! hover:[&]:text-gray-200! dark:hover:[&]:text-brand-900! hover:[&_*[data-text]]:text-gray-200! dark:hover:[&_*[data-text]]:text-brand-900! hover:[&_*[data-icon]]:text-gray-200! dark:hover:[&_*[data-icon]]:text-brand-900!',
              // Accent: white text on blue background (both modes)
              cardStyleValue === 'accent' &&
                '[&]:text-white! [&_*[data-text]]:text-white! [&_*[data-icon]]:text-white! hover:[&]:text-gray-200! hover:[&_*[data-text]]:text-gray-200! hover:[&_*[data-icon]]:text-gray-200!',
            ],
        )}
      />
    ) : undefined

  return (
    <motion.div
      ref={containerRef}
      variants={shouldAnimate ? itemVariants : undefined}
      initial={shouldAnimate ? 'hidden' : 'visible'}
      animate={isInView ? 'visible' : 'hidden'}
    >
      <InlineCard
        svgCode={hasIcon ? iconData?.svgCode : undefined}
        content={content || undefined}
        footer={footer}
        cardStyle={cardLayout}
        cardBackground={cardStyleValue}
        iconColor={iconColorValue}
        iconTheme={iconShape}
      />
    </motion.div>
  )
}

