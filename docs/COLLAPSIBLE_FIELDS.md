# Collapsible Fields Guide

Collapsible fields provide expandable/collapsible sections in the Payload CMS admin panel, reducing visual clutter and improving editor experience by grouping related fields under collapsible headers.

## Overview

**What are Collapsible Fields?**
Collapsible fields are Payload CMS field types that allow you to group related fields under an expandable/collapsible header in the admin panel. Unlike group fields (which nest data), collapsible fields store their child fields at the parent level while only affecting the UI.

**Before Collapsible:**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline
[Your headline]

Subtitle
[Your subtitle]

Headline Color
[Primary ▼]

Text Alignment
[Left ▼]

Spacing
[Normal ▼]

Subtitle Size
[Normal ▼]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**After Collapsible (Collapsed):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline
[Your headline]

Subtitle
[Your subtitle]

▶ Layout & Styling              ← Click to expand
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**After Collapsible (Expanded):**
```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline
[Your headline]

Subtitle
[Your subtitle]

▼ Layout & Styling              ← Click to collapse

Headline Color
[Primary ▼]

Text Alignment
[Left ▼]

Spacing
[Normal ▼]

Subtitle Size
[Normal ▼]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## When to Use Collapsible Fields

### ✅ USE collapsible fields when:
- **Advanced/optional settings** - Layout options, styling tweaks, SEO meta
- **Grouped related fields** - Settings that logically belong together
- **Reducing visual clutter** - Many fields that overwhelm the editor
- **Progressive disclosure** - Show core fields, hide advanced options
- **Improving editor focus** - Help editors find primary fields faster

### ❌ DON'T use collapsible when:
- **Core required fields** - Primary content that editors need immediately
- **Single fields** - No benefit to collapsing one field
- **Frequently edited fields** - Fields accessed every time
- **Time-sensitive content** - Fields that need quick access

## Collapsible vs Group: Key Differences

| Feature | `group` | `collapsible` |
|---------|---------|---------------|
| **Purpose** | Organize data structure | Organize UI only |
| **Data nesting** | ✅ Creates nested object | ❌ Fields stored flat at parent level |
| **Has `name`** | ✅ Required | ❌ Not allowed (no name property) |
| **Collapsible UI** | ❌ No (always expanded) | ✅ Yes (expand/collapse) |
| **Property access** | `data.groupName.fieldName` | `data.fieldName` |
| **Dynamic labels** | ❌ Static label only | ✅ Can use function of data |
| **Best for** | Related data that should be grouped | UI organization without data nesting |

## Implementation Pattern

### Basic Collapsible Field Structure

```typescript
import type { Field } from 'payload'

export const MyCollapsibleField: Field = {
  label: 'Section Title',        // ← Label shown in header (no 'name')
  type: 'collapsible',            // ← Must be 'collapsible'
  admin: {
    initCollapsed: true,          // ← Start collapsed by default
    description: 'Optional description shown when expanded',
  },
  fields: [                       // ← Fields stored at parent level
    {
      name: 'fieldOne',
      type: 'text',
    },
    {
      name: 'fieldTwo',
      type: 'select',
      // ...
    },
  ],
}
```

### Data Structure

**Config with Collapsible:**
```typescript
fields: [
  { name: 'headline', type: 'text' },
  { name: 'subtitle', type: 'text' },
  {
    label: 'Layout Options',      // ← No 'name' property!
    type: 'collapsible',
    fields: [
      { name: 'textColor', type: 'select' },
      { name: 'alignment', type: 'select' },
    ],
  },
]
```

**Resulting Data (Flat):**
```json
{
  "headline": "Welcome",
  "subtitle": "Get started",
  "textColor": "primary",       // ← Stored at root level
  "alignment": "center"         // ← Not nested!
}
```

**Compare to Group (Nested):**
```json
{
  "headline": "Welcome",
  "subtitle": "Get started",
  "layoutOptions": {            // ← Group creates nesting
    "textColor": "primary",
    "alignment": "center"
  }
}
```

## Step-by-Step Implementation

### Step 1: Identify Fields to Group

Look for related fields that can be organized together:

```typescript
// BEFORE: Flat list of many fields
fields: [
  { name: 'headline', type: 'text' },
  { name: 'subtitle', type: 'text' },
  { name: 'headlineColor', type: 'select', defaultValue: 'primary' },
  { name: 'textAlignment', type: 'select', defaultValue: 'left' },
  { name: 'spacing', type: 'select', defaultValue: 'normal' },
  { name: 'subtitleSize', type: 'select', defaultValue: 'normal' },
]
```

### Step 2: Create Collapsible Section

Wrap related fields in collapsible:

```typescript
// AFTER: Organized with collapsible
fields: [
  // Core fields (always visible)
  { name: 'headline', type: 'text', required: true },
  { name: 'subtitle', type: 'text' },

  // Advanced options (collapsible)
  {
    label: 'Layout & Styling',
    type: 'collapsible',
    admin: {
      initCollapsed: true,
      description: 'Configure how the section is displayed',
    },
    fields: [
      { name: 'headlineColor', type: 'select', defaultValue: 'primary' },
      { name: 'textAlignment', type: 'select', defaultValue: 'left' },
      { name: 'spacing', type: 'select', defaultValue: 'normal' },
      { name: 'subtitleSize', type: 'select', defaultValue: 'normal' },
    ],
  },
]
```

### Step 3: Update Component (Flat Access)

Access fields directly at root level:

```typescript
// Component props interface
interface MyBlockProps {
  headline: string
  subtitle?: string
  // Fields are at root level (not nested)
  headlineColor?: 'primary' | 'brand'
  textAlignment?: 'left' | 'center'
  spacing?: 'compact' | 'normal' | 'spacious'
  subtitleSize?: 'small' | 'normal'
}

// Component implementation
export const MyBlock: React.FC<MyBlockProps> = ({
  headline,
  subtitle,
  headlineColor = 'primary',    // ← Direct access (no nesting)
  textAlignment = 'left',
  spacing = 'normal',
  subtitleSize = 'normal',
}) => {
  // Use fields directly
  const colorClass = headlineColor === 'brand' ? 'text-brand' : 'text-primary'

  // ... rest of component
}
```

### Step 4: Regenerate Types

After changing field structure, always regenerate types:

```bash
pnpm generate:types
```

### Step 5: Clear Cache and Test

```bash
rm -rf .next && pnpm dev
```

Then test in admin panel:
1. Navigate to your block/collection
2. Verify collapsible section appears
3. Click to expand/collapse
4. Verify fields save correctly
5. Check that data is stored flat (not nested)

## Converting Group to Collapsible

### Migration Strategy

When converting existing `group` fields to `collapsible`, you have two options:

#### Option A: Non-Breaking (Backward Compatible)

Keep both property paths working:

```typescript
// Component with backward compatibility
export const MyBlock: React.FC<MyBlockProps> = ({
  headline,
  // New flat properties
  headlineColor: headlineColorProp,
  textAlignment: textAlignmentProp,
  // Old nested group (for backward compatibility)
  layoutOptions,
}) => {
  // Use nullish coalescing to check new properties first
  const headlineColor = headlineColorProp ?? layoutOptions?.headlineColor ?? 'primary'
  const textAlignment = textAlignmentProp ?? layoutOptions?.textAlignment ?? 'left'

  // ... rest of component
}
```

**Pros:**
- ✅ No data migration needed
- ✅ Existing content works immediately
- ✅ Gradual transition as editors re-save

**Cons:**
- ❌ More complex component code
- ❌ Technical debt (cleanup needed later)

#### Option B: Breaking Change (Clean Migration)

Migrate all existing data to new structure:

1. **Create migration script**:
```typescript
// src/migrations/YYYYMMDD_flatten_layout_options.ts
export async function up({ payload }) {
  const blocks = await payload.find({
    collection: 'your-collection',
    limit: 1000,
  })

  for (const block of blocks.docs) {
    if (block.layoutOptions) {
      await payload.update({
        collection: 'your-collection',
        id: block.id,
        data: {
          // Flatten nested properties
          headlineColor: block.layoutOptions.headlineColor,
          textAlignment: block.layoutOptions.textAlignment,
          spacing: block.layoutOptions.spacing,
          subtitleSize: block.layoutOptions.subtitleSize,
          // Remove old group
          layoutOptions: undefined,
        },
      })
    }
  }
}
```

2. **Run migration**: `pnpm payload migrate`

3. **Update component** (no backward compatibility needed):
```typescript
export const MyBlock: React.FC<MyBlockProps> = ({
  headline,
  headlineColor = 'primary',    // ← Clean, direct access
  textAlignment = 'left',
  // ... rest
}) => {
  // Simple, clean code
}
```

**Pros:**
- ✅ Cleaner code (no fallbacks)
- ✅ Flatter data structure
- ✅ No technical debt

**Cons:**
- ❌ Requires migration
- ❌ Downtime risk if migration fails
- ❌ Can't easily rollback

## Real-World Example: HeroHeadingBlock

### Before (Group)

**Config:**
```typescript
fields: [
  { name: 'headline', type: 'textarea', required: true },
  { name: 'subtitle', type: 'text' },
  {
    name: 'layoutOptions',      // ← Has 'name' (creates nesting)
    type: 'group',
    label: 'Layout & Styling',
    fields: [
      { name: 'headlineColor', type: 'select', defaultValue: 'primary' },
      { name: 'textAlignment', type: 'select', defaultValue: 'left' },
      { name: 'spacing', type: 'select', defaultValue: 'normal' },
      { name: 'subtitleSize', type: 'select', defaultValue: 'normal' },
    ],
  },
]
```

**Component:**
```typescript
const { layoutOptions } = props
const headlineColor = layoutOptions?.headlineColor || 'primary'
const textAlignment = layoutOptions?.textAlignment || 'left'
```

**Data:**
```json
{
  "headline": "Welcome",
  "layoutOptions": {
    "headlineColor": "primary",
    "textAlignment": "left"
  }
}
```

### After (Collapsible)

**Config:**
```typescript
fields: [
  { name: 'headline', type: 'textarea', required: true },
  { name: 'subtitle', type: 'text' },
  {
    label: 'Layout & Styling',  // ← No 'name' (flat storage)
    type: 'collapsible',        // ← Collapsible UI
    admin: {
      initCollapsed: true,      // ← Starts collapsed
      description: 'Configure how the hero section is displayed',
    },
    fields: [
      { name: 'headlineColor', type: 'select', defaultValue: 'primary' },
      { name: 'textAlignment', type: 'select', defaultValue: 'left' },
      { name: 'spacing', type: 'select', defaultValue: 'normal' },
      { name: 'subtitleSize', type: 'select', defaultValue: 'normal' },
    ],
  },
]
```

**Component (with backward compatibility):**
```typescript
const {
  headlineColor: headlineColorProp,
  textAlignment: textAlignmentProp,
  layoutOptions, // ← Keep for old data
} = props

// New properties first, fall back to old
const headlineColor = headlineColorProp ?? layoutOptions?.headlineColor ?? 'primary'
const textAlignment = textAlignmentProp ?? layoutOptions?.textAlignment ?? 'left'
```

**Data (new blocks):**
```json
{
  "headline": "Welcome",
  "headlineColor": "primary",     // ← Flat structure
  "textAlignment": "left"
}
```

## Advanced Patterns

### Dynamic Labels

Collapsible fields support dynamic labels based on data:

```typescript
{
  label: ({ data }) => {
    return data?.title || 'Untitled Section'
  },
  type: 'collapsible',
  fields: [
    { name: 'title', type: 'text' },
    // ... other fields
  ],
}
```

### Conditional Collapsibles

Show collapsible based on other field values:

```typescript
{
  label: 'Advanced Options',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    condition: (data, siblingData) => {
      return data?.enableAdvanced === true
    },
  },
  fields: [
    // ... advanced fields
  ],
}
```

### Nested Collapsibles

You can nest collapsibles for deep organization:

```typescript
fields: [
  {
    label: 'Design Settings',
    type: 'collapsible',
    admin: { initCollapsed: true },
    fields: [
      { name: 'theme', type: 'select' },
      {
        label: 'Typography',
        type: 'collapsible',
        admin: { initCollapsed: true },
        fields: [
          { name: 'fontFamily', type: 'select' },
          { name: 'fontSize', type: 'select' },
        ],
      },
    ],
  },
]
```

**⚠️ Warning:** Avoid deep nesting (>2 levels) as it can be confusing.

## Best Practices

### 1. Logical Grouping
Group fields that are related conceptually:

```typescript
// ✅ GOOD: Related styling options
{
  label: 'Layout & Styling',
  type: 'collapsible',
  fields: [
    { name: 'textColor', type: 'select' },
    { name: 'textAlignment', type: 'select' },
    { name: 'spacing', type: 'select' },
  ],
}

// ❌ BAD: Unrelated fields
{
  label: 'Miscellaneous',
  type: 'collapsible',
  fields: [
    { name: 'title', type: 'text' },        // Core field
    { name: 'showBorder', type: 'checkbox' }, // Style option
    { name: 'authorEmail', type: 'email' },   // Metadata
  ],
}
```

### 2. Start Collapsed for Optional Fields

```typescript
// ✅ GOOD: Advanced options start collapsed
{
  label: 'SEO Settings',
  type: 'collapsible',
  admin: {
    initCollapsed: true,  // ← Editors can ignore if not needed
  },
  fields: [/* SEO fields */],
}

// ❌ BAD: Required fields start collapsed
{
  label: 'Content',
  type: 'collapsible',
  admin: {
    initCollapsed: true,  // ← Editors might miss required fields!
  },
  fields: [
    { name: 'title', type: 'text', required: true },
  ],
}
```

### 3. Clear, Descriptive Labels

```typescript
// ✅ GOOD: Clear purpose
label: 'Layout & Styling'
label: 'SEO & Metadata'
label: 'Advanced Options'

// ❌ BAD: Vague or technical
label: 'Options'
label: 'Config'
label: 'layoutOpts'
```

### 4. Use Descriptions

Help editors understand what's inside:

```typescript
{
  label: 'Custom Background',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    description: 'Add custom background with image, gradient, or custom styling',
  },
  fields: [/* background fields */],
}
```

### 5. Keep Core Fields Visible

Don't collapse essential, frequently-used fields:

```typescript
// ✅ GOOD: Core fields visible, advanced collapsed
fields: [
  { name: 'headline', type: 'text', required: true },    // Visible
  { name: 'subtitle', type: 'text' },                    // Visible
  {
    label: 'Advanced Options',                           // Collapsed
    type: 'collapsible',
    admin: { initCollapsed: true },
    fields: [/* optional fields */],
  },
]
```

## Common Use Cases

### 1. SEO Fields

```typescript
{
  label: 'SEO & Metadata',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    description: 'Search engine optimization and social sharing settings',
  },
  fields: [
    { name: 'metaTitle', type: 'text', maxLength: 60 },
    { name: 'metaDescription', type: 'textarea', maxLength: 160 },
    { name: 'ogImage', type: 'upload', relationTo: 'media' },
    { name: 'noIndex', type: 'checkbox' },
  ],
}
```

### 2. Advanced Styling Options

```typescript
{
  label: 'Layout & Styling',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    description: 'Configure how the section is displayed',
  },
  fields: [
    { name: 'textAlignment', type: 'select' },
    { name: 'backgroundColor', type: 'select' },
    { name: 'spacing', type: 'select' },
    { name: 'customClass', type: 'text' },
  ],
}
```

### 3. Publishing Options

```typescript
{
  label: 'Publishing Settings',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    description: 'Control when and how this content is published',
  },
  fields: [
    { name: 'publishedDate', type: 'date' },
    { name: 'expiryDate', type: 'date' },
    { name: 'featured', type: 'checkbox' },
    { name: 'allowComments', type: 'checkbox' },
  ],
}
```

### 4. Accessibility Options

```typescript
{
  label: 'Accessibility',
  type: 'collapsible',
  admin: {
    initCollapsed: true,
    description: 'Settings to improve accessibility for all users',
  },
  fields: [
    { name: 'altText', type: 'text' },
    { name: 'ariaLabel', type: 'text' },
    { name: 'skipNavigation', type: 'checkbox' },
  ],
}
```

## Developer Checklist

When creating collapsible sections:

- [ ] Fields are logically related
- [ ] Label is clear and descriptive
- [ ] `type: 'collapsible'` (not 'group')
- [ ] No `name` property (collapsible doesn't store as nested object)
- [ ] `initCollapsed: true` for optional/advanced fields
- [ ] Description provided (helps editors understand purpose)
- [ ] Component accesses fields at root level (flat access)
- [ ] TypeScript types regenerated: `pnpm generate:types`
- [ ] Cache cleared and tested: `rm -rf .next && pnpm dev`
- [ ] Verified expand/collapse works in admin panel
- [ ] Tested that data saves correctly (flat structure)

## Troubleshooting

### Collapsible Not Appearing
1. Verify you're using `type: 'collapsible'` (not 'group')
2. Ensure there's no `name` property (collapsible doesn't have one)
3. Clear Next.js cache: `rm -rf .next`
4. Restart dev server

### Fields Not Showing
1. Check that fields array is not empty
2. Verify no admin conditions are hiding fields
3. Look for TypeScript errors in console

### Data Not Saving
1. Ensure child fields have `name` properties
2. Check that field names don't conflict with existing fields
3. Verify default values are set if fields are required

### TypeScript Errors
1. Regenerate types: `pnpm generate:types`
2. Check that you're accessing fields at root level (not nested)
3. Verify backward compatibility fallbacks if converting from group

### Unexpected Nesting
If data is nested when it shouldn't be, you're probably using `group` instead of `collapsible`:

```typescript
// ❌ WRONG: This will nest data
{
  name: 'mySection',     // ← Remove this!
  type: 'collapsible',
  fields: [...]
}

// ✅ CORRECT: No nesting
{
  label: 'My Section',   // ← Use label, not name
  type: 'collapsible',
  fields: [...]
}
```

## Performance Considerations

Collapsible fields have minimal performance impact:

- **Rendering**: Only renders expanded sections (efficient)
- **Bundle size**: Native Payload feature (no extra libraries)
- **Database**: No impact (just UI organization)

## Summary

| Feature | Use Case |
|---------|----------|
| **Collapsible** | Reduce clutter, organize optional fields, improve focus |
| **Group** | Nest related data as object, create reusable structures |
| **Array** | Multiple instances of same structure (nav items, features, etc.) |

**Rule of thumb:**
- Use **collapsible** for UI organization
- Use **group** for data organization
- Use **array** for repeating content

This documentation ensures consistent implementation of collapsible fields across the project, improving both editor experience and code maintainability.
