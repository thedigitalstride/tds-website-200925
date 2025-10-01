# Styles Directory - TDS Website

This directory contains the core styling system for the TDS website, built on **Tailwind CSS v4** with **UntitledUI** design system integration.

## File Structure

```
src/styles/
├── theme.css           # UUI theme system with @theme block (DO NOT MODIFY)
├── richtext.css        # Rich text typography for light/dark modes
├── frontend.css        # Base Tailwind v4 configuration (DO NOT MODIFY)
└── payloadStyles.css   # Payload CMS admin panel styles
```

## 📄 File Descriptions

### `theme.css` ⚠️ CRITICAL
**Purpose:** Complete UntitledUI theme with Tailwind v4 `@theme` block containing all CSS variables for colors, typography, spacing, and component theming.

**Key Features:**
- Brand color system (#1689FF blue)
- Light/dark mode color definitions
- Typography scale (text-xs to display-2xl)
- Component-specific colors (buttons, borders, backgrounds)
- Shadow system
- Animation keyframes

**Rules:**
- ❌ DO NOT modify this file directly
- ✅ Only edit brand colors in lines 124-139
- ✅ Add new CSS variables within the `@theme` block
- See [CLAUDE.md](../CLAUDE.md#-critical-untitledui-integration--theme-system) for theme management guidelines

### `richtext.css` ✅ SAFE TO EDIT
**Purpose:** All typography styling for Payload CMS rich text content with full light/dark mode support.

**What it controls:**
- Blog post typography (headings, paragraphs, lists)
- Code blocks (inline and block)
- Blockquotes and quotes
- Tables and horizontal rules
- Links and their hover states
- Images and captions
- Responsive typography scaling

**Key Features:**
- ✅ Uses UUI theme variables for consistency
- ✅ Full light/dark mode support via `.dark-mode` class
- ✅ Extends `@tailwindcss/typography` plugin
- ✅ Post-specific overrides (`.prose-centered-quote`)
- ✅ Payload block integration styles

**When to edit:**
- Changing rich text typography (font sizes, spacing)
- Adjusting code block appearance
- Modifying link colors or hover states
- Customizing blockquote styling
- Fine-tuning responsive breakpoints

**How to test changes:**
```bash
# After editing, clear cache and restart
rm -rf .next && pnpm dev
```

### `frontend.css` ⚠️ DO NOT MODIFY
**Purpose:** Base Tailwind v4 configuration with essential CSS variables.

**Contains:**
- Core Tailwind v4 setup
- Base layer definitions
- Essential CSS variables

**Rules:**
- ❌ DO NOT modify - maintained by Tailwind v4
- Contains critical system variables

### `payloadStyles.css`
**Purpose:** Payload CMS admin panel styling.

**What it controls:**
- Admin UI appearance
- Form field styling
- Collection list views

## 🎨 How the Styling System Works

### Import Order (Critical)
In [src/app/(frontend)/globals.css](../app/(frontend)/globals.css):

```css
@import "tailwindcss";                /* 1. Base Tailwind v4 */
@import "../../styles/theme.css";      /* 2. UUI theme variables */
@import "../../styles/richtext.css";   /* 3. Rich text typography */

@plugin "tailwindcss-animate";
@plugin "tailwindcss-react-aria-components";
@plugin "@tailwindcss/typography";     /* 4. Typography plugin (extended by richtext.css) */
```

**Why this order matters:**
1. Tailwind v4 establishes base system
2. Theme variables define color/typography system
3. Rich text styles extend typography plugin with theme variables
4. Plugins add additional functionality

### Light/Dark Mode Implementation

The system uses **class-based dark mode** with `.dark-mode` class:

```css
/* Light mode - defined in @theme block */
.prose {
  --tw-prose-body: var(--color-text-secondary);
  --tw-prose-links: var(--color-text-brand-secondary);
}

/* Dark mode - overrides in @layer base */
.dark-mode .prose {
  --tw-prose-body: var(--color-text-secondary); /* Auto-adjusts via theme */
  --tw-prose-links: var(--color-brand-400);     /* Lighter brand color */
}
```

**How it works:**
1. UUI theme defines color variables for both modes
2. `.dark-mode` class switches color definitions
3. Rich text styles reference these variables
4. System automatically adapts without manual overrides

### Using Rich Text Styles

#### In React Components:
```tsx
import RichText from '@/components/RichText'

// Standard usage
<RichText data={content} />

// With custom classes
<div className="prose prose-centered-quote">
  <RichText data={content} enableProse={false} />
</div>

// Disable prose styling
<RichText data={content} enableProse={false} />
```

#### Available Classes:
- `.prose` - Base typography styling
- `.prose-centered-quote` - Centered blockquotes (for blog posts)
- `.prose-md` - Medium size (default)
- `.prose-lg` - Large size (desktop)
- `.dark-mode` - Dark mode (automatically applied)

## 🔧 Customization Guide

### Changing Typography Colors

**Edit:** `richtext.css`

```css
/* Light mode */
.prose {
  --tw-prose-headings: var(--color-text-primary);
  --tw-prose-body: var(--color-text-secondary);
  --tw-prose-links: var(--color-text-brand-secondary);
}

/* Dark mode */
.dark-mode .prose {
  --tw-prose-headings: var(--color-text-primary);
  --tw-prose-links: var(--color-brand-400);
}
```

**Available color variables:** See [theme.css:678-910](theme.css) for full list.

### Changing Brand Colors

**Edit:** `theme.css` (lines 124-139)

```css
@theme {
  /* Brand colors - using #1689FF */
  --color-brand-500: rgb(22 137 255);    /* Main brand color */
  --color-brand-600: rgb(20 123 230);    /* Hover state */

  /* Update these for UUI buttons */
  --color-brand-solid: var(--color-brand-500);
  --color-brand-solid_hover: var(--color-brand-600);
}
```

**After changing:**
```bash
rm -rf .next && pnpm dev
```

### Adding Custom Rich Text Styles

**Edit:** `richtext.css`

Add your styles at the bottom:

```css
/* ============================================================================
   CUSTOM STYLES
   ========================================================================= */

/* Example: Highlight boxes */
.prose .highlight-box {
  background-color: var(--color-bg-brand-primary);
  border-left: 4px solid var(--color-border-brand);
  padding: 1.5em;
  margin: 2em 0;
  border-radius: 0.5rem;
}

.dark-mode .prose .highlight-box {
  background-color: var(--color-bg-secondary);
  border-color: var(--color-brand-400);
}
```

## 🐛 Troubleshooting

### Rich text colors not changing in dark mode

**Solution:**
1. Check if `.dark-mode` class is applied to `<html>` or `<body>`
2. Verify color variables are defined in both light/dark sections of `theme.css`
3. Clear Next.js cache: `rm -rf .next && pnpm dev`

### Styles not applying

**Solution:**
1. Check import order in [globals.css](../app/(frontend)/globals.css)
2. Ensure `richtext.css` is imported after `theme.css`
3. Verify `.prose` class is applied to rich text container
4. Check browser console for CSS errors

### Brand colors not updating

**Solution:**
1. Edit only the brand color section in `theme.css` (lines 124-139)
2. Maintain RGB format: `rgb(22 137 255)`
3. Update `--color-brand-solid` variables
4. Clear cache: `rm -rf .next && pnpm dev`

## 📚 Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Complete project documentation
- [Theme System Guide](../CLAUDE.md#-critical-untitledui-integration--theme-system)
- [UUI Components Reference](../../docs/UUI_COMPONENTS_REFERENCE.md)
- [TypeScript Patterns](../../docs/TYPESCRIPT_PATTERNS.md)

## ⚠️ Important Notes

1. **Never remove files from this directory** - all files are required for the styling system
2. **Test after changes** - always clear `.next` cache after editing CSS files
3. **Use theme variables** - never use hardcoded colors, always reference CSS variables
4. **Follow UUI conventions** - maintain consistency with UntitledUI design system
5. **Document custom styles** - add comments explaining any custom additions to `richtext.css`

## 🎯 Best Practices

### DO:
- ✅ Use CSS variables from `theme.css`
- ✅ Add custom styles to `richtext.css`
- ✅ Test in both light and dark modes
- ✅ Use semantic color names (e.g., `--color-text-primary`)
- ✅ Follow existing patterns for consistency

### DON'T:
- ❌ Modify `theme.css` outside brand color section
- ❌ Use hardcoded color values
- ❌ Remove existing files
- ❌ Override UUI component styles directly
- ❌ Skip testing after changes

## 🔄 Development Workflow

1. **Make changes** to `richtext.css`
2. **Clear cache**: `rm -rf .next`
3. **Restart dev server**: `pnpm dev`
4. **Test in browser** (both light/dark modes)
5. **Verify** on actual post pages
6. **Commit** changes with clear description

---

**Last Updated:** 2025-10-01
**Tailwind Version:** 4.1.13
**UntitledUI Integration:** Custom theme system
