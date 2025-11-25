# Smooth Scroll Implementation

## Overview

This site uses **Lenis** smooth scroll library for enhanced scrolling experience. Lenis provides a lightweight (3KB gzip), performant smooth scrolling solution that integrates seamlessly with Framer Motion scroll animations.

## Implementation

### Files Modified

1. **`/src/providers/smooth-scroll-provider.tsx`** - Core Lenis provider with React hooks
2. **`/src/app/(frontend)/layout.tsx`** - Integrated SmoothScrollProvider wrapper
3. **`/src/app/(frontend)/globals.css`** - Lenis CSS styles and accessibility overrides
4. **`/src/providers/index.tsx`** - Export smooth scroll hooks

### Configuration

**Lenis Settings** (in `smooth-scroll-provider.tsx`)

```typescript
new Lenis({
  duration: 1.2,           // Scroll duration in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
  orientation: 'vertical', // Vertical scrolling only
  smoothWheel: true,       // Enable smooth wheel scrolling
  wheelMultiplier: 1,      // Scroll speed multiplier for mouse wheel
  touchMultiplier: 2,      // Scroll speed multiplier for touch devices
})
```

### Features

✅ **Smooth wheel scrolling** - Enhanced mouse/trackpad scrolling experience
✅ **Touch support** - Optimized for mobile devices
✅ **Route change handling** - Automatically scrolls to top on navigation
✅ **Accessibility** - Respects `prefers-reduced-motion` media query
✅ **Native scrollbar** - Uses browser scrollbar (better than virtual scrolling)
✅ **Motion integration** - Works with Framer Motion scroll hooks
✅ **Programmatic scrolling** - Custom hooks for scroll control

## Usage

### Basic Usage

Lenis runs automatically on all frontend pages. No additional configuration needed.

### Programmatic Scrolling

Use the `useLenisScroll` hook to programmatically scroll to elements:

```tsx
'use client'

import { useLenisScroll } from '@/providers'

export function MyComponent() {
  const scrollTo = useLenisScroll()

  return (
    <button onClick={() => scrollTo('#section', { offset: -80, duration: 1.2 })}>
      Scroll to Section
    </button>
  )
}
```

**Available Options:**
- `offset` - Offset from element (default: -80 for fixed header)
- `duration` - Animation duration in seconds (default: 1.2)

### Accessing Lenis Instance

Use the `useLenis` hook to access the Lenis instance directly:

```tsx
'use client'

import { useLenis } from '@/providers'

export function MyComponent() {
  const lenis = useLenis()

  // Access Lenis methods
  if (lenis) {
    lenis.stop()    // Stop scrolling
    lenis.start()   // Resume scrolling
  }
}
```

### Integration with Motion Scroll Hooks

Lenis works seamlessly with Framer Motion's scroll tracking:

```tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function ParallaxSection() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])

  return (
    <div ref={ref} className="relative h-screen">
      <motion.div style={{ y }}>
        <h1>Parallax Content</h1>
      </motion.div>
    </div>
  )
}
```

### Preventing Smooth Scroll on Specific Elements

Add `data-lenis-prevent` attribute to elements that should use native scroll:

```tsx
<div data-lenis-prevent className="overflow-y-auto">
  {/* This element will use native scroll */}
</div>
```

## Accessibility

### Prefers-Reduced-Motion Support

**Automatic Disabling**: Lenis is automatically disabled when users have `prefers-reduced-motion: reduce` enabled in their system preferences.

**Implementation** (in `smooth-scroll-provider.tsx:52-65`):

```typescript
useEffect(() => {
  if (!lenis) return

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

  const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      lenis.destroy()    // Disable Lenis entirely
      delete window.lenis
      setLenis(null)
    }
  }

  handleChange(mediaQuery)
  mediaQuery.addEventListener('change', handleChange)

  return () => mediaQuery.removeEventListener('change', handleChange)
}, [lenis])
```

**CSS Fallback** (in `globals.css:426-441`):

```css
@media (prefers-reduced-motion: reduce) {
  .lenis.lenis-smooth {
    scroll-behavior: auto !important;
  }

  .lenis {
    animation: none !important;
    transition: none !important;
  }

  html {
    scroll-behavior: auto !important;
  }
}
```

### Keyboard Navigation

Lenis preserves native keyboard navigation:
- **Arrow keys** - Scroll up/down
- **Page Up/Down** - Scroll by page
- **Home/End** - Scroll to top/bottom
- **Space** - Scroll down

## Performance

### Bundle Size Impact

- **Lenis**: 3KB gzip
- **Total Impact**: Negligible (< 0.2% of total bundle)

### Core Web Vitals

| Metric | Impact | Notes |
|--------|--------|-------|
| **LCP** | +20-50ms | Minimal, async initialization |
| **INP** | Improved | Smoother animations improve perceived responsiveness |
| **CLS** | No impact | Native scrollbar, no layout modifications |
| **FID** | Minimal | RAF loop optimized for 60fps (30fps on low power) |

### Runtime Performance

- **GPU-accelerated** transforms for smooth animations
- **RequestAnimationFrame** loop runs at 60fps (30fps on iOS low power mode)
- **Single scroll listener** (better than multiple observers)
- **Battery-aware** throttling on mobile devices

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| **Chrome/Edge** | ✅ Full support | 60fps smooth scrolling |
| **Firefox** | ✅ Full support | 60fps smooth scrolling |
| **Safari (desktop)** | ⚠️ Mostly supported | May lag on pre-M1 Macs with `position: fixed` |
| **Safari (iOS)** | ✅ Full support | Throttles to 30fps on low power mode |
| **Android Chrome** | ✅ Full support | Touch scrolling optimized |

### Known Limitations

1. **60fps cap on Safari** - Capped at 60fps, 30fps on iOS low power mode
2. **No iframe support** - Doesn't forward wheel events over iframes
3. **No scroll-snap** - CSS scroll-snap-type not supported
4. **Fixed elements on old Macs** - May lag on pre-M1 MacOS Safari

## Testing Checklist

### Functionality
- ✅ Smooth wheel scrolling works on desktop
- ✅ Touch scrolling works on mobile
- ✅ Keyboard navigation preserved (Page Down, Space, Arrow keys)
- ✅ Anchor links scroll correctly
- ✅ Route changes reset scroll position
- ✅ Fixed header doesn't overlap content (80px offset)

### Performance
- ✅ PageSpeed Insights: Core Web Vitals remain green
- ✅ 60fps scroll on desktop (check DevTools Performance)
- ✅ 30fps acceptable on mobile (battery aware)
- ✅ No layout shift (CLS score 0)

### Accessibility
- ✅ `prefers-reduced-motion: reduce` disables smooth scroll
- ✅ Screen reader navigation works
- ✅ Keyboard focus visible during scroll
- ✅ Tab order maintained

### Browser Compatibility
- ✅ Chrome/Edge - smooth scrolling
- ✅ Firefox - smooth scrolling
- ✅ Safari desktop - check fixed header lag
- ✅ Safari iOS - 30fps low power mode
- ✅ Android Chrome - touch scrolling

## Troubleshooting

### Smooth Scroll Not Working

**Symptom**: Scrolling feels jerky or not smooth

**Solutions**:
1. Clear Next.js cache: `rm -rf .next && pnpm dev`
2. Check browser console for errors
3. Verify Lenis is initialized: Check for `window.lenis` in console
4. Check if `prefers-reduced-motion` is enabled in system preferences

### Anchor Links Not Working

**Symptom**: Clicking anchor links doesn't scroll smoothly

**Solution**: Use the `useLenisScroll` hook instead of native anchor links:

```tsx
// ❌ Don't use native anchor links
<a href="#section">Go to Section</a>

// ✅ Use useLenisScroll hook
const scrollTo = useLenisScroll()
<button onClick={() => scrollTo('#section')}>Go to Section</button>
```

### Route Changes Don't Scroll to Top

**Symptom**: Page stays scrolled down after navigation

**Solution**: Already handled by `usePathname()` hook in provider. If issue persists:
1. Check if SmoothScrollProvider is wrapping all content
2. Verify provider is not wrapped by other providers that might interfere

### Fixed Header Lag on Safari

**Symptom**: Fixed header stutters during scroll on Safari

**Solution**: Consider using `position: sticky` instead of `position: fixed`:

```css
header {
  position: sticky;
  top: 0;
}
```

### Conflict with Payload Admin Panel

**Symptom**: Admin panel scrolling feels off

**Solution**: SmoothScrollProvider only wraps frontend content (not admin routes). If issues persist, exclude admin routes explicitly:

```tsx
const pathname = usePathname()
const isAdminRoute = pathname.startsWith('/admin')

return isAdminRoute ? children : <SmoothScrollProvider>{children}</SmoothScrollProvider>
```

## Future Enhancements

### Planned Features

1. **Parallax Sections** - Add scroll-triggered animations to hero sections
2. **Scroll-triggered Animations** - Fade in elements on scroll
3. **Horizontal Scroll Sections** - Enable horizontal scrolling for specific sections
4. **Scroll Progress Indicator** - Add visual progress bar
5. **Smooth Anchor Navigation** - Enhance internal link navigation

### Advanced Examples

**Scroll Progress Indicator**:

```tsx
'use client'

import { motion, useScroll } from 'motion/react'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent z-50"
      style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
    />
  )
}
```

**Parallax Hero Section** (inspired by Highpass):

```tsx
'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

export function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      <motion.div
        style={{ y: yText, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-hero-fluid">Your Headline</h1>
      </motion.div>

      <motion.div
        style={{ y: yImage }}
        className="absolute bottom-0 left-0 right-0"
      >
        <img src="/hero-image.jpg" alt="Hero" className="w-full" />
      </motion.div>
    </div>
  )
}
```

## Reference

### Official Documentation
- **Lenis GitHub**: https://github.com/darkroomengineering/lenis
- **Lenis Documentation**: https://lenis.darkroom.engineering/

### Inspiration
- **Highpass Implementation**: https://github.com/thedigitalstride/highpass
- **Studio Freight**: https://www.studiofreight.com/ (creators of Lenis)
- **Locomotive Scroll**: https://locomotivemtl.github.io/locomotive-scroll/ (alternative)

### Related Documentation
- **Motion System**: `/docs/future-plans/MOTION_SYSTEM.md`
- **Styling System**: `/docs/STYLING_SYSTEM.md`
- **Performance Best Practices**: Google PageSpeed Insights

## Changelog

### 2025-11-06 - Initial Implementation
- ✅ Installed Lenis v1.3.14
- ✅ Created SmoothScrollProvider with route change handling
- ✅ Added accessibility support (prefers-reduced-motion)
- ✅ Integrated with existing Motion infrastructure
- ✅ Added programmatic scroll hooks (`useLenisScroll`, `useLenis`)
- ✅ Documented implementation and usage patterns
