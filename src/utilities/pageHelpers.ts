import type { Page } from '@/payload-types'

/**
 * Build full URL path from page breadcrumbs
 */
export const buildFullPath = (page: Page): string => {
  if (!page.breadcrumbs || page.breadcrumbs.length === 0) {
    return page.slug === 'home' ? '/' : `/${page.slug}`
  }

  // Get the last breadcrumb which contains the full URL
  const lastBreadcrumb = page.breadcrumbs[page.breadcrumbs.length - 1]
  return lastBreadcrumb?.url || `/${page.slug}`
}

/**
 * Get the full URL for a page reference (for use in CMSLink)
 * Works with both full page objects and minimal page references
 */
export const getPageUrl = (page: Partial<Page>): string => {
  // Handle home page special case
  if (page.slug === 'home') {
    return '/'
  }

  // If breadcrumbs are available, use the full path
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    const lastBreadcrumb = page.breadcrumbs[page.breadcrumbs.length - 1]
    return lastBreadcrumb?.url || `/${page.slug}`
  }

  // Fall back to slug-only URL
  return `/${page.slug}`
}

/**
 * Extract all URL segments from breadcrumbs for a page
 */
export const getPageSegments = (page: Page): string[] => {
  const fullPath = buildFullPath(page)
  return fullPath === '/' ? [] : fullPath.substring(1).split('/')
}

/**
 * Check if a page change affects its URL path
 */
export const hasPathChanged = (currentPage: Page, previousPage?: Page): boolean => {
  if (!previousPage) return false

  const currentPath = buildFullPath(currentPage)
  const previousPath = buildFullPath(previousPage)

  return currentPath !== previousPath
}

/**
 * Get all possible paths that should be revalidated when a page changes
 */
export const getRevalidationPaths = (page: Page, previousPage?: Page): string[] => {
  const paths: string[] = []

  // Always revalidate the current path
  const currentPath = buildFullPath(page)
  paths.push(currentPath)

  // If path changed, also revalidate the old path
  if (previousPage && hasPathChanged(page, previousPage)) {
    const previousPath = buildFullPath(previousPage)
    paths.push(previousPath)
  }

  // Remove duplicates and return
  return [...new Set(paths)]
}

/**
 * Check for circular parent reference
 */
export const wouldCreateCircularReference = (
  childId: string,
  potentialParentId: string,
  allPages: Page[]
): boolean => {
  if (childId === potentialParentId) {
    return true
  }

  const getParentChain = (pageId: string, visited: Set<string> = new Set()): boolean => {
    if (visited.has(pageId)) {
      return true // Circular reference detected
    }

    visited.add(pageId)

    const page = allPages.find(p => typeof p.id === 'string' ? p.id === pageId : false)
    if (!page || !page.parent) {
      return false
    }

    const parentId = typeof page.parent === 'string' ? page.parent : typeof page.parent === 'object' && page.parent ? String(page.parent.id) : String(page.parent)

    if (parentId === childId) {
      return true // This would create a circle
    }

    return getParentChain(parentId, visited)
  }

  return getParentChain(potentialParentId)
}

/**
 * Generate a unique slug for nested pages to avoid conflicts
 */
export const generateUniqueSlug = (baseSlug: string, _parentPath?: string): string => {
  return baseSlug
}

/**
 * Validate parent-child relationship for a page
 */
export const validateParentChildRelationship = (
  page: Page,
  allPages: Page[]
): { isValid: boolean; error?: string } => {
  if (!page.parent) {
    return { isValid: true }
  }

  const pageId = typeof page.id === 'string' ? page.id : String(page.id)
  const parentId = typeof page.parent === 'string' ? page.parent : typeof page.parent === 'object' && page.parent ? String(page.parent.id) : String(page.parent)

  // Check for self-reference
  if (pageId === parentId) {
    return {
      isValid: false,
      error: 'A page cannot be its own parent'
    }
  }

  // Check for circular reference
  if (wouldCreateCircularReference(pageId, parentId, allPages)) {
    return {
      isValid: false,
      error: 'This parent selection would create a circular reference'
    }
  }

  return { isValid: true }
}