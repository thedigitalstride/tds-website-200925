/**
 * Shared background variant system for consistent styling across blocks
 * All classes map to CSS variables defined in theme.css
 *
 * IMPORTANT: Uses button system naming (primary, secondary, tertiary, accent) for perfect consistency
 * See: /docs/STYLING_SYSTEM.md for more information on the CSS variable system
 */

export type BackgroundVariant =
  | 'none'               // No background (transparent)
  | 'primary'            // Primary: white bg in light, dark bg in dark
  | 'primary-reversed'   // Primary reversed: dark bg in light, white bg in dark
  | 'secondary'          // Secondary/outlined style (transparent with border)
  | 'tertiary'           // Tertiary: light greay across both light and dark modes
  | 'accent'             // Accent blue solid color
  | 'line'               // Top border only (cards only)

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
      return ''  // No background (transparent)
    case 'primary':
      return 'bg-primary'  // White in light, dark in dark
    case 'primary-reversed':
      return 'bg-brand-solid dark:!bg-white'  // Dark in light, white in dark (forced)
    case 'secondary':
      return 'bg-transparent ring-2 ring-tertiary ring-inset'  // Outlined style with gray-solid ring
    case 'tertiary':
      return 'bg-tertiary'  // Tertiary background
    case 'accent':
      return 'bg-accent-solid'  // Accent blue background
    case 'line':
      return 'border-t-2 border-tertiary'  // Top border only
    default:
      return 'bg-primary'
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
    label: 'Line (Top Border)',
    value: 'line' as const,
  },
]

/**
 * Background variant options for Hero blocks (excludes line variant)
 */
export const heroBackgroundVariantFieldOptions = backgroundVariantFieldOptions.filter(
  option => option.value !== 'line'
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
