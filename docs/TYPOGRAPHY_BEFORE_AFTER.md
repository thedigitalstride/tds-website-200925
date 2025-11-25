# Typography System - Before & After

**Date**: 2025-10-30  
**Branch**: feature/theme-cleanup

## Summary of Changes

1. **Converted all typography to rem units** for accessibility compliance
2. **Unified typography scale** across blocks and rich text content
3. **Centralized all typography controls** in `theme.css` as single source of truth
4. **Removed hardcoded values** from `richtext.css` and components

---

## BEFORE (Inconsistent & Pixel-Based)

### UUI Text Scale (Blocks/Components)
Typography was defined using `calc(var(--spacing) * N)` and pixels:

- h1 equivalent: `text-display-lg` = `calc(var(--spacing) * 12)` = 48px (hardcoded pixels)
- h2 equivalent: `text-display-md` = `calc(var(--spacing) * 9)` = 36px (hardcoded pixels)
- h3 equivalent: `text-display-sm` = `calc(var(--spacing) * 7.5)` = 30px (hardcoded pixels)
- h4 equivalent: `text-xl` = `calc(var(--spacing) * 5)` = 20px (hardcoded pixels)
- Body: `text-md` = `17px` mobile / `16px` desktop (hardcoded pixels)

### Tailwind Prose (Rich Text)
- h1: `2em` mobile (32px), `2.25em` desktop (36px) - relative to parent
- h2: `1.5em` mobile (24px), `1.875em` desktop (30px) - relative to parent
- h3: `1.25em` mobile (20px), `1.5em` desktop (24px) - relative to parent
- h4: `1.125em` (18px) - relative to parent
- p: `1.0625rem` mobile (17px), `1.125rem` desktop (18px) - hardcoded rems

### Problems

1. **Inconsistent sizes**: Same semantic heading renders at different sizes depending on context
   - Example: h2 in CardGridBlock (36px) vs h2 in rich text (24px mobile, 30px desktop)
   
2. **Mixed units**: Some pixels, some calc(), some em, some rem - no consistency

3. **Multiple sources of truth**: Typography sizes defined in both `theme.css` AND `richtext.css`

4. **Accessibility issues**: Pixel-based sizing doesn't scale with user preferences

5. **SEO penalty**: Google requires rem-based typography for accessibility scoring

---

## AFTER (Unified & Rem-Based)

### Unified Typography Scale (Single Source of Truth)

All text uses **rem-based CSS variables** defined in `theme.css`, both in components AND rich text.

**Base**: 16px = 1rem (browser default)

### Typography Scale (theme.css)

**Display Sizes (Headings)**:
- `--text-display-2xl`: 4.5rem (72px at 16px base)
- `--text-display-xl`: 3.75rem (60px)
- `--text-display-lg`: 3rem (48px) - **h1**
- `--text-display-md`: 2.25rem (36px) - **h2**
- `--text-display-sm`: 1.875rem (30px) - **h3**
- `--text-display-xs`: 1.5rem (24px) - **h4**

**Text Sizes (Body)**:
- `--text-xl`: 1.25rem (20px)
- `--text-lg`: 1.125rem (18px) - **h5/h6**
- `--text-md`: 1.0625rem mobile / 1rem desktop (17px / 16px) - **body text**
- `--text-sm`: 0.875rem (14px)
- `--text-xs`: 0.75rem (12px)

**Line Heights** (all rem-based):
- `--text-display-lg--line-height`: 3.75rem (60px)
- `--text-display-md--line-height`: 2.75rem (44px)
- `--text-md--line-height`: 1.625rem mobile / 1.5rem desktop

**Letter Spacing** (converted to rem for consistency):
- `--text-display-2xl--letter-spacing`: -0.09rem
- `--text-display-xl--letter-spacing`: -0.075rem
- `--text-display-lg--letter-spacing`: -0.06rem
- `--text-display-md--letter-spacing`: -0.045rem

### Usage in Components

All components reference CSS variables from `theme.css`:

```tsx
<h1 className="text-display-lg">Page Title</h1>
// Uses: var(--text-display-lg) = 3rem = 48px
```

### Usage in Rich Text

All prose styles reference CSS variables from `theme.css`:

```css
.prose h1 {
  font-size: var(--text-display-lg);  /* 3rem = 48px */
  line-height: var(--text-display-lg--line-height);  /* 3.75rem */
  letter-spacing: var(--text-display-lg--letter-spacing);  /* -0.06rem */
}
```

### Typography Mapping

| Element | Size | Source |
|---------|------|--------|
| h1 (blocks) | 3rem (48px) | `var(--text-display-lg)` from theme.css |
| h1 (rich text) | 3rem (48px) | `var(--text-display-lg)` from theme.css |
| h2 (blocks) | 2.25rem (36px) | `var(--text-display-md)` from theme.css |
| h2 (rich text) | 2.25rem (36px) | `var(--text-display-md)` from theme.css |
| h3 (blocks) | 1.875rem (30px) | `var(--text-display-sm)` from theme.css |
| h3 (rich text) | 1.875rem (30px) | `var(--text-display-sm)` from theme.css |
| Body (all) | 1.0625rem / 1rem | `var(--text-md)` from theme.css |

**Now consistent everywhere!**

---

## Benefits

### 1. Accessibility
- ✅ User font-size preferences respected
- ✅ Browser zoom scales properly
- ✅ Screen readers can adjust sizing
- ✅ WCAG compliance improved

### 2. SEO
- ✅ Google Lighthouse accessibility score improved
- ✅ Meets Google's accessibility requirements
- ✅ Better mobile-friendliness score

### 3. Maintainability
- ✅ **Single source of truth**: All typography in `theme.css`
- ✅ Change once, applies everywhere
- ✅ No hardcoded values in `richtext.css`
- ✅ Consistent scale across entire site

### 4. Developer Experience
- ✅ Easy to understand typography scale
- ✅ Clear naming conventions
- ✅ No guesswork for heading sizes
- ✅ Components and rich text use same system

---

## Migration Examples

### Before: Hardcoded Values
```css
/* richtext.css - OLD */
.prose h2 {
  font-size: 1.5em;      /* Hardcoded relative size */
  line-height: 1.25;     /* Hardcoded unitless value */
}

.prose {
  font-size: 1.0625rem;  /* Hardcoded rem */
  line-height: 1.625rem; /* Hardcoded rem */
}
```

### After: CSS Variables (Single Source of Truth)
```css
/* richtext.css - NEW */
.prose h2 {
  font-size: var(--text-display-md);              /* From theme.css = 2.25rem */
  line-height: var(--text-display-md--line-height);  /* From theme.css = 2.75rem */
  letter-spacing: var(--text-display-md--letter-spacing);  /* From theme.css = -0.045rem */
}

.prose {
  font-size: var(--text-md);                     /* From theme.css = 1.0625rem mobile, 1rem desktop */
  line-height: var(--text-md--line-height);      /* From theme.css = 1.625rem mobile, 1.5rem desktop */
}
```

### Now Typography Changes in One Place
```css
/* theme.css */
@theme {
  /* Change this value... */
  --text-display-md: 2.5rem;  /* Increase h2 size to 40px */
}

/* ...and it updates EVERYWHERE:
   - Block h2 headings
   - Rich text h2 headings
   - Any component using text-display-md
   - Both light and dark modes
   - All responsive breakpoints
*/
```

---

## Testing Verification

### Accessibility Tests Passed
- ✅ Browser zoom to 200%: All text scales proportionally
- ✅ Change browser font-size preference: Text adapts correctly
- ✅ Screen reader compatibility: Proper semantic sizing
- ✅ No pixel-based limitations

### Visual Consistency Tests Passed
- ✅ h1 in blocks matches h1 in rich text (3rem/48px)
- ✅ h2 in blocks matches h2 in rich text (2.25rem/36px)
- ✅ h3 in blocks matches h3 in rich text (1.875rem/30px)
- ✅ Body text consistent everywhere (1.0625rem/1rem)
- ✅ No visual regressions

### Technical Tests Passed
- ✅ Build succeeds with no errors
- ✅ No CSS variable resolution errors
- ✅ Responsive behavior maintained
- ✅ Dark mode functions correctly

---

## Architecture: Single Source of Truth

```
┌─────────────────────────────────────────┐
│  theme.css                              │
│  ┌─────────────────────────────────┐   │
│  │ @theme {                        │   │
│  │   --text-display-lg: 3rem       │   │ Single
│  │   --text-display-md: 2.25rem    │   │ Source
│  │   --text-md: 1.0625rem          │   │ of
│  │ }                               │   │ Truth
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
           ↓                ↓
    ┌──────────────┐  ┌──────────────┐
    │ Components   │  │ richtext.css │
    │              │  │              │
    │ className=   │  │ .prose h2 {  │
    │ "text-       │  │   font-size: │
    │  display-md" │  │   var(--text-│
    │              │  │    display-  │
    │ References   │  │    md);      │
    │ CSS var      │  │ }            │
    └──────────────┘  └──────────────┘
         Both reference the SAME variable
         Both get the SAME size (2.25rem)
         Change once, updates everywhere
```

---

## File Changes

### theme.css
- ✅ All font-size variables converted to rem
- ✅ All line-height variables converted to rem
- ✅ All letter-spacing variables converted to rem
- ✅ Mobile/desktop responsive handled via media query
- ✅ Dark mode unaffected (uses same variables)

### richtext.css
- ✅ All hardcoded font-sizes replaced with CSS variables
- ✅ All hardcoded line-heights replaced with CSS variables
- ✅ All hardcoded letter-spacing replaced with CSS variables
- ✅ Prose headings now match block headings exactly
- ✅ Single source of truth architecture implemented

---

## Related Documentation

- [TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md) - Complete typography reference
- [STYLING_SYSTEM.md](./STYLING_SYSTEM.md) - Overall styling architecture
- [REMOVED_CSS_VARIABLES.md](./REMOVED_CSS_VARIABLES.md) - Phase 1 cleanup details

