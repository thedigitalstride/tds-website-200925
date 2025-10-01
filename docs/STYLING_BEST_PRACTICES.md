# Styling Best Practices - Site-Wide Consistency

**Complete guide to ensuring the Style Guide reflects actual site-wide styles and maintaining consistency across all pages and components.**

---

## 🏗️ Current Architecture (Already Configured)

Your site has a **centralized, cascading styling system** that ensures consistency:

```
Root Layout (layout.tsx)
    ↓ imports
globals.css
    ↓ imports
1. tailwindcss (base system)
2. theme.css (UUI theme with @theme block)
3. richtext.css (blog typography)
    ↓ applies to
ALL pages and components automatically
```

### ✅ What's Already Working:

1. **Single Import Point** - `globals.css` imported once in root layout
2. **Cascading Styles** - All styles cascade to child pages/components
3. **CSS Variables** - Theme variables available everywhere via `var(--color-*)`
4. **UUI Components** - Use the same theme automatically
5. **Tailwind Classes** - Work consistently across all files

---

## 🎯 How the System Ensures Consistency

### 1. **Central Theme Configuration**

**File:** `src/styles/theme.css`

Contains the **single source of truth** for:
- All color tokens (brand, gray, text, backgrounds, borders)
- Typography scale (display-2xl through text-xs)
- Spacing units (4px base system)
- Component-specific colors

**How it works:**
```tsx
// Any component, anywhere in the site
<h1 className="text-display-lg text-primary">
  This uses the SAME colors/sizes as the style guide
</h1>
```

The classes `text-display-lg` and `text-primary` are defined in `theme.css` and work identically everywhere.

### 2. **Automatic Propagation**

**File:** `src/app/(frontend)/layout.tsx` (Root Layout)

```tsx
import './globals.css'  // ← Imported ONCE at root
```

This means:
- ✅ Every page gets the same styles
- ✅ Every component gets the same styles
- ✅ No need to import CSS in individual files
- ✅ Style guide automatically matches the site

### 3. **CSS Variable System**

All styles use CSS variables, ensuring consistency:

```css
/* theme.css defines */
--color-text-primary: /* gray-900 in light, gray-50 in dark */

/* Used everywhere the same way */
.text-primary {
  color: var(--color-text-primary);
}
```

**Result:** Change one variable in `theme.css` → updates entire site + style guide.

---

## 📋 Best Practices for Maintaining Consistency

### ✅ DO: Use Semantic Tokens

```tsx
// GOOD - Uses theme variables
<div className="bg-primary text-secondary border-secondary">
  Content
</div>

// BAD - Hardcoded values bypass the theme
<div className="bg-white text-gray-700 border-gray-200">
  Content
</div>
```

**Why:** Semantic tokens (bg-primary, text-secondary) automatically adapt to light/dark mode and reflect theme changes.

### ✅ DO: Use UUI Components

```tsx
// GOOD - Uses themed component
import { Button } from "@/components/uui/base/buttons/button";
<Button color="primary">Click me</Button>

// BAD - Custom button that doesn't match theme
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

**Why:** UUI components use the same theme.css variables as everything else.

### ✅ DO: Follow Typography Scale

```tsx
// GOOD - Uses defined scale
<h1 className="text-display-lg font-semibold">Heading</h1>
<p className="text-md">Body text</p>

// BAD - Arbitrary sizes
<h1 className="text-[48px] font-bold">Heading</h1>
<p className="text-[17px]">Body text</p>
```

**Why:** Typography scale is defined in theme.css and used in the style guide.

### ✅ DO: Use Spacing Scale

```tsx
// GOOD - 4px multiples from theme
<div className="p-6 gap-4 space-y-8">

// BAD - Arbitrary spacing
<div className="p-[23px] gap-[15px] space-y-[35px]">
```

**Why:** Spacing scale (4, 6, 8, 12, 16, 24...) is consistent across the design system.

---

## 🔧 How to Customize While Maintaining Consistency

### Step 1: Update the Theme (Single Source of Truth)

**File to edit:** `src/styles/theme.css`

```css
@theme {
  /* To change brand color site-wide */
  --color-brand-500: rgb(22 137 255);  /* Change this RGB value */
  --color-brand-600: rgb(20 123 230);  /* And hover state */

  /* These update automatically everywhere */
  --color-brand-solid: var(--color-brand-500);
  --color-brand-solid_hover: var(--color-brand-600);
}
```

**Result:**
- ✅ Style guide updates automatically
- ✅ All buttons update automatically
- ✅ All brand-colored text updates automatically
- ✅ All components using brand colors update automatically

### Step 2: Test Changes

```bash
# Clear cache and restart
rm -rf .next && pnpm dev
```

**Check these locations:**
1. `/style-guide` - Verify changes appear
2. Any page with buttons/badges - Should match style guide
3. Any page with brand colors - Should match style guide

### Step 3: Document Changes

Update the style guide if you add new tokens:

**File:** `docs/STYLE_GUIDE.md`

Add new color/typography/spacing to the documentation.

---

## 🎨 Adding New Components

### Pattern 1: Create with Theme Variables

```tsx
// my-new-component.tsx
export function MyNewComponent() {
  return (
    <div className="bg-secondary p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-primary mb-2">
        Title
      </h2>
      <p className="text-md text-secondary">
        Description text
      </p>
      <Button color="primary" size="md">
        Action
      </Button>
    </div>
  );
}
```

**Why it works:**
- Uses `bg-secondary` → matches theme
- Uses `text-primary`, `text-secondary` → matches theme
- Uses `text-xl`, `text-md` → matches typography scale
- Uses `p-6` → matches spacing scale
- Uses UUI Button → matches component system

### Pattern 2: Extend Existing Components

```tsx
// custom-button.tsx
import { Button } from "@/components/uui/base/buttons/button";

export function CustomButton({ children, ...props }) {
  // Extends UUI button with custom wrapper
  return (
    <div className="relative">
      <Button {...props}>{children}</Button>
      {/* Add custom decoration */}
    </div>
  );
}
```

**Why it works:**
- Built on top of UUI component
- Inherits all theme styling
- Automatically matches style guide

---

## 📊 Verification Checklist

Use this checklist to ensure consistency:

### Before Shipping New Components:

- [ ] Uses semantic color tokens (text-primary, bg-secondary, etc.)
- [ ] Uses typography scale (text-display-*, text-xl, text-md, etc.)
- [ ] Uses spacing scale (p-4, gap-6, space-y-8, etc.)
- [ ] Uses UUI components where applicable
- [ ] Tested in both light and dark modes
- [ ] Matches style guide visual appearance

### For Theme Changes:

- [ ] Updated only `theme.css` (not inline styles)
- [ ] Cleared `.next` cache after changes
- [ ] Verified style guide reflects changes
- [ ] Checked sample pages reflect changes
- [ ] Updated style guide documentation if needed

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Importing CSS in Components

```tsx
// BAD - Don't do this
import './my-component.css'

export function MyComponent() {
  return <div className="custom-style">Content</div>
}
```

**Problem:** Creates separate style source that doesn't use theme.

**Solution:** Use Tailwind classes with theme variables.

### ❌ Mistake 2: Hardcoded Colors

```tsx
// BAD
<div style={{ color: '#1689FF' }}>Text</div>

// GOOD
<div className="text-brand-secondary">Text</div>
```

**Problem:** Bypasses theme system, won't match style guide.

**Solution:** Use semantic tokens defined in theme.css.

### ❌ Mistake 3: Arbitrary Values

```tsx
// BAD
<div className="text-[19px] p-[13px] gap-[27px]">

// GOOD
<div className="text-lg p-4 gap-6">
```

**Problem:** Breaks consistency with design system.

**Solution:** Use defined scales from theme.css.

### ❌ Mistake 4: Duplicate Style Definitions

```tsx
// BAD - Defining styles outside theme
const customBlue = '#1689FF';
<div style={{ backgroundColor: customBlue }}>

// GOOD - Using theme
<div className="bg-brand-primary">
```

**Problem:** Creates disconnected style source.

**Solution:** Add to theme.css if truly needed, or use existing token.

---

## 🔍 How to Debug Style Inconsistencies

### Step 1: Check Browser DevTools

```bash
# Open browser DevTools → Elements → Computed Styles
# Look for where the style is coming from
```

**If it shows:**
- `var(--color-text-primary)` → ✅ Good, using theme
- `rgb(107, 114, 128)` → ❌ Hardcoded, needs fixing

### Step 2: Search for Hardcoded Values

```bash
# Find hardcoded colors
grep -r "#[0-9a-fA-F]\{6\}" src/ --include="*.tsx" --include="*.ts"

# Find arbitrary values
grep -r "text-\[" src/ --include="*.tsx"
grep -r "bg-\[" src/ --include="*.tsx"
```

### Step 3: Compare to Style Guide

1. Open `/style-guide`
2. Find the element that doesn't match
3. Check what classes the style guide uses
4. Apply same classes to your component

---

## 📖 File Reference

### Core Styling Files (Do Not Duplicate)

| File | Purpose | Edit? |
|------|---------|-------|
| `src/styles/theme.css` | **Single source of truth** for all design tokens | ✅ Brand colors only (lines 124-139) |
| `src/styles/richtext.css` | Blog post typography | ✅ For blog styling changes |
| `src/styles/frontend.css` | Tailwind v4 base config | ❌ Never edit |
| `src/app/(frontend)/globals.css` | Import aggregator + custom utilities | ⚠️ Rarely (utilities only) |

### Component Files

| File | Purpose | Edit? |
|------|---------|-------|
| `/components/uui/**` | Pre-built UUI components | ❌ Use as-is |
| `/blocks/**` | Content blocks | ✅ Follow patterns |
| `/components/**` | Custom components | ✅ Use theme variables |

---

## 🎯 Quick Reference: Class Mappings

**These classes work identically everywhere:**

### Colors
```tsx
text-primary      → Main content text
text-secondary    → Body text
text-tertiary     → Captions, metadata
text-brand-secondary → Brand links

bg-primary        → Page background
bg-secondary      → Card backgrounds
bg-brand-primary  → Brand backgrounds

border-primary    → Default borders
border-secondary  → Subtle borders
border-brand      → Brand accents
```

### Typography
```tsx
text-display-2xl  → 72px hero titles
text-display-xl   → 60px major headers
text-display-lg   → 48px page titles (H1)
text-display-md   → 36px section headers (H2)
text-xl           → 20px lead paragraphs
text-md           → 16px DEFAULT body text
text-sm           → 14px captions
```

### Spacing
```tsx
p-4  → 16px padding
p-6  → 24px padding (standard card)
p-8  → 32px padding (large card)

gap-4  → 16px flex/grid gap
gap-6  → 24px gap (standard)

space-y-6  → 24px vertical spacing
py-16      → 64px vertical section padding
py-24      → 96px vertical section padding (standard)
```

---

## 🚀 Quick Start for New Developers

### 1. **Never Import CSS in Components**
Styles are global via root layout. No need to import.

### 2. **Use the Style Guide as Reference**
Visit `/style-guide` to see all available tokens and components.

### 3. **Copy Patterns from Existing Code**
Look at `/blocks/` or `/components/` for examples.

### 4. **Use Semantic Tokens**
`text-primary` not `text-gray-900`

### 5. **Test in Style Guide**
After adding new patterns, add them to `/style-guide` page to document.

---

## 📚 Related Documentation

- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Complete visual reference
- **[STYLE_GUIDE_QUICK_REFERENCE.md](./STYLE_GUIDE_QUICK_REFERENCE.md)** - Quick lookup
- **[/src/styles/README.md](../src/styles/README.md)** - Technical architecture
- **[CLAUDE.md](../CLAUDE.md)** - Project documentation

---

## ✅ Success Indicators

Your styling system is working correctly when:

1. ✅ Style guide matches actual site appearance
2. ✅ All pages use the same color palette
3. ✅ Typography is consistent across pages
4. ✅ Spacing follows the 4px scale
5. ✅ Light/dark mode works everywhere
6. ✅ New components match existing patterns automatically

---

**Last Updated:** 2025-10-01
**Architecture:** Centralized CSS with cascading imports
**Theme System:** Tailwind v4 + UntitledUI CSS variables
