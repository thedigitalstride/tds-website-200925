# Theme Cleanup & Typography Unification - Implementation Guide

**Created:** 2025-10-29
**Status:** Ready for Implementation
**Total Effort:** 10-12 hours (1.5-2 days)
**Risk Level:** LOW (with proper testing)

---

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Theme Cleanup](#phase-1-theme-cleanup)
4. [Phase 2: Typography Unification](#phase-2-typography-unification)
5. [Testing Checklist](#testing-checklist)
6. [Rollback Procedures](#rollback-procedures)
7. [Reference Data](#reference-data)

---

## Overview

### Problems Being Solved
1. **58% of theme.css is unused** (505/864 variables)
2. **Typography inconsistency** between UUI text scale and Tailwind prose
3. **Developer confusion** from massive 1,550-line theme file

### Expected Outcomes
- ✅ 44KB smaller CSS bundle (76KB → 32KB)
- ✅ Consistent typography across all contexts
- ✅ Easier to maintain and navigate
- ✅ Faster CSS parsing and runtime performance
- ✅ Clear documentation for future development

---

## Prerequisites

### Before Starting

1. **Commit all current work**
   ```bash
   git add .
   git commit -m "chore: commit work before theme cleanup"
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/theme-cleanup
   ```

3. **Ensure clean build**
   ```bash
   rm -rf .next
   pnpm dev
   # Wait for "✓ Ready" message
   # Test site works at http://localhost:3000
   ```

4. **Take screenshots** (for comparison later)
   - Homepage (light mode)
   - Homepage (dark mode)
   - Blog post page (light mode)
   - Style guide page (`/style-guide`)

---

## Phase 1: Theme Cleanup

**Time:** 4-5 hours
**Goal:** Remove 58% unused CSS variables safely

### Step 1.1: Generate Safety Net (30 minutes)

1. **Back up original theme.css**
   ```bash
   cp src/styles/theme.css src/styles/theme.css.backup
   ```

2. **Generate list of used variables**
   ```bash
   grep -roh "var(--[a-zA-Z0-9_-]*)" src/ | \
     sed 's/var(--/--/;s/)$//' | \
     sort -u > used-vars.txt
   ```

3. **Review used-vars.txt**
   - Should contain ~360 variable names
   - Verify it looks reasonable (sample some known variables)

4. **Create removed variables reference**
   ```bash
   touch docs/REMOVED_CSS_VARIABLES.md
   ```

### Step 1.2: Remove Unused Variables (1.5 hours)

**File:** `/src/styles/theme.css`

#### A. Remove Complete Unused Color Palettes (156 variables)

**Search and delete all lines containing these color prefixes:**

```
--color-cyan-
--color-teal-
--color-moss-
--color-rose-
--color-violet-
--color-gray-blue-
--color-gray-cool-
--color-gray-modern-
--color-gray-neutral-
--color-gray-iron-
--color-gray-true-
--color-gray-warm-
--color-green-light-
```

**How to remove:**
1. Open `src/styles/theme.css`
2. Use Find & Replace (with regex enabled)
3. Search for each pattern: `^\s*--color-cyan-.*$\n`
4. Delete all matches for each color palette
5. Do this for all 13 palettes listed above

**Document in `docs/REMOVED_CSS_VARIABLES.md`:**
```markdown
# Removed CSS Variables

## Complete Color Palettes (156 variables)
Reason: 0% usage across entire codebase

- cyan (12 variables)
- teal (12 variables)
- moss (12 variables)
- rose (12 variables)
- violet (12 variables)
- gray-blue (12 variables)
- gray-cool (12 variables)
- gray-modern (12 variables)
- gray-neutral (12 variables)
- gray-iron (12 variables)
- gray-true (12 variables)
- gray-warm (12 variables)
- green-light (12 variables)
```

#### B. Remove Utility Wrapper System (307 variables)

**Search and delete all lines containing these prefixes:**

```
--utility-
--background-brand-
--background-gray-
--background-error-
--background-warning-
--background-success-
--text-brand-
--text-gray-
--text-error-
--text-warning-
--text-success-
--border-color-
--ring-color-
--outline-color-
```

**How to remove:**
1. Search for: `^\s*--utility-.*$\n`
2. Delete all matches (~200 lines)
3. Repeat for each prefix pattern
4. These are typically grouped together, so may be faster to delete entire sections

**Document in `docs/REMOVED_CSS_VARIABLES.md`:**
```markdown
## Utility Wrapper System (307 variables)
Reason: Abandoned pattern, 0% usage

- `--utility-*` (200 variables)
- `--background-*` wrappers (39 variables)
- `--text-*` wrappers (50 variables, kept 6 used ones)
- `--border-color-*` (13 variables)
- `--ring-color-*` (14 variables)
- `--outline-color-*` (13 variables)
```

#### C. Remove Unused Component Variables (42 variables)

**Search and delete all lines containing:**

```
--avatar-
--toggle-
--slider-
--nav-item-
--tooltip-supporting-
--input-disabled-
--checkbox-disabled-
--radio-disabled-
```

**Document in `docs/REMOVED_CSS_VARIABLES.md`:**
```markdown
## Component-Specific Variables (42 variables)
Reason: Components not used or use different styling approach

- Avatar styles (8 variables)
- Toggle/switch styles (10 variables)
- Slider/range styles (8 variables)
- Nav item states (6 variables)
- Tooltip supporting text (4 variables)
- Disabled input states (6 variables)
```

#### D. Clean Up Dark Mode Section

**Important:** Also remove dark mode overrides for deleted variables

1. Scroll to `.dark-mode` selector (around line 1037)
2. Remove dark mode overrides for all deleted variables
3. Use same search patterns as above

### Step 1.3: Verify File Structure (15 minutes)

After removals, verify theme.css structure:

```css
@theme {
  /* Typography */
  --font-body: ...
  --font-display: ...
  --text-xs: ...
  /* ... other text sizes ... */
  --text-hero-fluid: ...

  /* Core Colors - KEEP THESE */
  --color-brand-25: ...
  --color-brand-50: ...
  /* ... through brand-950 ... */

  --color-accent-25: ...
  /* ... through accent-950 ... */

  --color-gray-25: ...
  /* ... keep standard gray scale ... */

  --color-error-25: ...
  /* ... keep error/warning/success ... */

  /* Semantic Colors - KEEP */
  --color-text-primary: ...
  --color-bg-primary: ...
  /* ... etc ... */

  /* Layout/Effects - KEEP */
  --shadow-xs: ...
  --radius-md: ...
  /* ... etc ... */
}

.dark-mode {
  /* Only overrides for kept variables */
}
```

**Expected Results:**
- File size: ~650 lines (down from 1,550)
- ~360 variables remain
- All removed sections documented

### Step 1.4: Test Theme Cleanup (2 hours)

**DO NOT SKIP TESTING**

#### Build Test
```bash
rm -rf .next
pnpm build
```

**Expected:** Build succeeds with no CSS errors

#### Visual Regression Test

Start dev server:
```bash
pnpm dev
```

**Test in Browser (Light Mode):**
- [ ] Homepage loads correctly
- [ ] All colors appear correct
- [ ] Buttons render properly (all variants)
- [ ] CardGridBlock section displays correctly
- [ ] FeaturesBlock section displays correctly
- [ ] HeroHeadingBlock displays correctly
- [ ] Blog listing page (`/news-insights`)
- [ ] Individual blog post page
- [ ] Style guide page (`/style-guide`)
- [ ] Navigation header
- [ ] Footer

**Test in Browser (Dark Mode):**
- [ ] Toggle dark mode (should have toggle in UI)
- [ ] Repeat all checks above
- [ ] Verify colors invert correctly
- [ ] Check buttons in dark mode
- [ ] Check all blocks in dark mode

**DevTools Check:**
- [ ] Open DevTools Console - no CSS errors
- [ ] Check Network tab - verify theme.css is smaller
- [ ] Inspect elements - verify CSS variables resolve correctly

#### Compare Screenshots
- [ ] Take new screenshots of same pages
- [ ] Compare to originals from Prerequisites step
- [ ] Should look **identical**

#### UUI Components Spot Check
- [ ] Button variants (primary, secondary, outline, ghost)
- [ ] Form inputs (text, select, checkbox, radio)
- [ ] Cards with featured icons
- [ ] Badges/pills
- [ ] Any custom UUI components you've added

**If any test fails:** STOP and rollback (see Rollback Procedures section)

### Step 1.5: Commit Phase 1 (5 minutes)

```bash
git add src/styles/theme.css
git add docs/REMOVED_CSS_VARIABLES.md
git commit -m "refactor(styles): remove 58% unused CSS variables from theme

- Remove 13 unused color palettes (156 vars)
- Remove utility wrapper system (307 vars)
- Remove unused component variables (42 vars)
- Reduce file size from 76KB to 32KB
- Improve maintainability and performance

Documented removed variables in docs/REMOVED_CSS_VARIABLES.md
All visual regression tests passed."
```

---

## Phase 2: Typography Unification

**Time:** 6-7 hours
**Goal:** Make rich text typography match UUI text scale exactly

### Step 2.1: Document Current Typography (30 minutes)

**Create reference file for comparison:**

```bash
touch docs/TYPOGRAPHY_BEFORE_AFTER.md
```

**Document in `docs/TYPOGRAPHY_BEFORE_AFTER.md`:**

```markdown
# Typography System - Before & After

## BEFORE (Inconsistent)

### UUI Text Scale (Blocks/Components)
- h1 equivalent: `text-display-lg` = 48px
- h2 equivalent: `text-display-md` = 36px
- h3 equivalent: `text-display-sm` = 30px
- h4 equivalent: `text-xl` = 20px
- Body: `text-md` = 17px mobile / 16px desktop

### Tailwind Prose (Rich Text)
- h1: 40.5px desktop / 32px mobile
- h2: 33.75px desktop / 24px mobile
- h3: 27px desktop / 20px mobile
- h4: 18px
- p: 18px desktop / 17px mobile

### Problem
Same semantic heading renders at different sizes depending on context.
Example: h2 in CardGridBlock (36px) vs h2 in rich text (33.75px)

## AFTER (Unified)

All text uses UUI text scale, both in components AND rich text.

### Unified Scale
- h1: 48px (--text-display-lg)
- h2: 36px (--text-display-md)
- h3: 30px (--text-display-sm)
- h4: 20px (--text-xl)
- h5/h6: 18px (--text-lg)
- p: 17px mobile / 16px desktop (--text-md)
```

### Step 2.2: Override Prose Styles (2 hours)

**File:** `/src/styles/richtext.css`

#### A. Find Current Prose Definitions

Look for sections like:
```css
.prose {
  font-size: 1.0625rem; /* 17px */
  line-height: 1.625rem; /* 26px */
}

.prose h1 {
  font-size: 2em;
  /* ... */
}
```

#### B. Replace with UUI Variable-Based Definitions

**Replace the entire `.prose` section with:**

```css
/* Base prose styles - use UUI text-md for body text */
.prose {
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  color: var(--color-text-primary);
}

/* Headings - use UUI display scale */
.prose h1 {
  font-size: var(--text-display-lg);
  line-height: var(--text-display-lg--line-height);
  letter-spacing: var(--text-display-lg--letter-spacing, -0.96px);
  font-family: var(--font-display);
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.prose h2 {
  font-size: var(--text-display-md);
  line-height: var(--text-display-md--line-height);
  letter-spacing: var(--text-display-md--letter-spacing, -0.72px);
  font-family: var(--font-display);
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

.prose h3 {
  font-size: var(--text-display-sm);
  line-height: var(--text-display-sm--line-height);
  font-family: var(--font-display);
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--color-text-primary);
}

.prose h4 {
  font-size: var(--text-xl);
  line-height: var(--text-xl--line-height);
  font-family: var(--font-display);
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

.prose h5,
.prose h6 {
  font-size: var(--text-lg);
  line-height: var(--text-lg--line-height);
  font-family: var(--font-display);
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
}

/* Paragraphs */
.prose p {
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  margin-top: 0;
  margin-bottom: 1rem;
}

/* Lists */
.prose ul,
.prose ol {
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.prose li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

/* Blockquotes */
.prose blockquote {
  font-size: var(--text-lg);
  line-height: var(--text-lg--line-height);
  font-style: italic;
  border-left: 4px solid var(--color-border-secondary);
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: var(--color-text-secondary);
}

/* Code blocks */
.prose code {
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);
}

.prose pre {
  font-size: var(--text-sm);
  line-height: var(--text-sm--line-height);
}

/* Links */
.prose a {
  color: var(--color-brand-600);
  text-decoration: underline;
  font-weight: 500;
}

.prose a:hover {
  color: var(--color-brand-700);
}

/* Strong/Bold */
.prose strong {
  font-weight: 600;
  color: var(--color-text-primary);
}

/* Emphasis/Italic */
.prose em {
  font-style: italic;
}
```

#### C. Add Responsive Behavior

**Add responsive overrides (if not already present):**

```css
/* Responsive - match UUI desktop behavior */
@media (min-width: 768px) {
  .prose {
    font-size: 16px; /* Desktop text-md is 16px */
    line-height: 24px;
  }

  .prose p {
    font-size: 16px;
    line-height: 24px;
  }

  /* Headings stay same size (already pixel-based via CSS vars) */
}
```

#### D. Handle prose-md Variant

**Find and update `.prose-md` section:**

```css
@media (min-width: 768px) {
  .prose-md {
    font-size: 16px;
    line-height: 24px;
  }

  .prose-md h1 {
    font-size: var(--text-display-lg);
    line-height: var(--text-display-lg--line-height);
  }

  .prose-md h2 {
    font-size: var(--text-display-md);
    line-height: var(--text-display-md--line-height);
  }

  .prose-md h3 {
    font-size: var(--text-display-sm);
    line-height: var(--text-display-sm--line-height);
  }

  /* Same pattern for h4-h6, p, etc. */
}
```

#### E. Keep prose-compact Variant

**Verify `.prose-compact` still exists and looks like:**

```css
.prose.prose-compact {
  font-size: var(--text-md) !important;
  line-height: var(--text-md--line-height) !important;
}

.prose.prose-compact h1,
.prose.prose-compact h2,
.prose.prose-compact h3,
.prose.prose-compact h4,
.prose.prose-compact h5,
.prose.prose-compact h6 {
  font-size: var(--text-md) !important;
  line-height: var(--text-md--line-height) !important;
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}
```

### Step 2.3: Update Dark Mode (30 minutes)

**File:** `/src/styles/richtext.css`

**Add dark mode overrides after prose definitions:**

```css
/* Dark mode adjustments */
.dark-mode .prose {
  color: var(--color-text-primary); /* Already uses CSS var, should work */
}

.dark-mode .prose h1,
.dark-mode .prose h2,
.dark-mode .prose h3,
.dark-mode .prose h4,
.dark-mode .prose h5,
.dark-mode .prose h6 {
  color: var(--color-text-primary);
}

.dark-mode .prose a {
  color: var(--color-brand-400); /* Lighter brand color for dark mode */
}

.dark-mode .prose a:hover {
  color: var(--color-brand-300);
}

.dark-mode .prose blockquote {
  color: var(--color-text-secondary);
  border-left-color: var(--color-border-secondary);
}

.dark-mode .prose strong {
  color: var(--color-text-primary);
}

.dark-mode .prose code {
  background-color: var(--color-gray-800);
  color: var(--color-gray-200);
}
```

### Step 2.4: Test Typography Changes (2 hours)

**DO NOT SKIP TESTING**

#### Build Test
```bash
rm -rf .next
pnpm build
```

**Expected:** Build succeeds with no errors

#### Visual Comparison Test

Start dev server:
```bash
pnpm dev
```

**Test Rich Text Rendering:**

1. **Navigate to a blog post** with rich text content
2. **Check heading sizes:**
   - [ ] h1 in rich text is now 48px (use DevTools inspector)
   - [ ] h2 in rich text is now 36px
   - [ ] h3 in rich text is now 30px
   - [ ] Body text is 17px mobile / 16px desktop

3. **Compare to block headers:**
   - [ ] Navigate to page with CardGridBlock
   - [ ] Check h2 in block (should also be 36px)
   - [ ] **They should now be identical**

4. **Check all rich text elements:**
   - [ ] Paragraphs render correctly
   - [ ] Lists (ul/ol) are readable
   - [ ] Blockquotes styled properly
   - [ ] Links are clickable and styled
   - [ ] Code blocks formatted correctly
   - [ ] Strong/bold text stands out
   - [ ] Italic text renders

5. **Test in Dark Mode:**
   - [ ] Toggle dark mode
   - [ ] Check all rich text elements again
   - [ ] Verify contrast is good
   - [ ] Links visible and readable

#### Typography Consistency Check

**Create comparison table using DevTools:**

| Element | Location | Expected Size | Actual Size | ✓/✗ |
|---------|----------|---------------|-------------|-----|
| h1 | Rich text | 48px | ___ | ___ |
| h1 | Hero block | 48px | ___ | ___ |
| h2 | Rich text | 36px | ___ | ___ |
| h2 | Card block | 36px | ___ | ___ |
| h3 | Rich text | 30px | ___ | ___ |
| h3 | Feature block | 30px | ___ | ___ |
| Body | Rich text | 16px (desktop) | ___ | ___ |
| Body | Card desc | 16px (desktop) | ___ | ___ |

**All should match across contexts now.**

#### Spacing Check

Rich text needs proper spacing:
- [ ] Headings have adequate top/bottom margin
- [ ] Paragraphs are spaced nicely
- [ ] Lists have proper indentation
- [ ] Content is readable and scannable

#### Responsive Check

```bash
# Test on mobile viewport
```
- [ ] Switch DevTools to mobile view (375px width)
- [ ] Check rich text is readable on mobile
- [ ] Verify responsive font sizes kick in
- [ ] Text doesn't overflow

**If any test fails:** Document issue and decide whether to fix or rollback

### Step 2.5: Commit Phase 2 (5 minutes)

```bash
git add src/styles/richtext.css
git add docs/TYPOGRAPHY_BEFORE_AFTER.md
git commit -m "feat(styles): unify typography scale across site

- Override Tailwind prose to use UUI text variables
- Make rich text headings match block headings exactly
- Add dark mode support for prose content
- Ensure responsive behavior matches UUI scale

Typography now consistent: h2 is always 36px whether in blocks or rich text.
Documented changes in docs/TYPOGRAPHY_BEFORE_AFTER.md"
```

---

## Phase 3: Documentation (2 hours)

**Time:** 2 hours
**Goal:** Document unified typography system for future developers

### Step 3.1: Create Typography System Guide (1 hour)

**Create file:** `/docs/TYPOGRAPHY_SYSTEM.md`

**Content:**

```markdown
# Typography System

**Last Updated:** 2025-10-29

## Overview

The site uses a **unified typography scale** based on UntitledUI text variables. This scale is used consistently across:
- Block components (CardGridBlock, FeaturesBlock, etc.)
- Rich text content (blog posts, content blocks)
- UI components (buttons, forms, navigation)

## Typography Scale Reference

### Display Sizes (Large Headings)

Use for hero sections, page titles, and major headings.

| Class | Size | Line Height | Letter Spacing | Usage |
|-------|------|-------------|----------------|-------|
| `text-display-2xl` | 72px | 90px | -1.44px | Massive hero headings |
| `text-display-xl` | 60px | 72px | -1.2px | XL hero headings |
| `text-display-lg` | 48px | 60px | -0.96px | Large hero headings, h1 |
| `text-display-md` | 36px | 44px | -0.72px | Page headings, h2 |
| `text-display-sm` | 30px | 38px | - | Section headings, h3 |
| `text-display-xs` | 24px | 32px | - | Small headings, h4 |

### Text Sizes (Body & Small Headings)

Use for body text, descriptions, labels.

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xl` | 20px | 30px | Large body text, subheadings |
| `text-lg` | 18px | 28px | Emphasized body, h5/h6 |
| `text-md` | 17px mobile / 16px desktop | 26px / 24px | Standard body text |
| `text-sm` | 14px | 20px | Small labels, captions |
| `text-xs` | 12px | 18px | Micro text, meta info |

### Special Sizes

| Class | Size | Usage |
|-------|------|-------|
| `text-hero-fluid` | `clamp(2.1rem, 5vw + 1rem, 6.5rem)` | Fluid hero headlines |

## Font Families

```css
--font-body: Inter
--font-display: Poppins
```

- **Inter** is used for body text, descriptions, labels
- **Poppins** is used for all headings (h1-h6, display classes)

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

The prose styles automatically map to UUI scale:
- `<h1>` → 48px (text-display-lg)
- `<h2>` → 36px (text-display-md)
- `<h3>` → 30px (text-display-sm)
- `<h4>` → 20px (text-xl)
- `<h5>`, `<h6>` → 18px (text-lg)
- `<p>` → 17px mobile / 16px desktop (text-md)

### Compact Variant

For rich text in cards/small spaces:

```tsx
<RichText
  content={content}
  enableProse={true}
  className="prose-compact"
/>
```

This makes all text (including headings) use `text-md` size.

## Responsive Behavior

Typography scales automatically:

**Mobile (< 768px):**
- text-md: 17px
- Most sizes stay same

**Desktop (≥ 768px):**
- text-md: 16px
- Display sizes unchanged (already large)

**Manual responsive classes:**
```tsx
className="text-sm md:text-md"  // 14px mobile, 16px desktop
className="text-display-sm md:text-display-md"  // 30px mobile, 36px desktop
```

## Dark Mode

All typography colors use CSS variables that automatically adjust:
- `--color-text-primary` (main text)
- `--color-text-secondary` (muted text)
- `--color-text-tertiary` (very muted)

No manual dark mode classes needed.

## Accessibility

- Minimum body text: 16px (text-md on desktop)
- Line heights: 1.5-1.6 for readability
- Color contrast: WCAG AA compliant
- Letter spacing on large headings: improves readability

## Migration Guide

If you find old prose with inconsistent sizing:

**Before:**
```tsx
<div className="prose">
  <h2>Heading</h2> {/* Was 33.75px */}
</div>
```

**After:**
```tsx
<RichText content={content} enableProse={true} />
{/* h2 now 36px, matches blocks */}
```

## Related Documentation

- [STYLING_SYSTEM.md](./STYLING_SYSTEM.md) - CSS variable system
- [STYLE_GUIDE.md](./STYLE_GUIDE.md) - Visual reference
- [BUTTON_SYSTEM.md](./BUTTON_SYSTEM.md) - Button typography
```

### Step 3.2: Update STYLING_SYSTEM.md (30 minutes)

**File:** `/docs/STYLING_SYSTEM.md`

Add a new section after the Color System section:

```markdown
## Typography System

The site uses a unified typography scale based on UntitledUI text variables.

**Full documentation:** See [TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md)

### Quick Reference

**Headings (Display Scale):**
- `text-display-lg` (48px) - h1, large hero
- `text-display-md` (36px) - h2, page titles
- `text-display-sm` (30px) - h3, section titles

**Body Text:**
- `text-md` (16-17px) - Standard body text
- `text-lg` (18px) - Emphasized body
- `text-sm` (14px) - Small text, captions

**Font Families:**
- Body: Inter (`--font-body`)
- Headings: Poppins (`--font-display`)

### Consistency Rules

1. **Same semantic level = same size everywhere**
   - h2 in a block = h2 in rich text = 36px

2. **Use classes for components, prose for rich text**
   - Components: `className="text-display-md"`
   - Rich text: `<RichText enableProse={true} />`

3. **Responsive strategy**
   - Mobile-first: `text-sm md:text-md`
   - Let CSS variables handle base sizes
```

### Step 3.3: Add Typography to Style Guide Page (30 minutes)

**File:** `/src/app/(frontend)/style-guide/page.tsx` (or similar)

If you don't have a style guide page yet, create one. Otherwise, add a typography section.

**Add section showing:**
1. All display sizes rendered
2. All text sizes rendered
3. Rich text rendering example
4. Comparison: block heading vs rich text heading

**Example section:**

```tsx
<section>
  <h2 className="text-display-md mb-8">Typography Scale</h2>

  <div className="space-y-12">
    {/* Display Sizes */}
    <div>
      <h3 className="text-display-sm mb-4">Display Sizes</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-tertiary">text-display-2xl (72px)</p>
          <h1 className="text-display-2xl">The quick brown fox</h1>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-display-xl (60px)</p>
          <h1 className="text-display-xl">The quick brown fox</h1>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-display-lg (48px)</p>
          <h1 className="text-display-lg">The quick brown fox</h1>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-display-md (36px)</p>
          <h2 className="text-display-md">The quick brown fox</h2>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-display-sm (30px)</p>
          <h3 className="text-display-sm">The quick brown fox</h3>
        </div>
      </div>
    </div>

    {/* Text Sizes */}
    <div>
      <h3 className="text-display-sm mb-4">Text Sizes</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-tertiary">text-xl (20px)</p>
          <p className="text-xl">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-lg (18px)</p>
          <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-md (16-17px)</p>
          <p className="text-md">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-sm (14px)</p>
          <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
        </div>
        <div>
          <p className="text-sm text-tertiary">text-xs (12px)</p>
          <p className="text-xs">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>
    </div>

    {/* Rich Text Example */}
    <div>
      <h3 className="text-display-sm mb-4">Rich Text Rendering</h3>
      <RichText
        content={sampleRichTextContent}
        enableProse={true}
        className="border border-gray-200 p-6 rounded-lg"
      />
    </div>
  </div>
</section>
```

### Step 3.4: Commit Documentation (5 minutes)

```bash
git add docs/TYPOGRAPHY_SYSTEM.md
git add docs/STYLING_SYSTEM.md
git add src/app/(frontend)/style-guide/page.tsx  # If modified
git commit -m "docs: add comprehensive typography system documentation

- Create TYPOGRAPHY_SYSTEM.md with complete scale reference
- Update STYLING_SYSTEM.md with typography section
- Add typography examples to style guide page
- Document usage patterns for blocks vs rich text
- Include accessibility and responsive behavior notes"
```

---

## Testing Checklist

Use this checklist for final comprehensive testing before merging.

### Build & Performance

- [ ] `pnpm build` succeeds with no errors
- [ ] `pnpm lint` passes
- [ ] Dev server starts without errors
- [ ] Build output shows reduced CSS bundle size
- [ ] No console errors in browser

### Visual Regression (Light Mode)

- [ ] Homepage renders correctly
- [ ] All block types display properly:
  - [ ] HeroHeadingBlock
  - [ ] CardGridBlock
  - [ ] FeaturesBlock
  - [ ] ContentBlock
  - [ ] CTABlock
  - [ ] AccordionBlock (if present)
- [ ] Blog listing page (`/news-insights`)
- [ ] Individual blog post pages
- [ ] Style guide page (`/style-guide`)
- [ ] Navigation header
- [ ] Footer
- [ ] All pages with rich text content

### Visual Regression (Dark Mode)

- [ ] Toggle dark mode in UI
- [ ] Repeat all visual checks from light mode
- [ ] Colors invert properly
- [ ] Text remains readable
- [ ] No flash of unstyled content (FOUC)

### Typography Consistency

- [ ] h1 in blocks = h1 in rich text (48px)
- [ ] h2 in blocks = h2 in rich text (36px)
- [ ] h3 in blocks = h3 in rich text (30px)
- [ ] Body text consistent everywhere (16-17px)
- [ ] Font families correct (Poppins for headings, Inter for body)
- [ ] Letter spacing on large headings looks good

### Rich Text Rendering

- [ ] Headings h1-h6 render at correct sizes
- [ ] Paragraphs have proper spacing
- [ ] Lists (ul/ol) formatted correctly
- [ ] Blockquotes styled properly
- [ ] Links are clickable and visible
- [ ] Code blocks formatted
- [ ] Strong/bold text stands out
- [ ] Italic text renders
- [ ] Images in rich text display correctly

### Responsive Behavior

Test on multiple viewport sizes:
- [ ] Mobile (375px) - text is readable, no overflow
- [ ] Tablet (768px) - responsive classes kick in
- [ ] Desktop (1440px) - everything looks polished
- [ ] Large desktop (1920px+) - content doesn't stretch too much

### UUI Components

- [ ] Buttons (all variants) render correctly
- [ ] Form inputs styled properly
- [ ] Cards with featured icons display correctly
- [ ] Badges/pills visible
- [ ] Navigation items work
- [ ] Any custom UUI components still function

### Accessibility

- [ ] Run Lighthouse accessibility audit (score > 95)
- [ ] Check color contrast (DevTools > Lighthouse)
- [ ] Keyboard navigation works
- [ ] Screen reader testing (optional but recommended)

### Cross-Browser (Optional but Recommended)

- [ ] Chrome/Edge (primary)
- [ ] Firefox
- [ ] Safari

---

## Rollback Procedures

If something goes wrong at any phase:

### Quick Rollback (During Development)

```bash
# Restore from backup
cp src/styles/theme.css.backup src/styles/theme.css

# Or reset to last commit
git checkout src/styles/theme.css
git checkout src/styles/richtext.css

# Clear cache
rm -rf .next

# Restart
pnpm dev
```

### Full Rollback (After Commit)

```bash
# See commit history
git log --oneline

# Revert to before changes (replace COMMIT_HASH)
git revert <COMMIT_HASH>

# Or hard reset (CAUTION: loses changes)
git reset --hard <COMMIT_HASH>

# Force push if already pushed to remote (CAUTION)
git push --force
```

### Partial Rollback

**Rollback only Phase 1 (theme cleanup):**
```bash
git checkout HEAD~2 src/styles/theme.css
git commit -m "revert: rollback theme cleanup, keep typography changes"
```

**Rollback only Phase 2 (typography):**
```bash
git checkout HEAD~1 src/styles/richtext.css
git commit -m "revert: rollback typography changes, keep theme cleanup"
```

---

## Reference Data

### Files Modified

- `/src/styles/theme.css` - Remove unused CSS variables
- `/src/styles/richtext.css` - Override prose to use UUI scale
- `/docs/REMOVED_CSS_VARIABLES.md` - NEW: Document removed variables
- `/docs/TYPOGRAPHY_BEFORE_AFTER.md` - NEW: Document typography changes
- `/docs/TYPOGRAPHY_SYSTEM.md` - NEW: Complete typography reference
- `/docs/STYLING_SYSTEM.md` - UPDATE: Add typography section
- `/src/app/(frontend)/style-guide/page.tsx` - UPDATE: Add typography examples

### Key Variables (Keep These)

**Typography:**
```
--font-body
--font-display
--text-xs through --text-xl
--text-display-xs through --text-display-2xl
--text-hero-fluid
All corresponding --line-height and --letter-spacing
```

**Colors (Core):**
```
--color-brand-* (all shades)
--color-accent-* (all shades)
--color-gray-* (standard gray scale)
--color-error-*, --color-warning-*, --color-success-*
--color-text-primary, --color-text-secondary, --color-text-tertiary
--color-bg-primary, --color-bg-secondary, etc.
--color-border-primary, --color-border-secondary, etc.
```

**Layout:**
```
--shadow-xs through --shadow-3xl
--radius-xs through --radius-full
--spacing-* (if present)
```

### Variables to Remove (Phase 1)

**Complete Color Palettes (0% usage):**
- cyan, teal, moss, rose, violet
- gray-blue, gray-cool, gray-modern, gray-neutral, gray-iron, gray-true, gray-warm
- green-light

**Utility Wrappers (0% usage):**
- All `--utility-*` variables
- `--background-*` wrappers
- `--text-*` wrappers (except used ones)
- `--border-color-*`
- `--ring-color-*`
- `--outline-color-*`

**Component Variables (0% usage):**
- Avatar, toggle, slider, nav-item, tooltip, input-disabled styles

### Expected Outcomes

**File Sizes:**
- theme.css: 1,550 lines → 650 lines (58% reduction)
- theme.css: 76KB → 32KB (44KB reduction)
- richtext.css: Slightly larger (added more explicit prose styles)

**Variable Count:**
- Before: 864 variables
- After: ~360 variables

**Typography:**
- Consistent across all contexts
- h1 always 48px
- h2 always 36px
- h3 always 30px
- Body always 16-17px

**Performance:**
- Faster CSS parsing
- Slightly faster initial load (9KB less gzipped CSS)
- Cleaner DevTools inspection

---

## Common Issues & Solutions

### Issue: Build fails with "CSS variable not found"

**Cause:** Accidentally removed a variable that's actually used

**Solution:**
1. Check error message for variable name
2. Grep codebase for that variable:
   ```bash
   grep -r "var(--variable-name)" src/
   ```
3. If used, restore from backup:
   ```bash
   # Find the variable in backup
   grep "--variable-name" src/styles/theme.css.backup
   # Copy back to theme.css
   ```

### Issue: Dark mode looks broken

**Cause:** Removed dark mode overrides along with base variables

**Solution:**
1. Check `.dark-mode` section in theme.css
2. Ensure all kept variables have dark mode overrides
3. Restore dark mode section from backup if needed

### Issue: Typography looks weird on mobile

**Cause:** Responsive overrides may be incorrect

**Solution:**
1. Check `@media (min-width: 768px)` sections
2. Verify mobile-first approach (base = mobile, media query = desktop)
3. Test with DevTools device emulation

### Issue: Rich text headings don't match blocks

**Cause:** Prose overrides not applied correctly

**Solution:**
1. Check richtext.css was modified properly
2. Clear cache: `rm -rf .next && pnpm dev`
3. Verify CSS variables resolve in DevTools
4. Check specificity (prose styles may need `!important`)

### Issue: UUI components look broken

**Cause:** Removed color variables that UUI needs

**Solution:**
1. Check which UUI component is broken
2. Inspect element to see which variable is missing
3. Restore that variable family from backup
4. Document in REMOVED_CSS_VARIABLES.md as "Needed by UUI"

---

## Post-Implementation

### After Successful Merge

1. **Monitor production** for any visual issues
2. **Update team** on new typography system
3. **Archive backup files** (don't delete yet)
4. **Update Slack/docs** with links to new documentation

### Future Maintenance

**Adding new colors:**
1. Check if existing color can be used first
2. If new color needed, add full scale (25-950)
3. Document in STYLING_SYSTEM.md
4. Add to style guide page

**Adding new text sizes:**
1. Check if existing size can be used first
2. If new size needed, add to theme.css `@theme` block:
   ```css
   --text-custom-size: 22px;
   --text-custom-size--line-height: 32px;
   ```
3. Document in TYPOGRAPHY_SYSTEM.md
4. Add to style guide page

**When importing new UUI components:**
1. Check if component uses any removed variables
2. If yes, restore only those specific variables
3. Test component thoroughly
4. Document restored variables

---

## Success Criteria

This implementation is successful when:

✅ All tests pass (build, lint, visual regression)
✅ File size reduced by ~44KB (theme.css: 76KB → 32KB)
✅ Typography consistent across blocks and rich text
✅ No visual regressions in light or dark mode
✅ Documentation complete and accurate
✅ Team understands new system
✅ Style guide page shows typography scale
✅ No console errors or warnings

---

## Questions?

If you encounter issues during implementation:

1. **Check Common Issues section** above
2. **Review git history** to see what changed
3. **Use git diff** to compare files:
   ```bash
   git diff HEAD~1 src/styles/theme.css
   ```
4. **Rollback if needed** and document the issue
5. **Consult with team** before proceeding with uncertain changes

---

**Document Version:** 1.0
**Last Updated:** 2025-10-29
**Author:** Claude Code
**Status:** Ready for Implementation
