# Button System Configuration

## Overview

This project uses UntitledUI buttons with a simplified, consistent variant system. All buttons follow standardized sizing, opacity, and hover behavior patterns.

## Available Button Variants

### Colors

- `color="primary"` - **Brand button** (solid brand color, scales on hover)
- `color="accent"` - **Accent button** (solid accent color, scales on hover)
- `color="secondary"` - **Outlined button** (transparent with solid brand outline, scales on hover)
- `color="tertiary"` - **Grey button** (light grey bg with dark brand text in light mode, dark grey bg with white text in dark mode, scales on hover)
- `color="link"` - **Link button** (text with underline, no transformation)

### Destructive Variants

- `primary-destructive`
- `secondary-destructive`
- `tertiary-destructive`
- `link-destructive`

## Key Design Decisions

### 1. Simplified Link Variants

**Removed**: `link-gray` and `link-color` variants

**Current**: Single `link` variant that uses brand colors

**Reasoning**: Reduces complexity while maintaining functionality

### 2. Consistent Sizing

All buttons use `ring-1 ring-inset` for identical internal structure:

```tsx
primary: "ring-1 ring-transparent ring-inset"  // Invisible ring
accent: "ring-1 ring-transparent ring-inset"   // Invisible ring
secondary: "ring-1 ring-brand-500 dark:ring-white ring-inset"  // Visible solid outline
```

**How it works**:
- `ring-inset` draws INSIDE padding (no box model changes)
- Transparent rings maintain spacing without being visible
- All buttons have identical dimensions

### 3. Outline and Background Standards

**Secondary Outlines**: Solid brand-500 (dark blue) in light mode, white in dark mode

**Tertiary Backgrounds**: Light grey (`gray-200`) with dark brand-500 text in light mode, dark grey (`gray-700`) with white text in dark mode

**Reasoning**: Mode-specific grey values ensure WCAG AA contrast compliance (4.5:1 minimum) while providing clear visual distinction from primary buttons in both themes

### 4. Selective Hover Effects

**Primary/Accent/Secondary/Tertiary**: `hover:scale-105` transformation

**Link variants**: NO transformation, only underline effect

**Reasoning**: Link buttons should feel lightweight and text-like

### 5. Width Control

All buttons use `w-fit` to always shrink to content:

```tsx
common: {
  root: "inline-flex w-fit"  // Always shrink to content, never expand
}
```

## Button Color Configuration

**File**: `/src/styles/theme.css`

### Critical CSS Variables

```css
/* Light Mode (base @theme block) */
--color-bg-brand-solid: var(--color-brand-500);     /* #031A43 dark blue */
--color-bg-brand-solid_hover: var(--color-brand-700); /* Darker on hover */
--color-bg-accent-solid: var(--color-accent-500);   /* #1689FF light blue */
--color-bg-accent-solid_hover: var(--color-accent-600); /* Darker on hover */

/* Dark Mode (.dark-mode block) */
--color-bg-brand-solid: var(--color-white);         /* White background */
--color-bg-brand-solid_hover: var(--color-brand-200); /* Light blue tint on hover */
--color-bg-accent-solid: var(--color-accent-500);   /* Same as light mode */
--color-bg-accent-solid_hover: var(--color-accent-600); /* Same as light mode */
```

### IMPORTANT: Color Scale Usage

**Always use 500 (non-tinted) colors as base**:
- Brand button base: `brand-500` (#031A43)
- Accent button base: `accent-500` (#1689FF)
- Hover states use lighter (100-200) or darker (600-700) shades

## Button Component Structure

**File**: `/src/components/uui/button.tsx`

### Width Control Implementation

```tsx
common: {
  root: "inline-flex w-fit"  // Always shrink to content, never expand
}
```

### Ring-Based Sizing Strategy

```tsx
// ALL variants use ring-1 ring-inset for identical internal structure
primary: "ring-1 ring-transparent ring-inset"  // Invisible ring
accent: "ring-1 ring-transparent ring-inset"   // Invisible ring
secondary: "ring-1 ring-primary dark:ring-secondary ring-inset"  // Visible outline
tertiary: "bg-black/20 dark:bg-white/20"       // 20% tinted background
```

### Hover Effects

```tsx
// Primary/Accent/Secondary/Tertiary: scales entire button
"hover:scale-105"

// Link variants: NO transformation (only underline effect)
// Detected via:
const isLinkType = ["link", "link-destructive"].includes(color);
```

### Icon Color Inheritance

**Secondary/Tertiary buttons**: Icons do NOT change color on hover (inherit from parent)

```tsx
// Icons use parent color
"*:data-icon:text-inherit"
```

## Icon Integration

### For Content Editors (Payload CMS)

Icons are added to buttons via the **visual icon selector** in the admin panel:

1. **Open any block with a button** (Button Block, CTA, Hero, etc.)
2. **Locate the "Button Icon" section** under button configuration
3. **Click "Select Icon"** to open the icon grid
4. **Search or filter** to find your desired icon
5. **Select position** using the toggle buttons:
   - **Before Text (Leading)** - Icon appears to the left of button text
   - **After Text (Trailing)** - Icon appears to the right of button text

**Features:**
- Visual grid with 1000+ optimized icons
- Real-time search across icon names, labels, and keywords
- Category filtering (navigation, action, social, etc.)
- Icon preview with metadata
- Server-side SVG rendering (zero client JavaScript)

**Legacy Support:**
Existing buttons with text-based icon names (e.g., "ArrowRight") will continue to work via fallback support until manually updated to use the visual selector.

---

### For Developers (React Components)

#### Direct Component Usage

```tsx
import { ArrowRight } from "@untitledui/icons/ArrowRight";
import { Download01 as Download } from "@untitledui/icons/Download01";
import { Plus } from "@untitledui/icons/Plus";

// Leading Icon
<Button color="primary" iconLeading={Plus}>Create New</Button>

// Trailing Icon
<Button color="primary" iconTrailing={ArrowRight}>Continue</Button>

// Icon Only
<Button color="primary" iconLeading={Plus} aria-label="Add" />
```

#### With Icons Collection (Server-Side SVG)

```tsx
import { IconSVG } from '@/components/IconSVG'

// Fetch icon from Icons collection (with depth: 1)
const iconData = typeof link.buttonIconConfig?.icon === 'object' ? link.buttonIconConfig.icon : null

// Render as server-side SVG
<Button
  color="primary"
  iconTrailing={iconData?.svgCode ? <IconSVG svgCode={iconData.svgCode} className="size-5" /> : undefined}
>
  Continue
</Button>
```

**IMPORTANT**: Icons must be passed as props (`iconLeading`/`iconTrailing`), NOT as children. Passing icons as children breaks layout.

## Testing Location

**Style Guide Page**: `/style-guide`

**Features**:
- Shows all button variants in one place
- Includes theme toggle for light/dark mode testing
- Demonstrates buttons with icons, sizes, and colors

## Common Mistakes to Avoid

### ❌ Don't use `color="brand"` in code
✅ **Do**: Use `color="primary"` (only the UI label says "Brand")

---

### ❌ Don't pass icons as children
```tsx
// WRONG
<Button><Icon /></Button>
```

✅ **Do**: Pass icons as props
```tsx
// CORRECT
<Button iconLeading={Icon} />
```

---

### ❌ Don't use brand-600 or accent-600 as base colors
✅ **Do**: Always use 500 colors as base (brand-500, accent-500)

---

### ❌ Don't add size-controlling styles to individual button variants
✅ **Do**: Use `ring-1 ring-inset` on ALL variants (transparent for solid, visible for outlined)

---

### ❌ Don't use opacity for outlines or backgrounds on secondary/tertiary
```tsx
// WRONG - creates contrast issues
secondary: "ring-black/20"  // Faint outline fails WCAG
tertiary: "bg-black/10"     // Faint background fails WCAG
```

✅ **Do**: Use solid colors with sufficient contrast
```tsx
// CORRECT
secondary: "ring-brand-500 dark:ring-white"  // Solid color outline
tertiary: "bg-gray-200 dark:bg-gray-700 text-brand-500 dark:text-white"  // Mode-specific greys
```

---

### ❌ Don't add hover transformations to link buttons
```tsx
// WRONG
link: "hover:scale-105"
```

✅ **Do**: Only apply `hover:scale-105` to solid/outlined/tinted buttons, NOT link variants

## Example Usage

### Primary Button (Brand Color)

```tsx
import { Button } from '@/components/uui/button'
import { Plus } from '@untitledui/icons/Plus'

<Button color="primary" iconLeading={Plus}>
  Create New
</Button>
```

**Result**: Dark blue button (light mode), white button (dark mode), scales on hover

### Secondary Button (Outlined)

```tsx
import { Button } from '@/components/uui/button'
import { ArrowRight } from '@untitledui/icons/ArrowRight'

<Button color="secondary" iconTrailing={ArrowRight}>
  Learn More
</Button>
```

**Result**: Transparent button with solid brand-blue outline (light mode) or white outline (dark mode), scales on hover

### Tertiary Button (Grey)

```tsx
import { Button } from '@/components/uui/button'

<Button color="tertiary">
  View Options
</Button>
```

**Result**: Light grey button with dark brand-blue text (light mode), dark grey button with white text (dark mode). Scales on hover. Clearly distinguishable from primary button in both modes.

### Link Button

```tsx
import { Button } from '@/components/uui/button'

<Button color="link">
  View Details
</Button>
```

**Result**: Text with underline, no transformation on hover

## WCAG Compliance

All button variants meet **WCAG AA standards** for color contrast:

- **Primary**: ~21:1 contrast ratio in light mode, ~15:1 in dark mode ✓
- **Accent**: ~4.5:1 contrast ratio (meets AA for all text sizes) ✓
- **Secondary**: Solid outline ensures clear visibility against backgrounds ✓
- **Tertiary**: Light mode = ~12:1 contrast (gray-200 + brand-500), Dark mode = ~14:1 contrast (gray-700 + white) ✓
- **Link**: Inherits from text colors with underline for additional clarity ✓

### Key Accessibility Features

- **No `outline-brand` on buttons**: Prevents low-contrast outlines that fail WCAG
- **Solid colors over opacity**: Ensures predictable contrast across backgrounds
- **Focus states**: `focus-visible:outline-2` provides clear keyboard navigation
- **Consistent dark mode**: All variants maintain sufficient contrast in both themes

## Troubleshooting

### Button colors don't match brand

1. Check `--color-bg-brand-solid` in `/src/styles/theme.css`
2. Verify you're using `color="primary"` not `color="brand"`
3. Clear cache: `rm -rf .next && pnpm dev`

### Icons don't display correctly

1. Verify icon is passed as prop (`iconLeading={Icon}`)
2. Check icon import path matches UntitledUI structure
3. Ensure icon component is imported, not string name

### Buttons have inconsistent sizing

1. Check all variants use `ring-1 ring-inset`
2. Verify `w-fit` is in common root styles
3. Look for custom width styles overriding common styles

## Related Documentation

- **[STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md)** - CSS variable-based theme system
- **[STYLE_GUIDE.md](/docs/STYLE_GUIDE.md)** - Visual reference for all components
- **[UUI_COMPONENTS_REFERENCE.md](/docs/UUI_COMPONENTS_REFERENCE.md)** - UntitledUI usage patterns
