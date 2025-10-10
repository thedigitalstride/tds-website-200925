"use client";

import React from 'react';
import { InputGroup } from '@/components/uui/input-group';
import { InputBase } from '@/components/uui/input';
import { Avatar } from '@/components/uui/base/avatar/avatar';
import { BadgeGroup } from '@/components/uui/base/badges/badge-groups';
import { Badge } from '@/components/uui/base/badges/badges';
import { Button } from '@/components/uui/button';
import { Tooltip } from '@/components/uui/tooltip';
import { Globe01, HelpCircle } from '@untitledui/icons';

export function AdvancedComponentsSection() {
  return (
    <section>
      <h2 className="text-display-md font-semibold text-primary mb-8">Advanced UI Components</h2>
      <p className="text-md text-secondary mb-12 max-w-3xl">
        Additional UntitledUI components beyond basic form fields. These components are built on react-aria for accessibility and support full theme integration.
      </p>

      {/* Input Groups */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Input Groups</h3>
        <p className="text-md text-tertiary mb-8">
          Enhanced inputs with prefixes, leading addons, and trailing addons. Perfect for URLs, prices, domains, and other formatted inputs.
        </p>

        <div className="space-y-8">
          {/* Text Prefix */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Text Prefix (Inside Input)</h4>
            <div className="max-w-md">
              <InputGroup
                label="Website URL"
                prefix="https://"
                size="md"
              >
                <InputBase placeholder="www.example.com" />
              </InputGroup>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<InputGroup label="Website URL" prefix="https://" size="md">
  <InputBase placeholder="www.example.com" />
</InputGroup>`}
            </code>
          </div>

          {/* Leading Addon */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Leading Addon (Icon)</h4>
            <div className="max-w-md">
              <InputGroup
                label="Website Domain"
                leadingAddon={<InputGroup.Prefix><Globe01 className="size-5" /></InputGroup.Prefix>}
                size="md"
              >
                <InputBase placeholder="example.com" />
              </InputGroup>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<InputGroup
  label="Website Domain"
  leadingAddon={<InputGroup.Prefix><Globe01 /></InputGroup.Prefix>}
>
  <InputBase placeholder="example.com" />
</InputGroup>`}
            </code>
          </div>

          {/* Trailing Addon */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Trailing Addon (Text)</h4>
            <div className="max-w-md">
              <InputGroup
                label="Subdomain"
                trailingAddon={<InputGroup.Prefix>.mysite.com</InputGroup.Prefix>}
                size="md"
              >
                <InputBase placeholder="blog" />
              </InputGroup>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<InputGroup
  label="Subdomain"
  trailingAddon={<InputGroup.Prefix>.mysite.com</InputGroup.Prefix>}
>
  <InputBase placeholder="blog" />
</InputGroup>`}
            </code>
          </div>

          {/* Combination */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Combined Prefix and Trailing Addon</h4>
            <div className="max-w-md">
              <InputGroup
                label="Price"
                prefix="$"
                trailingAddon={<InputGroup.Prefix>USD</InputGroup.Prefix>}
                size="md"
              >
                <InputBase placeholder="0.00" type="number" />
              </InputGroup>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<InputGroup
  label="Price"
  prefix="$"
  trailingAddon={<InputGroup.Prefix>USD</InputGroup.Prefix>}
>
  <InputBase placeholder="0.00" type="number" />
</InputGroup>`}
            </code>
          </div>
        </div>
      </div>

      {/* Avatars */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Avatars</h3>
        <p className="text-md text-tertiary mb-8">
          User profile images with multiple sizes, placeholder support, and optional status indicators.
        </p>

        <div className="space-y-8">
          {/* Sizes */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Avatar Sizes</h4>
            <div className="flex items-end gap-6">
              <div className="text-center">
                <Avatar size="xs" alt="User" />
                <p className="text-xs text-tertiary mt-2">XS</p>
              </div>
              <div className="text-center">
                <Avatar size="sm" alt="User" />
                <p className="text-xs text-tertiary mt-2">SM</p>
              </div>
              <div className="text-center">
                <Avatar size="md" alt="User" />
                <p className="text-xs text-tertiary mt-2">MD</p>
              </div>
              <div className="text-center">
                <Avatar size="lg" alt="User" />
                <p className="text-xs text-tertiary mt-2">LG</p>
              </div>
              <div className="text-center">
                <Avatar size="xl" alt="User" />
                <p className="text-xs text-tertiary mt-2">XL</p>
              </div>
              <div className="text-center">
                <Avatar size="2xl" alt="User" />
                <p className="text-xs text-tertiary mt-2">2XL</p>
              </div>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<Avatar size="xs" | "sm" | "md" | "lg" | "xl" | "2xl" alt="User name" />`}
            </code>
          </div>

          {/* Placeholders */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Placeholder Variants</h4>
            <div className="flex items-center gap-4">
              <Avatar size="lg" alt="User" placeholder="initials" initials="JD" />
              <Avatar size="lg" alt="User" placeholder="icon" />
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<Avatar size="lg" placeholder="initials" initials="JD" />
<Avatar size="lg" placeholder="icon" />`}
            </code>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Badges & Badge Groups</h3>
        <p className="text-md text-tertiary mb-8">
          Status indicators and labels with multiple color variants and optional icons or addons.
        </p>

        <div className="space-y-8">
          {/* Basic Badges */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Badge Colors & Sizes</h4>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="brand" size="sm">Brand SM</Badge>
                <Badge color="brand" size="md">Brand MD</Badge>
                <Badge color="brand" size="lg">Brand LG</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="gray" size="md">Gray</Badge>
                <Badge color="error" size="md">Error</Badge>
                <Badge color="warning" size="md">Warning</Badge>
                <Badge color="success" size="md">Success</Badge>
              </div>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<Badge color="brand" | "gray" | "error" | "warning" | "success" size="sm" | "md" | "lg">
  Label
</Badge>`}
            </code>
          </div>

          {/* Badge Groups */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Badge Groups (with Addon Text)</h4>
            <div className="flex flex-wrap gap-3">
              <BadgeGroup color="brand" size="md" addonText="Status">Active</BadgeGroup>
              <BadgeGroup color="success" size="md" addonText="Version">v2.0</BadgeGroup>
              <BadgeGroup color="gray" size="md" addonText="Category">Design</BadgeGroup>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<BadgeGroup color="brand" size="md" addonText="Status">Active</BadgeGroup>`}
            </code>
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary mb-6">Tooltips</h3>
        <p className="text-md text-tertiary mb-8">
          Contextual help text that appears on hover or focus. Supports multiple placements and triggers.
        </p>

        <div className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-secondary">Tooltip on Button</h4>
            <div className="flex gap-4">
              <Tooltip placement="top" title="This is a helpful tooltip message" delay={0}>
                <Button color="secondary" size="md" iconTrailing={HelpCircle}>
                  Hover for help
                </Button>
              </Tooltip>

              <Tooltip placement="bottom" title="Tooltips can be positioned in multiple directions" delay={0}>
                <Button color="secondary" size="md" iconTrailing={HelpCircle}>
                  Bottom tooltip
                </Button>
              </Tooltip>
            </div>
            <code className="block text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md">
              {`<Tooltip placement="top" | "bottom" | "left" | "right" title="Tooltip text" delay={300}>
  <Button>Hover me</Button>
</Tooltip>

// With description
<Tooltip title="Title" description="Additional info" placement="top">
  <Button>Hover me</Button>
</Tooltip>`}
            </code>
            <p className="text-sm text-tertiary mt-3">
              <strong className="text-primary">Props:</strong> <code className="text-brand-secondary">title</code> (required), <code className="text-brand-secondary">description</code> (optional), <code className="text-brand-secondary">placement</code>, <code className="text-brand-secondary">delay</code> (default 300ms), <code className="text-brand-secondary">arrow</code> (show arrow pointer)
            </p>
          </div>
        </div>
      </div>

      {/* Integration Notes */}
      <div className="border-t border-secondary pt-12">
        <h3 className="text-xl font-semibold text-primary mb-6">Usage Notes</h3>
        <div className="bg-secondary p-6 rounded-lg space-y-4">
          <div>
            <h4 className="text-md font-semibold text-primary mb-2">React Aria Foundation</h4>
            <p className="text-sm text-secondary">
              All advanced components are built on react-aria-components, providing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-tertiary mt-2">
              <li>Full keyboard navigation support</li>
              <li>Screen reader announcements</li>
              <li>WCAG 2.1 AA compliance</li>
              <li>Focus management</li>
              <li>Mobile touch support</li>
            </ul>
          </div>
          <div className="pt-4 border-t border-primary">
            <h4 className="text-md font-semibold text-primary mb-2">Theme Integration</h4>
            <p className="text-sm text-secondary">
              Components use CSS variables from [theme.css](src/styles/theme.css) for consistent styling:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-tertiary mt-2">
              <li>Colors: <code className="text-brand-secondary">bg-primary</code>, <code className="text-brand-secondary">text-primary</code>, etc.</li>
              <li>Spacing: Based on <code className="text-brand-secondary">--spacing</code> (4px base unit)</li>
              <li>Shadows: <code className="text-brand-secondary">shadow-xs</code>, <code className="text-brand-secondary">shadow-sm</code>, etc.</li>
              <li>Borders: <code className="text-brand-secondary">border-primary</code>, <code className="text-brand-secondary">ring-brand</code></li>
            </ul>
          </div>
          <div className="pt-4 border-t border-primary">
            <h4 className="text-md font-semibold text-primary mb-2">Import Paths</h4>
            <div className="space-y-2 text-sm">
              <p className="text-secondary">Components can be imported from:</p>
              <code className="block text-brand-secondary bg-tertiary px-3 py-2 rounded">
                {`// Base components (directly from UUI)
import { Avatar } from '@/components/uui/base/avatar/avatar'
import { Badge } from '@/components/uui/base/badges/badges'

// Wrapped components (with Payload integration)
import { Input } from '@/components/uui/input'
import { Button } from '@/components/uui/button'`}
              </code>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
