# Centralized Motion Configuration System

**Status:** Future Implementation Plan
**Created:** 2025-10-14
**Priority:** Medium - Enhances UX with smoother animations
**Effort:** ~2-3 hours initial setup, gradual adoption

---

## Executive Summary

This document outlines a plan to create a centralized motion configuration system using Framer Motion to provide superior animation capabilities while respecting the existing TailwindCSS v4 + UntitledUI + Payload CMS architecture.

**Key Benefits:**
- Single source of truth for all animations
- Superior animation quality via Framer Motion
- Consistent timing and easing across entire site
- Easy to maintain and iterate
- Better mobile experience with gesture detection

---

## Table of Contents

1. [Background & Research](#background--research)
2. [Why Framer Motion?](#why-framer-motion)
3. [Architecture Integration](#architecture-integration)
4. [Implementation Guide](#implementation-guide)
5. [Migration Examples](#migration-examples)
6. [Best Practices](#best-practices)
7. [Testing Checklist](#testing-checklist)

---

## Background & Research

### Current State Analysis

**The project already uses Framer Motion extensively:**
- Package: `motion@12.23.22` and `motion-plus@1.5.4`
- Used in: Header dropdowns, menu animations, HeroHeadingBlock typewriter
- Current patterns:
  - AnimatePresence for enter/exit animations
  - Stagger animations for menu items
  - Height transitions with `height: "auto"`
  - Various hardcoded timing values scattered throughout

**Problems with current approach:**
1. **Inconsistent timing** - Different components use different durations (100ms, 200ms, 300ms, 500ms)
2. **Scattered configuration** - Animation values hardcoded in each component
3. **Mixed CSS/Motion** - Some hover states use CSS `transition`, some use Motion
4. **No gesture support** - Missing whileTap, whileDrag capabilities
5. **Difficult to maintain** - Changing animation feel requires hunting through files

### Research Findings

**File: `/src/components/uui/base/buttons/button.tsx`**
- Uses: `transition duration-100 ease-linear`
- UUI components have hardcoded transition values

**File: `/src/Header/components/NavMenuItem.tsx`**
- Uses: `transition duration-200 ease-linear` (line 28)
- Problem: `ease-linear` creates abrupt on/off effect
- Currently using CSS hover states instead of Motion capabilities

**File: `/src/Header/ui/Header.tsx`**
- Already using Motion for dropdown animations
- Uses `cubic-bezier(0.4, 0, 0.2, 1)` for smooth easing
- Demonstrates Motion is already core to the project

**File: `/src/styles/theme.css`**
- Contains keyframe animations (marquee, caret-blink, spin)
- NO transition timing constants defined
- All in `@theme` block following Tailwind v4 pattern

**File: `/src/app/(frontend)/globals.css`**
- Custom utility: `transition-inherit-all` (lines 25-29)
- Shows project already extends Tailwind with custom utilities

---

## Why Framer Motion?

### Superior Capabilities vs CSS Transitions

| Feature | CSS Transitions | Framer Motion |
|---------|----------------|---------------|
| **Easing** | Limited curves | Any bezier + spring physics |
| **Color Interpolation** | Browser-dependent | Consistent, smooth |
| **Layout Animations** | Manual calculation | Automatic with `layout` prop |
| **Gesture Detection** | Manual with JS | Built-in whileHover, whileTap |
| **Performance** | Good | Excellent (GPU accelerated) |
| **Orchestration** | Complex with JS | Simple with stagger, sequence |
| **Spring Physics** | Not available | Natural, physics-based motion |
| **Exit Animations** | Complex | Easy with AnimatePresence |

### Real-World Benefits for This Project

1. **Dropdown Menus** - Already using Motion, can enhance with better timing
2. **Hover States** - Smooth color transitions instead of CSS snap
3. **Mobile Experience** - Add tap feedback with whileTap
4. **Cards** - Add lift-on-hover with scale + shadow
5. **Forms** - Smooth validation state transitions
6. **Modals** - Spring-based entrance/exit

---

## Architecture Integration

### Respects Existing Architecture

**✅ Compatible with:**
- **TailwindCSS v4** - Uses Tailwind for layout, Motion for animation
- **@theme block** - Can reference CSS variables in Motion animations
- **UntitledUI components** - Enhances without breaking existing patterns
- **Payload CMS** - No impact on CMS integration
- **Server Components** - Motion only used in Client Components
- **Dark Mode** - CSS variables work with Motion animations

**✅ Follows Project Patterns:**
- Centralized configuration (like theme.css)
- TypeScript with strong typing
- Single source of truth principle
- Utility-first approach

**✅ No Breaking Changes:**
- Gradual adoption possible
- Existing components continue working
- Can mix CSS and Motion during transition
- No database migrations or CMS changes needed

---

## Implementation Guide

### Phase 1: Create Motion Configuration File

**File:** `/src/utilities/motion.ts`

```typescript
/**
 * Centralized motion configuration for consistent animations site-wide
 * Combines TailwindCSS utilities with Framer Motion capabilities
 *
 * @example
 * ```tsx
 * import { motion as motionConfig } from '@/utilities/motion'
 * import { motion } from 'motion/react'
 *
 * // Use Tailwind class
 * <div className={motionConfig.tailwind.hover}>Hover me</div>
 *
 * // Use Framer Motion
 * <motion.div
 *   variants={motionConfig.variants.fadeIn}
 *   transition={motionConfig.transitions.smooth}
 * >
 *   Content
 * </motion.div>
 * ```
 */

// ============================================================================
// TIMING CONSTANTS
// ============================================================================

export const duration = {
  instant: 0.1,   // 100ms - immediate feedback
  fast: 0.15,     // 150ms - hover states, quick transitions
  normal: 0.3,    // 300ms - standard animations (matches header dropdowns)
  slow: 0.5,      // 500ms - deliberate, emphasized motion (matches chevrons)
} as const

// ============================================================================
// EASING FUNCTIONS
// ============================================================================

export const easing = {
  // Smooth ease-in-out (Material Design standard)
  // Used in: Header dropdowns, menu items
  smooth: [0.4, 0, 0.2, 1] as const,

  // Sharp ease-out for exits
  easeOut: [0, 0, 0.2, 1] as const,

  // Sharp ease-in for entrances
  easeIn: [0.4, 0, 1, 1] as const,

  // Spring-like for playful interactions
  spring: [0.34, 1.56, 0.64, 1] as const,
} as const

// ============================================================================
// TAILWIND UTILITY CLASSES (for backwards compatibility)
// ============================================================================

export const tailwind = {
  // Hover transitions (for backgrounds, colors, borders)
  // Use when you can't use Motion (server components, simple cases)
  hover: 'transition-colors duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',

  // Transform transitions (for scale, rotate, translate)
  transform: 'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',

  // All properties (use sparingly, less performant)
  all: 'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',

  // Slow, deliberate transitions
  slow: 'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
} as const

// ============================================================================
// FRAMER MOTION TRANSITIONS
// ============================================================================

export const transitions = {
  // Smooth transition for most use cases
  smooth: {
    duration: duration.fast,
    ease: easing.smooth,
  },

  // Normal paced transition (matches header dropdown timing)
  normal: {
    duration: duration.normal,
    ease: easing.smooth,
  },

  // Slow, emphasized transition (matches chevron rotation)
  slow: {
    duration: duration.slow,
    ease: easing.smooth,
  },

  // Spring physics for natural motion
  // Best for: Scale animations, modals, cards
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },

  // Bouncy spring for playful interactions
  // Best for: Buttons, success states, celebrations
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 25,
  },

  // Gentle spring for subtle interactions
  // Best for: Hover states, focus states
  gentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 35,
  },
} as const

// ============================================================================
// FRAMER MOTION VARIANTS (Reusable animation states)
// ============================================================================

export const variants = {
  // Simple fade in/out
  // Use for: Content reveals, loading states
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },

  // Fade + slide from bottom
  // Use for: Modals, toast notifications
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },

  // Fade + slide from top
  // Use for: Dropdowns, tooltips
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },

  // Fade + slide from left
  // Use for: Sidebars, drawers
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },

  // Fade + slide from right
  // Use for: Sidebars, navigation
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },

  // Scale + fade (for modals, popovers)
  // Use for: Modals, dialogs, popovers
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },

  // Expand height (for accordions, dropdowns)
  // Use for: Accordions, collapsibles, dropdowns
  expandHeight: {
    hidden: { height: 0, opacity: 0 },
    visible: { height: 'auto', opacity: 1 },
  },

  // Expand width
  // Use for: Sidebars, sliding panels
  expandWidth: {
    hidden: { width: 0, opacity: 0 },
    visible: { width: 'auto', opacity: 1 },
  },
} as const

// ============================================================================
// STAGGER CONFIGURATIONS
// ============================================================================

export const stagger = {
  // Fast stagger for small lists (3-5 items)
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },

  // Normal stagger (6-10 items)
  // Used in: Mobile menu (current implementation)
  normal: {
    staggerChildren: 0.1,
    delayChildren: 0.15,
  },

  // Slow, dramatic stagger (hero sections, galleries)
  slow: {
    staggerChildren: 0.15,
    delayChildren: 0.2,
  },

  // Submenu stagger (nested dropdowns)
  // Used in: Desktop dropdown submenus
  submenu: {
    staggerChildren: 0.08,
    delayChildren: 0.15,
  },
} as const

// ============================================================================
// HOVER ANIMATION PRESETS (for whileHover prop)
// ============================================================================

export const hover = {
  // Subtle scale up
  // Use for: Cards, images, interactive elements
  scale: {
    scale: 1.05,
    transition: transitions.spring,
  },

  // Slight lift with shadow (requires Tailwind shadow class)
  // Use for: Cards, buttons, clickable elements
  lift: {
    y: -4,
    scale: 1.02,
    transition: transitions.gentle,
  },

  // Brighten effect
  // Use for: Images, overlays
  brighten: {
    opacity: 0.8,
    transition: transitions.smooth,
  },

  // Subtle scale for small elements
  // Use for: Icons, small buttons
  scaleSubtle: {
    scale: 1.02,
    transition: transitions.gentle,
  },
} as const

// ============================================================================
// TAP ANIMATION PRESETS (for whileTap prop)
// ============================================================================

export const tap = {
  // Scale down (press effect)
  // Use for: Buttons, clickable cards
  scale: {
    scale: 0.95,
    transition: transitions.smooth,
  },

  // Slight scale down
  // Use for: Links, subtle interactions
  subtle: {
    scale: 0.98,
    transition: transitions.smooth,
  },

  // Spring bounce
  // Use for: Playful buttons, success actions
  bounce: {
    scale: 0.92,
    transition: transitions.bouncy,
  },
} as const

// ============================================================================
// MAIN EXPORT (Namespaced for easy imports)
// ============================================================================

export const motion = {
  duration,
  easing,
  tailwind,
  transitions,
  variants,
  stagger,
  hover,
  tap,
} as const

// Type exports for TypeScript autocomplete
export type MotionConfig = typeof motion
export type MotionDuration = typeof duration
export type MotionEasing = typeof easing
export type MotionTransitions = typeof transitions
export type MotionVariants = typeof variants
export type MotionStagger = typeof stagger
export type MotionHover = typeof hover
export type MotionTap = typeof tap
```

---

### Phase 2: Update NavMenuItem (Immediate Win)

**File:** `/src/Header/components/NavMenuItem.tsx`

**Before:**
```tsx
export const NavMenuItemLink = ({ href, icon: Icon, ... }) => (
    <a
        href={href}
        className={cx(
            "inline-flex w-full gap-3 px-4 py-3 outline-focus-ring transition duration-200 ease-linear focus-visible:outline-2 sm:max-w-80 sm:p-3 rounded-md",
            "hover:bg-brand-900 dark:hover:bg-gray-100",
            className,
        )}
    >
```

**After:**
```tsx
import { motion as motionConfig } from '@/utilities/motion'
import { motion } from 'motion/react'

export const NavMenuItemLink = ({ href, icon: Icon, ... }) => (
    <motion.a
        href={href}
        className={cx(
            // Remove CSS transition classes
            "inline-flex w-full gap-3 px-4 py-3 outline-focus-ring focus-visible:outline-2 sm:max-w-80 sm:p-3 rounded-md",
            // Keep non-hover styles
            className,
        )}
        // Add Framer Motion animations
        whileHover={{
            backgroundColor: 'var(--color-bg-brand-900)',
            scale: 1.01, // Subtle grow effect
            transition: motionConfig.transitions.smooth,
        }}
        whileTap={motionConfig.tap.subtle}
    >
```

**What changed:**
1. `<a>` → `<motion.a>` (enables Motion capabilities)
2. Removed CSS classes: `transition duration-200 ease-linear hover:bg-brand-900`
3. Added `whileHover` with smooth color transition and subtle scale
4. Added `whileTap` for mobile press feedback
5. Uses CSS variable for color (respects dark mode)

**Benefits:**
- ✅ Smoother color interpolation
- ✅ Subtle scale adds responsive feel
- ✅ Tap feedback improves mobile UX
- ✅ Centralized timing (change in one place)
- ✅ Better performance (GPU accelerated)

---

### Phase 3: Update Header Animations (Consistency)

**File:** `/src/Header/ui/Header.tsx`

**Find and replace hardcoded values with config:**

```tsx
// Before:
transition={{
  height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  opacity: { duration: 0.3 }
}}

// After:
import { motion as motionConfig } from '@/utilities/motion'

transition={{
  height: motionConfig.transitions.normal,
  opacity: motionConfig.transitions.smooth,
}}
```

**Benefits:**
- Single source of truth
- Easy to adjust timing site-wide
- More maintainable code

---

### Phase 4: Update CMSDropdown (Consistency)

**File:** `/src/Header/components/CMSDropdown.tsx`

```tsx
// Before:
variants={{
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  },
  ...
}}

// After:
import { motion as motionConfig } from '@/utilities/motion'

variants={{
  visible: {
    transition: motionConfig.stagger.submenu
  },
  ...
}}
```

---

## Migration Examples

### Example 1: Simple Hover State

**Before (CSS):**
```tsx
<div className="bg-white hover:bg-gray-100 transition duration-200">
  Content
</div>
```

**After (Framer Motion):**
```tsx
import { motion as motionConfig } from '@/utilities/motion'
import { motion } from 'motion/react'

<motion.div
  className="bg-white"
  whileHover={{
    backgroundColor: 'var(--color-bg-secondary)',
    transition: motionConfig.transitions.smooth,
  }}
>
  Content
</motion.div>
```

---

### Example 2: Card with Lift Effect

**Before:**
```tsx
<div className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
  Card content
</div>
```

**After:**
```tsx
<motion.div
  className="bg-white shadow-md"
  whileHover={motionConfig.hover.lift}
  whileTap={motionConfig.tap.subtle}
>
  Card content
</motion.div>
```

---

### Example 3: Button with Spring Physics

**Before:**
```tsx
<button className="bg-brand-500 hover:bg-brand-600 transition duration-150">
  Click me
</button>
```

**After:**
```tsx
<motion.button
  className="bg-brand-500"
  whileHover={{
    backgroundColor: 'var(--color-bg-brand-600)',
    scale: 1.05,
    transition: motionConfig.transitions.spring,
  }}
  whileTap={motionConfig.tap.bounce}
>
  Click me
</motion.button>
```

---

### Example 4: Staggered List

**Before (no animation):**
```tsx
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

**After (with stagger):**
```tsx
<motion.ul
  variants={{
    visible: { transition: motionConfig.stagger.normal }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.li
      key={item.id}
      variants={motionConfig.variants.fadeIn}
    >
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

---

## Best Practices

### 1. When to Use Motion vs CSS

**Use Framer Motion for:**
- ✅ Interactive elements (hover, tap, drag)
- ✅ Complex animations (stagger, sequence, orchestration)
- ✅ Layout animations (position/size changes)
- ✅ Spring physics
- ✅ Gesture-driven animations

**Use CSS Transitions for:**
- ✅ Server Components (can't use Motion)
- ✅ Very simple hover states
- ✅ When Motion would be overkill
- ✅ Static animations (keyframes)

### 2. Performance Considerations

**✅ DO:**
- Animate transform and opacity (GPU accelerated)
- Use `layout` prop for position/size animations
- Limit number of simultaneous animations
- Use `transition-inherit-all` for child elements

**❌ DON'T:**
- Animate width/height directly (use scale instead)
- Animate too many elements at once
- Nest too many Motion components
- Animate on every state change

### 3. Dark Mode Integration

**Always use CSS variables for colors:**

```tsx
// ✅ GOOD - Respects dark mode
whileHover={{
  backgroundColor: 'var(--color-bg-brand-900)',
}}

// ❌ BAD - Hardcoded, breaks dark mode
whileHover={{
  backgroundColor: '#1689FF',
}}
```

### 4. TypeScript Best Practices

**Import types for better autocomplete:**

```tsx
import { motion as motionConfig, type MotionConfig } from '@/utilities/motion'

// Type-safe usage
const myTransition: MotionConfig['transitions']['smooth'] = motionConfig.transitions.smooth
```

### 5. Naming Conventions

**Component props:**
- `variants` - Animation states
- `initial` - Starting state
- `animate` - Target state
- `exit` - Exit state (requires AnimatePresence)
- `transition` - Timing configuration
- `whileHover` - Hover state
- `whileTap` - Tap/press state

### 6. Gradual Migration Strategy

**Phase 1:** High-impact, user-facing elements
- Dropdown menu items (NavMenuItem) ✅
- Buttons
- Cards

**Phase 2:** Interactive components
- Form elements
- Modal dialogs
- Tabs

**Phase 3:** Page transitions
- Route animations
- Section reveals
- Scroll-triggered animations

---

## Testing Checklist

### After Implementing Motion Config

**Visual Testing:**
- [ ] Dropdown menu hover feels smooth (no snap)
- [ ] Mobile tap feedback is noticeable
- [ ] Animations work in both light and dark modes
- [ ] No janky/stuttering animations
- [ ] Stagger timing feels natural

**Performance Testing:**
- [ ] No frame drops during animations
- [ ] Animations run at 60fps
- [ ] Page load time unaffected
- [ ] Mobile performance is good

**Cross-browser Testing:**
- [ ] Chrome - animations smooth
- [ ] Safari - animations smooth
- [ ] Firefox - animations smooth
- [ ] Mobile Safari - tap feedback works
- [ ] Mobile Chrome - tap feedback works

**Accessibility Testing:**
- [ ] Animations respect prefers-reduced-motion
- [ ] Keyboard navigation still works
- [ ] Screen readers not confused by animations
- [ ] Focus states visible

**Code Quality:**
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] No unused imports
- [ ] Proper code formatting

---

## Future Enhancements

### Phase 1 (Immediate)
- Create motion.ts configuration file
- Update NavMenuItem with whileHover
- Update Header animations to use config

### Phase 2 (Short-term)
- Add prefers-reduced-motion support
- Create animation hook: `useMotion()`
- Add scroll-triggered animations
- Document patterns in style guide

### Phase 3 (Long-term)
- Page transition animations
- Micro-interactions library
- Animation playground component
- Performance monitoring

---

## References

### Internal Documentation
- `/docs/STYLING_SYSTEM.md` - CSS variable system
- `/docs/STYLING_BEST_PRACTICES.md` - Site-wide consistency
- `/docs/UUI_COMPONENTS_REFERENCE.md` - Component patterns

### External Resources
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Motion One (powers Framer Motion)](https://motion.dev/)
- [Material Design Motion](https://material.io/design/motion/)

---

## Questions & Answers

### Q: Why not just use Tailwind transitions?
**A:** Framer Motion provides:
- Spring physics for natural motion
- Better color interpolation
- Gesture detection (tap, hover, drag)
- Layout animations
- Exit animations with AnimatePresence
- Superior performance via GPU acceleration

### Q: Will this break existing UUI components?
**A:** No. We're enhancing, not replacing. UUI components continue working. We gradually adopt Motion for better animations.

### Q: What about bundle size?
**A:** Motion is already in the project (`motion@12.23.22`). Adding config file adds ~2KB. Tree-shaking removes unused exports.

### Q: How does this work with server components?
**A:** Motion only works in Client Components. Use `'use client'` directive or fallback to CSS transitions for server components.

### Q: What about prefers-reduced-motion?
**A:** Can add wrapper hook that respects motion preferences:
```tsx
const useMotion = () => {
  const prefersReduced = useReducedMotion()
  return prefersReduced ? motionConfig.reduced : motionConfig
}
```

---

## Implementation Timeline

**Estimated Time:**
- Create motion.ts: 30 minutes
- Update NavMenuItem: 15 minutes
- Update Header animations: 30 minutes
- Testing: 30 minutes
- Documentation: 15 minutes

**Total: ~2 hours for Phase 1**

**Gradual adoption of remaining components: Ongoing**

---

## Success Metrics

After full implementation:
- ✅ All animations use centralized configuration
- ✅ Hover states feel noticeably smoother
- ✅ Mobile tap feedback improves UX
- ✅ Animation timing consistent across site
- ✅ Easy to adjust motion feel in one place
- ✅ No performance degradation
- ✅ Accessibility maintained

---

**End of Document**

*This plan is ready for implementation when needed. Start with Phase 1 (create motion.ts + update NavMenuItem) for immediate impact with minimal effort.*
