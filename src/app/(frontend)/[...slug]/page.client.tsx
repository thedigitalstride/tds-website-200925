'use client'
import React, { useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useHeaderTheme, type HeaderColorConfig } from '@/providers/HeaderTheme'

interface PageClientProps {
  headerColor?: {
    lightMode?: 'auto' | 'dark' | 'light' | null
    darkMode?: 'auto' | 'dark' | 'light' | null
  } | null
}

const PageClient: React.FC<PageClientProps> = ({ headerColor }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!headerColor || !resolvedTheme) {
      // No page config, reset to auto behavior
      setHeaderTheme(null)
      return
    }

    const globalTheme = resolvedTheme as 'light' | 'dark'
    const setting = globalTheme === 'light'
      ? headerColor.lightMode
      : headerColor.darkMode

    let effectiveTheme: 'light' | 'dark'
    if (setting === 'auto' || !setting) {
      // Auto: dark header in light mode, light header in dark mode
      effectiveTheme = globalTheme === 'light' ? 'dark' : 'light'
    } else {
      // Explicit setting
      effectiveTheme = setting as 'light' | 'dark'
    }

    setHeaderTheme(effectiveTheme)
  }, [headerColor, resolvedTheme, setHeaderTheme])

  return <React.Fragment />
}

export default PageClient
