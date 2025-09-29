# Blog Implementation Guide

This document provides comprehensive guidance for implementing and maintaining the blog/posts system in this Payload CMS project with UntitledUI components and Next.js 15.

## Architecture Overview

The blog system consists of several key components working together:

```
Blog Architecture:
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Posts Pages    │───▶│  BlogListing     │───▶│  UUI Components │
│  (Server Side)  │    │  (Client Side)   │    │  (Blog Cards)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Payload CMS    │    │   Filtering &    │    │  Optimized      │
│  Posts/Category │    │   Pagination     │    │  Images         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## File Structure

```
src/
├── app/(frontend)/
│   └── posts/
│       ├── page.tsx                    # Main posts listing page
│       ├── page/[number]/page.tsx      # Pagination pages
│       └── [slug]/page.tsx             # Individual post pages
├── components/
│   ├── payload-ui/
│   │   └── BlogListing.tsx             # Main blog listing component
│   └── uui/marketing/blog/
│       └── base-components/
│           └── blog-cards.tsx          # UUI blog card components
├── collections/
│   ├── Posts/index.ts                  # Posts collection config
│   └── Categories/index.ts             # Categories collection config
└── docs/
    ├── BLOG_IMPLEMENTATION.md          # This file
    └── NEXT_JS_15_FILTERING_FIX.md     # Next.js 15 specific fixes
```

## Data Flow and Types

### Article Type Interface

The blog system uses a standardized `Article` interface that bridges Payload CMS data with UUI components:

```typescript
// From src/components/uui/marketing/blog/base-components/blog-cards.tsx
export type Article = {
  id: string;
  href: string;
  thumbnailUrl: string;
  title: string;
  summary: string;
  categories: Array<{    // Note: ALWAYS use 'categories' (plural)
    href: string;
    name: string;
  }>;
  author: {
    href: string;
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
  readingTime: string;
  tags: Array<{ name: string; color: BadgeColor<"color">; href: string }>;
  isFeatured?: boolean;
};
```

### Data Transformation

The `BlogListing` component transforms Payload Posts to the Article interface:

```typescript
// Key transformation points:
const transformPost = (post: Post, index: number): Article => {
  // 1. Extract hero image safely
  const heroImage = typeof post.heroImage === 'object' ? post.heroImage as Media : undefined;

  // 2. Extract first author
  const firstAuthor = post.populatedAuthors?.[0];

  // 3. Transform ALL categories (not just first)
  const allCategories = Array.isArray(post.categories) && post.categories.length > 0
    ? post.categories
        .filter(cat => typeof cat === 'object')
        .map(cat => {
          const category = cat as Category;
          return {
            name: category.title || 'Uncategorized',
            href: category.slug ? `/posts?category=${category.slug}` : '#'
          };
        })
    : [{ name: 'Uncategorized', href: '#' }];

  return {
    id: post.id.toString(),
    title: post.title,
    summary: post.subtitle || '',
    href: `/posts/${post.slug || 'undefined'}`,
    categories: allCategories,  // Always use categories array
    // ... rest of transformation
  };
};
```

## Server-Side Implementation

### Posts Page (`/src/app/(frontend)/posts/page.tsx`)

**Critical Next.js 15 Pattern:**

```typescript
// ✅ CORRECT - Next.js 15 pattern
type Args = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page(props: Args) {
  const searchParams = await props.searchParams
  const categorySlug = searchParams.category || undefined

  // ... rest of implementation
}

// ❌ WRONG - Will break in Next.js 15
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  // This destructuring pattern causes issues
}
```

**Server-Side Filtering:**

```typescript
import type { Where } from 'payload'  // CRITICAL: Import Where type

// Build proper where clause
const whereClause: Where = {
  _status: { equals: 'published' }
}

// Enable server-side filtering
if (selectedCategory) {
  whereClause.categories = {
    in: [selectedCategory.id]  // Use 'in' operator for hasMany relationships
  }
}
```

### Pagination Implementation

The pagination system uses a two-route approach:
- `/posts` - Page 1 (handled by main page.tsx)
- `/posts/page/[number]` - Pages 2+ (handled by pagination route)

```typescript
// In pagination page (/src/app/(frontend)/posts/page/[number]/page.tsx)
export default async function Page(props: Args) {
  const { number } = await props.params
  const searchParams = await props.searchParams

  const currentPage = Number(number)

  // Validation: Must be page 2 or higher
  if (!Number.isInteger(currentPage) || currentPage < 2) {
    notFound()
  }

  // Use same filtering logic as main page
  // ...
}
```

## Client-Side Implementation

### BlogListing Component

The `BlogListing` component handles:
- Client-side filtering (fallback)
- Tab navigation
- Pagination controls
- Article display

**Key Features:**

1. **Tab Synchronization:**
```typescript
const selectedCategory = selectedCategoryProp || "all";

// Create tabs from categories
const tabs = [
  {
    id: "all",
    label: "View all",
  },
  ...categories.map(category => ({
    id: category.slug || category.id.toString(),
    label: category.title,
  }))
];
```

2. **URL Navigation:**
```typescript
const handleCategoryChange = (key: string) => {
  if (key === "all") {
    router.push('/posts');
  } else {
    router.push(`/posts?category=${key}`);
  }
};

const handlePageChange = (page: number) => {
  const categoryParam = selectedCategory !== "all" ? `?category=${selectedCategory}` : '';
  if (page === 1) {
    router.push(`/posts${categoryParam}`);
  } else {
    router.push(`/posts/page/${page}${categoryParam}`);
  }
};
```

## UUI Component Integration

### Blog Cards

The system uses UUI blog card components with proper type safety:

```typescript
import { Simple01Vertical } from "@/components/uui/marketing/blog/base-components/blog-cards";

// Usage in BlogListing
<ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-12 lg:grid-cols-3">
  {sortedArticles.map((article) => (
    <li key={article.id}>
      <Simple01Vertical article={article} />
    </li>
  ))}
</ul>
```

### Badge Integration

Category badges use the correct UUI Badge component:

```typescript
// ✅ CORRECT - Badge type values
<Badge size="sm" color="brand" type="pill-color">
  {category.name}
</Badge>

// ❌ WRONG - Invalid type value
<Badge size="sm" color="brand" type="pill-outline">  // This type doesn't exist
```

**Valid Badge Types:**
- `"pill-color"` - Rounded badges with colored background
- `"color"` - Rectangular badges with colored background
- `"modern"` - Modern style badges with shadow

## TypeScript Patterns

### Critical Type Imports

```typescript
// Always import these for blog functionality
import type { Where } from 'payload'
import type { Post, Category, Media } from '@/payload-types'
import type { BadgeColor } from '@/components/uui/base/badges/badges'
```

### Common Type Patterns

1. **Array Access with Fallbacks:**
```typescript
// ✅ CORRECT - Safe category access
article.categories[0]?.name || 'Uncategorized'

// ❌ WRONG - Will cause TypeScript errors
article.category.name  // 'category' doesn't exist on Article type
```

2. **Payload Media Type Guards:**
```typescript
// Safe media extraction
const heroImage = typeof post.heroImage === 'object' ? post.heroImage as Media : undefined;
const imageUrl = heroImage?.url || '/placeholder.jpg';
```

3. **Where Clause Typing:**
```typescript
// ✅ CORRECT
const whereClause: Where = {
  _status: { equals: 'published' }
}

// ❌ WRONG
const whereClause: Record<string, unknown> = {  // Too generic
  _status: { equals: 'published' }
}
```

## Common Issues and Solutions

### 1. Empty searchParams in Next.js 15

**Problem:** URL shows `?category=team` but `searchParams = {}`

**Solution:**
- Remove `export const dynamic = 'force-static'`
- Use `props.searchParams` pattern instead of destructuring

### 2. Badge Component Type Errors

**Problem:** `Type '"pill-outline"' is not assignable to type 'BadgeTypes'`

**Solution:** Use valid badge types (`"pill-color"`, `"color"`, `"modern"`)

### 3. Article Category Access Errors

**Problem:** `Property 'category' does not exist on type 'Article'`

**Solution:** Always use `categories` array: `article.categories[0]?.name`

### 4. Where Clause Type Errors

**Problem:** `Type 'Record<string, any>' not assignable to 'Where'`

**Solution:** Import and use proper `Where` type from Payload

## Performance Optimizations

### Server-Side Filtering

Server-side filtering reduces data transfer and improves performance:

```typescript
// Filters applied at database level
const posts = await payload.find({
  collection: 'posts',
  depth: 2,
  limit: 12,
  page: currentPage,
  where: whereClause,  // Categories filtered here
  sort: '-publishedAt'
});
```

### Image Optimization

All blog images use the `OptimizedImage` component:

```typescript
// In blog cards
<OptimizedImage
  src={article.thumbnailUrl}
  alt={article.title}
  width={400}
  height={300}
  className="aspect-[1.5] w-full object-cover"
/>
```

### ISR (Incremental Static Regeneration)

Pages use ISR for performance:

```typescript
export const revalidate = 600  // 10 minutes
```

## Testing and Verification

### Build Verification Checklist

1. **TypeScript Compilation:**
```bash
pnpm build  # Must complete without type errors
```

2. **Filtering Tests:**
- `/posts` - Shows all posts, "View all" tab selected
- `/posts?category=team` - Shows only team posts, "Team" tab selected
- `/posts/page/2?category=marketing` - Page 2 of marketing posts

3. **Navigation Tests:**
- Tab clicks update URL
- Browser back/forward works
- Direct URL access works

4. **Component Integration:**
- Categories display as clickable badges
- Multiple categories show correctly
- Images load and optimize properly

## Migration and Updates

### Updating Blog Components

When adding new blog features:

1. **Update Article Type Interface** if needed
2. **Update Transformation Logic** in BlogListing
3. **Test Both Server and Client Filtering**
4. **Verify TypeScript Compliance**
5. **Run Build to Catch Type Errors**

### Adding New UUI Blog Components

When integrating new UUI blog components:

1. Install with `pnpm uui:add [component]`
2. Check for proper Article type compatibility
3. Update mock data to use `categories` array
4. Verify Badge component types
5. Test with real Payload data

## Troubleshooting

### Debug Server-Side Filtering

Add debug output to verify filtering:

```typescript
console.log('Debug searchParams:', {
  searchParams,
  categorySlug,
  selectedCategory: selectedCategory ? {
    id: selectedCategory.id,
    title: selectedCategory.title,
    slug: selectedCategory.slug
  } : null
});
```

### Debug Client-Side State

Monitor component state:

```typescript
console.log('BlogListing state:', {
  selectedCategory,
  postsCount: posts.length,
  filteredCount: filteredArticles.length,
  currentPage,
  totalPages
});
```

## Related Documentation

- **[Next.js 15 Filtering Fix](/docs/NEXT_JS_15_FILTERING_FIX.md)** - Critical server-side filtering fix
- **[UUI Components Reference](/docs/UUI_COMPONENTS_REFERENCE.md)** - UUI component usage guide
- **[TypeScript Patterns](/docs/TYPESCRIPT_PATTERNS.md)** - TypeScript best practices
- **[Image Optimization Guide](/docs/IMAGES.md)** - Image handling in blog components

## Support

For issues with the blog implementation:

1. Check this documentation first
2. Verify TypeScript types with `pnpm generate:types`
3. Test build with `pnpm build`
4. Check browser console for client-side errors
5. Review server logs for server-side issues

---

**Remember:** The blog system bridges Payload CMS data with UUI components through careful type transformations and proper Next.js 15 patterns. Always maintain type safety and test both server and client-side functionality.