import { useState, useEffect, useRef, useCallback } from 'react'

export interface UseCarouselAnimationOptions {
  totalItems: number
  autoRotateDelay?: number
  enableAutoRotate?: boolean
  initialIndex?: number
}

export interface UseCarouselAnimationReturn {
  currentIndex: number
  direction: 'left' | 'right'
  goToNext: () => void
  goToPrevious: () => void
  goToIndex: (index: number, direction?: 'left' | 'right') => void
  handleDragEnd: (offset: { x: number }, threshold?: number) => void
  isPaused: boolean
}

/**
 * Reusable carousel animation hook
 * 
 * Manages carousel state, auto-rotation, and navigation logic
 * Designed for consistent animation behavior across all carousel components
 * 
 * @param options - Configuration options
 * @returns Carousel state and navigation methods
 * 
 * @example
 * ```typescript
 * const {
 *   currentIndex,
 *   direction,
 *   goToNext,
 *   goToIndex,
 *   handleDragEnd
 * } = useCarouselAnimation({
 *   totalItems: items.length,
 *   autoRotateDelay: 8,
 *   enableAutoRotate: true
 * })
 * ```
 */
export function useCarouselAnimation({
  totalItems,
  autoRotateDelay = 8,
  enableAutoRotate = true,
  initialIndex = 0,
}: UseCarouselAnimationOptions): UseCarouselAnimationReturn {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [isPaused, setIsPaused] = useState(false)
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Handle manual interaction - pauses auto-rotation for 15 seconds
  const handleManualInteraction = useCallback(() => {
    setIsPaused(true)
    setLastInteractionTime(Date.now())
  }, [])

  // Navigate to next item (simple infinite loop)
  const goToNext = useCallback(() => {
    // Always use 'right' direction for forward progression (including wrap-around)
    setDirection('right')
    setCurrentIndex((prev) => (prev + 1) % totalItems)
  }, [totalItems])

  // Navigate to previous item (left-to-right)
  const goToPrevious = useCallback(() => {
    setDirection('left')
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
  }, [totalItems])

  // Navigate to specific index with optional direction override
  const goToIndex = useCallback(
    (index: number, customDirection?: 'left' | 'right') => {
      if (index < 0 || index >= totalItems) return

      // If direction not specified, determine based on simple index comparison
      if (customDirection) {
        setDirection(customDirection)
      } else {
        // Simple rule: if target is higher, go right; if lower, go left
        // This maintains visual consistency when clicking through pagination dots in order
        setDirection(index > currentIndex ? 'right' : 'left')
      }

      setCurrentIndex(index)
      handleManualInteraction()
    },
    [currentIndex, totalItems, handleManualInteraction],
  )

  // Handle drag end with threshold
  const handleDragEnd = useCallback(
    (offset: { x: number }, threshold: number = 50) => {
      if (offset.x > threshold) {
        // Dragged right = go to previous (left-to-right animation)
        setDirection('left')
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
        handleManualInteraction()
      } else if (offset.x < -threshold) {
        // Dragged left = go to next (right-to-left animation)
        setDirection('right')
        setCurrentIndex((prev) => (prev + 1) % totalItems)
        handleManualInteraction()
      }
    },
    [totalItems, handleManualInteraction],
  )

  // Auto-rotation effect
  useEffect(() => {
    if (
      !enableAutoRotate ||
      totalItems <= 1 ||
      isPaused ||
      prefersReducedMotion
    ) {
      return
    }

    intervalRef.current = setInterval(() => {
      goToNext()
    }, autoRotateDelay * 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    totalItems,
    isPaused,
    autoRotateDelay,
    enableAutoRotate,
    goToNext,
    prefersReducedMotion,
  ])

  // Resume auto-rotation 15 seconds after manual interaction
  useEffect(() => {
    if (lastInteractionTime === null) {
      return
    }

    // Clear any existing resume timeout
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current)
    }

    // Set new timeout to resume after 15 seconds
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false)
      setLastInteractionTime(null)
    }, 15000)

    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current)
      }
    }
  }, [lastInteractionTime])

  return {
    currentIndex,
    direction,
    goToNext,
    goToPrevious,
    goToIndex,
    handleDragEnd,
    isPaused,
  }
}

