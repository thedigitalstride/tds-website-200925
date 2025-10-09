'use client'

type Theme = 'light' | 'dark'
type HeaderColorSetting = 'auto' | 'dark' | 'light'

import React, { createContext, useCallback, use, useState, useEffect, useLayoutEffect } from 'react'
import { useTheme } from 'next-themes'

import canUseDOM from '@/utilities/canUseDOM'

export interface HeaderColorConfig {
  lightMode?: HeaderColorSetting
  darkMode?: HeaderColorSetting
}

export interface ScrolledHeaderColorConfig {
  lightMode?: HeaderColorSetting | 'inherit'
  darkMode?: HeaderColorSetting | 'inherit'
}

export interface CTAButtonConfig {
  enabled: boolean
  link: {
    label?: string
    type: 'reference' | 'custom'
    reference?: { value: number | { slug?: string | null }; relationTo: string }
    url?: string
    newTab?: boolean
    uuiColor?: string
    uuiSize?: string
    buttonIcon?: string
    iconPos?: 'leading' | 'trailing'
  }
}

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
  ctaButton?: CTAButtonConfig | null
  setCtaButton: (config: CTAButtonConfig | null) => void
  setPageHeaderConfigs: (headerColor?: HeaderColorConfig, scrolledHeaderColor?: ScrolledHeaderColorConfig) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
  ctaButton: null,
  setCtaButton: () => null,
  setPageHeaderConfigs: () => null,
}

const HeaderThemeContext = createContext(initialContext)

interface HeaderThemeProviderProps {
  children: React.ReactNode
}

export const HeaderThemeProvider = ({ children }: HeaderThemeProviderProps) => {
  // useTheme is imported for potential future use with next-themes integration
  // Currently using DOM-based theme detection for better SSR/hydration compatibility
  useTheme()

  // Get current theme from DOM (more reliable than useTheme during SSR/hydration)
  const getCurrentThemeFromDOM = useCallback((): Theme => {
    if (!canUseDOM) return 'dark'

    if (document.documentElement.classList.contains('light-mode')) return 'light'
    if (document.documentElement.classList.contains('dark-mode')) return 'dark'

    // Fallback: check for next-themes attribute
    const themeAttr = document.documentElement.getAttribute('class')
    if (themeAttr?.includes('light')) return 'light'
    if (themeAttr?.includes('dark')) return 'dark'

    return 'dark' // Default
  }, [])

  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(() => {
    if (!canUseDOM) {
      // SSR: Use dark as default (matches next-themes defaultTheme="dark")
      return 'dark'
    }

    // Client initial render: Check DOM immediately for theme class
    // Inline the logic to avoid dependency on getCurrentThemeFromDOM
    let globalTheme: Theme = 'dark'
    if (document.documentElement.classList.contains('light-mode')) {
      globalTheme = 'light'
    } else if (document.documentElement.classList.contains('dark-mode')) {
      globalTheme = 'dark'
    }

    // Return auto mode default (opposite of global theme) - will be corrected by useLayoutEffect immediately
    return globalTheme === 'light' ? 'dark' : 'light'
  })

  const [isScrolled, setIsScrolled] = useState(false)
  const [ctaButton, setCtaButtonState] = useState<CTAButtonConfig | null>(null)
  const [pageHeaderColor, setPageHeaderColor] = useState<HeaderColorConfig | undefined>()
  const [scrolledHeaderColor, setScrolledHeaderColor] = useState<ScrolledHeaderColorConfig | undefined>()

  // Helper function to compute theme from config
  const computeTheme = useCallback((config: HeaderColorConfig | ScrolledHeaderColorConfig | undefined, globalTheme: Theme, allowInherit = false): Theme | null => {
    if (!config) return null

    const setting = globalTheme === 'light' ? config.lightMode : config.darkMode

    // Handle 'inherit' option for scrolled header
    if (allowInherit && setting === 'inherit') return null

    if (setting === 'auto' || !setting) {
      // Auto: dark header in light mode, light header in dark mode
      return globalTheme === 'light' ? 'dark' : 'light'
    } else {
      // Explicit setting
      return setting as Theme
    }
  }, [])

  // Compute effective header color based on scroll position, global theme, and page config
  // Use useLayoutEffect to run synchronously before paint, preventing flash
  useLayoutEffect(() => {
    // Get theme from DOM (more reliable than useTheme hook during initialization)
    const globalTheme = getCurrentThemeFromDOM()

    // Determine which config to use based on scroll position
    let effectiveTheme: Theme

    if (isScrolled && scrolledHeaderColor) {
      const scrolledTheme = computeTheme(scrolledHeaderColor, globalTheme, true)

      // If scrolledHeaderColor is 'inherit', use the initial header color
      if (scrolledTheme === null) {
        effectiveTheme = computeTheme(pageHeaderColor, globalTheme) || (globalTheme === 'light' ? 'dark' : 'light')
      } else {
        effectiveTheme = scrolledTheme
      }
    } else {
      // Use initial header color
      effectiveTheme = computeTheme(pageHeaderColor, globalTheme) || (globalTheme === 'light' ? 'dark' : 'light')
    }

    setThemeState(effectiveTheme)
  }, [pageHeaderColor, scrolledHeaderColor, isScrolled, computeTheme, getCurrentThemeFromDOM])

  // Set scroll state data attribute for CSS to respond to
  useEffect(() => {
    if (!canUseDOM) return
    document.body.dataset.headerScrolled = isScrolled ? 'true' : 'false'
  }, [isScrolled])

  // Set up Intersection Observer for hero section
  useEffect(() => {
    if (!canUseDOM || !scrolledHeaderColor) return

    // Get theme from DOM (more reliable than useTheme hook during initialization)
    const globalTheme = getCurrentThemeFromDOM()
    const initialTheme = computeTheme(pageHeaderColor, globalTheme)
    const scrolledTheme = computeTheme(scrolledHeaderColor, globalTheme, true)

    // Only set up observer if themes are different (and scrolled is not 'inherit')
    if (scrolledTheme === null || initialTheme === scrolledTheme) return

    // Find the first hero section
    const heroElement = document.querySelector('[data-hero-section]')
    if (!heroElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When hero is NOT intersecting (scrolled past), set isScrolled to true
          setIsScrolled(!entry.isIntersecting)
        })
      },
      {
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px', // Account for header height
      }
    )

    observer.observe(heroElement)

    return () => {
      observer.disconnect()
    }
  }, [scrolledHeaderColor, pageHeaderColor, computeTheme, getCurrentThemeFromDOM])

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  const setCtaButton = useCallback((config: CTAButtonConfig | null) => {
    setCtaButtonState(config)
  }, [])

  const setPageHeaderConfigs = useCallback((headerColor?: HeaderColorConfig, scrolledColor?: ScrolledHeaderColorConfig) => {
    setPageHeaderColor(headerColor)
    setScrolledHeaderColor(scrolledColor)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme, ctaButton, setCtaButton, setPageHeaderConfigs }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
