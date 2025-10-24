/**
 * Shared background variant system for consistent styling across blocks
 * All classes map to CSS variables defined in theme.css
 *
 * IMPORTANT: Uses button system naming (primary, secondary, tertiary, accent) for perfect consistency
 * See: /docs/STYLING_SYSTEM.md for more information on the CSS variable system
 */

export type BackgroundVariant =
  | 'primary'    // Primary brand background (light brand tint)
  | 'secondary'  // Secondary/outlined style (transparent with border)
  | 'accent'     // Accent blue solid color
  | 'line'       // Top border only (cards only)

/**
 * Returns Tailwind classes for background variants
 * All classes map to CSS variables in theme.css for proper dark mode support
 *
 * @param variant - The background variant to use
 * @returns Tailwind class string that maps to theme CSS variables
 */
export function getBackgroundClasses(variant: BackgroundVariant): string {
  switch (variant) {
    case 'primary':
      return 'bg-card-brand-subtle'  // Primary brand background
    case 'accent':
      return 'bg-card-accent'         // Accent blue background
    case 'secondary':
      return 'bg-transparent border border-gray-300 dark:border-gray-700'  // Secondary outlined style
    case 'line':
      return 'border-t-2 border-gray-300 dark:border-gray-700'  // Top border (cards only)
    default:
      return 'bg-card-brand-subtle'
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
    label: 'Primary',
    value: 'primary' as const,
  },
  {
    label: 'Secondary',
    value: 'secondary' as const,
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
