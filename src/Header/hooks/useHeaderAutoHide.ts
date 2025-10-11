'use client'
import { useScroll, useMotionValueEvent } from 'motion/react'
import { useState, useRef } from 'react'

export function useHeaderAutoHide() {
  const { scrollY } = useScroll()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  // RAF throttling for performance
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      ticking.current = true

      requestAnimationFrame(() => {
        const scrollingDown = latest > lastScrollY.current
        const pastThreshold = latest > window.innerHeight * 0.5

        // Collapse: scroll down past 50vh
        if (scrollingDown && pastThreshold && latest > 100) {
          setIsCollapsed(true)
        }
        // Expand: scroll up OR at top
        else if (!scrollingDown || latest < 100) {
          setIsCollapsed(false)
        }

        lastScrollY.current = latest
        ticking.current = false
      })
    }
  })

  return { isCollapsed }
}
