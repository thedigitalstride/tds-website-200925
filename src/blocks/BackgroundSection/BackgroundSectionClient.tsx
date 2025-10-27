'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/utilities/ui'

interface BackgroundSectionClientProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  enableParallax?: boolean
}

export const BackgroundSectionClient: React.FC<BackgroundSectionClientProps> = ({
  children,
  className,
  style,
  enableParallax,
}) => {
  const sectionRef = useRef<HTMLElement>(null)

  // Handle parallax effect
  useEffect(() => {
    if (enableParallax && typeof window !== 'undefined') {
      const handleScroll = () => {
        if (!sectionRef.current) return

        // Get the section's position relative to viewport
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = rect.height
        const windowHeight = window.innerHeight

        // Calculate the parallax offset based on section's position
        // When section is at bottom of viewport: offset = 0
        // When section is at top of viewport: offset = max movement
        const scrollProgress = Math.max(0, Math.min(1,
          (windowHeight - rect.top) / (windowHeight + sectionHeight)
        ))

        // Maximum movement is 10% of image height (since image is 120% tall)
        const maxOffset = sectionHeight * 0.1
        const offset = scrollProgress * maxOffset

        const element = sectionRef.current.querySelector('.parallax-bg > div') as HTMLElement
        if (element) {
          element.style.transform = `translateY(${offset}px)`
        }
      }

      // Initial position
      handleScroll()

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [enableParallax])

  return (
    <section ref={sectionRef} className={cn(className)} style={style}>
      {children}
    </section>
  )
}