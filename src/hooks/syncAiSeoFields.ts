/**
 * Sync AI-generated SEO fields to SEO plugin fields
 * This hook automatically copies aiSeoTitle and aiSeoDescription
 * to meta.title and meta.description when they change
 */

import type { FieldHook } from 'payload'

export const syncAiSeoToMeta: FieldHook = ({ data, value, operation }) => {
  // Only sync on create and update operations if data exists
  if (data && (operation === 'create' || operation === 'update')) {
    // Initialize meta object if it doesn't exist
    if (!data.meta) {
      data.meta = {}
    }

    // Sync aiSeoTitle to meta.title if aiSeoTitle has a value
    if (data.aiSeoTitle && typeof data.aiSeoTitle === 'string' && data.aiSeoTitle.trim()) {
      data.meta.title = data.aiSeoTitle
    }

    // Sync aiSeoDescription to meta.description if aiSeoDescription has a value
    if (
      data.aiSeoDescription &&
      typeof data.aiSeoDescription === 'string' &&
      data.aiSeoDescription.trim()
    ) {
      data.meta.description = data.aiSeoDescription
    }
  }

  return value
}
