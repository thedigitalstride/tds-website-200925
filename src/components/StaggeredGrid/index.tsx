'use client'

import React from 'react'
import { motion } from 'motion/react'

// Stagger animation configuration - smoother, more gentle
const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // 80ms delay between each item (faster sequence)
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 }, // Reduced vertical movement for subtlety
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6, // Longer duration for smoother fade
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Smoother ease curve (closer to ease-in-out)
    },
  },
}

interface StaggeredGridProps {
  children: React.ReactNode
  className?: string
  as?: 'ul' | 'div'
  animationKey?: string | number // Key to force animation replay on change
}

/**
 * StaggeredGrid Component
 *
 * A reusable wrapper component that adds staggered fade-in animations to grid layouts.
 * Use this for blog post grids, card grids, or any grid of items that should animate in sequence.
 *
 * Animation will replay whenever `animationKey` changes (e.g., when filters change).
 *
 * @example
 * ```tsx
 * <StaggeredGrid
 *   as="ul"
 *   className="grid grid-cols-3 gap-4"
 *   animationKey={selectedCategory} // Animation replays when category changes
 * >
 *   {items.map((item) => (
 *     <StaggeredGridItem key={item.id}>
 *       <Card {...item} />
 *     </StaggeredGridItem>
 *   ))}
 * </StaggeredGrid>
 * ```
 */
export const StaggeredGrid: React.FC<StaggeredGridProps> = ({ children, className, as = 'ul', animationKey }) => {
  const MotionComponent = motion[as] as typeof motion.ul

  return (
    <MotionComponent
      key={animationKey} // Force remount and replay animation when key changes
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

// Item sub-component for individual grid items - exported separately
export const StaggeredGridItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.li variants={itemVariants} className={className}>
      {children}
    </motion.li>
  )
}
