# Icon Selector Field

Visual icon selection component for Payload CMS that integrates with the Icons collection.

## Overview

The Icon Selector provides a searchable, filterable grid interface for selecting icons from the Icons collection. Selected icons are stored as relationships and rendered server-side as inline SVG.

## Usage in Block Configurations

```typescript
import { iconSelectorField } from '@/fields/IconSelector'

// In your block config
{
  name: 'cards',
  type: 'array',
  fields: [
    iconSelectorField({
      name: 'icon',
      required: false,
      admin: {
        description: 'Select an icon to display',
      },
    }),
    // ... other fields
  ],
}
```

## Features

- **Visual Selection**: Grid of icon previews with SVG rendering
- **Search**: Real-time search across icon name, label, keywords, and description
- **Category Filter**: Filter icons by category (navigation, action, social, etc.)
- **Preview**: Large preview of selected icon with metadata
- **Server-Side Rendering**: Icons rendered as inline SVG with zero client JavaScript

## Rendering Icons in Components

### Using FeaturedIcon Component

```typescript
const iconData = typeof card.icon === 'object' ? card.icon : null

<FeaturedIcon
  svgCode={iconData?.svgCode}
  color="primary"
  shape="rounded-square"
  size="lg"
/>
```

### Using IconSVG Component Directly

```typescript
import { IconSVG } from '@/components/IconSVG'

const iconData = typeof card.icon === 'object' ? card.icon : null

{iconData?.svgCode && (
  <IconSVG
    svgCode={iconData.svgCode}
    className="h-8 w-8 text-blue-500"
    aria-label={iconData.label || iconData.name}
  />
)}
```

## Data Structure

When queried with `depth: 1`, the icon field returns:

```typescript
{
  id: string
  name: string
  label: string
  svgCode: string  // Optimized SVG with currentColor
  category: string
  description?: string
  keywords?: Array<{ keyword: string }>
}
```

## Requirements

- Icons must be uploaded to the Icons collection first
- SVG code is automatically optimized by the processSVGHook
- Icons use `currentColor` for color inheritance

## Implementation Blocks

Currently integrated in:
- CardGridBlock (`/src/blocks/CardGridBlock/`)
- FeaturesBlock (`/src/blocks/FeaturesBlock/`)

## Related Files

- Field Component: `/src/fields/IconSelector/Field.tsx`
- Grid Component: `/src/fields/IconSelector/Component.tsx`
- SVG Renderer: `/src/components/IconSVG.tsx`
- Icons Collection: `/src/collections/Icons.ts`
