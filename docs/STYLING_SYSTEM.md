# Styling System Overview

## Architecture: Tailwind v4 + UntitledUI

This project uses **Tailwind CSS v4** with **UntitledUI components** and a **CSS variable-based theme system**. Understanding this three-layer architecture is critical before making any style changes.

## 🚨 CRITICAL: Read Before Making Style Changes

**⛔ You MUST fully understand this system before making ANY styling changes. Guessing or making assumptions causes significant issues.**

## Three-Layer System

### 1. CSS Variables in `theme.css` (Foundation Layer)

All colors, typography, and spacing are defined as CSS variables in the `@theme` block.

**Location**: `/src/styles/theme.css`

**Key Feature**: Variables automatically change values in dark mode using the `.dark-mode` selector.

**Example**:
```css
/* Light mode (in @theme block) */
--color-bg-brand-solid: var(--color-brand-500);  /* #031A43 dark blue */

/* Dark mode (inside .dark-mode { ... } block) */
--color-bg-brand-solid: var(--color-white);      /* White */
```

When dark mode is active, the CSS variable changes value automatically. Components using these variables adapt without additional code.

### 2. Tailwind Classes (Mapping Layer)

Tailwind classes map directly to CSS variables.

**Example**:
- Class: `bg-brand-solid`
- Maps to: `var(--color-bg-brand-solid)`
- In light mode: Dark blue (#031A43)
- In dark mode: White

**IMPORTANT**: The CSS variable changes in dark mode, so the Tailwind class automatically adapts. You don't need dark mode overrides unless doing component-specific customization.

**❌ NEVER invent custom class names** like `text-primary-inverted` - they don't exist in the theme!

### 3. Dark Mode Overrides (Component Layer)

Use `dark:` prefix for component-specific overrides when the CSS variable approach doesn't cover your use case.

**Example**:
```tsx
<button className="bg-brand-solid text-white dark:text-brand-500">
  Button
</button>
```

- `bg-brand-solid` - Uses CSS variable (changes automatically)
- `text-white` - White in light mode
- `dark:text-brand-500` - Explicit override for dark mode

## File Structure

```
src/styles/
├── theme.css            # 🚨 CRITICAL: All CSS variables in @theme block
├── frontend.css         # Basic Tailwind v4 config (DO NOT MODIFY)
└── payloadStyles.css    # Payload admin styles

src/app/(frontend)/
└── globals.css          # Main CSS entry with imports and plugins
```

### Critical Rules

**❌ NEVER:**
- Modify `frontend.css` - contains essential Tailwind v4 base configuration
- Create custom CSS files in `/src/styles/` - use existing theme system
- Override UUI component styles directly - work through CSS variables
- Remove or modify imports in `globals.css`
- Change the `@theme` block structure in `theme.css`
- Add CSS variables outside `@theme` block or `.dark-mode` selector

**✅ ALWAYS:**
- Modify colors in `theme.css` in the designated sections
- Add new CSS variables to `@theme` block in `theme.css`
- Import UUI components from `/src/components/uui/`
- Test changes with `rm -rf .next && pnpm dev` after modifications
- Check both light AND dark modes

## ✅ Correct Approach to Style Changes

### Step 1: Check if CSS variables exist

```bash
# Search theme.css for the variable
grep "color-brand-solid" src/styles/theme.css
```

### Step 2: Update CSS variables in theme.css (if needed)

```css
/* Light mode (in @theme block) */
--color-brand-solid: var(--color-brand-500);

/* Dark mode (inside .dark-mode { ... } block) */
--color-brand-solid: var(--color-white);
```

### Step 3: Use Tailwind classes that map to those variables

```tsx
// CORRECT - Uses CSS variables that change in dark mode
<button className="bg-brand-solid text-white dark:text-brand-500">
  Button
</button>
```

## ❌ Incorrect Approaches (DO NOT DO THIS)

### Don't invent class names

```tsx
// WRONG - text-primary-inverted doesn't exist
<button className="text-primary-inverted">
```

### Don't use arbitrary values without checking theme

```tsx
// WRONG - Bypasses the theme system
<button className="bg-[#031A43] text-[#ffffff]">
```

### Don't add CSS variables outside @theme block

```css
/* WRONG - CSS variables must be in @theme block or .dark-mode selector */
.my-component {
  --my-custom-color: blue;
}
```

### Don't guess - READ documentation first

- `/docs/STYLE_GUIDE.md` - Shows ALL available classes
- `/docs/STYLING_BEST_PRACTICES.md` - Shows HOW to use them
- `/src/styles/theme.css` - Shows actual CSS variables

## 🔍 How to Find the Right Class/Variable

**Question**: "I need white text on a dark blue button that inverts in dark mode"

### 1. Check Style Guide

Read `/docs/STYLE_GUIDE.md`:
- Look for text color section
- Look for button examples

### 2. Search theme.css

```bash
grep "text.*brand" src/styles/theme.css
grep "color-fg" src/styles/theme.css
```

### 3. Check existing components

```bash
# See how other buttons handle this
grep -r "text-white" src/components/uui/
```

### 4. Ask the user if uncertain

"I see these options in theme.css: [list]. Which should I use?"

**Better to ask than to guess wrong!**

## 🎯 Real Example: Primary Button Styling

**Requirement**: Dark blue button with white text (light mode), white button with dark blue text (dark mode)

### Step 1: CSS variables in theme.css

```css
/* Light mode defaults (in @theme block) */
--color-bg-brand-solid: var(--color-brand-500);        /* Dark blue */
--color-bg-brand-solid_hover: var(--color-brand-700);  /* Darker blue */

/* Dark mode overrides (inside .dark-mode block) */
--color-bg-brand-solid: var(--color-white);            /* White background */
--color-bg-brand-solid_hover: var(--color-brand-200);  /* Light blue hover */
```

### Step 2: Update button component

```tsx
// src/components/uui/button.tsx
colors: {
  primary: {
    root: [
      "bg-brand-solid text-white dark:text-brand-500",
      "hover:bg-brand-solid_hover",
      "*:data-icon:text-white dark:*:data-icon:text-brand-500",
    ].join(" "),
  },
}
```

### Why this works

- `bg-brand-solid` → references CSS variable that changes in dark mode
- `text-white` → white in light mode
- `dark:text-brand-500` → dark blue in dark mode (explicit override)
- Icons use same pattern with `*:data-icon:` selector

## Brand Color Configuration

**Current Brand Color**: #031A43 (Dark blue)
**Current Accent Color**: #1689FF (Light blue)

**Location**: `src/styles/theme.css` lines 124-139

---

## Typography System

The site uses a unified, rem-based typography scale for accessibility and SEO compliance.

**Full documentation:** See [TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md)

### Quick Reference

**Headings (Display Scale):**
- `text-display-lg` (3rem / 48px) - h1, large hero
- `text-display-md` (2.25rem / 36px) - h2, page titles
- `text-display-sm` (1.875rem / 30px) - h3, section titles
- `text-xl` (1.25rem / 20px) - h4, subheadings
- `text-lg` (1.125rem / 18px) - h5/h6, emphasized text

**Body Text:**
- `text-md` (1.0625rem mobile / 1rem desktop) - **Standard body text**
- `text-lg` (1.125rem / 18px) - Emphasized body
- `text-sm` (0.875rem / 14px) - Small text, captions
- `text-xs` (0.75rem / 12px) - Meta info

**Font Families:**
- Body: Inter (`--font-body`)
- Headings: Poppins (`--font-display`)

### Single Source of Truth

**All typography is defined in `theme.css` as CSS variables.**

```css
/* theme.css - edit here */
@theme {
  --text-display-md: 2.25rem;  /* h2 everywhere */
  --text-md: 1.0625rem;         /* body text */
}
```

**All components and rich text reference these variables:**

```tsx
/* Component */
<h2 className="text-display-md">Title</h2>
→ Uses var(--text-display-md)

/* Rich text */
.prose h2 { font-size: var(--text-display-md); }
→ Uses same variable!
```

### Consistency Rules

1. **Same semantic level = same size everywhere**
   - h2 in a block = h2 in rich text = 2.25rem (36px)
   
2. **Use classes for components, prose for rich text**
   - Components: `className="text-display-md"`
   - Rich text: `<RichText enableProse={true} />`
   
3. **Rem-based for accessibility**
   - Scales with user preferences
   - Google Lighthouse compliant
   - Browser zoom friendly

4. **Change in one place**
   - Edit `theme.css` only
   - No need to update richtext.css or components
   - Typography updates everywhere automatically

```css
@theme {
  /* Brand colors - using #031A43 */
  --color-brand-25: rgb(247 251 255);    /* Lightest */
  --color-brand-50: rgb(239 246 255);
  /* ... color scale ... */
  --color-brand-500: rgb(3 26 67);       /* Main brand color #031A43 */
  --color-brand-600: rgb(2 20 54);       /* Hover state */
  /* ... darker shades ... */
  --color-brand-950: rgb(1 10 27);       /* Darkest */

  /* UUI Component Integration */
  --color-bg-brand-solid: var(--color-brand-500);
  --color-bg-brand-solid_hover: var(--color-brand-700);
}
```

### To Change Brand Color

1. Update RGB values in brand color scale (all shades from 25-950)
2. Ensure `--color-bg-brand-solid` points to correct main color
3. Test all UUI components after changes
4. Clear cache: `rm -rf .next && pnpm dev`

## CSS Import Structure

**File**: `/src/app/(frontend)/globals.css`

**Critical Import Order**:
```css
@import "tailwindcss";
@import "../../styles/theme.css";        /* UUI theme with @theme block */

@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";

@custom-variant dark (&:where(.dark-mode, .dark-mode *));
/* ... additional UUI utilities ... */
```

**DO NOT modify this import order or structure.**

## Required Dependencies

**DO NOT REMOVE these packages**:
```json
{
  "@untitledui/icons": "latest",
  "next-themes": "latest",
  "react-aria-components": "^1.12.2",
  "tailwind-merge": "^2.3.0",
  "tailwindcss-animate": "^1.0.7",
  "tailwindcss-react-aria-components": "^2.0.1"
}
```

## 📋 Before Making Style Changes - Checklist

- [ ] Read `/docs/STYLE_GUIDE.md` to understand available classes
- [ ] Read `/docs/STYLING_BEST_PRACTICES.md` to understand patterns
- [ ] Search `theme.css` for relevant CSS variables
- [ ] Check existing components for similar patterns
- [ ] Test changes in both light AND dark modes
- [ ] Clear cache: `rm -rf .next && pnpm dev`
- [ ] Verify on `/style-guide` page

## Troubleshooting

### Buttons/components don't show brand colors

1. Check `--color-bg-brand-solid` is defined in `theme.css`
2. Verify `globals.css` imports `../../styles/theme.css` correctly
3. Clear Next.js cache: `rm -rf .next && pnpm dev`
4. Check browser dev tools for missing CSS variables

### Site fails to load

1. Check for duplicate metadata exports in `layout.tsx`
2. Verify all imports in `globals.css` point to correct paths
3. Ensure no CSS syntax errors in `theme.css`

## 🚨 Key Takeaway

**The theme system is NOT magic - it's CSS variables + Tailwind mappings + dark mode overrides.**

If you don't understand how these three pieces work together, **STOP and read the documentation** before making changes. Guessing causes broken styles, wasted time, and user frustration.

## Related Documentation

- **[STYLE_GUIDE.md](/docs/STYLE_GUIDE.md)** - Visual reference for all design tokens
- **[STYLING_BEST_PRACTICES.md](/docs/STYLING_BEST_PRACTICES.md)** - Site-wide consistency patterns
- **[BUTTON_SYSTEM.md](/docs/BUTTON_SYSTEM.md)** - Button-specific configuration
- **[UUI_COMPONENTS_REFERENCE.md](/docs/UUI_COMPONENTS_REFERENCE.md)** - UntitledUI component usage
