# Typography System

**Last Updated:** 2025-10-30  
**Status:** Production Ready

---

## Overview

The site uses a **unified, rem-based typography scale** based on UntitledUI text variables. This scale is used consistently across:
- Block components (CardGridBlock, FeaturesBlock, HeroHeadingBlock, etc.)
- Rich text content (blog posts, content blocks)
- UI components (buttons, forms, navigation)

**Key Principles:**
1. **Single source of truth**: All typography defined in `theme.css`
2. **Rem-based sizing**: Accessibility and SEO compliant
3. **Consistent semantics**: h2 is always 2.25rem (36px) everywhere
4. **Centralized control**: Change once in `theme.css`, updates everywhere

---

## Typography Scale Reference

### Display Sizes (Large Headings)

Use for hero sections, page titles, and major headings.

| Class | Size | Line Height | Letter Spacing | Usage | Semantic |
|-------|------|-------------|----------------|-------|----------|
| `text-display-2xl` | 4.5rem (72px) | 5.625rem (90px) | -0.09rem | Massive hero headings | - |
| `text-display-xl` | 3.75rem (60px) | 4.5rem (72px) | -0.075rem | XL hero headings | - |
| `text-display-lg` | 3rem (48px) | 3.75rem (60px) | -0.06rem | Large hero headings | **h1** |
| `text-display-md` | 2.25rem (36px) | 2.75rem (44px) | -0.045rem | Page headings | **h2** |
| `text-display-sm` | 1.875rem (30px) | 2.375rem (38px) | - | Section headings | **h3** |
| `text-display-xs` | 1.5rem (24px) | 2rem (32px) | - | Small headings | **h4** |

### Text Sizes (Body & Small Headings)

Use for body text, descriptions, labels.

| Class | Size | Line Height | Usage | Semantic |
|-------|------|-------------|-------|----------|
| `text-xl` | 1.25rem (20px) | 1.875rem (30px) | Large body text, subheadings | - |
| `text-lg` | 1.125rem (18px) | 1.75rem (28px) | Emphasized body | **h5, h6** |
| `text-md` | 1.0625rem mobile / 1rem desktop | 1.625rem / 1.5rem | **Standard body text** | **p** |
| `text-sm` | 0.875rem (14px) | 1.25rem (20px) | Small labels, captions | - |
| `text-xs` | 0.75rem (12px) | 1.125rem (18px) | Micro text, meta info | - |

### Special Sizes

| Class | Size | Usage |
|-------|------|-------|
| `text-hero-fluid` | `clamp(2.1rem, 5vw + 1rem, 6.5rem)` | Fluid hero headlines (scales smoothly) |

---

## Font Families

```css
--font-body: Inter      /* Body text, descriptions, labels */
--font-display: Poppins /* All headings (h1-h6, display classes) */
```

- **Inter** is used for body text, descriptions, labels (400, 500, 600 weights)
- **Poppins** is used for all headings (h1-h6, display classes) (600 weight typically)

---

## Single Source of Truth Architecture

**All typography controls are defined in `theme.css`:**

```css
/* src/styles/theme.css */
@theme {
  /* Font sizes */
  --text-display-lg: 3rem;
  --text-display-lg--line-height: 3.75rem;
  --text-display-lg--letter-spacing: -0.06rem;
  
  --text-md: 1.0625rem;  /* Mobile */
  --text-md--line-height: 1.625rem;
  
  /* Responsive override */
  @media (min-width: 768px) {
    :root {
      --text-md: 1rem;  /* Desktop */
      --text-md--line-height: 1.5rem;
    }
  }
}
```

**All components and rich text reference these variables:**

```tsx
/* Component usage */
<h1 className="text-display-lg">Hero Title</h1>
// → Uses var(--text-display-lg) = 3rem

/* Rich text usage */
.prose h1 {
  font-size: var(--text-display-lg);  /* Same variable! */
}
```

**Result**: Change `--text-display-lg` once in theme.css, and it updates everywhere instantly.

---

## Usage Patterns

### In Block Components

Use Tailwind classes directly:

```tsx
<span className="text-sm font-semibold md:text-md">Eyebrow Label</span>
<h2 className="text-display-sm md:text-display-md">Section Heading</h2>
<p className="text-lg md:text-xl">Description text</p>
<h3 className="text-lg font-semibold">Card Title</h3>
<div className="text-md">Card description</div>
```

### In Rich Text Content

Wrap in `RichText` component with prose:

```tsx
import { RichText } from '@/components/RichText'

<RichText content={content} enableProse={true} />
```

The prose styles automatically map to UUI scale via CSS variables:
- `<h1>` → 3rem (48px) via `--text-display-lg`
- `<h2>` → 2.25rem (36px) via `--text-display-md`
- `<h3>` → 1.875rem (30px) via `--text-display-sm`
- `<h4>` → 1.25rem (20px) via `--text-xl`
- `<h5>`, `<h6>` → 1.125rem (18px) via `--text-lg`
- `<p>` → 1.0625rem mobile / 1rem desktop via `--text-md`

### Compact Variant

For rich text in cards/small spaces:

```tsx
<RichText
  content={content}
  enableProse={true}
  className="prose-compact"
/>
```

This makes all text (including headings) use `text-md` size (1rem/16px desktop).

---

## Responsive Behavior

Typography scales automatically via CSS variables in `theme.css`:

**Mobile (< 768px):**
- text-md: 1.0625rem (17px) for better mobile readability
- Display sizes: Use full rem values (no scaling needed)

**Desktop (≥ 768px):**
- text-md: 1rem (16px) standard desktop size
- Display sizes: Same (already optimized)

**Manual responsive classes:**
```tsx
className="text-sm md:text-md"              // 14px → 16px
className="text-display-sm md:text-display-md"  // 30px → 36px
```

---

## Dark Mode

All typography colors use CSS variables that automatically adjust:
- `--color-text-primary` (main text)
- `--color-text-secondary` (muted text)
- `--color-text-tertiary` (very muted)

**Typography sizes are the same in dark mode** - only colors change.

No manual dark mode classes needed for typography sizing.

---

## Accessibility Features

### Rem-Based Sizing
- ✅ Respects user font-size preferences
- ✅ Scales with browser zoom
- ✅ Screen reader compatible
- ✅ Google Lighthouse compliant

### Readability
- Minimum body text: 1rem (16px desktop), 1.0625rem (17px mobile)
- Line heights: 1.5-1.6 for optimal readability
- Letter spacing on large headings: Improves visual clarity
- Proper heading hierarchy: Clear visual distinction

### WCAG Compliance
- Color contrast: AA compliant (verified in both modes)
- Scalable text: Works with 200% zoom
- Semantic HTML: Proper heading levels
- Focus states: Visible and accessible

---

## How to Change Typography

### Change a Heading Size (e.g., make h2 larger)

1. **Edit `theme.css` only**:
```css
/* src/styles/theme.css */
@theme {
  --text-display-md: 2.5rem;  /* Was 2.25rem, now 2.5rem = 40px */
  --text-display-md--line-height: 3rem;  /* Adjust line-height too */
}
```

2. **That's it!** No other files need changing.

3. **Test**:
   - Clear cache: `rm -rf .next && pnpm dev`
   - Check h2 in blocks (CardGridBlock, etc.)
   - Check h2 in rich text (blog posts)
   - Both should now be 2.5rem (40px)

### Change Body Text Size

1. **Edit `theme.css` only**:
```css
/* src/styles/theme.css */
@theme {
  --text-md: 1.125rem;  /* Was 1.0625rem mobile, now 1.125rem = 18px */
  --text-md--line-height: 1.75rem;  /* Adjust accordingly */
}

/* Also update desktop override if needed */
@media (min-width: 768px) {
  :root {
    --text-md: 1.0625rem;  /* Was 1rem, now 1.0625rem = 17px desktop */
  }
}
```

2. **Test everywhere**:
   - Component body text
   - Rich text paragraphs
   - Button text
   - Form labels

### Add a New Typography Size

If you need a size not in the scale (rare):

```css
/* src/styles/theme.css */
@theme {
  --text-custom: 1.375rem;  /* 22px */
  --text-custom--line-height: 2rem;  /* 32px */
}
```

Then use in components:
```tsx
<p className="text-[1.375rem] leading-[2rem]">Custom sized text</p>
// Or better: Create a new Tailwind class in your config
```

---

## Migration Guide

### Before: Multiple Sources, Inconsistent Sizes

```css
/* richtext.css - hardcoded */
.prose h2 {
  font-size: 1.5em;  /* 24px mobile, 30px desktop */
}

/* Component - different value */
<h2 className="text-display-md">Section</h2>
// → 36px everywhere

// Result: h2 looks different in rich text vs components!
```

### After: Single Source, Consistent Everywhere

```css
/* theme.css - single source of truth */
@theme {
  --text-display-md: 2.25rem;  /* 36px */
}

/* richtext.css - references variable */
.prose h2 {
  font-size: var(--text-display-md);  /* → 2.25rem from theme.css */
}

/* Component - references same variable */
<h2 className="text-display-md">Section</h2>
// → Uses var(--text-display-md) → 2.25rem

// Result: h2 is ALWAYS 36px, in any context!
```

---

## Consistency Rules

### Rule 1: Same Semantic Level = Same Size Everywhere

- h1 in a HeroHeadingBlock = h1 in rich text = 3rem (48px)
- h2 in a CardGridBlock = h2 in rich text = 2.25rem (36px)
- h3 in a FeaturesBlock = h3 in rich text = 1.875rem (30px)

### Rule 2: Use Classes for Components, Prose for Rich Text

**Components:**
```tsx
<h2 className="text-display-md">Heading</h2>
```

**Rich text:**
```tsx
<RichText content={content} enableProse={true} />
```

Both use the same CSS variables under the hood.

### Rule 3: Responsive Strategy

**Mobile-first approach:**
```tsx
className="text-sm md:text-md"
```

**Let CSS variables handle base sizes:**
- `text-md` automatically switches from 1.0625rem to 1rem on desktop
- No manual responsive classes needed for this size

---

## Typography Testing Checklist

When changing typography:

- [ ] Edit CSS variables in `theme.css` only
- [ ] Clear Next.js cache: `rm -rf .next`
- [ ] Test in blocks (homepage, CardGridBlock, etc.)
- [ ] Test in rich text (blog posts)
- [ ] Verify both contexts show same size
- [ ] Test light mode
- [ ] Test dark mode
- [ ] Test browser zoom to 200%
- [ ] Test mobile viewport (375px)
- [ ] Test desktop viewport (1440px)
- [ ] Run Lighthouse accessibility audit

---

## CSS Variable Reference

### Complete Typography Variables (theme.css)

```css
/* Font families */
--font-body: Inter
--font-display: Poppins
--font-mono: Roboto Mono

/* Display sizes (headings) */
--text-display-2xl: 4.5rem          (72px)
--text-display-2xl--line-height: 5.625rem   (90px)
--text-display-2xl--letter-spacing: -0.09rem

--text-display-xl: 3.75rem         (60px)
--text-display-xl--line-height: 4.5rem      (72px)
--text-display-xl--letter-spacing: -0.075rem

--text-display-lg: 3rem            (48px)
--text-display-lg--line-height: 3.75rem     (60px)
--text-display-lg--letter-spacing: -0.06rem

--text-display-md: 2.25rem         (36px)
--text-display-md--line-height: 2.75rem     (44px)
--text-display-md--letter-spacing: -0.045rem

--text-display-sm: 1.875rem        (30px)
--text-display-sm--line-height: 2.375rem    (38px)

--text-display-xs: 1.5rem          (24px)
--text-display-xs--line-height: 2rem        (32px)

/* Text sizes (body) */
--text-xl: 1.25rem                 (20px)
--text-xl--line-height: 1.875rem            (30px)

--text-lg: 1.125rem                (18px)
--text-lg--line-height: 1.75rem             (28px)

--text-md: 1.0625rem mobile / 1rem desktop  (17px / 16px)
--text-md--line-height: 1.625rem / 1.5rem   (26px / 24px)

--text-sm: 0.875rem                (14px)
--text-sm--line-height: 1.25rem             (20px)

--text-xs: 0.75rem                 (12px)
--text-xs--line-height: 1.125rem            (18px)

/* Fluid hero */
--text-hero-fluid: clamp(2.1rem, 5vw + 1rem, 6.5rem)
--text-hero-fluid--line-height: 1.2
```

---

## Component Examples

### Hero Section
```tsx
<h1 className="text-display-lg md:text-display-xl font-semibold">
  Welcome to Our Site
</h1>
<p className="text-lg md:text-xl text-secondary">
  A compelling tagline that draws readers in
</p>
```

### Card Grid
```tsx
<h2 className="text-display-sm md:text-display-md font-semibold">
  Features
</h2>
<h3 className="text-lg font-semibold">Individual Feature</h3>
<p className="text-md text-secondary">Feature description</p>
```

### Blog Post (Rich Text)
```tsx
<RichText content={post.content} enableProse={true} />

/* Results in: */
<h1>Post Title</h1>        <!-- 3rem via --text-display-lg -->
<h2>Section</h2>           <!-- 2.25rem via --text-display-md -->
<h3>Subsection</h3>        <!-- 1.875rem via --text-display-sm -->
<p>Body paragraph</p>      <!-- 1.0625rem mobile / 1rem desktop -->
```

### Navigation
```tsx
<a className="text-md font-medium">About</a>
<Button size="sm">Contact</Button>  // Uses text-sm internally
```

---

## Why Rem Instead of Pixels?

### Accessibility
- Users can set browser font-size preferences (Settings → Appearance → Font Size)
- Rem units respect this preference, pixels ignore it
- Screen readers can better interpret relative sizing
- Required for WCAG 2.1 Level AA compliance

### SEO
- Google Lighthouse penalizes pixel-based typography
- Rem-based sizing improves accessibility score
- Better mobile-friendliness rating
- Search ranking factor

### Browser Zoom
- Rem scales smoothly with browser zoom (Cmd/Ctrl + +)
- Pixels can cause layout issues at high zoom levels
- Better user experience across devices

### Example
```
User sets browser font-size to 20px (125% scale):
- 1rem = 20px (not 16px)
- Our h1 (3rem) = 60px (not 48px)
- All text scales proportionally
- Layout remains intact
```

---

## Responsive Typography Flow

```
Mobile (< 768px)
├─ body font-size: 1.0625rem (17px)
├─ --text-md: 1.0625rem
├─ h1: var(--text-display-lg) = 3rem (48px)
└─ p: var(--text-md) = 1.0625rem (17px)

Desktop (≥ 768px)
├─ body font-size: 1rem (16px)
├─ --text-md: 1rem (CSS variable override)
├─ h1: var(--text-display-lg) = 3rem (48px, unchanged)
└─ p: var(--text-md) = 1rem (16px, via CSS variable)
```

**Key Insight**: Headings stay same size, body text adjusts. This is intentional - mobile needs slightly larger body text for readability, but heading sizes are already optimized.

---

## File Structure

```
src/styles/
├── theme.css           ← SINGLE SOURCE OF TRUTH (edit here)
│   └── @theme {
│         --text-display-lg: 3rem;
│         --text-md: 1.0625rem;
│         ...
│       }
│
├── richtext.css        ← References CSS variables only
│   └── .prose h1 {
│         font-size: var(--text-display-lg);
│       }
│
└── frontend.css        ← Tailwind base (DO NOT MODIFY)
```

**Architecture Benefit**: To change typography, you only need to edit ONE file (`theme.css`).

---

## Common Tasks

### Task: Make all headings slightly smaller

```css
/* theme.css - Edit these only */
@theme {
  --text-display-lg: 2.75rem;   /* Was 3rem */
  --text-display-md: 2rem;      /* Was 2.25rem */
  --text-display-sm: 1.75rem;   /* Was 1.875rem */
}
```

Result: Updates everywhere (blocks + rich text) automatically.

### Task: Increase body text size site-wide

```css
/* theme.css - Edit mobile base */
@theme {
  --text-md: 1.125rem;  /* Was 1.0625rem, now 18px mobile */
}

/* theme.css - Edit desktop override */
@media (min-width: 768px) {
  :root {
    --text-md: 1.0625rem;  /* Was 1rem, now 17px desktop */
  }
}
```

Result: All body text, button text, form labels update.

### Task: Adjust line-height for better readability

```css
/* theme.css */
@theme {
  --text-md--line-height: 1.75rem;  /* Was 1.625rem, now 28px */
}
```

Result: All body text gets increased line spacing.

---

## Related Documentation

- [STYLING_SYSTEM.md](./STYLING_SYSTEM.md) - Overall styling architecture
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Visual reference
- [BUTTON_SYSTEM.md](./BUTTON_SYSTEM.md) - Button typography
- [TYPOGRAPHY_BEFORE_AFTER.md](./TYPOGRAPHY_BEFORE_AFTER.md) - Migration details
- [REMOVED_CSS_VARIABLES.md](./REMOVED_CSS_VARIABLES.md) - Cleanup details

---

## Quick Reference Card

```
HEADINGS (Display Scale)
text-display-2xl → 4.5rem  (72px)  Hero titles
text-display-xl  → 3.75rem (60px)  XL titles
text-display-lg  → 3rem    (48px)  h1, page titles
text-display-md  → 2.25rem (36px)  h2, section headers
text-display-sm  → 1.875rem (30px) h3, subsections
text-display-xs  → 1.5rem  (24px)  h4, small headers

BODY TEXT
text-xl → 1.25rem   (20px)  Lead paragraphs
text-lg → 1.125rem  (18px)  Emphasized, h5/h6
text-md → 1.0625rem/1rem    DEFAULT BODY
text-sm → 0.875rem  (14px)  Captions, labels
text-xs → 0.75rem   (12px)  Meta, micro text

FONTS
Headings → Poppins (600 weight)
Body     → Inter (400, 500, 600)

SINGLE SOURCE OF TRUTH
All sizes in → src/styles/theme.css
```

---

**Version:** 1.0  
**Last Updated:** 2025-10-30  
**Maintained By:** Development Team

