import * as UUIIcons from '@untitledui/icons'
import type { FC } from 'react'

/**
 * Type-safe icon name - automatically includes all icons from @untitledui/icons
 * Provides full TypeScript IntelliSense and compile-time validation
 */
export type UUIIconName = keyof typeof UUIIcons

/**
 * Type for icon components
 */
type IconComponent = FC<{ className?: string }>

/**
 * Get an icon component by name from @untitledui/icons
 *
 * @param iconName - The exact name of the icon (e.g., "ArrowRight", "Download01")
 * @returns The icon component or null if not found
 *
 * @example
 * const Icon = getIcon('ArrowRight')
 * if (Icon) return <Icon className="size-4" />
 */
export const getIcon = (iconName?: string): IconComponent | null => {
  if (!iconName || !(iconName in UUIIcons)) {
    if (iconName) {
      console.warn(
        `Icon "${iconName}" not found in @untitledui/icons. ` +
        `Available icons must match exact export names (e.g., "ArrowRight", "Download01", "TrendUp01").`
      )
    }
    return null
  }
  return (UUIIcons as Record<string, IconComponent>)[iconName]
}