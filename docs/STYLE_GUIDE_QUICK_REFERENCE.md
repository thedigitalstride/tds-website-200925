# Style Guide Quick Reference

**Quick lookup for common styling patterns and classes**

> For complete details, see [STYLE_GUIDE.md](./STYLE_GUIDE.md)

---

## 🎨 Most Used Colors

```tsx
// Text
text-primary          // Main content (gray-900 / gray-50)
text-secondary        // Body text (gray-700 / gray-300)
text-tertiary         // Captions, metadata (gray-600 / gray-400)
text-brand-secondary  // Brand links (brand-700 / gray-300)

// Backgrounds
bg-primary            // Page background (white / gray-950)
bg-secondary          // Cards, panels (gray-50 / gray-900)
bg-brand-primary      // Brand backgrounds (brand-50 / brand-500)

// Borders
border-primary        // Default borders (gray-300 / gray-700)
border-secondary      // Subtle borders (gray-200 / gray-800)
border-brand          // Brand borders (brand-500 / brand-400)
```

---

## 📐 Typography Cheat Sheet

```tsx
// Headings
text-display-2xl font-semibold text-primary   // 72px - Hero titles
text-display-xl font-semibold text-primary    // 60px - Major headers
text-display-lg font-semibold text-primary    // 48px - Page titles (H1)
text-display-md font-semibold text-primary    // 36px - Section headers (H2)
text-display-sm font-semibold text-primary    // 30px - Subsections (H3)
text-display-xs font-semibold text-primary    // 24px - Small headers (H4)

// Body text
text-xl text-secondary     // 20px - Lead paragraphs
text-lg text-secondary     // 18px - Emphasized text
text-md text-secondary     // 16px - Default body ⭐
text-sm text-tertiary      // 14px - Captions, hints
text-xs text-tertiary      // 12px - Small labels
```

---

## 📏 Spacing Quick Values

```
p-4   // 16px padding
p-6   // 24px padding ⭐ (standard card)
p-8   // 32px padding ⭐ (large card)

gap-4  // 16px gap between flex/grid items
gap-6  // 24px gap ⭐ (standard spacing)

py-16  // 64px vertical section padding
py-24  // 96px vertical section padding ⭐
```

---

## 🔘 Standard UI Patterns

### Card
```tsx
<div className="bg-secondary border border-secondary rounded-lg p-6 shadow-md">
  <h3 className="text-xl font-semibold text-primary mb-2">Title</h3>
  <p className="text-md text-secondary">Content</p>
</div>
```

### Button (UUI)
```tsx
import { Button } from '@/components/uui/button';

<Button color="primary" size="lg">Primary Action</Button>
<Button color="secondary" size="md">Secondary</Button>
<Button color="link-color">Text Link</Button>
```

### Badge (UUI)
```tsx
import { Badge } from '@/components/uui/base/badges/badges';
import { BadgeGroup } from '@/components/uui/base/badges/badge-groups';

<Badge color="brand" size="md">New</Badge>
<BadgeGroup color="brand" size="md" addonText="Category">Tech</BadgeGroup>
```

### Page Header
```tsx
<div className="container max-w-container mx-auto px-8 py-12">
  <h1 className="text-display-lg font-semibold text-primary">Title</h1>
  <p className="mt-3 text-lg text-tertiary max-w-[48rem]">Description</p>
</div>
```

### Section
```tsx
<section className="py-16 md:py-24">
  <div className="container max-w-container mx-auto px-8">
    <h2 className="text-display-md font-semibold text-primary mb-8">
      Section Title
    </h2>
    <div className="space-y-6">
      {/* Content */}
    </div>
  </div>
</section>
```

---

## 🎯 Common Combinations

```tsx
// Container wrapper (use everywhere)
container max-w-container mx-auto px-8

// Standard rounded corners
rounded-lg  // 8px - UI elements ⭐
rounded-xl  // 12px - Cards

// Standard shadows
shadow-md   // Standard cards ⭐
shadow-lg   // Modals, popovers

// Vertical spacing
space-y-4   // 16px between stacked items
space-y-6   // 24px ⭐
space-y-8   // 32px for sections

// Responsive grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

// Flex with gap
flex items-center gap-4
flex flex-col gap-6
```

---

## 🔄 Responsive Patterns

```tsx
// Mobile → Tablet → Desktop
<div className="px-4 md:px-8 lg:px-16">
  Responsive horizontal padding
</div>

<h1 className="text-display-md md:text-display-lg lg:text-display-xl">
  Responsive heading size
</h1>

<div className="py-12 md:py-16 lg:py-24">
  Responsive vertical spacing
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  Responsive grid
</div>
```

---

## ⚠️ Common Mistakes to Avoid

```tsx
❌ bg-[#1689FF]              ✅ bg-brand-500
❌ p-[13px]                  ✅ p-3 (12px) or p-4 (16px)
❌ text-gray-900             ✅ text-primary
❌ rounded-md                ✅ rounded-lg (UUI standard)
❌ font-bold                 ✅ font-semibold (for headings)
❌ Custom button styles      ✅ Use UUI Button component
❌ dark:text-white           ✅ text-primary (auto-adapts)
```

---

## 🎨 Brand Color Shortcuts

```tsx
// Primary brand actions
bg-brand-solid hover:bg-brand-solid_hover  // Buttons
text-brand-secondary hover:text-brand-secondary-hover  // Links
border-brand  // Accents

// Brand backgrounds
bg-brand-primary  // Subtle brand tint
bg-brand-50       // Very subtle
```

---

## 📱 Breakpoint Reference

```
sm:  640px   // Mobile landscape
md:  768px   // Tablet ⭐
lg:  1024px  // Desktop ⭐
xl:  1280px  // Large desktop
2xl: 1376px  // Extra large
```

---

## 💡 Pro Tips

1. **Always use semantic tokens** - `text-primary` not `text-gray-900`
2. **Test in dark mode** - Toggle with `.dark-mode` class
3. **Use spacing scale** - Stick to 4, 6, 8, 12, 16, 24
4. **Import UUI components** - Don't rebuild buttons/badges
5. **Container everything** - `container max-w-container mx-auto px-8`
6. **Mobile-first responsive** - Start with base, add `md:` and `lg:`
7. **Use `rounded-lg`** - Standard for UI elements (8px)
8. **Semibold for headings** - `font-semibold` is the UUI standard

---

## 📚 Full Documentation

- **[Complete Style Guide](./STYLE_GUIDE.md)** - Full reference with examples
- **[Styles System Guide](../src/styles/README.md)** - Technical architecture
- **[UUI Components](./UUI_COMPONENTS_REFERENCE.md)** - Component docs

---

**Quick Search Tips:**
- Colors: Search "Color System" in STYLE_GUIDE.md
- Typography: Search "Typography Scale"
- Spacing: Search "Spacing Scale"
- Components: See UUI_COMPONENTS_REFERENCE.md
