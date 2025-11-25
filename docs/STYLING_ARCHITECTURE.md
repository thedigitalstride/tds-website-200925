# Styling Architecture - Visual Overview

**Quick visual reference showing how styles cascade and ensure site-wide consistency.**

---

## 🏗️ The Cascading Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Root Layout (src/app/(frontend)/layout.tsx)               │
│  ↓ imports './globals.css' ONCE                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  globals.css (src/app/(frontend)/globals.css)              │
│  Aggregates all styling sources:                            │
│                                                              │
│  @import "tailwindcss"         ← Base utility system        │
│  @import "theme.css"           ← UUI theme (MAIN)           │
│  @import "richtext.css"        ← Blog typography            │
│                                                              │
│  @plugin "@tailwindcss/typography"                          │
│  @plugin "tailwindcss-react-aria-components"                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  theme.css (src/styles/theme.css)                          │
│  📍 SINGLE SOURCE OF TRUTH                                  │
│                                                              │
│  @theme {                                                    │
│    Brand Colors:                                             │
│    --color-brand-500: rgb(22 137 255)    ← #1689FF         │
│    --color-brand-600: rgb(20 123 230)    ← Hover state     │
│                                                              │
│    Text Colors (semantic):                                   │
│    --color-text-primary: ...             ← Main content     │
│    --color-text-secondary: ...           ← Body text        │
│                                                              │
│    Typography Scale:                                         │
│    --text-display-2xl: 4.5rem / 5.625rem ← 72px/90px       │
│    --text-xl: 1.25rem / 1.875rem         ← 20px/30px       │
│    --text-md: 1rem / 1.5rem              ← 16px/24px       │
│                                                              │
│    Spacing (4px base):                                       │
│    --spacing: 0.25rem                    ← 4px base unit    │
│    --spacing-4: 1rem                     ← 16px             │
│    --spacing-6: 1.5rem                   ← 24px             │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
        ┌───────────────────┴────────────────────┐
        ↓                   ↓                     ↓
┌──────────────┐  ┌──────────────────┐  ┌─────────────────┐
│ All Pages    │  │ All Components   │  │ Style Guide     │
│              │  │                  │  │ /style-guide    │
│ • Home       │  │ • Buttons        │  │                 │
│ • About      │  │ • Badges         │  │ Shows SAME      │
│ • Blog Posts │  │ • Headers        │  │ styles as       │
│ • [slug]     │  │ • Footers        │  │ rest of site    │
│              │  │ • Custom blocks  │  │                 │
└──────────────┘  └──────────────────┘  └─────────────────┘
```

---

## 🔄 How Consistency is Maintained

### 1. **Single Import Point**

```tsx
// ✅ CORRECT - Only in root layout
// src/app/(frontend)/layout.tsx
import './globals.css'

// ❌ NEVER do this in components
// src/components/MyComponent.tsx
import './my-styles.css'  // Creates separate style source!
```

### 2. **CSS Variables Everywhere**

```css
/* theme.css defines ONCE */
@theme {
  --color-text-primary: /* gray-900 in light, gray-50 in dark */
}

/* Tailwind generates utility class */
.text-primary {
  color: var(--color-text-primary);
}

/* Used consistently EVERYWHERE */
```

```tsx
// Page component
<h1 className="text-primary">Page Title</h1>

// Custom component
<div className="text-primary">Content</div>

// Style guide
<p className="text-primary">Example text</p>

// ALL use the SAME variable → ALL match
```

### 3. **Semantic Token System**

```
User writes:               Tailwind applies:              Theme provides:
───────────────────────────────────────────────────────────────────────
text-primary        →      .text-primary              →   var(--color-text-primary)
bg-secondary        →      .bg-secondary              →   var(--color-bg-secondary)
text-display-lg     →      .text-display-lg           →   var(--text-display-lg)
p-6                 →      .p-6                       →   1.5rem (24px)
```

**Result:** Change theme → Everything updates automatically.

---

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Developer Changes                     │
└────────────────────┬────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
    Edit brand color        Add new semantic token
    in theme.css           in theme.css
        │                         │
        └────────────┬────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│              theme.css (@theme block)                    │
│         Single Source of Truth Updated                   │
└────────────────────┬────────────────────────────────────┘
                     ↓
        ┌────────────┴────────────────────┐
        │                                  │
   Tailwind v4                      CSS Variables
   generates classes                propagate globally
        │                                  │
        └────────────┬────────────────────┘
                     ↓
┌─────────────────────────────────────────────────────────┐
│           ALL pages and components update                │
│                 (automatically)                          │
└─────────────────────────────────────────────────────────┘
        │              │                │
        ↓              ↓                ↓
    Homepage    Component Tree    Style Guide
   /            /components/      /style-guide
```

---

## 🎯 Component Integration Flow

### New Component Creation

```tsx
// Step 1: Developer creates component using theme tokens
// src/components/FeatureCard.tsx

export function FeatureCard({ title, description }) {
  return (
    <div className="bg-secondary p-6 rounded-lg border border-secondary">
      {/* Uses theme tokens automatically */}
      <h3 className="text-xl font-semibold text-primary mb-2">
        {title}
      </h3>
      <p className="text-md text-secondary">
        {description}
      </p>
    </div>
  );
}
```

**What happens:**
1. `bg-secondary` → Uses `var(--color-bg-secondary)` from theme.css
2. `text-primary` → Uses `var(--color-text-primary)` from theme.css
3. `text-xl` → Uses `var(--text-xl)` font size from theme.css
4. `p-6` → Uses spacing-6 (24px) from theme.css

**Result:** Component automatically matches:
- ✅ Color palette
- ✅ Typography scale
- ✅ Spacing system
- ✅ Light/dark mode
- ✅ Style guide appearance

---

## 🔍 Verification System

### How to verify consistency:

```
1. Open Style Guide: http://localhost:3000/style-guide
   ↓
2. Note the colors, typography, spacing
   ↓
3. Open any page on the site
   ↓
4. Compare visual appearance
   ↓
5. Should be IDENTICAL because same CSS variables
```

### Browser DevTools Check

```
1. Inspect element on style guide
   → Shows: color: var(--color-text-primary)
   ↓
2. Inspect same element type on regular page
   → Shows: color: var(--color-text-primary)
   ↓
3. SAME variable = SAME color = Consistent
```

---

## 🚨 Anti-Patterns (What Breaks Consistency)

### ❌ Pattern 1: Component-Level CSS Import

```tsx
// ❌ BAD - Creates separate style source
// src/components/Card.tsx
import './Card.css'  // Separate CSS file

// Card.css
.custom-card {
  background: #f5f5f5;  // Hardcoded color
  padding: 20px;        // Hardcoded spacing
}
```

**Problem:** `#f5f5f5` doesn't exist in theme.css → Won't match style guide.

**Fix:**
```tsx
// ✅ GOOD - Uses theme tokens
export function Card() {
  return (
    <div className="bg-secondary p-6 rounded-lg">
      {/* Uses theme automatically */}
    </div>
  );
}
```

### ❌ Pattern 2: Inline Styles

```tsx
// ❌ BAD
<div style={{
  color: '#1689FF',      // Hardcoded
  fontSize: '18px',      // Not from scale
  padding: '23px'        // Not from scale
}}>
```

**Fix:**
```tsx
// ✅ GOOD
<div className="text-brand-secondary text-lg p-6">
```

### ❌ Pattern 3: Arbitrary Values

```tsx
// ❌ BAD
<div className="text-[17px] p-[23px] bg-[#f5f5f5]">
```

**Fix:**
```tsx
// ✅ GOOD
<div className="text-md p-6 bg-secondary">
```

---

## 📈 Scaling the System

### Adding New Design Tokens

```css
/* theme.css */
@theme {
  /* Add new semantic token */
  --color-accent-primary: rgb(255 100 50);

  /* Tailwind automatically generates */
  /* .text-accent-primary, .bg-accent-primary, etc. */
}
```

**Result:**
1. Available in ALL components immediately
2. Can be added to style guide
3. Maintains consistency automatically

### Adding New Components

```tsx
// Always follow this pattern:
export function NewComponent() {
  return (
    <div className="bg-[semantic-token] text-[semantic-token] p-[scale-value]">
      {/* Content */}
    </div>
  );
}
```

**Checklist:**
- [ ] Uses semantic color tokens
- [ ] Uses typography scale
- [ ] Uses spacing scale
- [ ] Tested in light/dark modes
- [ ] Matches style guide visually

---

## 🎓 Learning Path

### For New Developers:

```
1. Read STYLE_GUIDE.md
   ↓ Learn what tokens exist

2. Read STYLING_BEST_PRACTICES.md
   ↓ Learn how to use tokens

3. Visit /style-guide page
   ↓ See tokens in action

4. Look at existing components
   ↓ See patterns in practice

5. Build new components using tokens
   ↓ Maintain consistency automatically
```

---

## 📚 Related Documentation

- **[STYLING_BEST_PRACTICES.md](./STYLING_BEST_PRACTICES.md)** - Detailed best practices
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Complete token reference
- **[/src/styles/README.md](../src/styles/README.md)** - Technical details

---

**Key Takeaway:** The system is designed so that **using theme tokens correctly = automatic consistency**. No manual synchronization needed between style guide and site.

---

**Last Updated:** 2025-10-01
