'use client'

import { useEffect, useRef, createContext, useContext, ReactNode, useState } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    lenis?: Lenis
  }
}

const LenisContext = createContext<Lenis | null>(null)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number | undefined>(undefined)

  // Initialize Lenis on client side only
  useEffect(() => {
    if (typeof window === 'undefined') return

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    setLenis(lenisInstance)
    window.lenis = lenisInstance

    return () => {
      lenisInstance.destroy()
      delete window.lenis
    }
  }, [])

  // Handle route changes - scroll to top
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }
  }, [pathname, lenis])

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (!lenis) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        // Cancel RAF loop before destroying to prevent race condition
        if (rafRef.current !== undefined) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = undefined
        }
        lenis.destroy()
        delete window.lenis
        setLenis(null)
      }
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [lenis])

  // RequestAnimationFrame loop
  useEffect(() => {
    if (!lenis) return

    function raf(time: number) {
      // Check if instance is still valid (not destroyed)
      if (!lenis || lenis.destroy === undefined) {
        if (rafRef.current !== undefined) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = undefined
        }
        return
      }
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }

    rafRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = undefined
      }
    }
  }, [lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

// Hook to access Lenis instance
export function useLenis() {
  return useContext(LenisContext)
}

// Hook for programmatic scrolling
export function useLenisScroll() {
  return (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (typeof window !== 'undefined' && window.lenis) {
      if (typeof target === 'string') {
        if (target === '#' || target === '#home') {
          window.lenis.scrollTo(0, { duration: options?.duration || 1.2 })
        } else {
          const element = document.querySelector(target)
          if (element instanceof HTMLElement) {
            window.lenis.scrollTo(element, {
              offset: options?.offset || -80, // Account for fixed header
              duration: options?.duration || 1.2,
            })
          }
        }
      } else {
        window.lenis.scrollTo(target, {
          offset: options?.offset || -80,
          duration: options?.duration || 1.2,
        })
      }
    }
  }
}
