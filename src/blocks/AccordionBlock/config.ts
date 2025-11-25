import type { Block } from 'payload'

export const AccordionBlock: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'showHeader',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show Section Header',
          admin: {
            description: 'Toggle to show/hide the header section',
          },
        },
        {
          name: 'eyebrow',
          type: 'text',
          label: 'Eyebrow Text',
          admin: {
            description: 'Small text above heading (e.g., "FAQs", "Common Questions")',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          admin: {
            description: 'Main heading for the accordion section',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Section Description',
          admin: {
            description: 'Description text that appears below the heading',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'headerAlignment',
          type: 'select',
          defaultValue: 'left',
          label: 'Header Alignment',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
          ],
          admin: {
            description: 'Alignment of the section header',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
      ],
    },
    {
      name: 'contentSource',
      type: 'radio',
      label: 'Content Source',
      defaultValue: 'dynamic',
      options: [
        {
          label: 'Dynamic (Query FAQs)',
          value: 'dynamic',
        },
        {
          label: 'Manual Selection',
          value: 'manual',
        },
      ],
      admin: {
        description:
          'Choose between automatically showing FAQs based on filters or manually selecting specific FAQs',
        layout: 'horizontal',
      },
    },
    {
      name: 'opts',
      type: 'group',
      label: 'Dynamic FAQ Options',
      admin: {
        condition: (_, siblingData) => siblingData?.contentSource === 'dynamic',
      },
      fields: [
        {
          name: 'categoryFilter',
          type: 'relationship',
          relationTo: 'categories',
          hasMany: true,
          label: 'Filter by Categories',
          admin: {
            description: 'Optional: Show only FAQs from these categories (OR logic - matches any)',
          },
        },
        {
          name: 'limit',
          type: 'select',
          label: 'Number of FAQs',
          defaultValue: 'all',
          options: [
            { label: '3 FAQs', value: '3' },
            { label: '6 FAQs', value: '6' },
            { label: '9 FAQs', value: '9' },
            { label: '12 FAQs', value: '12' },
            { label: 'All FAQs', value: 'all' },
          ],
          admin: {
            description: 'Maximum number of FAQs to display',
          },
        },
        {
          name: 'sortBy',
          type: 'select',
          label: 'Sort By',
          defaultValue: 'order',
          options: [
            { label: 'Sort Order (Featured First)', value: 'order' },
            { label: 'Newest First', value: 'date' },
            { label: 'Question (A-Z)', value: 'question-asc' },
            { label: 'Question (Z-A)', value: 'question-desc' },
          ],
          admin: {
            description: 'How to sort the FAQs. Featured FAQs always appear first.',
          },
        },
        {
          name: 'excludeFAQs',
          type: 'relationship',
          relationTo: 'faqs',
          hasMany: true,
          label: 'Exclude Specific FAQs',
          admin: {
            description: 'Optional: Hide these FAQs even if they match other filters',
          },
        },
      ],
    },
    {
      name: 'selectedFAQs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      label: 'Selected FAQs',
      admin: {
        description: 'Manually select which FAQs to display',
        condition: (_, siblingData) => siblingData?.contentSource === 'manual',
      },
      minRows: 1,
      maxRows: 20,
    },
    {
      name: 'displayOptions',
      type: 'group',
      label: 'Display Options',
      admin: {
        description: 'Configure how accordions are displayed',
      },
      fields: [
        {
          name: 'defaultState',
          type: 'select',
          label: 'Default State',
          defaultValue: 'all-collapsed',
          options: [
            { label: 'All Collapsed', value: 'all-collapsed' },
            { label: 'First Item Open', value: 'first-open' },
            { label: 'All Open', value: 'all-open' },
          ],
          admin: {
            description: 'Initial state when the page loads',
          },
        },
        {
          name: 'allowMultipleOpen',
          type: 'checkbox',
          label: 'Allow Multiple Open',
          defaultValue: false,
          admin: {
            description: 'Allow multiple accordion items to be open simultaneously',
          },
        },
        {
          name: 'enableSearch',
          type: 'checkbox',
          label: 'Enable Search/Filter',
          defaultValue: false,
          admin: {
            description:
              'Add a search box to filter FAQs client-side (recommended for 6+ items)',
          },
        },
        {
          name: 'iconPosition',
          type: 'select',
          label: 'Icon Position',
          defaultValue: 'right',
          options: [
            { label: 'Right', value: 'right' },
            { label: 'Left', value: 'left' },
            { label: 'None', value: 'none' },
          ],
          admin: {
            description: 'Position of the toggle icon',
          },
        },
        {
          name: 'iconStyle',
          type: 'select',
          label: 'Icon Style',
          defaultValue: 'chevron',
          options: [
            { label: 'Chevron (Rotates)', value: 'chevron' },
            { label: 'Plus/Minus', value: 'plus-minus' },
          ],
          admin: {
            description: 'Style of the toggle icon',
          },
        },
      ],
    },
    {
      name: 'layoutOptions',
      type: 'group',
      label: 'Layout & Styling',
      admin: {
        description: 'Configure the visual appearance',
      },
      fields: [
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          label: 'Section Spacing',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: {
            description: 'Vertical spacing around this section',
          },
        },
        {
          name: 'animationSpeed',
          type: 'select',
          label: 'Animation Speed',
          defaultValue: 'normal',
          options: [
            { label: 'Fast (0.2s)', value: 'fast' },
            { label: 'Normal (0.3s)', value: 'normal' },
            { label: 'Slow (0.4s)', value: 'slow' },
          ],
          admin: {
            description: 'Speed of expand/collapse animations',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Accordion / FAQ',
    plural: 'Accordions / FAQs',
  },
}
