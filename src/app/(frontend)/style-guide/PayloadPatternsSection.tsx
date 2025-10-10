"use client";

import React from 'react';

export function PayloadPatternsSection() {
  return (
    <section id="patterns">
      <h2 className="text-display-md font-semibold text-primary mb-8">Payload CMS Patterns</h2>
      <p className="text-md text-secondary mb-12 max-w-3xl">
        Common configuration patterns used throughout the Payload blocks and collections. These patterns enhance the admin UX and provide consistent configuration experiences.
      </p>

      {/* Collapsible Sections */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Collapsible Field Groups</h3>
        <p className="text-md text-tertiary mb-6">
          Used to reduce admin panel clutter by grouping related options. Commonly used for layout, styling, and advanced settings.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`{
  label: 'Layout & Styling',
  type: 'collapsible',
  admin: {
    initCollapsed: true, // Start collapsed
    description: 'Configure how the section is displayed'
  },
  fields: [
    // Nested fields here...
  ]
}`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> HeroHeadingBlock (Layout & Styling), FeaturesBlock (layoutOptions group), LatestPostsBlock (layoutOptions group)
          </p>
        </div>
      </div>

      {/* Conditional Fields */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Conditional Field Display</h3>
        <p className="text-md text-tertiary mb-6">
          Show/hide fields based on sibling field values. Reduces complexity by only showing relevant options.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`// Parent toggle field
{
  name: 'showHeader',
  type: 'checkbox',
  defaultValue: true,
  label: 'Show Section Header'
}

// Child field (only shows when parent is true)
{
  name: 'heading',
  type: 'text',
  label: 'Section Heading',
  admin: {
    condition: (_, siblingData) => siblingData?.showHeader === true
  }
}`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> FeaturesBlock (header fields), LatestPostsBlock (header fields, content source), HeroHeadingBlock (background options)
          </p>
        </div>
      </div>

      {/* Row Labels for Arrays */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Custom Row Labels</h3>
        <p className="text-md text-tertiary mb-6">
          Improve admin UX by showing identifiable content in array rows instead of generic &quot;Item 1&quot;, &quot;Item 2&quot; labels.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`{
  name: 'features',
  type: 'array',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' }
  ],
  admin: {
    initCollapsed: true,
    components: {
      RowLabel: '@/blocks/FeaturesBlock/FeatureRowLabel#FeatureRowLabel'
    }
  }
}

// FeatureRowLabel.tsx
export const FeatureRowLabel: RowLabelComponent = ({ data, index }) => {
  return data?.title || \`Feature \${String(index).padStart(2, '0')}\`;
};`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> FeaturesBlock features array
          </p>
          <p className="text-sm text-tertiary mt-2">
            <strong className="text-primary">Documentation:</strong> See [ROW_LABELS.md](docs/ROW_LABELS.md)
          </p>
        </div>
      </div>

      {/* Link Field with UUI Buttons */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Link Field with UUI Button Integration</h3>
        <p className="text-md text-tertiary mb-6">
          Reusable link field that supports both regular links and UUI-styled buttons with full configuration options.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`import { link } from '@/fields/link'

// In block config
link({
  enableUUIButton: true,
  uuiColors: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
  uuiSizes: ['sm', 'md', 'lg', 'xl'],
  defaultUUIColor: 'primary',
  defaultUUISize: 'md',
  overrides: {
    admin: {
      condition: (_, siblingData) => siblingData?.enableLink === true
    }
  }
})`}
        </code>
        <div className="bg-secondary p-4 rounded-lg space-y-2">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Provides:</strong> Link type (internal/custom), URL, label, new tab option, UUI button toggle, button color/size selection, icon selection
          </p>
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> FeaturesBlock (per-feature links), ButtonBlock, ContentBlock, CallToActionBlock
          </p>
        </div>
      </div>

      {/* Link Group */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Link Group (Multiple Buttons)</h3>
        <p className="text-md text-tertiary mb-6">
          Array of links configured as a group, commonly used for CTAs with primary and secondary actions.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`import { linkGroup } from '@/fields/linkGroup'

linkGroup({
  enableUUIButton: true,
  uuiColors: ['primary', 'accent', 'secondary', 'tertiary', 'link'],
  uuiSizes: ['sm', 'md', 'lg', 'xl'],
  defaultUUIColor: 'primary',
  defaultUUISize: 'lg',
  overrides: {
    maxRows: 2 // Limit to 2 buttons
  }
})`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> CallToActionBlock (up to 2 buttons)
          </p>
        </div>
      </div>

      {/* Spacing Control */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Spacing Control Pattern</h3>
        <p className="text-md text-tertiary mb-6">
          Consistent vertical spacing control across all blocks. Provides three levels: compact, normal, and spacious.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`{
  name: 'spacing',
  type: 'select',
  defaultValue: 'normal',
  options: [
    { label: 'Compact', value: 'compact' },
    { label: 'Normal', value: 'normal' },
    { label: 'Spacious', value: 'spacious' }
  ],
  admin: {
    description: 'Vertical spacing around this section'
  }
}

// In component
const spacingClasses = {
  compact: 'py-8 md:py-12',
  normal: 'py-12 md:py-16',
  spacious: 'py-16 md:py-24'
};`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> All major blocks (HeroHeading, Features, LatestPosts, CTA, Content)
          </p>
        </div>
      </div>

      {/* Icon Selection */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Icon Selection Pattern</h3>
        <p className="text-md text-tertiary mb-6">
          Text field for selecting icons from @untitledui/icons with helpful descriptions and validation.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`{
  name: 'icon',
  type: 'text',
  label: 'Icon Name',
  admin: {
    description: 'Icon name from @untitledui/icons (e.g., "Zap", "MessageChatCircle"). Case-sensitive. Browse: https://icons.untitledui.com',
    placeholder: 'Zap'
  }
}

// In component - dynamic icon loading
import * as Icons from '@untitledui/icons';
const IconComponent = icon && Icons[icon as keyof typeof Icons];
{IconComponent && <IconComponent className="size-6" />}`}
        </code>
        <div className="bg-secondary p-4 rounded-lg space-y-2">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Available Icons:</strong> 1000+ icons from UntitledUI
          </p>
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> FeaturesBlock, ButtonBlock (via link field), HeroHeadingBlock (potential future enhancement)
          </p>
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Browse Icons:</strong> <a href="https://icons.untitledui.com" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">icons.untitledui.com</a>
          </p>
        </div>
      </div>

      {/* Rich Text with Buttons */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Rich Text Editor Configuration</h3>
        <p className="text-md text-tertiary mb-6">
          Custom Lexical editor with configurable heading sizes and UUI button integration.
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`import { richTextEditor } from '@/fields/richTextWithButtons'

{
  name: 'richText',
  type: 'richText',
  editor: richTextEditor({
    enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
  }),
  label: false
}`}
        </code>
        <div className="bg-secondary p-4 rounded-lg space-y-2">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Features:</strong> Selectable heading sizes, paragraph text, lists, bold, italic, links, inline code
          </p>
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> CallToActionBlock (H1-H4), ContentBlock (H2-H4)
          </p>
        </div>
      </div>

      {/* Group Fields */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Group Fields for Organization</h3>
        <p className="text-md text-tertiary mb-6">
          Logical grouping of related fields without visual separation (unlike collapsible fields).
        </p>
        <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md mb-4 overflow-x-auto">
          {`{
  name: 'header',
  type: 'group',
  label: 'Section Header',
  fields: [
    { name: 'showHeader', type: 'checkbox', defaultValue: true },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'description', type: 'textarea' }
  ]
}

// Access in code: block.header.heading`}
        </code>
        <div className="bg-secondary p-4 rounded-lg">
          <p className="text-sm text-tertiary">
            <strong className="text-primary">Used in:</strong> FeaturesBlock (header group), LatestPostsBlock (header group), HeroHeadingBlock (bg group)
          </p>
        </div>
      </div>

      {/* Documentation Links */}
      <div className="border-t border-secondary pt-12">
        <h3 className="text-xl font-semibold text-primary mb-6">Related Documentation</h3>
        <div className="bg-secondary p-6 rounded-lg space-y-3">
          <p className="text-sm text-secondary">
            📚 <strong className="text-primary">Full Block Configs:</strong> See <code className="text-brand-secondary">src/blocks/[BlockName]/config.ts</code>
          </p>
          <p className="text-sm text-secondary">
            📋 <strong className="text-primary">Row Labels:</strong> [ROW_LABELS.md](docs/ROW_LABELS.md)
          </p>
          <p className="text-sm text-secondary">
            🔧 <strong className="text-primary">Collapsible Fields:</strong> [COLLAPSIBLE_FIELDS.md](docs/COLLAPSIBLE_FIELDS.md)
          </p>
          <p className="text-sm text-secondary">
            🎨 <strong className="text-primary">Button System:</strong> [BUTTON_SYSTEM.md](docs/BUTTON_SYSTEM.md)
          </p>
          <p className="text-sm text-secondary">
            🗂️ <strong className="text-primary">Payload Docs:</strong> <a href="https://payloadcms.com/docs" target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline">payloadcms.com/docs</a>
          </p>
        </div>
      </div>
    </section>
  );
}
