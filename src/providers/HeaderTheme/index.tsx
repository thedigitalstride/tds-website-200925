'use client'

type Theme = 'light' | 'dark'
type HeaderColorSetting = 'auto' | 'dark' | 'light'

import React, { createContext, useCallback, use, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

import canUseDOM from '@/utilities/canUseDOM'

export interface HeaderColorConfig {
  lightMode?: HeaderColorSetting
  darkMode?: HeaderColorSetting
}

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

interface HeaderThemeProviderProps {
  children: React.ReactNode
  pageHeaderColor?: HeaderColorConfig
}

export const HeaderThemeProvider = ({ children, pageHeaderColor }: HeaderThemeProviderProps) => {
  const { resolvedTheme } = useTheme()
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(() => {
    if (!canUseDOM) return 'dark' // Default to dark during SSR

    // First check for data-theme attribute (used by hero sections)
    const dataTheme = document.documentElement.getAttribute('data-theme') as Theme | null
    if (dataTheme) return dataTheme

    // Check for dark-mode class from next-themes
    if (document.documentElement.classList.contains('dark-mode')) return 'dark'
    if (document.documentElement.classList.contains('light-mode')) return 'light'

    // Default to dark if nothing found
    return 'dark'
  })

  // Compute effective header color based on global theme and page config
  useEffect(() => {
    if (!pageHeaderColor || !resolvedTheme) return

    const globalTheme = resolvedTheme as Theme
    const setting = globalTheme === 'light'
      ? pageHeaderColor.lightMode
      : pageHeaderColor.darkMode

    let effectiveTheme: Theme
    if (setting === 'auto' || !setting) {
      // Auto: dark header in light mode, light header in dark mode
      effectiveTheme = globalTheme === 'light' ? 'dark' : 'light'
    } else {
      // Explicit setting
      effectiveTheme = setting as Theme
    }

    setThemeState(effectiveTheme)
  }, [pageHeaderColor, resolvedTheme])

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
