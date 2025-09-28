# Next.js 15 Server-Side Filtering Fix

## Overview

This document describes a critical fix for server-side URL parameter extraction in Next.js 15 that was preventing category filtering from working in the blog posts listing page.

## Problem

When navigating to filtered URLs like `/posts?category=team`, the following issues occurred:

1. **Empty searchParams**: Server-side `searchParams` was always `{}` despite URL containing query parameters
2. **No filtering**: All posts were displayed regardless of category parameter
3. **Wrong tab selection**: "View all" tab remained selected instead of the filtered category tab
4. **500 errors**: Server-side filtering caused internal server errors

## Root Cause

The issue was caused by `export const dynamic = 'force-static'` in the posts page component, which prevented Next.js 15 from properly extracting URL search parameters in server components.

### Technical Details

- **Next.js Version**: 15.4.4
- **Issue**: `force-static` mode ignores dynamic URL parameters during static generation
- **Impact**: Server components receive empty `searchParams` objects
- **Manifestation**: URL shows `?category=team` but `searchParams = {}`

## Solution

### 1. Remove force-static Export

**File**: `/src/app/(frontend)/posts/page.tsx`

```typescript
// ❌ BEFORE - Causes searchParams to be empty
export const dynamic = 'force-static'
export const revalidate = 600

// ✅ AFTER - Allows dynamic parameter extraction
export const revalidate = 600
```

### 2. Use Correct Props Pattern

**File**: `/src/app/(frontend)/posts/page.tsx`

```typescript
// ❌ BEFORE - Destructured parameters (problematic in Next.js 15)
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const searchParams = await searchParamsPromise
  // ...
}

// ✅ AFTER - Use props object pattern
export default async function Page(props: Args) {
  const searchParams = await props.searchParams
  // ...
}
```

### 3. Apply Same Fix to Pagination Pages

**File**: `/src/app/(frontend)/posts/page/[number]/page.tsx`

```typescript
// ✅ Updated function signature and generateMetadata
export default async function Page(props: Args) {
  const { number } = await props.params
  const searchParams = await props.searchParams
  // ...
}

export async function generateMetadata(props: Args): Promise<Metadata> {
  const { number } = await props.params
  // ...
}
```

## Implementation Details

### Server-Side Filtering Logic

```typescript
// Find category by slug
let selectedCategory: Category | undefined
if (categorySlug) {
  selectedCategory = categories.docs.find(cat => cat.slug === categorySlug)
}

// Build where clause with category filter
const whereClause: Record<string, any> = {
  _status: { equals: 'published' }
}

if (selectedCategory) {
  whereClause.categories = {
    in: [selectedCategory.id]  // Use 'in' operator for hasMany relationships
  }
}

// Query posts with filtering
const posts = await payload.find({
  collection: 'posts',
  where: whereClause,
  // ...
})
```

### Client-Side Tab Synchronization

The `BlogListing` component receives the `selectedCategory` prop from the server and automatically:

1. **Highlights correct tab**: Based on `selectedCategory` prop
2. **Filters posts**: Client-side filtering is bypassed when server-side filtering works
3. **Handles navigation**: Tab clicks update URL and trigger re-render

## Verification

### Test Cases

1. **Unfiltered**: `/posts` → "View all" tab selected, all posts shown
2. **Team filter**: `/posts?category=team` → "Team" tab selected, only Team posts shown
3. **Marketing filter**: `/posts?category=marketing` → "Marketing" tab selected, only Marketing posts shown
4. **Pagination with filter**: `/posts/page/2?category=team` → Page 2 of Team posts

### Debug Output (Before Fix)

```javascript
Debug searchParams: {
  searchParams: {},           // ❌ Empty despite URL having ?category=team
  categorySlug: undefined,    // ❌ Not extracted
}
```

### Debug Output (After Fix)

```javascript
Debug searchParams: {
  searchParams: { category: 'team' },  // ✅ Correctly extracted
  categorySlug: 'team',               // ✅ Properly set
}

Category filtering: {
  categorySlug: 'team',
  selectedCategory: { id: 9, title: 'Team', slug: 'team' }  // ✅ Found category
}
```

## Performance Impact

- **ISR maintained**: `revalidate = 600` keeps pages cached for 10 minutes
- **Server-side filtering**: Reduces data transfer and improves performance
- **No breaking changes**: Client-side fallback still works for edge cases

## Important Notes

### ⚠️ Next.js 15 Compatibility

- **Required pattern**: Always use `props.searchParams` instead of destructured parameters
- **Avoid force-static**: Don't use `dynamic = 'force-static'` with URL parameters
- **Promise handling**: Always `await` searchParams and params in Next.js 15

### ⚠️ Payload CMS Integration

- **Relationship filtering**: Use `in` operator for hasMany relationships
- **Category resolution**: Always resolve slugs to IDs before querying
- **Error handling**: Invalid category slugs gracefully fall back to unfiltered results

## Related Issues

This fix resolves several related problems:

1. **Server-side filtering**: Categories now filter posts at database level
2. **Tab highlighting**: Correct tab selection based on URL parameters
3. **Multiple categories**: Posts with multiple categories display correctly
4. **Pagination**: Filtered pagination URLs work correctly
5. **ISR compatibility**: Filtering works with Incremental Static Regeneration

## Future Considerations

- **Search functionality**: This pattern can be extended for search parameters
- **Multiple filters**: Can support filtering by multiple criteria simultaneously
- **Sort parameters**: Sort options can be added using the same pattern
- **Performance monitoring**: Monitor query performance with complex filters

## Testing

To verify the fix works:

1. Navigate to `/posts` - should show all posts with "View all" selected
2. Click "Team" tab or navigate to `/posts?category=team` - should filter to Team posts
3. Check that URL updates correctly when clicking tabs
4. Verify pagination works with filters: `/posts/page/2?category=marketing`
5. Confirm server-side filtering by checking network requests (fewer posts returned)

---

**Status**: ✅ Fixed and verified
**Next.js Version**: 15.4.4
**Payload CMS Version**: 3.55.0
**Date**: September 2025