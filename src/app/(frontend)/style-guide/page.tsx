"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/uui/button";
import { BadgeGroup } from "@/components/uui/base/badges/badge-groups";
import { Badge } from "@/components/uui/base/badges/badges";
import { Zap, ArrowRight, Download03, Plus } from '@untitledui/icons';
import { FormElementsSection } from './FormElementsSection';
import { BlocksSection } from './BlocksSection';
import { AdvancedComponentsSection } from './AdvancedComponentsSection';
import { RadioGroupsSection } from './RadioGroupsSection';
import { PayloadPatternsSection } from './PayloadPatternsSection';
import { StylingSystemSection } from './StylingSystemSection';
import { RichTextSection } from './RichTextSection';

export default function StyleGuidePage() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('typography');

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark-mode'));

    // Intersection Observer for active section tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'typography', label: 'Typography' },
    { id: 'richtext', label: 'Rich Text' },
    { id: 'colors', label: 'Colors' },
    { id: 'blocks', label: 'Blocks System' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'advanced', label: 'Advanced Components' },
    { id: 'forms', label: 'Form Elements' },
    { id: 'radio-groups', label: 'Radio Groups' },
    { id: 'badges', label: 'Badges' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'borders', label: 'Border Radius' },
    { id: 'patterns', label: 'Payload Patterns' },
    { id: 'styling', label: 'Styling System' },
    { id: 'docs', label: 'Documentation' },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Sticky Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 bg-brand-solid hover:bg-brand-solid_hover text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
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
            Complete visual reference for the Payload CMS block-based system using Tailwind v4 + UntitledUI components. This guide shows typography, colors, blocks, components, and all variants in action.
          </p>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className="container max-w-[1280px] mx-auto px-8 py-16">
        <div className="flex gap-12">
          {/* Sticky Navigation Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-tertiary uppercase tracking-wide mb-4">
                On This Page
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    block w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                    ${activeSection === item.id
                      ? 'bg-[var(--color-bg-brand-subtle)] text-[var(--color-brand-600)] font-medium'
                      : 'text-secondary hover:text-primary hover:bg-secondary'
                    }
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-24">

        {/* Typography Scale */}
        <section id="typography">
          <h2 className="text-display-md font-semibold text-primary mb-8">Typography Scale (Rem-Based)</h2>
          <p className="text-md text-tertiary mb-6">All typography uses rem units for accessibility and SEO. Single source of truth in theme.css.</p>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-display-2xl font-semibold text-primary">Display 2XL</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-2xl: 4.5rem (72px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-xl font-semibold text-primary">Display XL</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-xl: 3.75rem (60px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-lg font-semibold text-primary">Display LG (h1)</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-lg: 3rem (48px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-md font-semibold text-primary">Display MD (h2)</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-md: 2.25rem (36px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-sm font-semibold text-primary">Display SM (h3)</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-sm: 1.875rem (30px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-display-xs font-semibold text-primary">Display XS</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-display-xs: 1.5rem (24px) - Available but not assigned to heading</code>
            </div>
            <div className="space-y-2">
              <p className="text-xl text-primary">Text XL (h4)</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-xl: 1.25rem (20px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-lg text-primary">Text LG (h5/h6, emphasized)</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-lg: 1.125rem (18px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-md text-primary">Text MD - Default body text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-md: 1rem desktop / 1.0625rem mobile - DEFAULT</code>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-primary">Text SM - Small text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-sm: 0.875rem (14px)</code>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-primary">Text XS - Extra small text</p>
              <code className="block text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">text-xs: 0.75rem (12px)</code>
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

        {/* Rich Text Typography */}
        <RichTextSection />

        {/* Color System */}
        <section id="colors">
          <h2 className="text-display-md font-semibold text-primary mb-8">Color System</h2>
          <div className="mb-8 p-6 bg-secondary rounded-lg border border-primary">
            <h3 className="text-lg font-semibold text-primary mb-3">Simplified Color System</h3>
            <div className="space-y-3 text-md text-secondary">
              <p><span className="font-semibold text-primary">Brand = Primary:</span> Dark Blue (#031A43) - Main brand color for buttons, borders, key elements</p>
              <p><span className="font-semibold text-primary">Accent:</span> Light Blue (#1689FF) - Secondary actions, CTAs, highlights</p>
              <p><span className="font-semibold text-primary">Text Hierarchy:</span> Uses greys (NOT brand color) for readability</p>
              <ul className="ml-4 space-y-1 text-xs">
                <li>• <code className="text-brand-secondary">text-primary</code> = Dark grey (gray-900)</li>
                <li>• <code className="text-brand-secondary">text-secondary</code> = Medium grey (gray-700)</li>
                <li>• <code className="text-brand-secondary">text-tertiary</code> = Light grey (gray-600)</li>
                <li>• <code className="text-brand-secondary">text-brand-*</code> = When you need blue text</li>
              </ul>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Brand Color Palette</h3>
            <p className="text-sm text-tertiary mb-4">Dark Blue (#031A43) - Primary brand color scale</p>
            <div className="grid grid-cols-11 gap-2 mb-3">
              {[
                { shade: '25', color: 'rgb(240 244 250)' },
                { shade: '50', color: 'rgb(225 233 245)' },
                { shade: '100', color: 'rgb(195 211 235)' },
                { shade: '200', color: 'rgb(135 169 215)' },
                { shade: '300', color: 'rgb(75 127 195)' },
                { shade: '400', color: 'rgb(39 77 131)' },
                { shade: '500', color: 'rgb(3 26 67)', main: true },
                { shade: '600', color: 'rgb(2 21 54)' },
                { shade: '700', color: 'rgb(2 18 45)' },
                { shade: '800', color: 'rgb(1 15 37)' },
                { shade: '900', color: 'rgb(1 10 25)', hover: true },
                { shade: '950', color: 'rgb(1 5 13)' },
              ].map((item) => (
                <div key={item.shade} className="space-y-1.5">
                  <div
                    className={`h-16 rounded-md shadow-sm ${item.main ? 'ring-2 ring-offset-2 ring-brand-solid' : ''}`}
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium text-primary">{item.shade}</p>
                    {item.main && <p className="text-[10px] font-semibold text-brand-secondary">Main</p>}
                    {item.hover && <p className="text-[10px] font-semibold text-brand-secondary">Hover</p>}
                  </div>
                </div>
              ))}
            </div>
            <code className="block text-xs text-brand-secondary bg-secondary px-3 py-2 rounded-md">
              bg-brand-solid (Main #031A43) • bg-brand-subtle (Tint)
            </code>
          </div>

          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Accent Color Palette</h3>
            <p className="text-sm text-tertiary mb-4">Light Blue (#1689FF) - Secondary accent color scale</p>
            <div className="grid grid-cols-11 gap-2 mb-3">
              {[
                { shade: '25', color: 'rgb(240 247 255)' },
                { shade: '50', color: 'rgb(219 237 255)' },
                { shade: '100', color: 'rgb(178 216 255)' },
                { shade: '200', color: 'rgb(102 178 255)' },
                { shade: '300', color: 'rgb(26 139 255)' },
                { shade: '400', color: 'rgb(24 138 255)' },
                { shade: '500', color: 'rgb(22 137 255)', main: true },
                { shade: '600', color: 'rgb(0 101 204)', hover: true },
                { shade: '700', color: 'rgb(0 76 153)' },
                { shade: '800', color: 'rgb(0 50 102)' },
                { shade: '900', color: 'rgb(0 30 61)' },
                { shade: '950', color: 'rgb(0 18 36)' },
              ].map((item) => (
                <div key={item.shade} className="space-y-1.5">
                  <div
                    className={`h-16 rounded-md shadow-sm ${item.main ? 'ring-2 ring-offset-2 ring-accent-solid' : ''}`}
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium text-primary">{item.shade}</p>
                    {item.main && <p className="text-[10px] font-semibold text-accent-tertiary">Main</p>}
                    {item.hover && <p className="text-[10px] font-semibold text-accent-tertiary">Hover</p>}
                  </div>
                </div>
              ))}
            </div>
            <code className="block text-xs text-brand-secondary bg-secondary px-3 py-2 rounded-md">
              bg-accent-solid (Main #1689FF) • bg-accent-subtle (Tint) • border-accent (Light blue)
            </code>
          </div>

          {/* Semantic Color Examples */}
          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Semantic Color Usage</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Background colors */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-secondary mb-3">Backgrounds</h4>
                <div className="space-y-2">
                  <div className="p-4 bg-[var(--color-bg-primary)] border border-primary rounded">
                    <code className="text-sm">bg-primary</code>
                    <p className="text-xs text-tertiary mt-1">Page background (white/dark blue)</p>
                  </div>
                  <div className="p-4 bg-secondary border border-primary rounded">
                    <code className="text-sm">bg-secondary</code>
                    <p className="text-xs text-tertiary mt-1">Cards, panels (grey-50/grey-900)</p>
                  </div>
                  <div className="p-4 bg-tertiary border border-primary rounded">
                    <code className="text-sm">bg-tertiary</code>
                    <p className="text-xs text-tertiary mt-1">Nested elements (grey-100/grey-800)</p>
                  </div>
                  <div className="p-4 bg-[var(--color-bg-brand-solid)] text-white border border-primary rounded">
                    <code className="text-sm text-white">bg-brand-solid</code>
                    <p className="text-xs text-white/80 mt-1">Solid brand (dark blue/white inverted)</p>
                  </div>
                  <div className="p-4 bg-[var(--color-bg-accent-solid)] text-white border border-primary rounded">
                    <code className="text-sm text-white">bg-accent-solid</code>
                    <p className="text-xs text-white/80 mt-1">Accent buttons (light blue)</p>
                  </div>
                </div>
              </div>
              
              {/* Text colors */}
              <div className="space-y-3">
                <h4 className="text-md font-semibold text-secondary mb-3">Text Colors</h4>
                <div className="space-y-2 p-4 bg-secondary rounded border border-primary">
                  <p className="text-primary"><code className="text-sm">text-primary</code> - Dark grey headings</p>
                  <p className="text-secondary"><code className="text-sm">text-secondary</code> - Medium grey body</p>
                  <p className="text-tertiary"><code className="text-sm">text-tertiary</code> - Light grey captions</p>
                  <p className="text-quaternary"><code className="text-sm">text-quaternary</code> - Very light metadata</p>
                </div>
                <div className="space-y-2 p-4 bg-secondary rounded border border-primary">
                  <p className="text-[var(--color-brand-500)]"><code className="text-sm">text-brand-500</code> - Brand blue</p>
                  <p className="text-[var(--color-accent-500)]"><code className="text-sm">text-accent-500</code> - Accent blue</p>
                </div>
                <div className="space-y-2 p-4 bg-secondary rounded border border-primary">
                  <div className="border-l-4 border-primary pl-3"><code className="text-sm">border-primary</code> - Grey-300</div>
                  <div className="border-l-4 border-accent pl-3"><code className="text-sm">border-accent</code> - Light blue</div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Colors */}
          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Complete Text Color Scale</h3>
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
                  <code className="text-xs text-tertiary">text-brand-secondary - Brand links</code>
                </div>
                <span className="text-brand-secondary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-accent-tertiary font-medium">Accent Text</p>
                  <code className="text-xs text-tertiary">text-accent-tertiary - Accent links & highlights</code>
                </div>
                <span className="text-accent-tertiary text-2xl">Aa</span>
              </div>
            </div>
          </div>

          {/* Background Colors */}
          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Background Colors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-primary <span className="text-sm text-tertiary font-normal">(white / gray-950)</span></h6>
                <div className="h-20 bg-primary rounded-lg"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-secondary <span className="text-sm text-tertiary font-normal">(gray-50 / gray-900)</span></h6>
                <div className="h-20 bg-secondary rounded-lg"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-tertiary <span className="text-sm text-tertiary font-normal">(gray-100 / gray-800)</span></h6>
                <div className="h-20 bg-tertiary rounded-lg"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-brand-solid <span className="text-sm text-tertiary font-normal">(brand-500 #031A43)</span></h6>
                <div className="h-20 bg-[var(--color-bg-brand-solid)] rounded-lg"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-brand-subtle <span className="text-sm text-tertiary font-normal">(brand-50)</span></h6>
                <div className="h-20 bg-[var(--color-bg-brand-subtle)] rounded-lg"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">bg-accent-solid <span className="text-sm text-tertiary font-normal">(accent-500 #1689FF)</span></h6>
                <div className="h-20 bg-[var(--color-bg-accent-solid)] rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Border Colors */}
          <div>
            <h3 className="text-display-sm font-semibold text-primary mb-6">Border Colors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">border-primary <span className="text-sm text-tertiary font-normal">(gray-300)</span></h6>
                <div className="h-20 bg-primary rounded-lg border-2 border-primary"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">border-secondary <span className="text-sm text-tertiary font-normal">(gray-200)</span></h6>
                <div className="h-20 bg-primary rounded-lg border-2 border-secondary"></div>
              </div>
              <div>
                <h6 className="text-lg font-semibold text-primary mb-3">border-accent <span className="text-sm text-tertiary font-normal">(accent-500 #1689FF)</span></h6>
                <div className="h-20 bg-primary rounded-lg border-2 border-accent"></div>
              </div>
            </div>
          </div>

          {/* Status Colors & States */}
          <div className="mt-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Status Colors & States</h3>

            {/* Status Backgrounds */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-primary mb-4">Status Backgrounds</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 bg-[var(--color-bg-error)] border-2 border-[var(--color-border-error)] rounded-lg">
                  <p className="text-[var(--color-text-error-primary)] font-semibold mb-1">Error Background</p>
                  <code className="text-sm text-secondary">bg-error</code>
                  <p className="text-xs text-tertiary mt-2">Use for error messages and alerts</p>
                </div>
                <div className="p-6 bg-[var(--color-bg-warning)] border-2 border-[var(--color-border-primary)] rounded-lg">
                  <p className="text-[var(--color-text-warning-primary)] font-semibold mb-1">Warning Background</p>
                  <code className="text-sm text-secondary">bg-warning</code>
                  <p className="text-xs text-tertiary mt-2">Use for warning messages</p>
                </div>
                <div className="p-6 bg-[var(--color-bg-success)] border-2 border-[var(--color-border-primary)] rounded-lg">
                  <p className="text-[var(--color-text-success-primary)] font-semibold mb-1">Success Background</p>
                  <code className="text-sm text-secondary">bg-success</code>
                  <p className="text-xs text-tertiary mt-2">Use for success messages and confirmations</p>
                </div>
                <div className="p-6 bg-[var(--color-bg-disabled)] border-2 border-[var(--color-border-disabled)] rounded-lg">
                  <p className="text-[var(--color-text-disabled)] font-semibold mb-1">Disabled Background</p>
                  <code className="text-sm text-secondary">bg-disabled</code>
                  <p className="text-xs text-tertiary mt-2">Use for disabled form elements</p>
                </div>
              </div>
            </div>

            {/* Status Text Colors */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-primary mb-4">Status Text Colors</h4>
              <div className="space-y-3 p-6 bg-secondary rounded-lg border border-primary">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--color-text-error-primary)] font-semibold">Error Text</p>
                    <code className="text-xs text-tertiary">text-error-primary</code>
                  </div>
                  <span className="text-[var(--color-text-error-primary)] text-2xl">Aa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--color-text-warning-primary)] font-semibold">Warning Text</p>
                    <code className="text-xs text-tertiary">text-warning-primary</code>
                  </div>
                  <span className="text-[var(--color-text-warning-primary)] text-2xl">Aa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--color-text-success-primary)] font-semibold">Success Text</p>
                    <code className="text-xs text-tertiary">text-success-primary</code>
                  </div>
                  <span className="text-[var(--color-text-success-primary)] text-2xl">Aa</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--color-text-disabled)] font-semibold">Disabled Text</p>
                    <code className="text-xs text-tertiary">text-disabled</code>
                  </div>
                  <span className="text-[var(--color-text-disabled)] text-2xl">Aa</span>
                </div>
              </div>
            </div>

            {/* Additional Background States */}
            <div className="mb-8">
              <h4 className="text-xl font-semibold text-primary mb-4">Interactive Background States</h4>
              <div className="space-y-3">
                <div className="p-4 bg-[var(--color-bg-primary_hover)] border border-primary rounded-lg">
                  <code className="text-sm font-semibold text-primary">bg-primary_hover</code>
                  <p className="text-xs text-tertiary mt-1">Hover state for primary backgrounds</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-secondary_hover)] border border-primary rounded-lg">
                  <code className="text-sm font-semibold text-primary">bg-secondary_hover</code>
                  <p className="text-xs text-tertiary mt-1">Hover state for secondary backgrounds</p>
                </div>
                <div className="p-4 bg-[var(--color-bg-active)] border border-primary rounded-lg">
                  <code className="text-sm font-semibold text-primary">bg-active</code>
                  <p className="text-xs text-tertiary mt-1">Active/pressed state backgrounds</p>
                </div>
              </div>
            </div>

            {/* Border Variants */}
            <div>
              <h4 className="text-xl font-semibold text-primary mb-4">Additional Border Variants</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary border-2 border-tertiary rounded-lg">
                  <code className="text-sm font-semibold text-primary">border-tertiary</code>
                  <p className="text-xs text-tertiary mt-1">Tertiary border variant (gray-300)</p>
                </div>
                <div className="p-4 bg-secondary border-2 border-[var(--color-border-disabled)] rounded-lg">
                  <code className="text-sm font-semibold text-primary">border-disabled</code>
                  <p className="text-xs text-tertiary mt-1">Disabled element borders</p>
                </div>
                <div className="p-4 bg-secondary border-2 border-[var(--color-border-error_subtle)] rounded-lg">
                  <code className="text-sm font-semibold text-primary">border-error_subtle</code>
                  <p className="text-xs text-tertiary mt-1">Subtle error borders (error-300 - lighter)</p>
                </div>
                <div className="p-4 bg-secondary border-2 border-[var(--color-border-error)] rounded-lg">
                  <code className="text-sm font-semibold text-primary">border-error</code>
                  <p className="text-xs text-tertiary mt-1">Strong error borders (error-500 - darker)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section id="buttons">
          <h2 className="text-display-md font-semibold text-primary mb-8">Buttons</h2>

          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Button Sizes</h3>
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
            <h3 className="text-display-sm font-semibold text-primary mb-6">Button Colors</h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary">Primary (Brand)</Button>
              <Button color="accent">Accent</Button>
              <Button color="secondary">Secondary</Button>
              <Button color="tertiary">Tertiary</Button>
              <Button color="link">Link</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary|accent|secondary|tertiary|link">Label</Button>'}
            </code>
            <p className="mt-3 text-sm text-tertiary">
              <span className="font-semibold">Primary:</span> Dark blue brand color for primary CTAs<br/>
              <span className="font-semibold">Accent:</span> Light blue accent color for secondary actions and highlights<br/>
              <span className="font-semibold">Link:</span> Brand-colored text link with underline on hover
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Destructive Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button color="primary-destructive">Delete</Button>
              <Button color="secondary-destructive">Remove</Button>
              <Button color="tertiary-destructive">Cancel</Button>
              <Button color="link-destructive">Delete Link</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary-destructive|secondary-destructive|tertiary-destructive|link-destructive">Label</Button>'}
            </code>
          </div>

          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Buttons with Icons</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button color="primary" size="md" iconLeading={Zap}>With Leading Icon</Button>
                <Button color="secondary" size="md" iconTrailing={ArrowRight}>With Trailing Icon</Button>
                <Button color="accent" size="md" iconLeading={Download03} iconTrailing={ArrowRight}>Both Icons</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button color="primary" size="sm" iconLeading={Plus}>Small with Icon</Button>
                <Button color="primary" size="lg" iconLeading={Plus}>Large with Icon</Button>
                <Button color="primary" size="xl" iconLeading={Plus}>XL with Icon</Button>
              </div>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary" iconLeading={Icon}>Label</Button>\n<Button color="primary" iconTrailing={Icon}>Label</Button>'}
            </code>
            <p className="mt-3 text-sm text-tertiary">
              Icons are imported from <code className="text-brand-secondary">@untitledui/icons</code> and passed as props. Browse all 1000+ icons at <a href="https://icons.untitledui.com" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">icons.untitledui.com</a>
            </p>
          </div>

          <div>
            <h3 className="text-display-sm font-semibold text-primary mb-6">Button States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button color="primary">Default</Button>
              <Button color="primary" isDisabled>Disabled</Button>
            </div>
            <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-2 rounded-md">
              {'<Button color="primary" isDisabled>Label</Button>'}
            </code>
          </div>
        </section>

        {/* Blocks System */}
        <BlocksSection />

        {/* Advanced Components */}
        <AdvancedComponentsSection />

        {/* Form Elements */}
        <FormElementsSection />

        {/* Radio Groups */}
        <RadioGroupsSection />

        {/* Badges */}
        <section id="badges">
          <h2 className="text-display-md font-semibold text-primary mb-8">Badges</h2>

          <div className="mb-12">
            <h3 className="text-display-sm font-semibold text-primary mb-6">Badge Colors & Sizes</h3>
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
            <h3 className="text-display-sm font-semibold text-primary mb-6">Badge Groups</h3>
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
        <section id="spacing">
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
                <span className="text-md text-secondary w-16">{item.value}</span>
                <code className="text-sm text-brand-secondary">p-{item.name} / m-{item.name} / gap-{item.name}</code>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section id="borders">
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

        {/* Payload Patterns */}
        <PayloadPatternsSection />

        {/* Styling System */}
        <StylingSystemSection />

        {/* Documentation Links */}
        <section id="docs" className="border-t border-secondary pt-12">
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
      </div>
    </div>
  );
}
