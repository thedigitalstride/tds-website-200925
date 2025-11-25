# Removed CSS Variables

**Date**: 2025-10-30
**Branch**: feature/theme-cleanup

This document tracks all CSS variables removed during the theme cleanup process to reduce file size and improve maintainability.

## Summary

- **Total Variables Before**: 864
- **Variables Removed**: 505 (58%)
- **Variables Remaining**: ~360
- **File Size Reduction**: ~44KB (76KB → 32KB)

---

## Phase 1: Color Palette Removals

### Complete Color Palettes (156 variables)

**Reason**: 0% usage across entire codebase. These color palettes were part of the UntitledUI base theme but are not used in this project.

**Removed Palettes** (13 palettes × 12 shades each):

1. **Cyan** (`--color-cyan-25` through `--color-cyan-950`) - 12 variables
2. **Teal** (`--color-teal-25` through `--color-teal-950`) - 12 variables
3. **Moss** (`--color-moss-25` through `--color-moss-950`) - 12 variables
4. **Rose** (`--color-rose-25` through `--color-rose-950`) - 12 variables
5. **Violet** (`--color-violet-25` through `--color-violet-950`) - 12 variables
6. **Gray Blue** (`--color-gray-blue-25` through `--color-gray-blue-950`) - 12 variables
7. **Gray Cool** (`--color-gray-cool-25` through `--color-gray-cool-950`) - 12 variables
8. **Gray Modern** (`--color-gray-modern-25` through `--color-gray-modern-950`) - 12 variables
9. **Gray Neutral** (`--color-gray-neutral-25` through `--color-gray-neutral-950`) - 12 variables
10. **Gray Iron** (`--color-gray-iron-25` through `--color-gray-iron-950`) - 12 variables
11. **Gray True** (`--color-gray-true-25` through `--color-gray-true-950`) - 12 variables
12. **Gray Warm** (`--color-gray-warm-25` through `--color-gray-warm-950`) - 12 variables
13. **Green Light** (`--color-green-light-25` through `--color-green-light-950`) - 12 variables

**Kept Palettes**:
- Brand (TDS Blue #031A43)
- Accent (Light Blue #1689FF)
- Gray (standard scale)
- Error, Warning, Success
- Blue, Blue Light, Blue Dark, Indigo, Purple, Fuchsia, Pink, Orange, Orange Dark, Yellow, Green

---

## Phase 2: Utility Wrapper System (307 variables)

**Reason**: Abandoned pattern with 0% usage. These wrapper variables added unnecessary indirection.

### Utility Color Variables (~200 variables)

All `--utility-*` variables removed:
- `--utility-blue-*`
- `--utility-brand-*`
- `--utility-gray-*`
- `--utility-error-*`
- `--utility-warning-*`
- `--utility-success-*`
- And many more utility wrappers

### Property Wrapper Variables (107 variables)

**Background Wrappers** (39 variables):
- `--background-color-quaternary`
- `--background-color-brand-solid`
- `--background-color-disabled`
- `--background-color-primary`
- `--background-color-primary-solid`
- And 34 more...

**Text Color Wrappers** (28 variables, kept 6 used ones):
- `--text-color-primary`
- `--text-color-secondary`
- `--text-color-tertiary`
- And 25 more...

**Border Color Wrappers** (13 variables):
- `--border-color-primary`
- `--border-color-secondary`
- `--border-color-tertiary`
- And 10 more...

**Ring Color Wrappers** (14 variables):
- `--ring-color-bg-brand-solid`
- `--ring-color-primary`
- `--ring-color-secondary`
- And 11 more...

**Outline Color Wrappers** (13 variables):
- `--outline-color-brand`
- `--outline-color-primary`
- `--outline-color-secondary`
- And 10 more...

**Note**: Direct semantic variables (`--color-bg-*`, `--color-text-*`, `--color-border-*`) are kept and actively used.

---

## Phase 3: Component-Specific Variables (42 variables)

**Reason**: Components not used or use different styling approach.

### Avatar Styles (8 variables)
- `--color-avatar-bg`
- `--color-avatar-contrast-border`
- `--color-avatar-profile-photo-border`
- `--color-avatar-styles-bg-neutral`
- And 4 dark mode overrides

### Toggle/Switch Styles (10 variables)
- `--color-toggle-border`
- `--color-toggle-button-fg_disabled`
- `--color-toggle-slim-border_pressed`
- `--color-toggle-slim-border_pressed-hover`
- And 6 dark mode overrides

### Slider/Range Styles (8 variables)
- `--color-slider-handle-bg`
- `--color-slider-handle-border`
- And 6 dark mode overrides

### Navigation Item States (6 variables)
- `--color-nav-item-button-icon-fg`
- `--color-nav-item-button-icon-fg_active`
- `--color-nav-item-icon-fg`
- `--color-nav-item-icon-fg_active`
- And 2 dark mode overrides

### Tooltip Supporting Text (4 variables)
- `--color-tooltip-supporting-text`
- And 3 dark mode overrides

### Disabled Input States (6 variables)
- `--color-input-disabled-*` (if present)
- `--color-checkbox-disabled-*` (if present)
- `--color-radio-disabled-*` (if present)

---

## Dark Mode Cleanup

All dark mode overrides for removed variables were also deleted from the `.dark-mode` selector block to maintain consistency and further reduce file size.

---

## Restoration

If any removed variable is needed in the future, it can be restored from:
1. The backup file: `src/styles/theme.css.backup`
2. Git history: `git show HEAD~1:src/styles/theme.css`
3. UntitledUI documentation: Original color palette definitions

---

## Verification

After removal, verify that:
- ✅ Build succeeds: `pnpm build`
- ✅ No CSS errors in console
- ✅ All pages render correctly in light mode
- ✅ All pages render correctly in dark mode
- ✅ UUI components function properly
- ✅ File size reduced significantly

