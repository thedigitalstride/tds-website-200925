"use client";

import React from 'react';
import { HeroHeadingBlock } from '@/blocks/HeroHeadingBlock/Component';

export function BlocksSection() {
  return (
    <section id="blocks">
      <h2 className="text-display-md font-semibold text-primary mb-8">Payload Blocks System</h2>
      <p className="text-md text-secondary mb-12 max-w-3xl">
        Payload CMS uses a block-based layout builder that allows content editors to create flexible page layouts by combining different block types. Each block is configurable with multiple styling and layout options. Below are the core blocks available in this template.
      </p>

      {/* Hero Heading Block */}
      <div className="mb-24">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Hero Heading Block</h3>
        <p className="text-md text-tertiary mb-8">
          Large hero headers with fluid typography, multiple color schemes, text alignment options, and custom backgrounds (gradients, images, or custom classes for animations).
        </p>

        {/* Default Example */}
        <div className="mb-12">
          <h4 className="text-md font-semibold text-secondary mb-4">Default Style</h4>
          <div className="border border-secondary rounded-lg overflow-hidden">
            <HeroHeadingBlock
              blockType="heroHeading"
              headline="More Leads.
Better Customers.
Faster Growth."
              subtitle="Take it all in your Stride"
              headlineColor="primary"
              textAlignment="left"
              spacing="normal"
            />
          </div>
          <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
            {`{
  blockType: 'heroHeading',
  headline: 'Multiple lines...',
  subtitle: 'Optional subtitle',
  headlineColor: 'primary' | 'brand',
  textAlignment: 'left' | 'center',
  spacing: 'compact' | 'normal' | 'spacious'
}`}
          </code>
        </div>

        {/* Centered with Brand Color */}
        <div className="mb-12">
          <h4 className="text-md font-semibold text-secondary mb-4">Centered with Accent Color</h4>
          <div className="border border-secondary rounded-lg overflow-hidden">
            <HeroHeadingBlock
              blockType="heroHeading"
              headline="Centered Hero
With Accent Blue"
              subtitle="Perfect for landing pages"
              headlineColor="brand"
              textAlignment="center"
              spacing="spacious"
            />
          </div>
          <code className="block mt-4 text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
            {`{
  headlineColor: 'brand', // Accent blue in dark mode, dark blue in light mode
  textAlignment: 'center',
  spacing: 'spacious'
}`}
          </code>
        </div>

        {/* Configuration Options */}
        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Configuration Options</h4>
          <div className="space-y-2 text-md text-secondary">
            <p><strong className="text-primary">Headline Color:</strong> Primary (theme-aware) or Brand (accent blue)</p>
            <p><strong className="text-primary">Subtitle Color:</strong> Default (brand/white) or White (always white)</p>
            <p><strong className="text-primary">Subtitle Size:</strong> Small (75%) or Normal (100%)</p>
            <p><strong className="text-primary">Text Alignment:</strong> Left or Center</p>
            <p><strong className="text-primary">Spacing:</strong> Compact, Normal, or Spacious</p>
            <p><strong className="text-primary">Background Options:</strong> Gradient presets, Image upload with opacity, or Custom class</p>
            <p><strong className="text-primary">Height Variant:</strong> Default or Full Height (extends behind header)</p>
          </div>
        </div>
      </div>

      {/* Latest Posts Block */}
      <div className="mb-24">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Latest Posts Block</h3>
        <p className="text-md text-tertiary mb-8">
          Display blog posts in a responsive grid (2-4 columns). Supports both automatic latest posts fetching and manual post selection. Includes category filtering and configurable header/button sections.
        </p>

        <div className="bg-secondary p-6 rounded-lg mb-8">
          <h4 className="text-md font-semibold text-primary mb-3">Note</h4>
          <p className="text-md text-secondary">
            This block requires actual post data from the database. In the style guide, we show the configuration structure. Live examples appear when the block is used on actual pages with published posts.
          </p>
        </div>

        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-6">
          {`{
  blockType: 'latestPosts',
  header: {
    showHeader: true,
    eyebrow: 'Our blog',
    heading: 'Latest blog posts',
    description: 'Stay updated with our latest insights'
  },
  contentSource: 'latest' | 'manual',
  opts: {
    numPosts: '3' | '6' | '9' | '12',
    categoryFilter: relationship // Optional category filter
  },
  selectedPosts: [], // Used when contentSource is 'manual'
  buttonConfig: {
    showButton: true,
    link: { /* UUI Button configuration */ }
  },
  layoutOptions: {
    columns: '2' | '3' | '4',
    spacing: 'compact' | 'normal' | 'spacious'
  }
}`}
        </code>

        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Configuration Options</h4>
          <div className="space-y-2 text-md text-secondary">
            <p><strong className="text-primary">Content Source:</strong> Latest (auto) or Manual selection</p>
            <p><strong className="text-primary">Number of Posts:</strong> 3, 6, 9, or 12 (for auto mode)</p>
            <p><strong className="text-primary">Category Filter:</strong> Optional filtering by category</p>
            <p><strong className="text-primary">Grid Columns:</strong> 2, 3, or 4 columns</p>
            <p><strong className="text-primary">Header:</strong> Optional eyebrow, heading, and description</p>
            <p><strong className="text-primary">Button:</strong> Optional &quot;View All&quot; button with full UUI styling options</p>
            <p><strong className="text-primary">Spacing:</strong> Compact, Normal, or Spacious</p>
          </div>
        </div>
      </div>

      {/* Call to Action Block */}
      <div className="mb-24">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Call to Action Block</h3>
        <p className="text-md text-tertiary mb-8">
          Flexible CTA sections with rich text content and up to 2 buttons. Supports all heading sizes (H1-H4) and full button customization.
        </p>

        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-6">
          {`{
  richText: { /* Lexical editor content with H1-H4 support */ },
  links: [
    { link: { /* UUI Button config */ } }
  ], // Max 2 buttons
  spacing: 'compact' | 'normal' | 'spacious'
}`}
        </code>

        <div className="bg-secondary p-6 rounded-lg border-l-4 border-brand">
          <p className="text-md text-secondary mb-2">
            <strong className="text-primary">Example Structure:</strong>
          </p>
          <ul className="text-sm text-tertiary space-y-2">
            <li>• Rich text content with H1-H4 headings</li>
            <li>• Up to 2 buttons with full UUI styling</li>
            <li>• Buttons support all colors and sizes</li>
            <li>• Spacing control for vertical rhythm</li>
          </ul>
        </div>

        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Configuration Options</h4>
          <div className="space-y-2 text-md text-secondary">
            <p><strong className="text-primary">Rich Text:</strong> Full Lexical editor with H1, H2, H3, H4 headings support</p>
            <p><strong className="text-primary">Buttons:</strong> Up to 2 buttons with all UUI color/size variants</p>
            <p><strong className="text-primary">Button Colors:</strong> Primary, Accent, Secondary, Tertiary, Link</p>
            <p><strong className="text-primary">Button Sizes:</strong> SM, MD, LG, XL</p>
            <p><strong className="text-primary">Spacing:</strong> Compact, Normal, or Spacious</p>
          </div>
        </div>
      </div>

      {/* Button Block */}
      <div className="mb-24">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Button Block</h3>
        <p className="text-md text-tertiary mb-8">
          Standalone button groups with up to 4 buttons. Supports horizontal and vertical layouts with flexible alignment options.
        </p>

        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-6">
          {`{
  buttons: [ /* Up to 4 buttons with UUI configs */ ],
  layout: 'horizontal' | 'vertical',
  alignment: 'left' | 'center' | 'right'
}`}
        </code>

        <div className="bg-secondary p-6 rounded-lg border-l-4 border-brand">
          <p className="text-md text-secondary mb-2">
            <strong className="text-primary">Button Block Features:</strong>
          </p>
          <ul className="text-sm text-tertiary space-y-2">
            <li>• 1-4 buttons per block</li>
            <li>• Horizontal (side-by-side) or Vertical (stacked) layouts</li>
            <li>• Left, Center, or Right alignment</li>
            <li>• Each button has full UUI color/size/icon options</li>
          </ul>
        </div>

        <div className="bg-secondary p-6 rounded-lg">
          <h4 className="text-md font-semibold text-primary mb-3">Configuration Options</h4>
          <div className="space-y-2 text-md text-secondary">
            <p><strong className="text-primary">Buttons:</strong> 1-4 buttons per block</p>
            <p><strong className="text-primary">Layout:</strong> Horizontal (side-by-side) or Vertical (stacked)</p>
            <p><strong className="text-primary">Alignment:</strong> Left, Center, or Right</p>
            <p><strong className="text-primary">Each Button:</strong> Full UUI styling options (color, size, icons)</p>
          </div>
        </div>
      </div>

      {/* Other Blocks Summary */}
      <div className="mb-12">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Additional Blocks</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-secondary p-6 rounded-lg">
            <h4 className="text-md font-semibold text-primary mb-2">Content Block</h4>
            <p className="text-sm text-tertiary mb-3">Column-based content with rich text editor</p>
            <ul className="text-md text-secondary space-y-1">
              <li>• Column sizes: 1/3, 1/2, 2/3, Full</li>
              <li>• Rich text with H2, H3, H4</li>
              <li>• Optional link per column</li>
              <li>• Configurable spacing</li>
            </ul>
          </div>

          <div className="bg-secondary p-6 rounded-lg">
            <h4 className="text-md font-semibold text-primary mb-2">Media Block</h4>
            <p className="text-sm text-tertiary mb-3">Image uploads with captions and optional links</p>
            <ul className="text-md text-secondary space-y-1">
              <li>• Optimized image handling</li>
              <li>• Caption text</li>
              <li>• Optional caption link</li>
              <li>• Automatic responsive sizing</li>
            </ul>
          </div>

          <div className="bg-secondary p-6 rounded-lg">
            <h4 className="text-md font-semibold text-primary mb-2">Archive Block</h4>
            <p className="text-sm text-tertiary mb-3">Displays filtered lists of posts</p>
            <ul className="text-md text-secondary space-y-1">
              <li>• Category filtering</li>
              <li>• Pagination support</li>
              <li>• Search integration</li>
              <li>• Responsive grid layout</li>
            </ul>
          </div>

          <div className="bg-secondary p-6 rounded-lg">
            <h4 className="text-md font-semibold text-primary mb-2">Breadcrumb Block</h4>
            <p className="text-sm text-tertiary mb-3">Navigation breadcrumbs for hierarchical pages</p>
            <ul className="text-md text-secondary space-y-1">
              <li>• Auto-generated from page hierarchy</li>
              <li>• SEO-friendly markup</li>
              <li>• Accessible navigation</li>
              <li>• Customizable separators</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Common Block Patterns */}
      <div className="border-t border-secondary pt-12">
        <h3 className="text-display-sm font-semibold text-primary mb-6">Common Block Patterns</h3>
        <div className="bg-secondary p-6 rounded-lg">
          <div className="space-y-4 text-md text-secondary">
            <div>
              <p className="font-semibold text-primary mb-2">Spacing System (used across all blocks):</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Compact:</strong> Reduced vertical padding (good for dense content)</li>
                <li><strong>Normal:</strong> Standard spacing (default)</li>
                <li><strong>Spacious:</strong> Increased padding (creates breathing room)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary mb-2">Header Pattern (Features, Latest Posts):</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Toggle:</strong> Show/hide entire header section</li>
                <li><strong>Eyebrow:</strong> Small text above heading</li>
                <li><strong>Heading:</strong> Main section title</li>
                <li><strong>Description:</strong> Supporting text below heading</li>
                <li><strong>Alignment:</strong> Left or Center</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-primary mb-2">Link/Button Integration:</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>UUI Button:</strong> Full access to UntitledUI button system</li>
                <li><strong>Colors:</strong> Primary (brand), Accent, Secondary, Tertiary, Link</li>
                <li><strong>Sizes:</strong> SM, MD, LG, XL</li>
                <li><strong>Icons:</strong> Leading/trailing icons from @untitledui/icons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
