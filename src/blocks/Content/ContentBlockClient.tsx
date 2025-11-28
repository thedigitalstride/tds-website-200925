'use client'

import { motion, useReducedMotion, type Variants } from 'motion/react'
import React from 'react'

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

interface ContentBlockClientProps {
  className?: string
  children: React.ReactNode
}

export const ContentBlockClient: React.FC<ContentBlockClientProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

interface AnimatedColumnProps {
  className?: string
  children: React.ReactNode
  shouldAnimate: boolean
}

export const AnimatedColumn: React.FC<AnimatedColumnProps> = ({
  className,
  children,
  shouldAnimate,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const shouldAnimateColumn = shouldAnimate && !prefersReducedMotion

  if (!shouldAnimateColumn) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={columnVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  )
}
