"use client";

import React from 'react';
import { RadioGroup } from '@/components/uui';
import { Mail01, Package, Zap, Users01, Building07 } from '@untitledui/icons';

export function RadioGroupsSection() {
  const [selectedCheckbox, setSelectedCheckbox] = React.useState('basic');
  const [selectedIconSimple, setSelectedIconSimple] = React.useState('pro');
  const [selectedIconCard, setSelectedIconCard] = React.useState('team');

  const checkboxItems = [
    {
      value: 'basic',
      title: 'Basic Plan',
      secondaryTitle: '$10/month',
      description: 'Perfect for individuals and small teams',
      icon: Package,
    },
    {
      value: 'pro',
      title: 'Pro Plan',
      secondaryTitle: '$25/month',
      description: 'For growing businesses with more features',
      icon: Zap,
    },
    {
      value: 'enterprise',
      title: 'Enterprise',
      secondaryTitle: 'Custom pricing',
      description: 'Advanced features for large organizations',
      icon: Building07,
    },
  ];

  const iconSimpleItems = [
    {
      value: 'basic',
      title: 'Starter',
      secondaryTitle: '$10/mo',
      description: 'Up to 10 users',
      icon: Package,
    },
    {
      value: 'pro',
      title: 'Professional',
      secondaryTitle: '$25/mo',
      description: 'Up to 50 users',
      icon: Zap,
    },
    {
      value: 'business',
      title: 'Business',
      secondaryTitle: '$50/mo',
      description: 'Unlimited users',
      icon: Users01,
    },
  ];

  const iconCardItems = [
    {
      value: 'individual',
      title: 'Individual',
      description: 'Perfect for personal projects',
      secondaryTitle: 'per month',
      price: '$9',
      icon: Mail01,
      badge: 'Popular',
    },
    {
      value: 'team',
      title: 'Team',
      description: 'Collaborate with your team',
      secondaryTitle: 'per user/month',
      price: '$15',
      icon: Users01,
    },
    {
      value: 'enterprise',
      title: 'Enterprise',
      description: 'For large organizations',
      secondaryTitle: 'custom',
      price: 'Contact us',
      icon: Building07,
    },
  ];

  return (
    <section id="radio-groups">
      <h2 className="text-display-md font-semibold text-primary mb-8">Radio Groups</h2>
      <p className="text-md text-secondary mb-12 max-w-3xl">
        UntitledUI Radio Groups for single-selection interfaces. Built on react-aria for full accessibility with keyboard navigation and screen reader support.
      </p>

      <div className="space-y-16">
        {/* Radio Group Checkbox */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-6">Checkbox Style</h3>
          <p className="text-sm text-tertiary mb-6">Radio group with checkbox indicators - ideal for plan selection and feature comparisons.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Small Size</p>
              <RadioGroup.Checkbox
                items={checkboxItems}
                size="sm"
                value={selectedCheckbox}
                onChange={(value) => setSelectedCheckbox(value as string)}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Medium Size</p>
              <RadioGroup.Checkbox
                items={checkboxItems}
                size="md"
                value={selectedCheckbox}
                onChange={(value) => setSelectedCheckbox(value as string)}
              />
            </div>
          </div>

          <code className="block mt-6 text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md overflow-x-auto whitespace-pre">
{`import { RadioGroup } from '@/components/uui';
import { Package, Zap, Building07 } from '@untitledui/icons';

const items = [
  {
    value: 'basic',
    title: 'Basic Plan',
    secondaryTitle: '$10/month',
    description: 'Perfect for individuals',
    icon: Package,
  },
  // ... more items
];

<RadioGroup.Checkbox
  items={items}
  size="sm"
  value={selected}
  onChange={(value) => setSelected(value)}
/>`}
          </code>
        </div>

        {/* Radio Group Icon Simple */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-6">Icon Simple Style</h3>
          <p className="text-sm text-tertiary mb-6">Clean radio group with featured icons - great for pricing tiers and plan selection.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Small Size</p>
              <RadioGroup.IconSimple
                items={iconSimpleItems}
                size="sm"
                value={selectedIconSimple}
                onChange={(value) => setSelectedIconSimple(value as string)}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Medium Size</p>
              <RadioGroup.IconSimple
                items={iconSimpleItems}
                size="md"
                value={selectedIconSimple}
                onChange={(value) => setSelectedIconSimple(value as string)}
              />
            </div>
          </div>

          <code className="block mt-6 text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md overflow-x-auto whitespace-pre">
{`<RadioGroup.IconSimple
  items={items}
  size="md"
  value={selected}
  onChange={(value) => setSelected(value)}
/>`}
          </code>
        </div>

        {/* Radio Group Icon Card */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-6">Icon Card Style</h3>
          <p className="text-sm text-tertiary mb-6">Premium card-style radio group with pricing and badges - perfect for subscription plans.</p>

          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Small Size</p>
              <RadioGroup.IconCard
                items={iconCardItems}
                size="sm"
                value={selectedIconCard}
                onChange={(value) => setSelectedIconCard(value as string)}
              />
            </div>
            <div>
              <p className="text-sm font-medium text-secondary mb-3">Medium Size</p>
              <RadioGroup.IconCard
                items={iconCardItems}
                size="md"
                value={selectedIconCard}
                onChange={(value) => setSelectedIconCard(value as string)}
              />
            </div>
          </div>

          <code className="block mt-6 text-sm text-brand-secondary bg-secondary px-4 py-3 rounded-md overflow-x-auto whitespace-pre">
{`const items = [
  {
    value: 'team',
    title: 'Team',
    description: 'Collaborate with your team',
    secondaryTitle: 'per user/month',
    price: '$15',
    icon: Users01,
    badge: 'Popular', // Optional
  },
];

<RadioGroup.IconCard
  items={items}
  size="md"
  value={selected}
  onChange={(value) => setSelected(value)}
/>`}
          </code>
        </div>

        {/* Features & Best Practices */}
        <div className="bg-secondary p-6 rounded-lg border border-primary">
          <h3 className="text-lg font-semibold text-primary mb-4">Features & Best Practices</h3>
          <ul className="space-y-2 text-sm text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-medium">✓</span>
              <span><strong>Full Accessibility:</strong> Built on react-aria-components with keyboard navigation, focus management, and screen reader support</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-medium">✓</span>
              <span><strong>Size Variants:</strong> Small (sm) and Medium (md) sizes for different contexts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-medium">✓</span>
              <span><strong>Icon Support:</strong> Accepts icons from @untitledui/icons or any FC component</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-medium">✓</span>
              <span><strong>Disabled State:</strong> Add <code className="text-brand-secondary">disabled: true</code> to any item</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-secondary font-medium">✓</span>
              <span><strong>Controlled Component:</strong> Use <code className="text-brand-secondary">value</code> and <code className="text-brand-secondary">onChange</code> props for controlled state</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-primary">
            <p className="text-sm font-medium text-primary mb-2">Available Variants:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-tertiary">
              <div><code className="text-brand-secondary">RadioGroup.Checkbox</code> - Checkbox indicator style</div>
              <div><code className="text-brand-secondary">RadioGroup.IconSimple</code> - Clean icon with text</div>
              <div><code className="text-brand-secondary">RadioGroup.IconCard</code> - Card with pricing</div>
              <div><code className="text-brand-secondary">RadioGroup.Avatar</code> - Avatar selection</div>
              <div><code className="text-brand-secondary">RadioGroup.PaymentIcon</code> - Payment methods</div>
              <div><code className="text-brand-secondary">RadioGroup.RadioButton</code> - Traditional radio buttons</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
