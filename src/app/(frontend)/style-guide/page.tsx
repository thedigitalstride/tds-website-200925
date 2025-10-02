"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/uui/base/buttons/button";
import { BadgeGroup } from "@/components/uui/base/badges/badge-groups";
import { Badge } from "@/components/uui/base/badges/badges";

export default function StyleGuidePage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark-mode'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      setIsDark(false);
    } else {
      html.classList.add('dark-mode');
      setIsDark(true);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Sticky Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 bg-brand-solid hover:bg-brand-solid_hover text-primary-inverted p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Toggle dark mode"
      >
        {isDark ? (
          // Sun icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          // Moon icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>
      {/* Header */}
      <div className="border-b border-secondary bg-primary">
        <div className="container max-w-[1280px] mx-auto px-8 py-12">
          <h1 className="text-display-lg font-semibold text-primary">Style Guide</h1>
          <p className="mt-3 text-lg text-tertiary max-w-[48rem]">
            Complete visual reference for the Tailwind v4 + UntitledUI design system. This guide shows typography, colors, spacing, and all component variants in action.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-[1280px] mx-auto px-8 py-16 space-y-24">

        {/* Typography Scale */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Typography Scale</h2>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-display-2xl font-semibold text-primary">Display 2XL</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-2xl (72px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-xl font-semibold text-primary">Display XL</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-xl (60px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-lg font-semibold text-primary">Display LG</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-lg (48px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-md font-semibold text-primary">Display MD</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-md (36px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-sm font-semibold text-primary">Display SM</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-sm (30px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-xs font-semibold text-primary">Display XS</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-xs (24px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-xl text-primary">Text XL - Body text size</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-xl (20px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-primary">Text LG - Body text size</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-lg (18px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-md text-primary">Text MD - Default body text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-md (16px) - DEFAULT</code>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary">Text SM - Small text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-sm (14px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-primary">Text XS - Extra small text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-xs (12px)</code>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Font Weights</h2>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-normal text-primary">Regular (400) - Default body text</p>
              <code className="text-sm text-brand-secondary">font-normal</code>
            </div>
            <div>
              <p className="text-lg font-medium text-primary">Medium (500) - Links and emphasis</p>
              <code className="text-sm text-brand-secondary">font-medium</code>
            </div>
            <div>
              <p className="text-lg font-semibold text-primary">Semibold (600) - Headings and buttons</p>
              <code className="text-sm text-brand-secondary">font-semibold</code>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">Bold (700) - Strong emphasis</p>
              <code className="text-sm text-brand-secondary">font-bold</code>
            </div>
          </div>
        </section>

        {/* Color System */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Color System</h2>

          {/* Text Colors */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-6">Text Colors</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-primary font-medium">Primary Text</p>
                  <code className="text-xs text-tertiary">text-primary - Main content</code>
                </div>
                <span className="text-primary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-secondary font-medium">Secondary Text</p>
                  <code className="text-xs text-tertiary">text-secondary - Body text</code>
                </div>
                <span className="text-secondary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-tertiary font-medium">Tertiary Text</p>
                  <code className="text-xs text-tertiary">text-tertiary - Captions</code>
                </div>
                <span className="text-tertiary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-brand-secondary font-medium">Brand Text</p>
                  <code className="text-xs text-tertiary">text-brand-secondary - Links</code>
                </div>
                <span className="text-brand-secondary text-2xl">Aa</span>
              </div>
            </div>
          </div>

          {/* Background Colors */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-6">Background Colors</h3>
            <div className="space-y-4">
              <div className="p-6 bg-primary border-2 border-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Primary Background</p>
                    <code className="text-xs text-tertiary">bg-primary - Main page background</code>
                  </div>
                  <div className="w-12 h-12 bg-primary border-2 border-primary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-secondary border-2 border-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Secondary Background</p>
                    <code className="text-xs text-tertiary">bg-secondary - Card backgrounds</code>
                  </div>
                  <div className="w-12 h-12 bg-secondary border-2 border-primary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-tertiary border-2 border-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Tertiary Background</p>
                    <code className="text-xs text-tertiary">bg-tertiary - Subtle backgrounds</code>
                  </div>
                  <div className="w-12 h-12 bg-tertiary border-2 border-primary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-quaternary border-2 border-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Quaternary Background</p>
                    <code className="text-xs text-tertiary">bg-quaternary - Extra subtle backgrounds</code>
                  </div>
                  <div className="w-12 h-12 bg-quaternary border-2 border-primary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-brand-primary border-2 border-brand rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Brand Primary Background</p>
                    <code className="text-xs text-tertiary">bg-brand-primary - Brand highlights</code>
                  </div>
                  <div className="w-12 h-12 bg-brand-primary border-2 border-brand rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-brand-secondary border-2 border-brand rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Brand Secondary Background</p>
                    <code className="text-xs text-tertiary">bg-brand-secondary - Subtle brand tints</code>
                  </div>
                  <div className="w-12 h-12 bg-brand-secondary border-2 border-brand rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-brand-solid border-2 border-brand rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary-inverted mb-1">Brand Solid Background</p>
                    <code className="text-xs text-primary-inverted">bg-brand-solid - Solid brand color (buttons)</code>
                  </div>
                  <div className="w-12 h-12 bg-brand-solid border-2 border-brand rounded-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Border Colors */}
          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">Border Colors</h3>
            <div className="space-y-4">
              <div className="p-6 bg-secondary border-2 border-primary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Primary Border</p>
                    <code className="text-xs text-tertiary">border-primary - Default borders</code>
                  </div>
                  <div className="w-12 h-12 bg-primary border-4 border-primary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-secondary border-2 border-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Secondary Border</p>
                    <code className="text-xs text-tertiary">border-secondary - Subtle borders</code>
                  </div>
                  <div className="w-12 h-12 bg-primary border-4 border-secondary rounded-md"></div>
                </div>
              </div>
              <div className="p-6 bg-secondary border-2 border-brand rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Brand Border</p>
                    <code className="text-xs text-tertiary">border-brand - Brand accent borders</code>
                  </div>
                  <div className="w-12 h-12 bg-primary border-4 border-brand rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Buttons</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-6">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm" color="primary">Small</Button>
              <Button size="md" color="primary">Medium</Button>
              <Button size="lg" color="primary">Large</Button>
              <Button size="xl" color="primary">Extra Large</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button size="sm|md|lg|xl" color="primary">Label</Button>'}
            </code>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-6">Button Colors</h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="tertiary">Tertiary</Button>
              <Button color="link-gray">Link Gray</Button>
              <Button color="link-color">Link Color</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary|secondary|tertiary">Label</Button>'}
            </code>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">Destructive Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary-destructive">Delete</Button>
              <Button color="secondary-destructive">Remove</Button>
              <Button color="tertiary-destructive">Cancel</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary-destructive">Label</Button>'}
            </code>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Badges</h2>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-6">Badge Colors & Sizes</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge color="brand" size="sm">Brand SM</Badge>
                <Badge color="brand" size="md">Brand MD</Badge>
                <Badge color="brand" size="lg">Brand LG</Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Badge color="gray" size="md">Gray</Badge>
                <Badge color="error" size="md">Error</Badge>
                <Badge color="warning" size="md">Warning</Badge>
                <Badge color="success" size="md">Success</Badge>
              </div>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Badge color="brand|gray|error|warning|success" size="sm|md|lg">Label</Badge>'}
            </code>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-6">Badge Groups</h3>
            <div className="flex flex-wrap gap-3">
              <BadgeGroup color="brand" size="md" addonText="Category">Technology</BadgeGroup>
              <BadgeGroup color="gray" size="md" addonText="Status">Published</BadgeGroup>
              <BadgeGroup color="success" size="md" addonText="Count">42</BadgeGroup>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<BadgeGroup color="brand" size="md" addonText="Label">Content</BadgeGroup>'}
            </code>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Spacing Scale</h2>
          <p className="text-md text-secondary mb-6">Based on 4px base unit</p>
          <div className="space-y-4">
            {[
              { name: '1', value: '4px', class: 'w-1' },
              { name: '2', value: '8px', class: 'w-2' },
              { name: '3', value: '12px', class: 'w-3' },
              { name: '4', value: '16px', class: 'w-4' },
              { name: '6', value: '24px', class: 'w-6' },
              { name: '8', value: '32px', class: 'w-8' },
              { name: '12', value: '48px', class: 'w-12' },
              { name: '16', value: '64px', class: 'w-16' },
              { name: '24', value: '96px', class: 'w-24' },
              { name: '32', value: '128px', class: 'w-32' },
            ].map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <div className={`${item.class} h-8 bg-brand-500 rounded`} />
                <span className="text-sm text-secondary w-16">{item.value}</span>
                <code className="text-sm text-brand-secondary">p-{item.name} / m-{item.name} / gap-{item.name}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-display-md font-semibold text-primary mb-8">Border Radius</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'none', value: '0px', class: 'rounded-none' },
              { name: 'sm', value: '4px', class: 'rounded-sm' },
              { name: 'md', value: '6px', class: 'rounded-md' },
              { name: 'lg', value: '8px', class: 'rounded-lg' },
              { name: 'xl', value: '12px', class: 'rounded-xl' },
              { name: '2xl', value: '16px', class: 'rounded-2xl' },
              { name: 'full', value: '9999px', class: 'rounded-full' },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <div className={`h-16 bg-brand-500 ${item.class}`} />
                <p className="text-sm font-medium text-primary">{item.name}</p>
                <p className="text-xs text-tertiary">{item.value}</p>
                <code className="text-xs text-brand-secondary block">rounded-{item.name}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Documentation Links */}
        <section className="border-t border-secondary pt-12">
          <h2 className="text-display-md font-semibold text-primary mb-8">Documentation</h2>
          <div className="bg-secondary p-6 rounded-lg space-y-4">
            <p className="text-md text-primary font-medium">For complete documentation:</p>
            <ul className="space-y-2 text-md text-secondary">
              <li>📚 <span className="text-brand-secondary font-medium">/docs/STYLE_GUIDE.md</span> - Complete style guide reference</li>
              <li>📋 <span className="text-brand-secondary font-medium">/docs/STYLE_GUIDE_QUICK_REFERENCE.md</span> - Quick lookup cheat sheet</li>
              <li>🎨 <span className="text-brand-secondary font-medium">/src/styles/README.md</span> - Styling system architecture</li>
              <li>🔧 <span className="text-brand-secondary font-medium">/docs/UUI_COMPONENTS_REFERENCE.md</span> - Component docs</li>
            </ul>
            <div className="pt-4 border-t border-primary">
              <p className="text-sm text-tertiary">
                This is a living style guide showing actual rendered components from the UntitledUI design system.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
