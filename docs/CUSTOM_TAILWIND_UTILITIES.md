# Custom Tailwind Utilities

This document explains how custom Tailwind utilities are configured in this project and how to add new ones.

## Overview

This project uses **Tailwind CSS v4** with custom utility classes that extend the default Tailwind functionality. Custom utilities require two-part configuration:

1. **CSS @utility declarations** - Tell Tailwind to generate the utility class
2. **tailwind-merge configuration** - Tell the class merging system to recognize the custom class

## Existing Custom Utilities

### Display Text Sizes

Custom typography utilities for larger heading sizes:

| Class | Font Size | Line Height | Use Case |
|-------|-----------|-------------|----------|
| `text-display-xs` | 24px (1.5rem) | 32px (2rem) | Small display text |
| `text-display-sm` | 30px (1.875rem) | 38px (2.375rem) | Card titles, small headings |
| `text-display-md` | 36px (2.25rem) | 44px (2.75rem) | Section headings |
| `text-display-lg` | 48px (3rem) | 60px (3.75rem) | Page headings |
| `text-display-xl` | 60px (3.75rem) | 72px (4.5rem) | Hero headings |
| `text-display-2xl` | 72px (4.5rem) | 90px (5.625rem) | Large hero headings |

**Files:**
- CSS Variables: `/src/styles/theme.css` (lines 25-45)
- @utility Declarations: `/src/styles/frontend.css` (lines 164-196)
- tailwind-merge Config: `/src/utilities/ui.ts` (lines 10-19)

**Usage:**
```tsx
<h3 className="text-display-sm font-semibold">Card Title</h3>
<h2 className="text-display-md font-semibold">Section Heading</h2>
<h1 className="text-display-xl font-semibold">Hero Heading</h1>
```

### Other Custom Utilities

- `accordion-down` / `accordion-up` - Animation utilities for accordion components
- `ring-offset-background` - Ring offset color utility
- `border-border` - Border color utility

## How to Add New Custom Utilities

### Step 1: Define CSS Variable (if needed)

Add the CSS variable to `/src/styles/theme.css` inside the `@theme` block:

```css
@theme {
  /* Your custom CSS variable */
  --my-custom-value: 1rem;
}
```

### Step 2: Create @utility Declaration

Add the utility declaration to `/src/styles/frontend.css`:

```css
@utility my-custom-class {
  property-name: var(--my-custom-value);
}
```

### Step 3: Configure tailwind-merge

Add the custom class to the tailwind-merge configuration in `/src/utilities/ui.ts`:

```typescript
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Add to existing group or create new one
      'your-group-name': [
        { prefix: ['custom-class-1', 'custom-class-2'] },
      ],
    },
  },
})
```

**Common Class Groups:**
- `font-size` - Font size utilities (text-*, etc.)
- `font-weight` - Font weight utilities (font-*)
- `text-color` - Text color utilities (text-*)
- `bg-color` - Background color utilities (bg-*)
- `border-radius` - Border radius utilities (rounded-*)
- `shadow` - Shadow utilities (shadow-*)

See [tailwind-merge documentation](https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md) for all available class groups.

### Step 4: Restart Dev Server

```bash
rm -rf .next && pnpm dev
```

## Troubleshooting

### Custom Class Not Applying

**Symptom:** Class appears in code but not in browser DOM, or has no effect.

**Possible Causes:**

1. **Missing @utility declaration**
   - Check: Search for the class name in `.next/static/css/` files
   - Fix: Add @utility declaration in `frontend.css`

2. **tailwind-merge removing the class**
   - Check: Inspect element in DevTools - class completely missing from DOM
   - Fix: Add class to tailwind-merge config in `utilities/ui.ts`

3. **CSS variable not defined**
   - Check: Look for `var(--undefined-variable)` in DevTools
   - Fix: Define variable in `theme.css`

4. **Cache issue**
   - Fix: Clear Next.js cache: `rm -rf .next && pnpm dev`

### Class Appearing but No Styles

**Symptom:** Class is in DOM but styles don't apply.

**Possible Causes:**

1. **CSS specificity conflict**
   - Check: Look for crossed-out styles in DevTools
   - Fix: Use more specific selectors or `!important` (as last resort)

2. **Variable not in scope**
   - Check: CSS variable value in DevTools Computed tab
   - Fix: Ensure variable is defined in `:root` or appropriate scope

## Case Study: text-display-sm Issue

### Problem
The `text-display-sm` class was defined in code but not appearing in the browser DOM, causing H3 titles to render at browser default size (17px) instead of the intended 30px.

### Investigation
1. ✅ CSS variable was defined in `theme.css`
2. ❌ @utility declaration was missing in `frontend.css`
3. ❌ tailwind-merge didn't recognize the custom class

### Solution
1. Added @utility declarations for all display text sizes
2. Extended tailwind-merge to recognize `text-display-*` classes
3. Fixed spacing in one `cn()` function call (bonus issue)

### Result
✅ H3 titles now render at 30px with proper line-height
✅ Class appears in DOM and applies correctly
✅ All display text utilities work across the site

## Best Practices

1. **Always configure both places** - @utility declaration AND tailwind-merge config
2. **Group related utilities** - Keep similar utilities together in config
3. **Use semantic names** - Follow Tailwind's naming conventions (prefix-value)
4. **Document in theme.css** - Add comments explaining the purpose of CSS variables
5. **Test thoroughly** - Check that classes appear in DOM and styles apply
6. **Clear cache** - Always `rm -rf .next` after adding new utilities

## Related Documentation

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [tailwind-merge Configuration](https://github.com/dcastil/tailwind-merge/blob/main/docs/configuration.md)
- [STYLING_SYSTEM.md](/docs/STYLING_SYSTEM.md) - Overall styling architecture
- [STYLING_BEST_PRACTICES.md](/docs/STYLING_BEST_PRACTICES.md) - Site-wide patterns
