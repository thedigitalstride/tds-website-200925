/**
 * Shared background variant system for consistent styling across blocks
 * All classes map to CSS variables defined in theme.css
 *
 * IMPORTANT: Uses button system naming (primary, secondary, tertiary, accent) for perfect consistency
 * See: /docs/STYLING_SYSTEM.md for more information on the CSS variable system
 */

export type BackgroundVariant =
  | 'none' // No background (transparent)
  | 'primary' // Primary: white bg in light, dark bg in dark
  | 'primary-reversed' // Primary reversed: dark bg in light, white bg in dark
  | 'secondary' // Secondary/outlined style (transparent with border)
  | 'tertiary' // Tertiary: light greay across both light and dark modes
  | 'accent' // Accent blue solid color
  | 'outline' // Outline: transparent with gray border
  | 'line' // Top border only (cards only)

/**
 * Returns Tailwind classes for background variants
 * All classes map to CSS variables in theme.css for proper dark mode support
 *
 * @param variant - The background variant to use
 * @returns Tailwind class string that maps to theme CSS variables
 */
export function getBackgroundClasses(variant: BackgroundVariant): string {
  switch (variant) {
    case 'none':
      return '' // No background (transparent)
    case 'primary':
      return 'bg-primary' // Dark blue in light, white in dark
    case 'primary-reversed':
      return 'bg-primary-reversed' // White in light, dark blue in dark
    case 'secondary':
      return 'bg-secondary' // Light gray in light mode, dark blue in dark mode
    case 'tertiary':
      return 'bg-transparent ring-2 ring-accent-solid ring-inset' // Transparent with accent ring
    case 'accent':
      return 'bg-accent' // Accent blue background with white text
    case 'outline':
      return 'bg-transparent ring-2 ring-outline ring-inset' // Transparent with gray outline
    case 'line':
      return 'border-t-2 border-tertiary' // Top border only
    default:
      return 'bg-primary'
  }
}

/**
 * Returns text color classes for different content types based on background variant
 * Ensures proper contrast and readability across all background styles
 * Matches the logic used in InlineCard component
 *
 * @param variant - The background variant being used
 * @returns Object with text color classes for different content types
 */
export function getTextColorClasses(variant: BackgroundVariant) {
  switch (variant) {
    case 'primary':
      return {
        heading: 'text-white dark:text-brand-500',
        body: 'text-white dark:text-brand-500',
        muted: 'text-white dark:text-brand-500 opacity-80',
        accent: 'text-accent-500', // Preserve accent color on primary background
        richText: '[&]:text-white! dark:[&]:text-brand-500! **:text-white! dark:**:text-brand-500!',
      }
    case 'accent':
      return {
        heading: 'text-white',
        body: 'text-white',
        muted: 'text-white opacity-80',
        accent: 'text-primary', // Use primary (dark) text for accent elements on accent background
        richText: '[&]:text-white! **:text-white!',
      }
    case 'primary-reversed':
      return {
        heading: 'text-brand-500 dark:text-white',
        body: 'text-brand-500 dark:text-white',
        muted: 'text-brand-500 dark:text-white opacity-80',
        accent: 'text-accent-500', // Preserve accent color on primary-reversed background
        richText: '[&]:text-brand-500! dark:[&]:text-white! **:text-brand-500! dark:**:text-white!',
      }
    case 'secondary':
      return {
        heading: 'text-gray-900 dark:text-white',
        body: 'text-gray-900 dark:text-white',
        muted: 'text-gray-900 dark:text-white opacity-70',
        accent: 'text-accent-500', // Preserve accent color on secondary background
        richText: '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
      }
    case 'tertiary':
      return {
        heading: 'text-gray-900 dark:text-white',
        body: 'text-gray-900 dark:text-white',
        muted: 'text-gray-900 dark:text-white opacity-70',
        accent: 'text-accent-500', // Preserve accent color on tertiary background
        richText: '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
      }
    case 'outline':
      return {
        heading: 'text-gray-900 dark:text-white',
        body: 'text-gray-900 dark:text-white',
        muted: 'text-gray-900 dark:text-white opacity-70',
        accent: 'text-accent-500', // Preserve accent color on outline background
        richText: '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
      }
    case 'line':
      return {
        heading: 'text-gray-900 dark:text-white',
        body: 'text-gray-900 dark:text-white',
        muted: 'text-gray-900 dark:text-white opacity-70',
        accent: 'text-accent-500', // Preserve accent color on line background
        richText: '[&]:text-brand-900! dark:[&]:text-white! **:text-brand-900! dark:**:text-white!',
      }
    case 'none':
    default:
      return {
        heading: 'text-primary',
        body: 'text-secondary',
        muted: 'text-tertiary',
        accent: 'text-accent-500', // Preserve accent color on transparent background
        richText: '',
      }
  }
}

/**
 * Shared Payload CMS field options for consistent UI across blocks
 * These options provide user-friendly labels in the admin panel
 *
 * Matches button system naming (primary, secondary, tertiary, accent) for perfect consistency
 */
export const backgroundVariantFieldOptions = [
  {
    label: 'None (Transparent)',
    value: 'none' as const,
  },
  {
    label: 'Primary',
    value: 'primary' as const,
  },
  {
    label: 'Primary (Reversed)',
    value: 'primary-reversed' as const,
  },
  {
    label: 'Secondary',
    value: 'secondary' as const,
  },
  {
    label: 'Tertiary',
    value: 'tertiary' as const,
  },
  {
    label: 'Accent',
    value: 'accent' as const,
  },
  {
    label: 'Outline',
    value: 'outline' as const,
  },
  {
    label: 'Line (Top Border)',
    value: 'line' as const,
  },
]

/**
 * Background variant options for Hero blocks (excludes line variant)
 */
export const heroBackgroundVariantFieldOptions = backgroundVariantFieldOptions.filter(
  (option) => option.value !== 'line',
)

/**
 * Helper function to create a standardized background variant field for Payload CMS
 * Reduces boilerplate when adding background variants to block configurations
 *
 * @param config - Configuration options for the field
 * @returns Payload CMS field configuration object
 *
 * @example
 * ```typescript
 * // In a block config.ts file:
 * import { createBackgroundVariantField } from '@/utilities/backgroundVariants'
 *
 * fields: [
 *   createBackgroundVariantField({
 *     name: 'cardBackground',
 *     label: 'Card Background',
 *     defaultValue: 'brand-subtle',
 *     description: 'Background style for feature cards',
 *   }),
 * ]
 * ```
 */
export function createBackgroundVariantField(config?: {
  name?: string
  label?: string
  defaultValue?: BackgroundVariant
  description?: string
  condition?: (data: Record<string, unknown>, siblingData: Record<string, unknown>) => boolean
}) {
  return {
    name: config?.name || 'backgroundVariant',
    type: 'select' as const,
    label: config?.label || 'Background Style',
    defaultValue: config?.defaultValue || 'primary',
    options: backgroundVariantFieldOptions,
    admin: {
      description: config?.description || 'Choose the background style',
      ...(config?.condition && { condition: config.condition }),
    },
  }
}

/**
 * Helper function to create a hero background variant field
 * Same as createBackgroundVariantField but excludes 'line' option
 */
export function createHeroBackgroundVariantField(config?: {
  name?: string
  label?: string
  defaultValue?: Exclude<BackgroundVariant, 'line'>
  description?: string
  condition?: (data: Record<string, unknown>, siblingData: Record<string, unknown>) => boolean
}) {
  return {
    name: config?.name || 'backgroundVariant',
    type: 'select' as const,
    label: config?.label || 'Background Style',
    defaultValue: config?.defaultValue || 'primary',
    options: heroBackgroundVariantFieldOptions,
    admin: {
      description: config?.description || 'Choose the background style',
      ...(config?.condition && { condition: config.condition }),
    },
  }
}
