# Section Header System

This document defines the standard typography and spacing for section headers across all blocks, ensuring visual consistency between block headers and rich text content headings.

## Quick Reference

### Typography Scale (Responsive)

| Element | Mobile | Desktop | CSS Class |
|---------|--------|---------|-----------|
| **SectionHeader heading** | 24px (display-xs) | 30px (display-sm) | `text-display-xs md:text-display-sm` |
| **Eyebrow** | 14px (text-sm) | 17px (text-md) | `text-sm md:text-md` |
| **Description** | 18px (text-lg) | 20px (text-xl) | `text-lg md:text-xl` |

### Rich Text Heading Scale (Responsive)

| Heading | Mobile | Desktop | Usage |
|---------|--------|---------|-------|
| **H1** | 36px (display-md) | 48px (display-lg) | Page titles |
| **H2** | 30px (display-sm) | 36px (display-md) | Major sections |
| **H3** | 24px (display-xs) | 30px (display-sm) | Sub-sections (matches SectionHeader) |
| **H4** | 18px (text-lg) | 24px (display-xs) | Minor headings |
| **H5** | 18px (text-lg) | 20px (text-xl) | Small headings |
| **H6** | 18px (text-lg) | 20px (text-xl) | Accent headings |

### Spacing Rules

| Gap | Class | Value |
|-----|-------|-------|
| Eyebrow → Heading | `mt-3` | 12px |
| Heading → Description | `mt-4 md:mt-5` | 16px → 20px |
| Header → Content | `mt-12 md:mt-16` | 48px → 64px |

---

## SectionHeader Component

### Location
`src/components/SectionHeader/index.tsx`

### Props

```tsx
interface SectionHeaderProps {
  eyebrow?: string          // Small label above heading
  heading?: string          // Main heading text
  description?: string      // Supporting text below heading
  alignment?: 'left' | 'center'  // Text alignment (default: 'left')
  colorMode?: 'default' | 'light' | 'dark'  // Text color theme
  headingLevel?: 'h2' | 'h3'  // Semantic heading level (default: 'h3')
  className?: string        // Additional classes
}
```

### Color Modes

| Mode | Eyebrow | Heading | Description | Use Case |
|------|---------|---------|-------------|----------|
| `default` | `text-brand-secondary` | `text-primary` | `text-tertiary` | Standard backgrounds |
| `light` | `text-white/80` | `text-white` | `text-white/80` | Dark backgrounds |
| `dark` | `text-brand-secondary` | `text-brand-primary` | `text-tertiary` | Light backgrounds (explicit) |

### Usage Examples

#### Basic Usage
```tsx
<SectionHeader
  eyebrow="Our Services"
  heading="What We Offer"
  description="Comprehensive solutions for your business needs"
/>
```

#### Centered with Center Alignment
```tsx
<SectionHeader
  eyebrow="Features"
  heading="Why Choose Us"
  description="Industry-leading capabilities"
  alignment="center"
/>
```

#### Dark Background (Light Text)
```tsx

<SectionHeader
  eyebrow="About"
  heading="Our Story"
  description="Building the future together"
  colorMode="light"
/>
```

#### As H2 (for BackgroundSection)
```tsx
<SectionHeader
  heading="Main Section Title"
  description="Section description"
  headingLevel="h2"
  colorMode="light"
  className="mb-12 lg:mb-16"
/>
```

---

## Blocks Using SectionHeader

### CardGridBlock
- Uses default `h3` heading level
- Alignment controlled by `header.headerAlignment`
- Content gap: `mt-12 md:mt-16` (applied to cards grid)

### AccordionBlock
- Uses default `h3` heading level
- Alignment controlled by `header.headerAlignment`
- Content gap: `mt-12 md:mt-16` (applied to accordion list)

### LatestPostsBlock
- Uses default `h3` heading level
- Always left-aligned (button appears on right on desktop)
- Wrapped in flex container for button layout
- Content gap: `mt-12 md:mt-16`

### BackgroundSectionBlock
- Uses `h2` heading level (major section)
- ColorMode derived from background type
- Uses `mb-12 lg:mb-16` (margin-bottom before nested content)
- Supports `header.textColor` override

---

## Rich Text Consistency

The rich text H3 heading now matches the SectionHeader heading size:

| Context | Mobile | Desktop |
|---------|--------|---------|
| **SectionHeader** | 24px (display-xs) | 30px (display-sm) |
| **Rich Text H3** | 24px (display-xs) | 30px (display-sm) |

This ensures that when using a Content block with rich text H3 headings, they visually match section headers in other blocks.

---

## Adding Section Headers to New Blocks

When creating a new block that needs a section header:

1. Import the component:
```tsx
import { SectionHeader } from '@/components/SectionHeader'
```

2. Add header configuration to your block schema (in Payload):
```ts
{
  name: 'header',
  type: 'group',
  fields: [
    { name: 'showHeader', type: 'checkbox' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'textarea' },
    { name: 'headerAlignment', type: 'select', options: ['left', 'center'] },
  ],
}
```

3. Render in component:
```tsx
{header?.showHeader && (
  <SectionHeader
    eyebrow={header.eyebrow || undefined}
    heading={header.heading || undefined}
    description={header.description || undefined}
    alignment={header.headerAlignment || 'left'}
  />
)}

{/* Content with gap */}
<div className={cn(header?.showHeader && 'mt-12 md:mt-16')}>
  {/* Block content */}
</div>
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `src/components/SectionHeader/index.tsx` | Shared component |
| `src/blocks/CardGridBlock/Component.tsx` | Uses SectionHeader |
| `src/blocks/AccordionBlock/Component.tsx` | Uses SectionHeader |
| `src/blocks/LatestPostsBlock/Component.tsx` | Uses SectionHeader with button |
| `src/blocks/BackgroundSection/Component.tsx` | Uses SectionHeader with h2 |
| `src/styles/richtext.css` | Rich text heading styles |
