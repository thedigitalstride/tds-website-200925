"use client";

import React from 'react';

export function StylingSystemSection() {
  return (
    <section id="styling">
      <h2 className="text-display-md font-semibold text-primary mb-8">Styling System Architecture</h2>
      <p className="text-md text-secondary mb-12 max-w-3xl">
        This project uses Tailwind CSS v4 with a CSS variable-based theme system from UntitledUI. Understanding this architecture is essential for maintaining consistency and extending the design system.
      </p>

      {/* Three-Layer Architecture */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Three-Layer Architecture</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-secondary p-6 rounded-lg border-t-4 border-brand">
            <h4 className="text-md font-semibold text-primary mb-2">Layer 1: CSS Variables</h4>
            <p className="text-sm text-tertiary mb-3">
              Defined in <code className="text-brand-secondary">theme.css</code>
            </p>
            <p className="text-xs text-secondary">
              All design tokens (colors, spacing, typography) are defined as CSS variables in the <code className="text-brand-secondary">@theme</code> block.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg border-t-4 border-brand">
            <h4 className="text-md font-semibold text-primary mb-2">Layer 2: Tailwind Classes</h4>
            <p className="text-sm text-tertiary mb-3">
              Auto-generated from theme
            </p>
            <p className="text-xs text-secondary">
              Tailwind v4 reads the CSS variables and generates utility classes like <code className="text-brand-secondary">bg-primary</code>, <code className="text-brand-secondary">text-md</code>.
            </p>
          </div>
          <div className="bg-secondary p-6 rounded-lg border-t-4 border-brand">
            <h4 className="text-md font-semibold text-primary mb-2">Layer 3: Dark Mode</h4>
            <p className="text-sm text-tertiary mb-3">
              Override values in <code className="text-brand-secondary">.dark-mode</code>
            </p>
            <p className="text-xs text-secondary">
              Dark mode simply overrides CSS variable values. All Tailwind classes automatically adapt.
            </p>
          </div>
        </div>

        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Why This Approach?</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-secondary">
            <li><strong className="text-primary">Single Source of Truth:</strong> All values in one place (<code className="text-brand-secondary">theme.css</code>)</li>
            <li><strong className="text-primary">Easy Theme Switching:</strong> Dark mode just overrides variables</li>
            <li><strong className="text-primary">No Class Duplication:</strong> No need for <code className="text-brand-secondary">dark:bg-gray-900</code> everywhere</li>
            <li><strong className="text-primary">Performance:</strong> CSS variables are faster than multiple class lookups</li>
            <li><strong className="text-primary">Consistency:</strong> Impossible to use arbitrary values that don&apos;t exist in theme</li>
          </ul>
        </div>
      </div>

      {/* CSS Variable Structure */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">CSS Variable Structure</h3>
        <p className="text-md text-tertiary mb-6">
          All variables follow UntitledUI&apos;s naming conventions. Here&apos;s how they&apos;re organized:
        </p>

        <div className="space-y-6">
          {/* Colors */}
          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Color System</h4>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-3 overflow-x-auto whitespace-pre">
              {`/* Semantic color names - adapt to light/dark mode */
--color-fg-primary: /* Main text color */
--color-fg-secondary: /* Body text */
--color-fg-tertiary: /* Muted text */

--color-bg-primary: /* Main background */
--color-bg-secondary: /* Card backgrounds */
--color-bg-tertiary: /* Subtle backgrounds */

--color-border-primary: /* Default borders */
--color-border-secondary: /* Subtle borders */

/* Brand colors - your primary brand color */
--color-brand-500: #031A43; /* Dark blue */
--color-brand-900: #010A19; /* Hover state */

/* Accent colors - secondary accent color */
--color-accent-500: #1689FF; /* Light blue */
--color-accent-600: #0065CC; /* Hover state */`}
            </code>
            <p className="text-sm text-tertiary">
              <strong className="text-primary">Usage:</strong> <code className="text-brand-secondary">bg-primary</code>, <code className="text-brand-secondary">text-secondary</code>, <code className="text-brand-secondary">border-brand</code>
            </p>
          </div>

          {/* Typography */}
          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Typography Scale (Rem-Based)</h4>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-3 overflow-x-auto whitespace-pre">
              {`/* Text sizes - rem units for accessibility */
--text-xs: 0.75rem;        /* 12px */
--text-sm: 0.875rem;       /* 14px */
--text-md: 1rem;           /* 16px desktop, 17px mobile */
--text-lg: 1.125rem;       /* 18px */
--text-xl: 1.25rem;        /* 20px */

/* Display sizes for headings */
--text-display-xs: 1.5rem;    /* 24px */
--text-display-sm: 1.875rem;  /* 30px - h3 */
--text-display-md: 2.25rem;   /* 36px - h2 */
--text-display-lg: 3rem;      /* 48px - h1 */
--text-display-xl: 3.75rem;   /* 60px */
--text-display-2xl: 4.5rem;   /* 72px */

/* Fluid hero heading */
--text-hero-fluid: clamp(2.1rem, 5vw + 1rem, 6.5rem);`}
            </code>
            <p className="text-sm text-tertiary">
              <strong className="text-primary">Single Source of Truth:</strong> All typography in <code className="text-brand-secondary">theme.css</code>. Rich text and components use same CSS variables.
            </p>
            <p className="text-sm text-tertiary mt-2">
              <strong className="text-primary">Usage:</strong> <code className="text-brand-secondary">text-md</code>, <code className="text-brand-secondary">text-display-lg</code> - See <a href="#" className="text-brand-secondary underline">TYPOGRAPHY_SYSTEM.md</a>
            </p>
          </div>

          {/* Spacing */}
          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Spacing System</h4>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-3 overflow-x-auto whitespace-pre">
              {`/* Base unit: 4px */
--spacing: 4px;

/* Tailwind spacing scale is generated from this:
  p-1 = 4px
  p-2 = 8px
  p-4 = 16px
  p-6 = 24px
  p-8 = 32px
  p-12 = 48px
  p-16 = 64px
  etc.
*/`}
            </code>
            <p className="text-sm text-tertiary">
              <strong className="text-primary">Usage:</strong> <code className="text-brand-secondary">p-4</code>, <code className="text-brand-secondary">gap-6</code>, <code className="text-brand-secondary">space-y-8</code>
            </p>
          </div>

          {/* Shadows */}
          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Shadow Scale</h4>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-3 overflow-x-auto whitespace-pre">
              {`--shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);
--shadow-sm: /* Subtle shadow */
--shadow-md: /* Medium shadow */
--shadow-lg: /* Large shadow */
--shadow-xl: /* Extra large */
--shadow-2xl: /* Dramatic */`}
            </code>
            <p className="text-sm text-tertiary">
              <strong className="text-primary">Usage:</strong> <code className="text-brand-secondary">shadow-xs</code>, <code className="text-brand-secondary">shadow-lg</code>
            </p>
          </div>
        </div>
      </div>

      {/* Dark Mode Implementation */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Dark Mode Implementation</h3>
        <p className="text-md text-tertiary mb-6">
          Dark mode works by overriding CSS variable values when <code className="text-brand-secondary">.dark-mode</code> class is present on <code className="text-brand-secondary">html</code> element.
        </p>

        <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-6 overflow-x-auto whitespace-pre">
          {`/* Light mode (default) */
@theme {
  --color-fg-primary: #0A0D12;
  --color-bg-primary: #FFFFFF;
}

/* Dark mode override */
.dark-mode {
  --color-fg-primary: #FCFCFD;
  --color-bg-primary: #0A0D12;
}

/* Component code stays the same */
<div className="bg-primary text-primary">
  Content automatically adapts!
</div>`}
        </code>

        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Benefits</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-secondary">
            <li>No <code className="text-brand-secondary">dark:</code> prefix needed on every element</li>
            <li>All components automatically support dark mode</li>
            <li>Easy to test: just toggle <code className="text-brand-secondary">.dark-mode</code> class</li>
            <li>Better performance: fewer classes to evaluate</li>
          </ul>
        </div>
      </div>

      {/* File Structure */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Styling Files Structure</h3>
        <div className="space-y-4">
          <div className="bg-secondary p-4 rounded-lg">
            <code className="block text-sm font-mono text-brand-secondary mb-2">src/styles/theme.css</code>
            <p className="text-sm text-tertiary">
              <strong className="text-primary">THE MOST IMPORTANT FILE.</strong> Contains all CSS variables in <code className="text-brand-secondary">@theme</code> block. All style changes go here.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <code className="block text-sm font-mono text-brand-secondary mb-2">src/app/(frontend)/globals.css</code>
            <p className="text-sm text-tertiary">
              Entry point that imports <code className="text-brand-secondary">theme.css</code>. DO NOT modify this file.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <code className="block text-sm font-mono text-brand-secondary mb-2">src/styles/frontend.css</code>
            <p className="text-sm text-tertiary">
              Tailwind v4 base styles. DO NOT modify - auto-managed by Tailwind.
            </p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <code className="block text-sm font-mono text-brand-secondary mb-2">src/styles/payloadStyles.css</code>
            <p className="text-sm text-tertiary">
              Styles for Payload admin panel. Separate from frontend styles.
            </p>
          </div>
        </div>
      </div>

      {/* How to Make Changes */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">How to Make Style Changes</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Step 1: Find the Variable</h4>
            <p className="text-sm text-tertiary mb-3">
              Search <code className="text-brand-secondary">theme.css</code> for the variable you want to change. For example, to change primary text color:
            </p>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md">
              {`/* In theme.css, find: */
--color-fg-primary: #0A0D12;`}
            </code>
          </div>

          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Step 2: Update the Value</h4>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md mb-3">
              {`/* Change to your new color */
--color-fg-primary: #1A1A1A;`}
            </code>
            <p className="text-sm text-tertiary">
              All components using <code className="text-brand-secondary">text-primary</code> will automatically update!
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Step 3: Test Both Modes</h4>
            <p className="text-sm text-tertiary mb-3">
              Always check light AND dark mode after changes:
            </p>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md">
              {`/* Update both if needed */
@theme {
  --color-fg-primary: #1A1A1A; /* Light mode */
}

.dark-mode {
  --color-fg-primary: #E5E5E5; /* Dark mode */
}`}
            </code>
          </div>

          <div>
            <h4 className="text-md font-semibold text-secondary mb-3">Step 4: Clear Cache</h4>
            <p className="text-sm text-tertiary mb-3">
              After theme changes, clear Next.js cache to see updates:
            </p>
            <code className="block text-sm text-brand-secondary bg-tertiary px-4 py-3 rounded-md">
              {`rm -rf .next && pnpm dev`}
            </code>
          </div>
        </div>
      </div>

      {/* Rules and Best Practices */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Critical Rules</h3>
        <div className="space-y-4">
          <div className="bg-error-secondary p-4 rounded-lg border-l-4 border-error">
            <p className="text-sm font-semibold text-error mb-2">❌ DON&apos;T</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
              <li>Use arbitrary values like <code className="text-brand-secondary">bg-[#123456]</code></li>
              <li>Modify <code className="text-brand-secondary">frontend.css</code> or <code className="text-brand-secondary">globals.css</code></li>
              <li>Create custom classes outside of <code className="text-brand-secondary">theme.css</code></li>
              <li>Use inline styles (<code className="text-brand-secondary">style=&#123;&#123; color: &apos;red&apos; &#125;&#125;</code>)</li>
              <li>Guess class names that don&apos;t exist in theme</li>
            </ul>
          </div>

          <div className="bg-success-secondary p-4 rounded-lg border-l-4 border-success">
            <p className="text-sm font-semibold text-success mb-2">✅ DO</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-secondary">
              <li>Search <code className="text-brand-secondary">theme.css</code> for existing variables before creating new ones</li>
              <li>Use semantic color names (<code className="text-brand-secondary">bg-primary</code>, not <code className="text-brand-secondary">bg-white</code>)</li>
              <li>Test in both light and dark modes</li>
              <li>Follow existing naming conventions when adding variables</li>
              <li>Clear <code className="text-brand-secondary">.next</code> cache after theme changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="border-t border-secondary pt-12">
        <h3 className="text-xl font-semibold text-primary mb-6">Related Documentation</h3>
        <div className="bg-secondary p-6 rounded-lg space-y-3">
          <p className="text-sm text-secondary">
            📚 <strong className="text-primary">Complete Guide:</strong> [STYLING_SYSTEM.md](docs/STYLING_SYSTEM.md) - Full styling system documentation
          </p>
          <p className="text-sm text-secondary">
            📋 <strong className="text-primary">Quick Reference:</strong> [STYLE_GUIDE.md](docs/STYLE_GUIDE.md) - Typography, colors, spacing reference
          </p>
          <p className="text-sm text-secondary">
            ✅ <strong className="text-primary">Best Practices:</strong> [STYLING_BEST_PRACTICES.md](docs/STYLING_BEST_PRACTICES.md) - Consistency patterns
          </p>
          <p className="text-sm text-secondary">
            🎨 <strong className="text-primary">UUI Components:</strong> [UUI_COMPONENTS_REFERENCE.md](docs/UUI_COMPONENTS_REFERENCE.md) - Component usage
          </p>
          <p className="text-sm text-secondary">
            🌐 <strong className="text-primary">Tailwind v4:</strong> <a href="https://tailwindcss.com/docs/v4-beta" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">tailwindcss.com/docs/v4-beta</a>
          </p>
        </div>
      </div>
    </section>
  );
}
