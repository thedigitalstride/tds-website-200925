# TypeScript Patterns and Best Practices

This document outlines TypeScript patterns, best practices, and common solutions for this Payload CMS + Next.js 15 + UntitledUI project.

## Overview

This project uses strict TypeScript with Payload CMS auto-generated types, Next.js 15 patterns, and UUI component typing. Understanding these patterns prevents common errors and ensures type safety.

## Critical Type Imports

### Core Payload Types

```typescript
// Always import Payload types from generated file
import type {
  Post,
  Category,
  Media,
  User,
  Page
} from '@/payload-types'

// For database queries
import type { Where } from 'payload'

// For metadata
import type { Metadata } from 'next/types'
```

### UUI Component Types

```typescript
// Badge component types
import type { BadgeColor, BadgeTypes } from '@/components/uui/base/badges/badge-types'
import type { Article } from '@/components/uui/marketing/blog/base-components/blog-cards'

// Button types
import type { ButtonProps } from '@/components/uui/base/buttons/button'
```

### Next.js 15 Types

```typescript
// Page component props
type Args = {
  params: Promise<{
    slug: string
    // ... other dynamic params
  }>
  searchParams: Promise<{
    category?: string
    page?: string
    // ... other search params
  }>
}

// Metadata generation
type MetadataProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}
```

## Payload CMS Patterns

### 1. Where Clause Typing

**✅ Correct Pattern:**
```typescript
import type { Where } from 'payload'

const whereClause: Where = {
  _status: { equals: 'published' }
}

// For hasMany relationships
if (categoryId) {
  whereClause.categories = {
    in: [categoryId]
  }
}

// For single relationships
if (authorId) {
  whereClause.author = {
    equals: authorId
  }
}
```

**❌ Common Mistakes:**
```typescript
// Too generic - loses type safety
const whereClause: Record<string, any> = {
  _status: { equals: 'published' }
}

// Missing type import
const whereClause = {  // No type annotation
  _status: { equals: 'published' }
}
```

### 2. Media Type Guards

**✅ Safe Media Access:**
```typescript
const extractMedia = (media: string | Media | null | undefined): Media | undefined => {
  return typeof media === 'object' && media !== null ? media : undefined
}

// Usage
const heroImage = extractMedia(post.heroImage)
const imageUrl = heroImage?.url || '/placeholder.jpg'
const imageAlt = heroImage?.alt || ''
```

**✅ Multiple Media Handling:**
```typescript
const extractMediaArray = (media: (string | Media)[]): Media[] => {
  return media
    .filter((item): item is Media => typeof item === 'object' && item !== null)
}

// Usage
const galleryImages = extractMediaArray(post.gallery || [])
```

### 3. Populated Relationships

**✅ Author Relationship:**
```typescript
// Type guard for populated authors
const getFirstAuthor = (authors?: (string | User)[]): User | undefined => {
  if (!authors || authors.length === 0) return undefined
  const firstAuthor = authors[0]
  return typeof firstAuthor === 'object' ? firstAuthor : undefined
}

// Usage
const author = getFirstAuthor(post.populatedAuthors)
const authorName = author?.name || author?.nickname || 'Anonymous'
```

**✅ Category Relationships:**
```typescript
// Type guard for populated categories
const extractCategories = (categories?: (string | Category)[]): Category[] => {
  if (!categories) return []
  return categories.filter((cat): cat is Category => typeof cat === 'object')
}

// Usage
const postCategories = extractCategories(post.categories)
const categoryNames = postCategories.map(cat => cat.title).join(', ')
```

## Next.js 15 Patterns

### 1. Page Component Props

**✅ Correct Next.js 15 Pattern:**
```typescript
type Args = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    category?: string
  }>
}

export default async function Page(props: Args) {
  const { slug } = await props.params
  const searchParams = await props.searchParams
  const category = searchParams.category

  // ... page logic
}
```

**❌ Destructuring Pattern (Problematic):**
```typescript
// This can cause issues in Next.js 15
export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise
}: Args) {
  const { slug } = await paramsPromise
  const searchParams = await searchParamsPromise
  // ...
}
```

### 2. Metadata Generation

**✅ Async Metadata Pattern:**
```typescript
export async function generateMetadata(props: Args): Promise<Metadata> {
  const { slug } = await props.params

  const payload = await getPayload({ config: configPromise })
  const post = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1
  })

  const postData = post.docs[0]

  return {
    title: postData?.title || 'Default Title',
    description: postData?.subtitle || 'Default description',
    openGraph: {
      title: postData?.title,
      description: postData?.subtitle,
      images: postData?.heroImage && typeof postData.heroImage === 'object'
        ? [postData.heroImage.url]
        : undefined
    }
  }
}
```

### 3. Static Params Generation

**✅ Static Params Pattern:**
```typescript
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    limit: 100,
    where: {
      _status: { equals: 'published' }
    }
  })

  return posts.docs.map(post => ({
    slug: post.slug
  }))
}
```

## UUI Component Patterns

### 1. Badge Component Types

**✅ Valid Badge Types:**
```typescript
// Valid type values
type ValidBadgeTypes = "pill-color" | "color" | "modern"

// Usage
<Badge size="sm" color="brand" type="pill-color">
  {category.name}
</Badge>
```

**❌ Invalid Badge Types:**
```typescript
// These don't exist
<Badge type="pill-outline">Invalid</Badge>
<Badge type="outline">Invalid</Badge>
<Badge variant="outline">Wrong prop name</Badge>
```

### 2. Article Type Interface

**✅ Standard Article Interface:**
```typescript
export type Article = {
  id: string
  href: string
  thumbnailUrl: string
  title: string
  summary: string
  categories: Array<{  // Always plural!
    href: string
    name: string
  }>
  author: {
    href: string
    name: string
    avatarUrl: string
  }
  publishedAt: string
  readingTime: string
  tags: Array<{ name: string; color: BadgeColor<"color">; href: string }>
  isFeatured?: boolean
}
```

**✅ Safe Category Access:**
```typescript
// Access first category safely
const firstCategory = article.categories[0]?.name || 'Uncategorized'

// Map all categories
const categoryLinks = article.categories.map(cat => (
  <a key={cat.name} href={cat.href}>
    <Badge type="pill-color">{cat.name}</Badge>
  </a>
))
```

**❌ Wrong Category Access:**
```typescript
// This property doesn't exist
article.category.name  // TypeError!

// Missing null checks
article.categories[0].name  // Could throw if empty array
```

### 3. Button Component Integration

**✅ Button with Next.js Link:**
```typescript
import { Button } from '@/components/uui/base/buttons/button'
import Link from 'next/link'

// As child pattern
<Button asChild>
  <Link href="/posts">View All Posts</Link>
</Button>

// With external links
<Button asChild>
  <a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</Button>
```

## Data Transformation Patterns

### 1. Payload to UUI Article Transform

**✅ Complete Transform Function:**
```typescript
const transformPost = (post: Post, index: number): Article => {
  // Safe media extraction
  const heroImage = typeof post.heroImage === 'object' ? post.heroImage as Media : undefined

  // Safe author extraction
  const firstAuthor = post.populatedAuthors?.[0]
  const author = typeof firstAuthor === 'object' ? firstAuthor as User : undefined

  // Safe category extraction
  const allCategories = Array.isArray(post.categories) && post.categories.length > 0
    ? post.categories
        .filter((cat): cat is Category => typeof cat === 'object')
        .map(category => ({
          name: category.title || 'Uncategorized',
          href: category.slug ? `/posts?category=${category.slug}` : '#'
        }))
    : [{ name: 'Uncategorized', href: '#' }]

  return {
    id: post.id.toString(),
    title: post.title,
    summary: post.subtitle || '',
    href: `/posts/${post.slug || 'undefined'}`,
    categories: allCategories,
    thumbnailUrl: heroImage?.url || '/placeholder.jpg',
    publishedAt: formatDateTime(post.publishedAt || ''),
    readingTime: calculateReadingTime(post.content),
    author: {
      name: author?.nickname || author?.name || 'Anonymous',
      href: '#',
      avatarUrl: typeof author?.avatar === 'object'
        ? (author.avatar as Media)?.url || ''
        : ''
    },
    tags: [],
    isFeatured: index === 0
  }
}
```

### 2. Safe Array Transformation

**✅ Safe Array Map Pattern:**
```typescript
const safeTransformArray = <T, U>(
  array: T[] | undefined | null,
  transform: (item: T, index: number) => U
): U[] => {
  if (!Array.isArray(array)) return []
  return array.map(transform)
}

// Usage
const transformedPosts = safeTransformArray(posts.docs, transformPost)
```

## Error Handling Patterns

### 1. Type Guards

**✅ Media Type Guard:**
```typescript
const isMedia = (media: unknown): media is Media => {
  return typeof media === 'object' &&
         media !== null &&
         'url' in media &&
         typeof (media as Media).url === 'string'
}

// Usage
if (isMedia(post.heroImage)) {
  const imageUrl = post.heroImage.url
}
```

**✅ User Type Guard:**
```typescript
const isUser = (user: unknown): user is User => {
  return typeof user === 'object' &&
         user !== null &&
         ('name' in user || 'nickname' in user)
}
```

### 2. Null/Undefined Handling

**✅ Safe Property Access:**
```typescript
// Optional chaining with fallbacks
const getAuthorName = (post: Post): string => {
  const author = post.populatedAuthors?.[0]
  if (typeof author === 'object') {
    return author.nickname || author.name || 'Anonymous'
  }
  return 'Anonymous'
}

// Nullish coalescing
const getImageUrl = (media: string | Media | null | undefined): string => {
  return typeof media === 'object' && media?.url ? media.url : '/placeholder.jpg'
}
```

## Common TypeScript Errors and Solutions

### 1. "Property does not exist on type"

**Error:** `Property 'category' does not exist on type 'Article'`

**Solution:**
```typescript
// Change from
article.category.name

// To
article.categories[0]?.name || 'Uncategorized'
```

### 2. "Type 'string' is not assignable to type 'BadgeTypes'"

**Error:** Badge component type error

**Solution:**
```typescript
// Change from
<Badge type="pill-outline">

// To
<Badge type="pill-color">
```

### 3. "Type 'Record<string, any>' is not assignable to type 'Where'"

**Error:** Where clause typing error

**Solution:**
```typescript
// Add proper import and typing
import type { Where } from 'payload'

const whereClause: Where = {
  _status: { equals: 'published' }
}
```

### 4. "Cannot find module for page"

**Error:** Next.js dynamic import error

**Solution:**
- Check component path in admin config matches file location
- Run `pnpm generate:importmap` after creating new components
- Verify component is properly exported

## Build-Time Type Checking

### 1. Strict TypeScript Config

The project uses strict TypeScript settings:

```typescript
// tsconfig.json highlights
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitReturns": true
  }
}
```

### 2. Type Generation Commands

```bash
# Generate Payload types
pnpm generate:types

# Generate import maps for admin components
pnpm generate:importmap

# Type check without building
pnpm type-check

# Full build with type checking
pnpm build
```

### 3. Pre-commit Type Checks

Always run these before committing:

```bash
# 1. Generate latest types
pnpm generate:types

# 2. Check for type errors
pnpm build

# 3. Fix any linting issues
pnpm lint:fix
```

## IDE Configuration

### VS Code Settings

Recommended `.vscode/settings.json`:

```json
{
  "typescript.preferences.noSemicolons": "insert",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll.eslint": true
  }
}
```

### Auto-Import Patterns

Configure auto-imports for common patterns:

```typescript
// Auto-import snippets
{
  "Payload Where Type": {
    "prefix": "pwhere",
    "body": [
      "import type { Where } from 'payload'",
      "",
      "const whereClause: Where = {",
      "  _status: { equals: 'published' }",
      "}"
    ]
  }
}
```

## Performance Considerations

### 1. Type-Only Imports

Use `type` imports when only importing for typing:

```typescript
// For types only
import type { Post, Category } from '@/payload-types'

// For runtime values
import { getPayload } from 'payload'
```

### 2. Generic Type Constraints

Use proper generic constraints:

```typescript
// Good - specific constraint
function transformArray<T extends { id: string | number }>(items: T[]): Article[] {
  return items.map(item => ({
    id: item.id.toString(),
    // ... transformation
  }))
}

// Avoid - too generic
function transformArray<T>(items: T[]): any[] {
  // Loses type safety
}
```

## Testing Type Safety

### 1. Type Test Files

Create type test files to verify interfaces:

```typescript
// types.test.ts
import type { Article } from '@/components/uui/marketing/blog/base-components/blog-cards'
import type { Post } from '@/payload-types'

// Compile-time tests
const testArticle: Article = {
  id: '1',
  href: '/posts/test',
  title: 'Test',
  summary: 'Test summary',
  categories: [{ name: 'Test', href: '/category/test' }],  // Must be array
  // ... rest of required fields
}

// This should cause TypeScript error if Article interface changes
const testError: Article = {
  category: { name: 'Test' }  // Should error - property doesn't exist
}
```

### 2. Runtime Type Validation

For critical data transformations, add runtime validation:

```typescript
import { z } from 'zod'

const ArticleSchema = z.object({
  id: z.string(),
  href: z.string(),
  title: z.string(),
  categories: z.array(z.object({
    name: z.string(),
    href: z.string()
  }))
})

// Validate at runtime
const validateArticle = (data: unknown): Article => {
  return ArticleSchema.parse(data)
}
```

## Related Documentation

- **[Blog Implementation Guide](/docs/BLOG_IMPLEMENTATION.md)** - Blog-specific patterns
- **[Next.js 15 Filtering Fix](/docs/NEXT_JS_15_FILTERING_FIX.md)** - Next.js 15 patterns
- **[UUI Components Reference](/docs/UUI_COMPONENTS_REFERENCE.md)** - UUI typing patterns

---

**Remember:** TypeScript is your friend in this complex project. Embrace strict typing, use proper imports, and always run `pnpm build` to catch type errors before deployment.