'use client'

type Theme = 'light' | 'dark'

import React, { createContext, useCallback, use, useState } from 'react'

import canUseDOM from '@/utilities/canUseDOM'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
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

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
