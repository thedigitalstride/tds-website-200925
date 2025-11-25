# Row Labels Guide

Row labels provide meaningful identification for array items in the Payload CMS admin panel, making it easier to manage content when arrays are collapsed.

## Overview

**What are Row Labels?**
Row labels are custom components that display descriptive text for each item in an array field when collapsed in the admin panel.

**Before Row Labels:**
```
▼ Navigation Item 1
▼ Navigation Item 2
▼ Navigation Item 3
```

**After Row Labels:**
```
▼ Nav item 1: Products
▼ Nav item 2: Services
▼ Nav item 3: About Us
```

## When to Use Row Labels

### ✅ ALWAYS use row labels when arrays have:
- **Navigation items** - Use link label/title
- **Social media links** - Use platform name
- **FAQ items** - Use question text
- **Team members** - Use person name
- **Features** - Use feature title
- **Testimonials** - Use author name or company
- **Product listings** - Use product name
- **Contact methods** - Use method type (email, phone, etc.)

### ❌ DON'T use row labels when:
- **Page layout blocks** - Already have meaningful block names
- **Simple arrays** without clear identifiers
- **Arrays with user-generated content** where titles can be manually edited
- **Generic data collections** without natural naming fields

## Implementation Pattern

### 1. **File Structure**
```
src/
├── [Component]/
│   ├── config.ts
│   ├── [ArrayName]RowLabel.tsx  ← Create this
│   └── ...
```

### 2. **Naming Convention**
- File: `[ArrayName]RowLabel.tsx`
- Component: `[ArrayName]RowLabel`
- Export: Use same name as component

### 3. **Display Format**
Always follow this pattern: `"[Type] [Number]: [Identifier]"`

Examples:
- `"Nav item 1: Products"`
- `"Social 1: LinkedIn"`
- `"FAQ 1: How do I get started?"`

## Step-by-Step Implementation

### Step 1: Create Row Label Component

Create the row label component in the same directory as your config:

```typescript
'use client'
import { [ComponentType] } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const [ArrayName]RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<[ComponentType]['[arrayFieldName]']>[number]>()

  const label = data?.data?.[identifierField]
    ? `[Type] ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.[identifierField]}`
    : `[Type] ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
```

### Step 2: Add to Configuration

In your config file, add the row label to the array field:

```typescript
{
  name: '[arrayFieldName]',
  type: 'array',
  fields: [
    // ... your fields
  ],
  admin: {
    description: 'Your array description',
    initCollapsed: true, // Recommended for arrays with row labels
    components: {
      RowLabel: '@/[Component]/[ArrayName]RowLabel#[ArrayName]RowLabel',
    },
  },
}
```

### Step 3: Generate Import Map

After creating the component, run:

```bash
pnpm generate:importmap
```

This ensures Payload can find your new row label component.

### Step 4: Test Implementation

1. Start development server: `pnpm dev`
2. Navigate to admin panel at `/admin`
3. Find your array field and verify:
   - Row labels show meaningful text
   - Labels update when content changes
   - Collapsed state shows identifiable information

## Code Examples

### Example 1: Navigation Items (Header)

**Component:** `/src/Header/RowLabel.tsx`
```typescript
'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const label = data?.data?.link?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.link.label}`
    : 'Row'

  return <div>{label}</div>
}
```

**Config:** `/src/Header/config.ts`
```typescript
{
  name: 'navItems',
  type: 'array',
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/Header/RowLabel#RowLabel',
    },
  },
}
```

### Example 2: Social Links (Footer)

**Component:** `/src/Footer/SocialLinkRowLabel.tsx`
```typescript
'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SocialLinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['socialLinks']>[number]>()

  const formatPlatform = (platform?: string) => {
    const platformMap: Record<string, string> = {
      'x': 'X (Twitter)',
      'linkedin': 'LinkedIn',
      'facebook': 'Facebook',
      'github': 'GitHub',
    }
    return platformMap[platform] || platform
  }

  const label = data?.data?.platform
    ? `Social ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${formatPlatform(data.data.platform)}`
    : `Social Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
```

### Example 3: Nested Arrays

For nested arrays (arrays within arrays), use the appropriate type:

```typescript
export const NestedRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NonNullable<ComponentType['parentArray']>[number]['childArray']>[number]>()

  // ... rest of component
}
```

## Template for Quick Implementation

Copy and customize this template:

```typescript
'use client'
import { [YOUR_TYPE] } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const [YOUR_ARRAY_NAME]RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<[YOUR_TYPE]['[YOUR_ARRAY_FIELD]']>[number]>()

  const label = data?.data?.[YOUR_IDENTIFIER_FIELD]
    ? `[YOUR_TYPE_NAME] ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.[YOUR_IDENTIFIER_FIELD]}`
    : `[YOUR_TYPE_NAME] ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}
```

**Configuration Template:**
```typescript
{
  name: '[yourArrayField]',
  type: 'array',
  // ... other config
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/[YourComponent]/[YourArrayName]RowLabel#[YourArrayName]RowLabel',
    },
  },
}
```

## Developer Checklist

When creating new array fields, ask yourself:

- [ ] Does this array contain items with natural identifiers (title, name, label)?
- [ ] Would users benefit from seeing the identifier when the array is collapsed?
- [ ] Is this NOT a page layout block (which already has meaningful names)?

If yes to questions 1-2 and no to question 3, implement row labels:

- [ ] Created `[ArrayName]RowLabel.tsx` component
- [ ] Used proper TypeScript types from payload-types
- [ ] Followed naming pattern: "[Type] [Number]: [Identifier]"
- [ ] Added component to config's `admin.components.RowLabel`
- [ ] Set `initCollapsed: true` for better UX
- [ ] Ran `pnpm generate:importmap`
- [ ] Tested in admin panel
- [ ] Verified labels update when content changes

## Common Patterns

### Platform/Service Selection
```typescript
const formatPlatform = (value?: string) => {
  const platformMap: Record<string, string> = {
    'x': 'X (Twitter)',
    'linkedin': 'LinkedIn',
    // ... other mappings
  }
  return platformMap[value] || value
}
```

### Truncated Long Text
```typescript
const truncate = (text: string, maxLength: number = 30) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
}

const label = data?.data?.longText
  ? `Item ${rowNumber}: ${truncate(data.data.longText)}`
  : `Item ${rowNumber}`
```

### Fallback Handling
```typescript
const getIdentifier = (data: any) => {
  return data?.title || data?.name || data?.label || 'Untitled'
}
```

## Best Practices

1. **Always provide fallbacks** - Don't assume identifier fields will be populated
2. **Keep labels concise** - Truncate long text to maintain readability
3. **Use consistent numbering** - Always show row numbers for context
4. **Match the content type** - Use appropriate prefixes (Nav item, Social, FAQ, etc.)
5. **Set initCollapsed: true** - This makes row labels most valuable
6. **Generate import maps** - Always run the command after creating components
7. **Test thoroughly** - Verify labels update in real-time as content changes

## Troubleshooting

### Row Label Not Showing
1. Verify import map was generated: `pnpm generate:importmap`
2. Check component path in config matches file location
3. Ensure component is properly exported
4. Verify TypeScript types are correct

### TypeScript Errors
1. Check that payload-types are up to date: `pnpm generate:types`
2. Verify the type path matches your data structure
3. For nested arrays, ensure you're using the correct nested type

### Labels Not Updating
1. Verify you're accessing the correct data field
2. Check for null/undefined handling
3. Ensure the identifier field actually contains data

This documentation ensures consistent implementation of row labels across all future array fields in the project.