'use client'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState, useRef, useEffect } from 'react'

export function useHeaderAutoHide() {
  const { scrollY } = useScroll()
  const [isHidden, setIsHidden] = useState(false)
  const [forceShow, setForceShow] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // RAF throttling for performance - prevents excessive state updates
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      ticking.current = true

      requestAnimationFrame(() => {
        // If force show is active, disable it on any scroll
        if (forceShow) {
          setForceShow(false)
        }

        const scrollingDown = latest > lastScrollY.current
        const pastThreshold = latest > window.innerHeight * 0.5

        // Hide: scroll down past 50vh (unless forced to show)
        if (scrollingDown && pastThreshold && latest > 100 && !forceShow) {
          setIsHidden(true)
        }
        // Show: scroll up OR at top
        else if (!scrollingDown || latest < 100) {
          setIsHidden(false)
        }

        lastScrollY.current = latest
        ticking.current = false
      })
    }
  })

  // Prevent flash on initial load - set initial state based on scroll position
  useEffect(() => {
    if (typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.5) {
      setIsHidden(true)
    }
  }, [])

  const showHeader = () => {
    setForceShow(true)
    setIsHidden(false)
  }

  return { isHidden, showHeader }
}
