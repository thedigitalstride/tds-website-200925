'use client'

import React, { memo, useEffect, useState } from 'react'
import { cx } from '@/utils/cx'

export interface IconProps {
  /** Icon name from the Icons collection */
  name: string
  /** Size in pixels or predefined size */
  size?: number | 'sm' | 'md' | 'lg' | 'xl'
  /** Color (defaults to currentColor for theme inheritance) */
  color?: string
  /** Additional CSS classes */
  className?: string
  /** Accessibility label */
  'aria-label'?: string
  /** Loading state */
  loading?: 'eager' | 'lazy'
}

// Size mappings
const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
}

// Cache for fetched icons
const iconCache = new Map<string, string>()

/**
 * Icon component that fetches and renders SVG icons from the Icons collection
 */
export const Icon = memo(function Icon({
  name,
  size = 'md',
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
  loading = 'eager',
}: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert size to number
  const sizeValue = typeof size === 'string' ? sizeMap[size] : size

  useEffect(() => {
    let mounted = true

    const fetchIcon = async () => {
      // Check cache first
      const cached = iconCache.get(name)
      if (cached) {
        if (mounted) {
          setSvgContent(cached)
          setIsLoading(false)
        }
        return
      }

      try {
        // Fetch icon from API
        const response = await fetch(`/api/icon-svg/${name}`)
        if (!response.ok) {
          throw new Error(`Icon '${name}' not found`)
        }

        const data = await response.json()
        const svg = data.svgCode

        // Cache the icon
        iconCache.set(name, svg)

        if (mounted) {
          setSvgContent(svg)
          setIsLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to load icon')
          setIsLoading(false)
        }
      }
    }

    // Lazy loading implementation
    if (loading === 'lazy' && typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchIcon()
            observer.disconnect()
          }
        },
        { rootMargin: '50px' }
      )

      const element = document.querySelector(`[data-icon-placeholder="${name}"]`)
      if (element) {
        observer.observe(element)
      }

      return () => observer.disconnect()
    } else {
      fetchIcon()
    }

    return () => {
      mounted = false
    }
  }, [name, loading])

  // Loading state
  if (isLoading) {
    return (
      <div
        className={cx('inline-flex items-center justify-center', className)}
        style={{
          width: sizeValue,
          height: sizeValue,
        }}
        data-icon-placeholder={name}
        aria-label={ariaLabel || `Loading ${name} icon`}
      >
        <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded" style={{ width: sizeValue, height: sizeValue }} />
      </div>
    )
  }

  // Error state
  if (error || !svgContent) {
    console.warn(`Icon error: ${error || 'No content'}`)
    return (
      <div
        className={cx('inline-flex items-center justify-center text-gray-400', className)}
        style={{
          width: sizeValue,
          height: sizeValue,
        }}
        aria-label={ariaLabel || `${name} icon (failed to load)`}
        title={error || 'Icon not found'}
      >
        {/* Fallback icon - simple question mark */}
        <svg
          width={sizeValue}
          height={sizeValue}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3" />
          <path d="M12 17h.01" />
        </svg>
      </div>
    )
  }

  // Process SVG content
  const processedSvg = svgContent
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '')
    .replace(/<svg/, `<svg width="${sizeValue}" height="${sizeValue}" style="color: ${color}"`)

  return (
    <span
      className={cx('inline-flex items-center justify-center', className)}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      aria-label={ariaLabel || `${name} icon`}
    />
  )
})

/**
 * Server-side icon component for static rendering
 * This requires the icon SVG to be passed as a prop
 */
export function IconStatic({
  svg,
  size = 'md',
  color = 'currentColor',
  className,
  'aria-label': ariaLabel,
}: Omit<IconProps, 'name' | 'loading'> & { svg: string }) {
  const sizeValue = typeof size === 'string' ? sizeMap[size] : size

  const processedSvg = svg
    .replace(/width="[^"]*"/, '')
    .replace(/height="[^"]*"/, '')
    .replace(/<svg/, `<svg width="${sizeValue}" height="${sizeValue}" style="color: ${color}"`)

  return (
    <span
      className={cx('inline-flex items-center justify-center', className)}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
      aria-label={ariaLabel}
    />
  )
}