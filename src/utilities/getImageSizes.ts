/**
 * Image sizes utility for responsive image loading
 * Calculates optimal sizes attribute based on layout patterns
 */

export type GridColumns = {
  mobile?: string | null
  tablet?: string | null
  desktop?: string | null
}

/**
 * Calculate responsive sizes for grid layouts
 * @param columns - Grid column configuration for different breakpoints
 * @returns sizes attribute string for Next.js Image
 */
export function getGridImageSizes(columns: GridColumns = {}): string {
  const mobile = columns.mobile || '1'
  const tablet = columns.tablet || '2'
  const desktop = columns.desktop || '3'

  // Calculate viewport width percentages based on columns
  const mobileVw = 100 / parseInt(mobile)
  const tabletVw = 100 / parseInt(tablet)
  const desktopVw = 100 / parseInt(desktop)

  // Account for grid gaps and padding
  // Subtract ~10% for gaps and container padding
  const mobileSize = Math.floor(mobileVw * 0.9)
  const tabletSize = Math.floor(tabletVw * 0.9)
  const desktopSize = Math.floor(desktopVw * 0.9)

  return `(max-width: 768px) ${mobileSize}vw, (max-width: 1024px) ${tabletSize}vw, ${desktopSize}vw`
}

/**
 * Full-width hero images
 */
export function getHeroImageSizes(): string {
  return '100vw'
}

/**
 * Card images in sidebar or featured sections
 */
export function getCardImageSizes(): string {
  return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
}

/**
 * Featured post images (larger display)
 */
export function getFeaturedImageSizes(): string {
  return '(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 50vw'
}

/**
 * Thumbnail images for lists
 */
export function getThumbnailImageSizes(): string {
  return '(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 15vw'
}

/**
 * Avatar images
 */
export function getAvatarImageSizes(): string {
  return '(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px'
}
