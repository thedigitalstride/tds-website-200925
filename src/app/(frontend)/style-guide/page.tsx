'use client'

import React, { useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/uui/button'
import { Badge } from '@/components/uui/base/badges/badges'
import { BadgeGroup } from '@/components/uui/base/badges/badge-groups'
import { Zap, ArrowRight, Download03, Plus } from '@untitledui/icons'

type Tab = 'typography' | 'spacing' | 'colors' | 'components'

export default function StyleGuidePage() {
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<Tab>('typography')
  const [mounted, setMounted] = useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const isDark = theme === 'dark'

  const tabs: { id: Tab; label: string }[] = [
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'colors', label: 'Colors' },
    { id: 'components', label: 'Components' },
  ]

  return (
    <div className="min-h-screen">
      {/* Theme Toggle Button */}
      {mounted && (
        <button
          onClick={toggleTheme}
          className="fixed bottom-8 right-8 z-50 bg-brand-solid hover:bg-brand-solid_hover text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Header */}
      <div className="border-b border-secondary">
        <div className="container max-w-container mx-auto px-8 py-12">
          <h1 className="text-display-lg font-semibold text-primary">Style Guide</h1>
          <p className="mt-3 text-lg text-tertiary max-w-3xl">
            Quick reference for typography, spacing, colors, and components. All examples adapt
            automatically to light and dark themes.
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-secondary sticky top-0 z-40">
        <div className="container max-w-container mx-auto px-8">
          <nav className="flex gap-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-6 py-4 text-md font-medium transition-colors border-b-2
                  ${
                    activeTab === tab.id
                      ? 'border-brand-solid text-primary'
                      : 'border-transparent text-tertiary hover:text-secondary'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container max-w-container mx-auto px-8 py-16">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'typography' && <TypographyTab />}
          {activeTab === 'spacing' && <SpacingTab />}
          {activeTab === 'colors' && <ColorsTab />}
          {activeTab === 'components' && <ComponentsTab />}
        </div>
      </div>
    </div>
  )
}

// Typography Tab Component
function TypographyTab() {
  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-display-md font-semibold text-primary mb-8">Typography System</h2>
        <div className="p-6 bg-secondary rounded-lg border border-primary mb-12">
          <p className="text-md text-secondary">
            <strong className="text-primary">Rem-based scale:</strong> All typography uses rem units
            for accessibility and SEO. Fluid scaling ensures optimal readability across all devices.
          </p>
        </div>

        {/* Display Scale */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-8">
            Display Scale (Headings)
          </h3>
          <p className="text-md text-tertiary mb-8">
            Font Family: <span className="font-semibold text-secondary">Poppins</span>
          </p>

          <div className="space-y-12">
            {/* Display 2XL */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display 2XL</h4>
                <p className="text-display-2xl font-semibold text-primary mb-6">
                  Transform Your Business
                </p>
                <p className="text-display-2xl font-semibold text-primary mb-6">
                  Building Tomorrow's Solutions Today
                </p>
                <p className="text-display-2xl font-semibold text-primary">
                  Transform your business with innovative solutions that drive growth and create
                  lasting value for your customers and stakeholders in today's competitive digital
                  marketplace.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-2xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(3rem, 4vw +
                  1.5rem, 4.5rem) • 48px → 72px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 5.4rem (86.4px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Letter Spacing:</span> -0.09rem
                  (-1.44px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-2xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Hero headings, large
                  marketing headers
                </p>
              </div>
            </div>

            {/* Display XL */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display XL</h4>
                <p className="text-display-xl font-semibold text-primary mb-6">
                  Build Better Products
                </p>
                <p className="text-display-xl font-semibold text-primary mb-6">
                  Innovation Through Collaboration
                </p>
                <p className="text-display-xl font-semibold text-primary">
                  Build better products that solve real problems and delight users with thoughtful
                  design and exceptional functionality that stands the test of time.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(2.5rem,
                  3.5vw + 1rem, 3.75rem) • 40px → 60px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 4.5rem (72px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Letter Spacing:</span> -0.075rem
                  (-1.2px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Large section
                  headers, landing page titles
                </p>
              </div>
            </div>

            {/* Display LG */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display LG (H1)</h4>
                <p className="text-display-lg font-semibold text-primary mb-6">Accelerate Growth</p>
                <p className="text-display-lg font-semibold text-primary mb-6">
                  Strategic Partnerships Drive Success
                </p>
                <p className="text-display-lg font-semibold text-primary">
                  Accelerate growth through strategic partnerships and data-driven decisions that
                  unlock new opportunities and maximize your competitive advantage in the
                  marketplace.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-lg</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(2rem, 3vw +
                  1rem, 3rem) • 32px → 48px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 3.6rem (57.6px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Letter Spacing:</span> -0.06rem
                  (-0.96px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-lg</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Semantic:</span> H1 (page titles)
                </p>
              </div>
            </div>

            {/* Display MD */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display MD (H2)</h4>
                <p className="text-display-md font-semibold text-primary mb-6">Create Impact</p>
                <p className="text-display-md font-semibold text-primary mb-6">
                  Content That Resonates With Your Audience
                </p>
                <p className="text-display-md font-semibold text-primary">
                  Create impact with powerful storytelling and compelling content that resonates
                  with your audience and drives meaningful engagement across all channels.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-md</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(1.75rem,
                  2.5vw + 0.75rem, 2.25rem) • 28px → 36px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 2.7rem (43.2px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Letter Spacing:</span> -0.045rem
                  (-0.72px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-md</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Semantic:</span> H2 (section
                  headings)
                </p>
              </div>
            </div>

            {/* Display SM */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display SM (H3)</h4>
                <p className="text-display-sm font-semibold text-primary mb-6">Drive Innovation</p>
                <p className="text-display-sm font-semibold text-primary mb-6">
                  Embracing New Technologies and Methodologies
                </p>
                <p className="text-display-sm font-semibold text-primary">
                  Drive innovation by embracing new technologies and methodologies that transform
                  how we work and deliver value to customers in an ever-evolving digital landscape.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-sm</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(1.5rem, 2vw
                  + 0.75rem, 1.875rem) • 24px → 30px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 2.25rem (36px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-sm</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Semantic:</span> H3 (subsection
                  headings)
                </p>
              </div>
            </div>

            {/* Display XS */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Display XS</h4>
                <p className="text-display-xs font-semibold text-primary mb-6">
                  Optimize Performance
                </p>
                <p className="text-display-xs font-semibold text-primary mb-6">
                  Continuous Improvement and Strategic Optimization
                </p>
                <p className="text-display-xs font-semibold text-primary">
                  Optimize performance through continuous improvement and strategic optimization
                  that enhances efficiency and delivers measurable results for your organization.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-display-xs</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> clamp(1.25rem,
                  1.5vw + 0.75rem, 1.5rem) • 20px → 24px (fluid)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.8rem (28.8px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-display-xs</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Small headings, card
                  titles
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body Text Scale */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-8">Body Text Scale</h3>
          <p className="text-md text-tertiary mb-8">
            Font Family: <span className="font-semibold text-secondary">Inter</span>
          </p>

          <div className="space-y-12">
            {/* Text XL */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Text XL (H4)</h4>
                <p className="text-xl text-primary mb-6">Leading with Purpose</p>
                <p className="text-xl text-primary">
                  Leading with purpose means aligning your actions with your values and creating a
                  vision that inspires others to join you on the journey toward meaningful change
                  and lasting success. This size works well for emphasized body text and H4
                  subheadings that need to stand out from regular paragraph content.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> 1.25rem (20px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.875rem (30px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-xl</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Semantic:</span> H4 (minor
                  subheadings), emphasized body text
                </p>
              </div>
            </div>

            {/* Text LG */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Text LG (H5/H6)</h4>
                <p className="text-lg text-primary mb-6">Building Trust</p>
                <p className="text-lg text-primary">
                  Building trust requires consistent communication, transparent practices, and a
                  commitment to delivering on promises that demonstrate your reliability and
                  integrity to stakeholders. This size is perfect for lead paragraphs, introductory
                  text, and H5/H6 headings that need slightly more emphasis than standard body text.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-lg</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> 1.125rem (18px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.75rem (28px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-lg</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Semantic:</span> H5/H6, emphasized
                  paragraphs, lead text
                </p>
              </div>
            </div>

            {/* Text MD */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">
                  Text MD (Default Body)
                </h4>
                <p className="text-md text-primary mb-6">Default Body Text</p>
                <p className="text-md text-primary">
                  This is the default body text size used throughout the site for paragraphs,
                  descriptions, and general content. It provides optimal readability on both mobile
                  and desktop devices while maintaining a comfortable reading experience that
                  doesn't strain the eyes or require excessive scrolling. This text size has been
                  carefully chosen to work well across all screen sizes and ensures accessibility
                  compliance.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-md</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> 1.0625rem (17px)
                  mobile / 1rem (16px) desktop
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.625rem (26px)
                  mobile / 1.5rem (24px) desktop
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-md</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Standard body text,
                  paragraphs, descriptions
                </p>
                <p>
                  <span className="font-semibold text-secondary">Note:</span> Larger on mobile for
                  improved readability
                </p>
              </div>
            </div>

            {/* Text SM */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Text SM</h4>
                <p className="text-sm text-primary mb-6">Supporting Details</p>
                <p className="text-sm text-primary">
                  Small text is ideal for captions, metadata, secondary information, and supporting
                  details that provide context without overwhelming the main content. It maintains
                  readability while taking up less visual space, making it perfect for image
                  captions, form helper text, timestamps, and bylines. This size should be used
                  sparingly for primary content to ensure accessibility.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-sm</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> 0.875rem (14px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.25rem (20px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-sm</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Captions, metadata,
                  helper text, labels
                </p>
              </div>
            </div>

            {/* Text XS */}
            <div className="space-y-4 p-8 bg-secondary rounded-lg border border-primary">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-secondary mb-3">Text XS</h4>
                <p className="text-xs text-primary mb-6">Fine Print</p>
                <p className="text-xs text-primary">
                  Extra small text is reserved for fine print, legal disclaimers, timestamps, and
                  other minimal information that needs to be present but shouldn't compete with
                  primary content for attention. Use this size sparingly and ensure that critical
                  information is not exclusively presented at this size, as it may be difficult to
                  read for some users. Best suited for copyright notices, version numbers, and
                  technical specifications.
                </p>
              </div>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">CSS Variable:</span>{' '}
                  <code className="text-brand-secondary">--text-xs</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Font Size:</span> 0.75rem (12px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Line Height:</span> 1.125rem (18px)
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">text-xs</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Fine print, legal
                  text, timestamps, technical specs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Font Weights */}
        <div>
          <h3 className="text-display-sm font-semibold text-primary mb-8">Font Weights</h3>
          <div className="space-y-8">
            <div className="p-8 bg-secondary rounded-lg border border-primary">
              <h4 className="text-lg font-semibold text-secondary mb-4">
                Regular (400) - Default Body
              </h4>
              <p className="text-lg font-normal text-primary mb-6">
                Regular weight is the default for body text, providing comfortable reading for
                extended content. It maintains excellent readability across long paragraphs and
                multiple lines of text without feeling heavy or overwhelming to the reader. This
                weight should be used for all standard paragraph content, descriptions, and articles
                where sustained reading is expected.
              </p>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">Weight:</span> 400
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">font-normal</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Body text,
                  paragraphs, descriptions
                </p>
              </div>
            </div>

            <div className="p-8 bg-secondary rounded-lg border border-primary">
              <h4 className="text-lg font-semibold text-secondary mb-4">
                Medium (500) - Links & Emphasis
              </h4>
              <p className="text-lg font-medium text-primary mb-6">
                Medium weight adds subtle emphasis without being too bold. It's perfect for links,
                important phrases, and content that needs to stand out slightly from regular text
                while maintaining a professional appearance. This weight creates hierarchy within
                body text and helps guide the reader's attention to key information without the
                visual heaviness of bold text.
              </p>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">Weight:</span> 500
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">font-medium</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Links, emphasized
                  text, important phrases
                </p>
              </div>
            </div>

            <div className="p-8 bg-secondary rounded-lg border border-primary">
              <h4 className="text-lg font-semibold text-secondary mb-4">
                Semibold (600) - Headings & Buttons
              </h4>
              <p className="text-lg font-semibold text-primary mb-6">
                Semibold weight provides strong emphasis for headings, call-to-action text, and
                button labels. It creates clear hierarchy and draws attention without being as heavy
                as bold, making it ideal for interface elements and section headers. This is the
                default weight for all display typography and should be used consistently for
                headings from H1 through H6 to maintain visual consistency.
              </p>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">Weight:</span> 600
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">font-semibold</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Headings (H1-H6),
                  buttons, strong emphasis
                </p>
              </div>
            </div>

            <div className="p-8 bg-secondary rounded-lg border border-primary">
              <h4 className="text-lg font-semibold text-secondary mb-4">
                Bold (700) - Strong Emphasis
              </h4>
              <p className="text-lg font-bold text-primary mb-6">
                Bold weight creates maximum emphasis for critical information, important
                announcements, and content that must be noticed immediately. Use sparingly to
                maintain impact and avoid visual fatigue from too much heavy text. This weight is
                best reserved for truly critical information that requires immediate attention or
                for creating strong visual contrast in specific design contexts.
              </p>
              <div className="space-y-2 text-xs text-tertiary bg-tertiary p-4 rounded-md">
                <p>
                  <span className="font-semibold text-secondary">Weight:</span> 700
                </p>
                <p>
                  <span className="font-semibold text-secondary">Tailwind Class:</span>{' '}
                  <code className="text-brand-secondary">font-bold</code>
                </p>
                <p>
                  <span className="font-semibold text-secondary">Usage:</span> Critical information,
                  strong emphasis (use sparingly)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Spacing Tab Component
function SpacingTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-display-md font-semibold text-primary mb-8">Spacing System</h2>
        <p className="text-md text-tertiary mb-8">
          Based on 4px base unit. All spacing uses Tailwind's default scale for consistency.
        </p>

        <div className="space-y-6">
          {[
            { name: '0.5', value: '2px', rem: '0.125rem', class: 'w-0.5' },
            { name: '1', value: '4px', rem: '0.25rem', class: 'w-1' },
            { name: '2', value: '8px', rem: '0.5rem', class: 'w-2' },
            { name: '3', value: '12px', rem: '0.75rem', class: 'w-3' },
            { name: '4', value: '16px', rem: '1rem', class: 'w-4' },
            { name: '6', value: '24px', rem: '1.5rem', class: 'w-6' },
            { name: '8', value: '32px', rem: '2rem', class: 'w-8' },
            { name: '12', value: '48px', rem: '3rem', class: 'w-12' },
            { name: '16', value: '64px', rem: '4rem', class: 'w-16' },
            { name: '24', value: '96px', rem: '6rem', class: 'w-24' },
            { name: '32', value: '128px', rem: '8rem', class: 'w-32' },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-6 p-6 bg-secondary rounded-lg border border-primary"
            >
              <div className={`${item.class} h-12 bg-brand-solid rounded shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-md font-semibold text-primary">{item.value}</p>
                <p className="text-sm text-tertiary">{item.rem}</p>
              </div>
              <div className="text-right">
                <code className="text-sm text-brand-secondary block">p-{item.name}</code>
                <code className="text-sm text-brand-secondary block">m-{item.name}</code>
                <code className="text-sm text-brand-secondary block">gap-{item.name}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-secondary rounded-lg border border-primary">
          <h3 className="text-lg font-semibold text-primary mb-4">Spacing in Context</h3>
          <div className="space-y-6">
            <div className="p-8 bg-tertiary rounded-lg">
              <p className="text-md text-primary font-medium mb-4">Example Card with p-8</p>
              <p className="text-md text-secondary">
                This card uses p-8 (32px/2rem) padding for comfortable breathing room.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-tertiary rounded-lg">
                <p className="text-sm text-primary font-medium">gap-4 (16px)</p>
              </div>
              <div className="flex-1 p-4 bg-tertiary rounded-lg">
                <p className="text-sm text-primary font-medium">between items</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Colors Tab Component
function ColorsTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-display-md font-semibold text-primary mb-8">Color System</h2>
        <div className="p-6 bg-secondary rounded-lg border border-primary mb-12">
          <p className="text-md text-secondary">
            <strong className="text-primary">Theme-Aware:</strong> All colors automatically adapt to
            light and dark modes. Toggle the theme to see colors change.
          </p>
        </div>

        {/* Brand Colors */}
        <div className="mb-12">
          <h3 className="text-display-sm font-semibold text-primary mb-6">
            Brand Color (Dark Blue)
          </h3>
          <p className="text-sm text-tertiary mb-6">Main brand color: #031A43</p>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
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
              <div key={item.shade} className="space-y-2">
                <div
                  className={`h-16 rounded-md shadow-sm ${item.main ? 'ring-2 ring-offset-2 ring-brand-solid' : ''}`}
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">{item.shade}</p>
                  {item.main && (
                    <p className="text-[10px] font-semibold text-brand-secondary">Main</p>
                  )}
                  {item.hover && (
                    <p className="text-[10px] font-semibold text-brand-secondary">Hover</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Colors */}
        <div className="mb-12">
          <h3 className="text-display-sm font-semibold text-primary mb-6">
            Accent Color (Light Blue)
          </h3>
          <p className="text-sm text-tertiary mb-6">Secondary accent: #1689FF</p>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
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
              <div key={item.shade} className="space-y-2">
                <div
                  className={`h-16 rounded-md shadow-sm ${item.main ? 'ring-2 ring-offset-2 ring-accent-solid' : ''}`}
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-center">
                  <p className="text-xs font-medium text-primary">{item.shade}</p>
                  {item.main && (
                    <p className="text-[10px] font-semibold text-accent-tertiary">Main</p>
                  )}
                  {item.hover && (
                    <p className="text-[10px] font-semibold text-accent-tertiary">Hover</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-12">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Semantic Colors</h3>

          {/* Text Colors */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-secondary mb-4">Text Colors</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-primary font-semibold">Primary Text</p>
                  <code className="text-xs text-tertiary">
                    text-primary - Main headings (dark blue in light, white in dark)
                  </code>
                </div>
                <span className="text-primary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-secondary font-semibold">Secondary Text</p>
                  <code className="text-xs text-tertiary">
                    text-secondary - Body text (gray-700 in light, gray-300 in dark)
                  </code>
                </div>
                <span className="text-secondary text-2xl">Aa</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div>
                  <p className="text-tertiary font-semibold">Tertiary Text</p>
                  <code className="text-xs text-tertiary">
                    text-tertiary - Captions (gray-600 in light, gray-200 in dark)
                  </code>
                </div>
                <span className="text-tertiary text-2xl">Aa</span>
              </div>
            </div>
          </div>

          {/* Background Colors */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-secondary mb-4">Background Colors</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-primary border border-primary rounded-lg">
                <code className="text-sm font-semibold text-primary">bg-primary</code>
                <p className="text-xs text-tertiary mt-2">
                  Page background (white in light, dark in dark mode)
                </p>
              </div>
              <div className="p-6 bg-secondary border border-primary rounded-lg">
                <code className="text-sm font-semibold text-primary">bg-secondary</code>
                <p className="text-xs text-tertiary mt-2">
                  Card backgrounds (gray-50 in light, gray-900 in dark)
                </p>
              </div>
              <div className="p-6 bg-tertiary border border-primary rounded-lg">
                <code className="text-sm font-semibold text-primary">bg-tertiary</code>
                <p className="text-xs text-tertiary mt-2">
                  Nested elements (gray-100 in light, gray-800 in dark)
                </p>
              </div>
              <div className="p-6 bg-brand-solid text-white rounded-lg">
                <code className="text-sm font-semibold text-white">bg-brand-solid</code>
                <p className="text-xs text-white/80 mt-2">
                  Brand buttons (dark blue #031A43 in light, white in dark)
                </p>
              </div>
            </div>
          </div>

          {/* Status Colors */}
          <div>
            <h4 className="text-lg font-semibold text-secondary mb-4">Status Colors</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 bg-error border-2 border-error rounded-lg">
                <p className="text-error-primary font-semibold">Error</p>
                <code className="text-xs text-secondary">bg-error / text-error-primary</code>
              </div>
              <div className="p-6 bg-warning border-2 border-primary rounded-lg">
                <p className="text-warning-primary font-semibold">Warning</p>
                <code className="text-xs text-secondary">bg-warning / text-warning-primary</code>
              </div>
              <div className="p-6 bg-success border-2 border-primary rounded-lg">
                <p className="text-success-primary font-semibold">Success</p>
                <code className="text-xs text-secondary">bg-success / text-success-primary</code>
              </div>
              <div className="p-6 bg-disabled border-2 border-disabled rounded-lg">
                <p className="text-disabled font-semibold">Disabled</p>
                <code className="text-xs text-secondary">bg-disabled / text-disabled</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Components Tab Component
function ComponentsTab() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-display-md font-semibold text-primary mb-8">Components</h2>

        {/* Buttons */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Buttons</h3>

          <div className="space-y-8">
            {/* Button Sizes */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Sizes</h4>
              <div className="flex flex-wrap items-center gap-4 p-6 bg-secondary rounded-lg">
                <Button size="sm" color="primary">
                  Small
                </Button>
                <Button size="md" color="primary">
                  Medium
                </Button>
                <Button size="lg" color="primary">
                  Large
                </Button>
                <Button size="xl" color="primary">
                  Extra Large
                </Button>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<Button size="sm|md|lg|xl" color="primary">Label</Button>'}
              </code>
            </div>

            {/* Button Colors */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Colors</h4>
              <div className="flex flex-wrap gap-4 p-6 bg-secondary rounded-lg">
                <Button color="primary">Primary</Button>
                <Button color="accent">Accent</Button>
                <Button color="secondary">Secondary</Button>
                <Button color="tertiary">Tertiary</Button>
                <Button color="link">Link</Button>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<Button color="primary|accent|secondary|tertiary|link">Label</Button>'}
              </code>
            </div>

            {/* Buttons with Icons */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">With Icons</h4>
              <div className="flex flex-wrap gap-4 p-6 bg-secondary rounded-lg">
                <Button color="primary" iconLeading={Zap}>
                  Leading Icon
                </Button>
                <Button color="accent" iconTrailing={ArrowRight}>
                  Trailing Icon
                </Button>
                <Button color="secondary" iconLeading={Download03} iconTrailing={ArrowRight}>
                  Both Icons
                </Button>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<Button iconLeading={Icon} iconTrailing={Icon}>Label</Button>'}
              </code>
            </div>

            {/* Destructive Buttons */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Destructive</h4>
              <div className="flex flex-wrap gap-4 p-6 bg-secondary rounded-lg">
                <Button color="primary-destructive">Delete</Button>
                <Button color="secondary-destructive">Remove</Button>
                <Button color="tertiary-destructive">Cancel</Button>
                <Button color="link-destructive">Delete Link</Button>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<Button color="primary-destructive">Delete</Button>'}
              </code>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="mb-16">
          <h3 className="text-display-sm font-semibold text-primary mb-6">Badges</h3>

          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Sizes</h4>
              <div className="flex flex-wrap gap-3 p-6 bg-secondary rounded-lg">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<Badge size="sm|md|lg">Label</Badge>'}
              </code>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Badge Groups</h4>
              <div className="flex flex-wrap gap-3 p-6 bg-secondary rounded-lg">
                <BadgeGroup color="brand" size="md" addonText="Category">
                  Technology
                </BadgeGroup>
                <BadgeGroup color="gray" size="md" addonText="Status">
                  Published
                </BadgeGroup>
                <BadgeGroup color="success" size="md" addonText="Count">
                  42
                </BadgeGroup>
              </div>
              <code className="block mt-3 text-sm text-brand-secondary">
                {'<BadgeGroup color="brand" addonText="Label">Content</BadgeGroup>'}
              </code>
            </div>
          </div>
        </div>

        {/* Form Elements Preview */}
        <div>
          <h3 className="text-display-sm font-semibold text-primary mb-6">Form Elements</h3>
          <div className="p-6 bg-secondary rounded-lg border border-primary">
            <p className="text-md text-secondary mb-4">
              Form elements include inputs, textareas, checkboxes, radio buttons, and select menus.
            </p>
            <p className="text-sm text-tertiary">
              For complete form element documentation, see{' '}
              <code className="text-brand-secondary">/docs/UUI_COMPONENTS_REFERENCE.md</code>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
