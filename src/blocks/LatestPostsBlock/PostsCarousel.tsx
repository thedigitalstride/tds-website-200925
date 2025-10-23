'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, animate } from 'motion/react'
import { ChevronLeft, ChevronRight } from '@untitledui/icons'
import { PayloadBlogCard, type PayloadArticle } from './BlogCard'
import { cn } from '@/utilities/ui'

interface PostsCarouselProps {
  articles: PayloadArticle[]
  imageSizes: string
  peekAmount?: 'none' | 'small' | 'medium' | 'large'
  enableDrag?: boolean
  showArrows?: boolean
  showProgress?: boolean
  autoPlay?: boolean
  autoPlayInterval?: number
  columns: {
    mobile: string
    tablet: string
    desktop: string
  }
}

// Peek offset calculations (in pixels)
const peekOffsets = {
  none: 0,
  small: 24, // ~5%
  medium: 48, // ~10%
  large: 72, // ~15%
}

// Motion configuration matching Header.tsx patterns
const motionConfig = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.4,
  },
  easing: [0.4, 0, 0.2, 1] as const, // cubic-bezier smooth
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
}

export const PostsCarousel: React.FC<PostsCarouselProps> = ({
  articles,
  imageSizes,
  peekAmount = 'medium',
  enableDrag = true,
  showArrows = true,
  showProgress = false,
  autoPlay = false,
  autoPlayInterval = 5000,
  columns,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const x = useMotionValue(0)

  // Determine columns based on viewport (server-safe defaults)
  const [viewportCols, setViewportCols] = useState(parseInt(columns.desktop))

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) {
        setViewportCols(parseInt(columns.mobile))
      } else if (window.innerWidth < 1024) {
        setViewportCols(parseInt(columns.tablet))
      } else {
        setViewportCols(parseInt(columns.desktop))
      }
    }

    updateCols()
    window.addEventListener('resize', updateCols)
    return () => window.removeEventListener('resize', updateCols)
  }, [columns])

  // Calculate card width based on columns and peek
  const peekOffset = peekOffsets[peekAmount]
  const gap = 24 // 1.5rem in pixels
  const totalCards = articles.length

  // Card width calculation: (container / columns) - gap - peek
  const getCardWidth = useCallback(() => {
    if (!containerRef.current) return 400
    const containerWidth = containerRef.current.offsetWidth
    const cardWidth = containerWidth / viewportCols - gap - peekOffset / viewportCols
    return cardWidth
  }, [viewportCols, gap, peekOffset])

  const [cardWidth, setCardWidth] = useState(getCardWidth())

  useEffect(() => {
    const updateCardWidth = () => setCardWidth(getCardWidth())
    updateCardWidth()
    window.addEventListener('resize', updateCardWidth)
    return () => window.removeEventListener('resize', updateCardWidth)
  }, [getCardWidth])

  // Maximum scroll distance
  const maxScroll = -(cardWidth + gap) * (totalCards - viewportCols)

  // Update scroll indicators
  useEffect(() => {
    const updateScrollState = () => {
      const currentX = x.get()
      setCanScrollLeft(currentX < 0)
      setCanScrollRight(currentX > maxScroll)
    }

    const unsubscribe = x.on('change', updateScrollState)
    return unsubscribe
  }, [x, maxScroll])

  // Scroll to specific index
  const scrollTo = useCallback(
    (index: number) => {
      const targetX = -(cardWidth + gap) * index
      const clampedX = Math.max(Math.min(targetX, 0), maxScroll)

      animate(x, clampedX, {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      })

      setCurrentIndex(index)
      setCurrentPage(index)
    },
    [x, cardWidth, gap, maxScroll],
  )

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    const newIndex = Math.max(currentIndex - 1, 0)
    scrollTo(newIndex)
  }, [currentIndex, scrollTo])

  const scrollNext = useCallback(() => {
    const newIndex = Math.min(currentIndex + 1, totalCards - viewportCols)
    scrollTo(newIndex)
  }, [currentIndex, scrollTo, totalCards, viewportCols])

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isDragging) return

    const interval = setInterval(() => {
      if (currentIndex < totalCards - viewportCols) {
        scrollNext()
      } else {
        scrollTo(0) // Loop back to start
      }
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, isDragging, currentIndex, totalCards, viewportCols, scrollNext, scrollTo, autoPlayInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  return (
    <div className="relative -mx-4 px-4 md:-mx-8 md:px-8" role="region" aria-label="Blog posts carousel">
      {/* Carousel Container */}
      <div ref={containerRef} className="overflow-hidden">
        <motion.div
          drag={enableDrag ? 'x' : false}
          dragConstraints={{ left: maxScroll, right: 0 }}
          dragElastic={0.1}
          dragTransition={{
            power: 0.3,
            timeConstant: 200,
          }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => {
            setIsDragging(false)
            // Snap to nearest card
            const currentX = x.get()
            const nearestIndex = Math.round(-currentX / (cardWidth + gap))
            const clampedIndex = Math.max(0, Math.min(nearestIndex, totalCards - viewportCols))
            scrollTo(clampedIndex)
          }}
          style={{ x }}
          className={cn('flex', enableDrag && 'cursor-grab active:cursor-grabbing')}
        >
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="shrink-0"
              style={{
                width: cardWidth,
                marginRight: index < articles.length - 1 ? gap : 0,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                duration: motionConfig.duration.normal,
                ease: motionConfig.easing,
              }}
            >
              <PayloadBlogCard
                article={article}
                sizes={imageSizes}
                priority={index < 3}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Positioned at each end with centered progress */}
      {showArrows && (canScrollLeft || canScrollRight) && (
        <div className="mt-8 flex items-center justify-between gap-6">
          {/* Left Arrow */}
          <motion.button
            className="flex cursor-pointer items-center justify-center rounded-full bg-accent-solid p-2 outline-focus-ring transition-colors duration-200 hover:bg-accent-solid_hover focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-20"
            onClick={scrollPrev}
            disabled={!canScrollLeft}
            whileHover={canScrollLeft ? { scale: 1.05 } : {}}
            whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            transition={{ duration: motionConfig.duration.fast }}
            aria-label="Previous posts"
          >
            <ChevronLeft className="size-6 text-white" />
          </motion.button>

          {/* Progress Bar - Centered */}
          {showProgress && (
            <div className="flex items-center justify-center gap-2">
              {Array.from({ length: Math.max(1, totalCards - viewportCols + 1) }).map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === currentPage ? 'w-8 bg-secondary-solid' : 'w-2 bg-secondary-solid',
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          )}

          {/* Right Arrow */}
          <motion.button
            className="flex cursor-pointer items-center justify-center rounded-full bg-accent-solid p-2 outline-focus-ring transition-colors duration-200 hover:bg-accent-solid_hover focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-20"
            onClick={scrollNext}
            disabled={!canScrollRight}
            whileHover={canScrollRight ? { scale: 1.05 } : {}}
            whileTap={canScrollRight ? { scale: 0.95 } : {}}
            transition={{ duration: motionConfig.duration.fast }}
            aria-label="Next posts"
          >
            <ChevronRight className="size-6 text-white" />
          </motion.button>
        </div>
      )}
    </div>
  )
}
