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

## Button Icon Integration

The icon selector is also integrated into button configurations with position control:

### Usage in Link Field (Button Configuration)

The `iconSelectorWithPositionField` provides visual icon selection with integrated position toggle:

```typescript
import { iconSelectorWithPositionField } from '@/fields/IconSelectorWithPosition'

// In link field configuration
linkResult.fields.push(
  iconSelectorWithPositionField({
    admin: {
      description: 'Select an icon and configure its position relative to button text',
    },
  })
)
```

### Admin Panel Features

- **Visual Icon Grid**: Searchable grid of all available icons
- **Position Toggle**: Integrated buttons for leading/trailing position
- **Icon Preview**: See selected icon with current position setting
- **Live Search**: Real-time filtering by name, label, keywords, description

### Rendering Button Icons in Components

```typescript
import { IconSVG } from '@/components/IconSVG'

// Extract icon configuration from link object
const iconConfig = link.buttonIconConfig
const iconData = typeof iconConfig?.icon === 'object' ? iconConfig.icon : null
const iconPosition = iconConfig?.position || 'trailing'

// Render in Button component
<Button
  color="primary"
  iconLeading={iconPosition === 'leading' && iconData?.svgCode ?
    <IconSVG svgCode={iconData.svgCode} className="size-5" /> : undefined
  }
  iconTrailing={iconPosition === 'trailing' && iconData?.svgCode ?
    <IconSVG svgCode={iconData.svgCode} className="size-5" /> : undefined
  }
>
  Button Text
</Button>
```

### Data Structure

Button icon configuration is stored as a group field:

```typescript
{
  buttonIconConfig: {
    icon: number | Icon  // Relationship to Icons collection
    position: 'leading' | 'trailing'
  }
}
```

When queried with `depth: 1`, the icon is populated with full SVG data:

```typescript
{
  buttonIconConfig: {
    icon: {
      id: number
      name: string
      label: string
      svgCode: string  // Optimized SVG with currentColor
      category: string
      // ... other icon fields
    },
    position: 'trailing'
  }
}
```

### Icon Sizing for Buttons

Button icons use size classes that match the button size variant:

- **sm**: `size-4` (1rem / 16px)
- **md**: `size-5` (1.25rem / 20px)
- **lg**: `size-6` (1.5rem / 24px)
- **xl**: `size-7` (1.75rem / 28px)

The `UUIButton` component automatically applies the correct size class based on the button's `size` prop.

### Legacy Support

Existing buttons with text-based icon names are supported via fallback:

```typescript
// Legacy: Text-based icon name
{
  buttonIcon: "ArrowRight",
  iconPos: "trailing"
}

// New: Visual icon selector
{
  buttonIconConfig: {
    icon: { id: 123, svgCode: "...", ... },
    position: "trailing"
  }
}
```

The `UUIButton` component checks `buttonIconConfig` first, then falls back to `buttonIcon` if present.

## Implementation Blocks

Currently integrated in:
- **Card & Feature Icons**: CardGridBlock, FeaturesBlock
- **Button Icons**: All blocks using link fields (ButtonBlock, CallToAction, HeroHeadingBlock, etc.)

## Related Files

- **Icon Selector**: `/src/fields/IconSelector/Field.tsx`, `/src/fields/IconSelector/Component.tsx`
- **Button Icon Selector**: `/src/fields/IconSelectorWithPosition/Field.tsx`, `/src/fields/IconSelectorWithPosition/index.ts`
- **SVG Renderer**: `/src/components/IconSVG.tsx`
- **Button Component**: `/src/components/payload-ui/UUIButton.tsx`
- **Link Field**: `/src/fields/link.ts`
- **Icons Collection**: `/src/collections/Icons.ts`
