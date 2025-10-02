# Style Guide Reference

**Complete visual reference for Tailwind v4 + UntitledUI design system**

This guide documents all typography, colors, spacing, and component patterns used throughout the TDS website. Understanding this layered architecture is essential for maintaining consistency and making updates safely.

---

## 🏗️ System Architecture

The styling system is built in **four distinct layers**, each serving a specific purpose:

```
┌─────────────────────────────────────────────────┐
│  Layer 4: Rich Text Typography (richtext.css)  │
│  Blog post styling with light/dark modes        │
├─────────────────────────────────────────────────┤
│  Layer 3: UUI Components (/components/uui/)    │
│  Pre-built React components with accessibility  │
├─────────────────────────────────────────────────┤
│  Layer 2: UUI Theme (theme.css)                │
│  Design system colors, typography, spacing      │
├─────────────────────────────────────────────────┤
│  Layer 1: Tailwind v4 (frontend.css)           │
│  Core utilities, responsive system, variables   │
└─────────────────────────────────────────────────┘
```

### Layer Details:

**1. Tailwind v4 Base** (`frontend.css`)
- Core utility classes
- CSS variable foundations
- Responsive breakpoints
- Container system
- ⚠️ **DO NOT MODIFY** - Maintained by Tailwind

**2. UUI Theme System** (`theme.css`)
- Complete color scale (brand, gray, success, error, etc.)
- Typography scale (text-xs to display-2xl)
- Spacing system (4px base unit)
- Component-specific colors
- Light/dark mode definitions
- ⚠️ **ONLY EDIT BRAND COLORS** (lines 124-139)

**3. UUI Components** (`/components/uui/`)
- Buttons, badges, inputs, selects
- Built on react-aria-components
- Automatic accessibility features
- Uses theme.css variables
- ✅ **USE THESE COMPONENTS** for UI elements

**4. Rich Text Typography** (`richtext.css`)
- Blog post styling
- Code blocks, quotes, tables
- Light/dark mode overrides
- ✅ **SAFE TO EDIT** for typography changes

---

## 📐 Typography Scale

All text sizes are defined using a consistent scale based on 4px spacing units.

### Display Sizes (Headings)

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-display-2xl` | 72px (18 × 4px) | 90px | Hero titles, landing pages |
| `text-display-xl` | 60px (15 × 4px) | 72px | Major section headers |
| `text-display-lg` | 48px (12 × 4px) | 60px | Page titles, H1 |
| `text-display-md` | 36px (9 × 4px) | 44px | Section headers, H2 |
| `text-display-sm` | 30px (7.5 × 4px) | 38px | Subsection headers, H3 |
| `text-display-xs` | 24px (6 × 4px) | 32px | Small headers, H4 |

### Text Sizes (Body Content)

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xl` | 20px (5 × 4px) | 30px | Lead paragraphs, intro text |
| `text-lg` | 18px (4.5 × 4px) | 28px | Emphasized body text |
| `text-md` | **16px (4 × 4px)** | **24px** | **Default body text** |
| `text-sm` | 14px (3.5 × 4px) | 20px | Secondary text, captions |
| `text-xs` | 12px (3 × 4px) | 18px | Small labels, metadata |

**Examples:**
```tsx
<h1 className="text-display-lg font-semibold text-primary">Page Title</h1>
<p className="text-xl text-secondary">Lead paragraph with larger text</p>
<p className="text-md text-secondary">Regular body paragraph</p>
<span className="text-sm text-tertiary">Secondary information</span>
```

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Default body text |
| `font-medium` | 500 | Emphasized text, navigation links |
| `font-semibold` | 600 | Headings, buttons, labels |
| `font-bold` | 700 | Strong emphasis (rare) |

**Best Practice:** Use `font-semibold` for all headings and buttons to maintain consistency with UUI design system.

---

## 🎨 Color System

Colors are organized into **semantic tokens** that automatically adapt between light and dark modes.

### Brand Colors (#1689FF Blue)

```
brand-25  ████  rgb(247, 251, 255)  // Lightest tint
brand-50  ████  rgb(239, 246, 255)
brand-100 ████  rgb(219, 234, 254)
brand-200 ████  rgb(191, 219, 254)
brand-300 ████  rgb(147, 197, 253)
brand-400 ████  rgb(96, 165, 250)
brand-500 ████  rgb(22, 137, 255)   // Main brand color
brand-600 ████  rgb(20, 123, 230)   // Hover states
brand-700 ████  rgb(18, 110, 204)
brand-800 ████  rgb(16, 96, 179)
brand-900 ████  rgb(14, 83, 153)
brand-950 ████  rgb(11, 66, 122)    // Darkest shade
```

**Variable:** `--color-brand-500` through `--color-brand-950`

### Text Colors (Semantic)

| Class | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `text-primary` | Gray 900 | Gray 50 | Main headings, body text |
| `text-secondary` | Gray 700 | Gray 300 | Secondary content, paragraphs |
| `text-tertiary` | Gray 600 | Gray 400 | Metadata, captions, hints |
| `text-quaternary` | Gray 500 | Gray 400 | Disabled state labels |
| `text-brand-secondary` | Brand 700 | Gray 300 | Brand-colored text |
| `text-brand-tertiary` | Brand 600 | Gray 400 | Secondary brand text |

**Examples:**
```tsx
<h1 className="text-primary">Primary heading</h1>
<p className="text-secondary">Body paragraph text</p>
<span className="text-tertiary">Metadata or caption</span>
<a className="text-brand-secondary hover:text-brand-secondary-hover">Brand link</a>
```

### Background Colors (Semantic)

| Class | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `bg-primary` | White | Gray 950 | Main page background |
| `bg-secondary` | Gray 50 | Gray 900 | Card backgrounds |
| `bg-tertiary` | Gray 100 | Gray 800 | Subtle backgrounds |
| `bg-quaternary` | Gray 200 | Gray 700 | Borders, dividers |
| `bg-brand-primary` | Brand 50 | Brand 500 | Brand backgrounds |
| `bg-brand-solid` | Brand 600 | Brand 600 | Solid brand (buttons) |

**Examples:**
```tsx
<div className="bg-primary">Main content area</div>
<div className="bg-secondary rounded-lg p-6">Card component</div>
<div className="bg-brand-primary p-4">Brand highlight section</div>
```

### Border Colors (Semantic)

| Class | Usage |
|-------|-------|
| `border-primary` | Default borders (gray-300 / gray-700) |
| `border-secondary` | Subtle borders (gray-200 / gray-800) |
| `border-tertiary` | Very subtle borders (gray-100 / gray-800) |
| `border-brand` | Brand-colored borders (brand-500 / brand-400) |

**Examples:**
```tsx
<div className="border border-secondary rounded-lg">Default card</div>
<button className="border-2 border-brand">Brand outline button</button>
```

### Utility Colors

Available for error, warning, and success states:

| Color Scale | Classes |
|-------------|---------|
| **Error** | `text-error-primary`, `bg-error-primary`, `border-error` |
| **Warning** | `text-warning-primary`, `bg-warning-primary`, `border-warning` |
| **Success** | `text-success-primary`, `bg-success-primary`, `border-success` |

---

## 📏 Spacing Scale

All spacing uses **4px base unit multipliers** for perfect alignment.

| Class | Value | Usage Examples |
|-------|-------|----------------|
| `1` | 4px | `p-1`, `m-1`, `gap-1` - Tiny spacing |
| `2` | 8px | `p-2`, `m-2`, `gap-2` - Extra small |
| `3` | 12px | `p-3`, `m-3`, `gap-3` - Small |
| `4` | 16px | `p-4`, `m-4`, `gap-4` - Base unit |
| `6` | 24px | `p-6`, `m-6`, `gap-6` - Medium |
| `8` | 32px | `p-8`, `m-8`, `gap-8` - Large |
| `12` | 48px | `p-12`, `m-12`, `gap-12` - Extra large |
| `16` | 64px | `p-16`, `m-16`, `gap-16` - Section spacing |
| `24` | 96px | `p-24`, `m-24`, `gap-24` - Major sections |
| `32` | 128px | `p-32`, `m-32`, `gap-32` - Hero spacing |

**Common Patterns:**
```tsx
// Card with standard padding
<div className="p-6 md:p-8">Card content</div>

// Section with vertical spacing
<section className="py-16 md:py-24">Section content</section>

// Flex layout with gap
<div className="flex gap-4">Flex items</div>

// Stack with vertical spacing
<div className="space-y-6">Stacked elements</div>
```

---

## 🔘 Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | Sharp edges |
| `rounded-sm` | 4px | Small rounded |
| `rounded` | 4px | Default rounded |
| `rounded-md` | 6px | Medium rounded |
| `rounded-lg` | **8px** | **Standard UI elements** |
| `rounded-xl` | 12px | Large rounded |
| `rounded-2xl` | 16px | Extra large rounded |
| `rounded-full` | 9999px | Circles, pills |

**UUI Standard:** Most components use `rounded-lg` (8px).

```tsx
<button className="rounded-lg">Standard button</button>
<div className="rounded-xl">Card with large radius</div>
<img className="rounded-full" />  {/* Avatar */}
```

---

## ☁️ Shadow System

| Class | Usage |
|-------|-------|
| `shadow-xs` | Subtle elevation (dropdowns, tooltips) |
| `shadow-sm` | Small cards, form inputs |
| `shadow-md` | **Standard cards, panels** |
| `shadow-lg` | Modals, popovers |
| `shadow-xl` | Elevated modals |
| `shadow-2xl` | Hero images, major content |

**UUI Standard:** Use `shadow-md` for most card components.

```tsx
<div className="bg-primary shadow-md rounded-lg p-6">Standard card</div>
<div className="shadow-lg rounded-xl">Modal dialog</div>
```

---

## 🔲 Layout & Grid

### Container System

```tsx
<div className="container max-w-container mx-auto px-8">
  {/* Content constrained to 1280px with 32px (px-8) padding */}
</div>
```

**Breakpoints:**
- Max width: `1280px` (`max-w-container`)
- Horizontal padding: `32px` (`px-8`)
- Auto-centering: `mx-auto`

### Responsive Breakpoints

| Breakpoint | Size | Usage |
|------------|------|-------|
| `sm:` | 640px (40rem) | Mobile landscape |
| `md:` | 768px (48rem) | Tablets |
| `lg:` | 1024px (64rem) | Small desktops |
| `xl:` | 1280px (80rem) | Large desktops |
| `2xl:` | 1376px (86rem) | Extra large screens |

**Mobile-First Examples:**
```tsx
{/* Base (mobile) → md (tablet) → lg (desktop) */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Grid that adapts at breakpoints
</div>

<h1 className="text-display-md md:text-display-lg">
  Larger heading on desktop
</h1>

<div className="px-4 md:px-8 lg:px-16">
  Responsive padding
</div>
```

---

## 🎯 Component Patterns

### Buttons (UUI Components)

**Import:**
```tsx
import { Button } from '@/components/uui/button';
```

**Sizes:**
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

**Colors:**
```tsx
<Button color="primary">Primary Action</Button>
<Button color="secondary">Secondary Action</Button>
<Button color="tertiary">Tertiary Action</Button>
<Button color="link-gray">Text Link</Button>
<Button color="link-color">Brand Link</Button>
<Button color="destructive-primary">Delete</Button>
```

**With Icons:**
```tsx
import { ArrowRight, Download } from '@untitledui/icons';

<Button iconLeading={Download}>Download</Button>
<Button iconTrailing={ArrowRight}>Next</Button>
```

### Badges

**Import:**
```tsx
import { Badge } from '@/components/uui/base/badges/badges';
import { BadgeGroup } from '@/components/uui/base/badges/badge-groups';
```

**Simple Badges:**
```tsx
<Badge color="brand" size="md">New</Badge>
<Badge color="success" size="sm">Published</Badge>
<Badge color="error" size="md">Deprecated</Badge>
<Badge color="warning" size="lg">Beta</Badge>
```

**Badge Groups (with prefix):**
```tsx
<BadgeGroup color="brand" size="md" addonText="Category">
  Technology
</BadgeGroup>
<BadgeGroup color="gray" size="md" addonText="Status">
  Published
</BadgeGroup>
```

### Typography Component Patterns

**Page Headers:**
```tsx
<div className="container max-w-container mx-auto px-8 py-12">
  <h1 className="text-display-lg font-semibold text-primary">Page Title</h1>
  <p className="mt-3 text-lg text-tertiary max-w-[48rem]">
    Page description or subtitle
  </p>
</div>
```

**Section Headers:**
```tsx
<section className="py-16">
  <h2 className="text-display-md font-semibold text-primary mb-8">
    Section Title
  </h2>
  <div className="space-y-6">
    {/* Section content */}
  </div>
</section>
```

**Card Components:**
```tsx
<div className="bg-secondary border border-secondary rounded-lg p-6 shadow-md">
  <h3 className="text-xl font-semibold text-primary mb-2">Card Title</h3>
  <p className="text-md text-secondary">Card content paragraph</p>
</div>
```

---

## ✅ Best Practices

### DO:
- ✅ Use semantic color tokens (`text-primary`, `bg-secondary`)
- ✅ Use UUI components for buttons, badges, inputs
- ✅ Follow the typography scale consistently
- ✅ Use spacing multipliers (4, 6, 8, 12, 16, 24)
- ✅ Test in both light and dark modes
- ✅ Use `rounded-lg` for standard UI elements
- ✅ Import from `/components/uui/` for UI components

### DON'T:
- ❌ Use hardcoded colors (`bg-[#1689FF]`)
- ❌ Use arbitrary spacing values (`p-[13px]`)
- ❌ Modify `theme.css` outside brand color section
- ❌ Override UUI component internal styles
- ❌ Skip testing in dark mode
- ❌ Use `rounded-md` inconsistently with UUI
- ❌ Create custom buttons when UUI has variants

---

## 🔄 Light/Dark Mode

The system uses **class-based theming** with `.dark-mode` class:

```css
/* Light mode - default */
.text-primary {
  color: var(--color-text-primary); /* Gray 900 */
}

/* Dark mode - automatic */
.dark-mode .text-primary {
  color: var(--color-text-primary); /* Gray 50 (inverted) */
}
```

**How it works:**
1. All color tokens automatically adapt
2. No need to write dark: prefixes
3. `.dark-mode` class applied to `<html>` or `<body>`
4. Theme variables switch in `theme.css`

**Testing Dark Mode:**
```tsx
// Toggle dark mode in browser console:
document.documentElement.classList.toggle('dark-mode');
```

---

## 📖 Common Use Cases

### Blog Post Header
```tsx
<div className="bg-primary">
  <div className="container max-w-container mx-auto px-8 py-16">
    <div className="flex gap-2 mb-4">
      <BadgeGroup color="brand" size="md" addonText="Blog">
        Technology
      </BadgeGroup>
    </div>
    <h1 className="text-display-lg font-semibold text-primary mb-4">
      Post Title Goes Here
    </h1>
    <p className="text-xl text-tertiary max-w-[48rem]">
      Lead paragraph with larger text for emphasis
    </p>
  </div>
</div>
```

### Feature Card
```tsx
<div className="bg-secondary border border-secondary rounded-lg p-8 shadow-md">
  <div className="size-12 bg-brand-primary rounded-lg flex items-center justify-center mb-4">
    <Icon className="size-6 text-brand-600" />
  </div>
  <h3 className="text-xl font-semibold text-primary mb-2">
    Feature Title
  </h3>
  <p className="text-md text-secondary mb-6">
    Feature description paragraph with secondary text color.
  </p>
  <Button color="link-color" iconTrailing={ArrowRight}>
    Learn more
  </Button>
</div>
```

### Form Section
```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <label className="text-sm font-medium text-primary">
      Email Address
    </label>
    <Input
      type="email"
      placeholder="you@example.com"
      className="w-full"
    />
    <p className="text-sm text-tertiary">
      We'll never share your email
    </p>
  </div>
  <Button color="primary" size="lg" className="w-full">
    Submit
  </Button>
</div>
```

---

## 🛠️ Customization Guide

### Changing Brand Colors

**File:** `src/styles/theme.css` (lines 124-139)

```css
@theme {
  /* Update these RGB values for your brand */
  --color-brand-500: rgb(22 137 255);    /* Main brand color */
  --color-brand-600: rgb(20 123 230);    /* Hover state */

  /* Update button integration */
  --color-brand-solid: var(--color-brand-500);
  --color-brand-solid_hover: var(--color-brand-600);
}
```

**After changing:**
```bash
rm -rf .next && pnpm dev
```

### Adding Custom Typography Styles

**File:** `src/styles/richtext.css` (bottom section)

```css
/* Custom highlight boxes */
.prose .highlight {
  background-color: var(--color-bg-brand-primary);
  border-left: 4px solid var(--color-border-brand);
  padding: 1.5em;
  border-radius: 0.5rem;
}

.dark-mode .prose .highlight {
  background-color: var(--color-bg-secondary);
}
```

---

## 🐛 Troubleshooting

### Colors Not Changing
- Check if semantic tokens are used (not hardcoded values)
- Verify `.dark-mode` class is present
- Clear Next.js cache: `rm -rf .next`

### Components Look Wrong
- Ensure UUI component imports are correct
- Check if custom CSS is overriding component styles
- Verify theme.css is imported in globals.css

### Typography Inconsistent
- Use typography scale classes, not arbitrary values
- Check font weights match UUI standards (semibold for headings)
- Ensure line-height is from the scale

---

## 📚 Additional Resources

- **[Complete Styles System Guide](../src/styles/README.md)** - Deep dive into the styling architecture
- **[Rich Text Typography](../src/styles/richtext.css)** - Blog post styling reference
- **[UUI Components Reference](./UUI_COMPONENTS_REFERENCE.md)** - Complete component documentation
- **[Project Documentation](../CLAUDE.md)** - Full project setup and guidelines

---

**Last Updated:** 2025-10-01
**Tailwind Version:** 4.1.13
**UUI Theme:** Custom integration with #1689FF brand color
**Components:** react-aria-components based for accessibility
