/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * Custom tailwind-merge configuration for custom utility classes
 *
 * IMPORTANT: This configuration is required to prevent tailwind-merge from removing
 * custom utility classes that it doesn't recognize as valid Tailwind classes.
 *
 * Without this, custom classes like text-display-sm will be stripped from the className
 * during the merge process, even if they exist in the CSS.
 *
 * When adding new custom utilities:
 * 1. Add @utility declaration in src/styles/frontend.css
 * 2. Add the class to the appropriate classGroup below
 * 3. Clear Next.js cache: rm -rf .next && pnpm dev
 *
 * See: /docs/CUSTOM_TAILWIND_UTILITIES.md
 */
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Custom display text size utilities (text-display-xs through text-display-2xl)
      'font-size': [
        { text: ['display-xs', 'display-sm', 'display-md', 'display-lg', 'display-xl', 'display-2xl'] },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}
