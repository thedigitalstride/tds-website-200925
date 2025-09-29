# UntitledUI Components Reference

This document provides a comprehensive reference for using UntitledUI components in this Payload CMS project, including types, patterns, and integration guidelines.

## Overview

UntitledUI components are integrated as reference templates in this project. They provide modern, accessible UI patterns that are adapted for use with Payload CMS data structures.

## Component Location and Structure

```
src/components/uui/
├── base/
│   ├── avatar/              # Avatar components with profile photos
│   ├── badges/              # Badge components with types and colors
│   ├── buttons/             # Button components with variants
│   ├── select/              # Select/dropdown components
│   └── tags/                # Tag-related components
├── application/
│   ├── pagination/          # Pagination controls
│   └── tabs/                # Tab navigation components
├── marketing/
│   └── blog/
│       └── base-components/
│           └── blog-cards.tsx    # Blog card components
└── foundations/
    └── dot-icon.tsx         # Foundation icons
```

## Badge Components

### Available Types

```typescript
// Valid badge types - NEVER use other values
type BadgeTypes = "pill-color" | "color" | "modern"

// Badge colors
type BadgeColors =
  | "gray" | "brand" | "error" | "warning" | "success"
  | "gray-blue" | "blue-light" | "blue" | "indigo"
  | "purple" | "pink" | "orange"

// Sizes
type Sizes = "sm" | "md" | "lg"
```

### Basic Badge Usage

```typescript
import { Badge } from '@/components/uui/base/badges/badges'

// ✅ CORRECT - Valid type and color
<Badge size="sm" color="brand" type="pill-color">
  Category
</Badge>

// ✅ CORRECT - Different type
<Badge size="md" color="success" type="color">
  Success
</Badge>

// ✅ CORRECT - Modern style
<Badge size="lg" color="gray" type="modern">
  Modern Badge
</Badge>
```

### Common Badge Errors

```typescript
// ❌ WRONG - Invalid type
<Badge type="pill-outline">Invalid</Badge>
<Badge type="outline">Invalid</Badge>

// ❌ WRONG - Wrong prop name
<Badge variant="outline">Wrong prop</Badge>

// ❌ WRONG - Invalid color
<Badge color="primary">Invalid color</Badge>
```

### Badge Variants

**1. Basic Badge:**
```typescript
<Badge size="sm" color="brand" type="pill-color">
  Category Name
</Badge>
```

**2. Badge with Dot:**
```typescript
import { BadgeWithDot } from '@/components/uui/base/badges/badges'

<BadgeWithDot size="md" color="success" type="pill-color">
  Active Status
</BadgeWithDot>
```

**3. Badge with Icon:**
```typescript
import { BadgeWithIcon } from '@/components/uui/base/badges/badges'
import { Star } from '@untitledui/icons'

<BadgeWithIcon
  size="md"
  color="warning"
  type="color"
  iconLeading={Star}
>
  Featured
</BadgeWithIcon>
```

**4. Badge with Button (Removable):**
```typescript
import { BadgeWithButton } from '@/components/uui/base/badges/badges'

<BadgeWithButton
  size="sm"
  color="gray"
  type="pill-color"
  onButtonClick={() => handleRemove()}
  buttonLabel="Remove tag"
>
  Removable Tag
</BadgeWithButton>
```

## Blog Card Components

### Article Type Interface

All blog components use this standardized interface:

```typescript
export type Article = {
  id: string
  href: string
  thumbnailUrl: string
  title: string
  summary: string
  categories: Array<{    // CRITICAL: Always use 'categories' (plural)
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

### Available Blog Card Components

**1. Simple01Vertical (Most Common):**
```typescript
import { Simple01Vertical } from '@/components/uui/marketing/blog/base-components/blog-cards'

<Simple01Vertical
  article={article}
  imageClassName="aspect-[1.5] w-full object-cover"
/>
```

**2. Simple04Vertical (With Overlay):**
```typescript
import { Simple04Vertical } from '@/components/uui/marketing/blog/base-components/blog-cards'

<Simple04Vertical
  article={article}
  className="custom-card-styles"
  imageClassName="aspect-video object-cover"
/>
```

### Safe Category Access Pattern

**✅ CORRECT Pattern:**
```typescript
// Access first category safely
const firstCategory = article.categories[0]?.name || 'Uncategorized'

// Map all categories
{article.categories.map((category, index) => (
  <Badge key={index} size="sm" color="brand" type="pill-color">
    {category.name}
  </Badge>
))}

// In blog card components - access first category
{article.categories[0]?.name || 'Uncategorized'}
```

**❌ WRONG Pattern:**
```typescript
// This property doesn't exist on Article interface
article.category.name  // TypeError!

// Missing null safety
article.categories[0].name  // Could throw if empty array
```

## Button Components

### Button Types and Variants

```typescript
import { Button } from '@/components/uui/base/buttons/button'

// ✅ Available button colors/variants
<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="tertiary">Tertiary</Button>
<Button color="error">Error</Button>
<Button color="gray">Gray</Button>

// ✅ Available sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="2xl">2X Large</Button>
```

### Button with Next.js Integration

```typescript
import { Button } from '@/components/uui/base/buttons/button'
import Link from 'next/link'

// ✅ CORRECT - Using asChild pattern
<Button asChild color="primary" size="lg">
  <Link href="/posts">View All Posts</Link>
</Button>

// ✅ CORRECT - External link
<Button asChild color="secondary">
  <a href="https://external.com" target="_blank" rel="noopener noreferrer">
    External Link
  </a>
</Button>

// ✅ CORRECT - Button with onClick
<Button
  color="primary"
  size="md"
  onClick={() => handleAction()}
>
  Click Action
</Button>
```

## Pagination Components

### Basic Pagination

```typescript
import { PaginationPageDefault } from '@/components/uui/application/pagination/pagination'

<PaginationPageDefault
  page={currentPage}
  total={totalPages}
  onPageChange={(page) => handlePageChange(page)}
  rounded={true}
/>
```

### Integration with Next.js Router

```typescript
import { useRouter } from 'next/navigation'

const handlePageChange = (page: number) => {
  const categoryParam = selectedCategory !== "all"
    ? `?category=${selectedCategory}`
    : ''

  if (page === 1) {
    router.push(`/posts${categoryParam}`)
  } else {
    router.push(`/posts/page/${page}${categoryParam}`)
  }
}
```

## Tab Components

### Basic Tab Usage

```typescript
import { Tabs, TabList } from '@/components/uui/application/tabs/tabs'

const tabs = [
  { id: "all", label: "View all" },
  { id: "team", label: "Team" },
  { id: "marketing", label: "Marketing" }
]

<Tabs
  className="w-full"
  selectedKey={selectedCategory}
  onSelectionChange={(key) => handleCategoryChange(key as string)}
>
  <TabList
    type="underline"
    size="md"
    items={tabs}
    className="overflow-auto"
  />
</Tabs>
```

### Dynamic Tab Generation

```typescript
// Generate tabs from Payload categories
const tabs = [
  {
    id: "all",
    label: "View all",
  },
  ...categories.map(category => ({
    id: category.slug || category.id.toString(),
    label: category.title,
  }))
]
```

## Select Components

### Basic Select Usage

```typescript
import { Select } from '@/components/uui/base/select/select'

const sortByOptions = [
  { id: "recent", label: "Most recent" },
  { id: "popular", label: "Most popular" },
  { id: "viewed", label: "Most viewed" }
]

<Select
  aria-label="Sort by"
  size="md"
  selectedKey={sortBy}
  onSelectionChange={(value) => setSortBy(value as string)}
  items={sortByOptions}
>
  {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
</Select>
```

## Avatar Components

### Basic Avatar

```typescript
import { Avatar } from '@/components/uui/base/avatar/avatar'

<Avatar
  size="md"
  src={author.avatarUrl}
  alt={author.name}
  fallback={author.name.charAt(0)}
/>
```

### Avatar Sizes

```typescript
// Available sizes
<Avatar size="xs" src="..." alt="..." />   // 24px
<Avatar size="sm" src="..." alt="..." />   // 32px
<Avatar size="md" src="..." alt="..." />   // 40px
<Avatar size="lg" src="..." alt="..." />   // 48px
<Avatar size="xl" src="..." alt="..." />   // 56px
<Avatar size="2xl" src="..." alt="..." />  // 64px
```

## Image Integration

### Using OptimizedImage with UUI Components

```typescript
import { OptimizedImage } from '@/components/OptimizedImage'

// In blog cards
<OptimizedImage
  src={article.thumbnailUrl}
  alt={article.title}
  width={400}
  height={300}
  className="aspect-[1.5] w-full object-cover rounded-lg"
  priority={article.isFeatured}
/>

// In avatar components
<OptimizedImage
  src={author.avatarUrl}
  alt={author.name}
  width={40}
  height={40}
  className="rounded-full"
/>
```

## Common Integration Patterns

### 1. Payload Data to UUI Component

```typescript
// Transform Payload Post to Article interface
const transformPost = (post: Post, index: number): Article => {
  const heroImage = typeof post.heroImage === 'object' ? post.heroImage as Media : undefined
  const firstAuthor = post.populatedAuthors?.[0]
  const author = typeof firstAuthor === 'object' ? firstAuthor as User : undefined

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
    href: `/posts/${post.slug}`,
    categories: allCategories,  // Always use categories array
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

### 2. Form Integration

```typescript
// UUI Select with form state
const [selectedValue, setSelectedValue] = useState("")

<Select
  selectedKey={selectedValue}
  onSelectionChange={(value) => setSelectedValue(value as string)}
  items={options}
>
  {(item) => <Select.Item id={item.value}>{item.label}</Select.Item>}
</Select>
```

### 3. Grid Layouts

```typescript
// Responsive grid with UUI components
<div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
  {articles.map((article) => (
    <Simple01Vertical
      key={article.id}
      article={article}
      imageClassName="aspect-[1.5] w-full object-cover"
    />
  ))}
</div>
```

## TypeScript Best Practices

### 1. Proper Type Imports

```typescript
// ✅ CORRECT - Import specific types
import type { BadgeColor, BadgeTypes } from '@/components/uui/base/badges/badge-types'
import type { Article } from '@/components/uui/marketing/blog/base-components/blog-cards'

// ❌ WRONG - Don't import implementation
import { BadgeColor } from '@/components/uui/base/badges/badges'  // Wrong file
```

### 2. Component Props Typing

```typescript
// ✅ CORRECT - Extend UUI types
interface CustomBlogCardProps {
  article: Article
  className?: string
  featured?: boolean
}

const CustomBlogCard: React.FC<CustomBlogCardProps> = ({
  article,
  className,
  featured = false
}) => {
  return (
    <div className={cx("blog-card", className)}>
      <Simple01Vertical article={article} />
      {featured && (
        <Badge size="sm" color="warning" type="pill-color">
          Featured
        </Badge>
      )}
    </div>
  )
}
```

### 3. Safe Color Type Usage

```typescript
// ✅ CORRECT - Type-safe badge colors
const getBadgeColor = (category: string): BadgeColors => {
  const colorMap: Record<string, BadgeColors> = {
    'team': 'blue',
    'marketing': 'purple',
    'engineering': 'success',
    'design': 'warning'
  }
  return colorMap[category] || 'gray'
}

<Badge color={getBadgeColor(category.slug)} type="pill-color">
  {category.name}
</Badge>
```

## Common Errors and Solutions

### 1. Badge Type Errors

**Error:** `Type '"pill-outline"' is not assignable to type 'BadgeTypes'`

**Solution:** Use valid badge types
```typescript
// ✅ Change to valid type
<Badge type="pill-color">Valid</Badge>
```

### 2. Article Category Errors

**Error:** `Property 'category' does not exist on type 'Article'`

**Solution:** Use categories array
```typescript
// ✅ Correct pattern
article.categories[0]?.name || 'Uncategorized'
```

### 3. Missing Type Imports

**Error:** `Cannot find name 'BadgeColor'`

**Solution:** Import from correct location
```typescript
import type { BadgeColor } from '@/components/uui/base/badges/badge-types'
```

## Performance Considerations

### 1. Component Lazy Loading

```typescript
// For large UUI components
import dynamic from 'next/dynamic'

const LargeBlogComponent = dynamic(
  () => import('@/components/uui/marketing/blog/blog-header-featured-post-01'),
  {
    loading: () => <div>Loading...</div>,
    ssr: true  // Enable SSR for SEO
  }
)
```

### 2. Image Optimization

```typescript
// Always specify dimensions for better performance
<OptimizedImage
  src={article.thumbnailUrl}
  alt={article.title}
  width={400}     // Specify width
  height={300}    // Specify height
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
  priority={article.isFeatured}
/>
```

### 3. List Rendering

```typescript
// Use proper keys for list rendering
{articles.map((article) => (
  <Simple01Vertical
    key={`article-${article.id}`}  // Stable, unique keys
    article={article}
  />
))}
```

## Testing UUI Components

### 1. Component Testing

```typescript
// Test UUI component integration
import { render, screen } from '@testing-library/react'
import { Simple01Vertical } from '@/components/uui/marketing/blog/base-components/blog-cards'

const mockArticle: Article = {
  id: '1',
  title: 'Test Article',
  categories: [{ name: 'Test', href: '/test' }],
  // ... other required fields
}

test('renders blog card with categories', () => {
  render(<Simple01Vertical article={mockArticle} />)
  expect(screen.getByText('Test')).toBeInTheDocument()
})
```

### 2. Type Testing

```typescript
// Create type tests to catch interface changes
const testArticle: Article = {
  categories: [{ name: 'Test', href: '/test' }],  // Must be array
  // This should cause TypeScript error if interface changes incorrectly:
  // category: { name: 'Test', href: '/test' }  // Should error
}
```

## Maintenance and Updates

### When to Update UUI Components

1. **Major UUI library updates** - Check for breaking changes
2. **New component needs** - Install with `pnpm uui:add [component]`
3. **Type definition changes** - Update local interfaces if needed
4. **Performance optimizations** - Monitor bundle size impact

### Update Process

1. **Install new components:**
   ```bash
   pnpm uui:add [component-name]
   pnpm fix:uui  # Clean up structure
   ```

2. **Update existing usage:**
   - Check for type changes
   - Update mock data if needed
   - Test with real Payload data
   - Run `pnpm build` to catch errors

3. **Document new patterns:**
   - Add to this reference guide
   - Update component examples
   - Create integration patterns

## Related Documentation

- **[Blog Implementation Guide](/docs/BLOG_IMPLEMENTATION.md)** - Blog-specific UUI usage
- **[TypeScript Patterns](/docs/TYPESCRIPT_PATTERNS.md)** - TypeScript best practices
- **[UntitledUI Setup](/docs/UNTITLEDUI_SETUP.md)** - Installation and setup guide
- **[Image Optimization Guide](/docs/IMAGES.md)** - Image handling with UUI

## Support

For UUI component issues:

1. Check this reference guide first
2. Verify component types in `/src/components/uui/`
3. Check UntitledUI documentation for component specifics
4. Test with minimal examples to isolate issues
5. Run `pnpm build` to catch TypeScript errors

---

**Remember:** UUI components are reference implementations. Always maintain type safety, use proper imports, and follow established patterns for consistent integration with Payload CMS data.