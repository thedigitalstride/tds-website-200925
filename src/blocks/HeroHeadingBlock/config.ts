import type { Block } from 'payload'

export const HeroHeadingBlock: Block = {
  slug: 'heroHeading',
  interfaceName: 'HeroHeadingBlock',
  fields: [
    {
      name: 'fullHeight',
      type: 'checkbox',
      defaultValue: false,
      label: 'Full Height Hero',
      admin: {
        description: 'Enable to create full-screen hero that extends behind the header. Unlocks background options.',
      },
    },
    {
      name: 'headline',
      type: 'textarea',
      required: true,
      admin: {
        description:
          'Main headline text. Use line breaks to create multiple lines that will scale responsively.',
        placeholder: 'More Leads.\nBetter Customers.\nFaster Growth.',
        rows: 4,
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      admin: {
        description: 'Subtitle text displayed below the headline',
        placeholder: 'Take it all in your Stride',
      },
    },
    {
      name: 'layoutOptions',
      type: 'group',
      label: 'Layout & Styling',
      admin: {
        description: 'Configure how the hero section is displayed',
      },
      fields: [
        {
          name: 'headlineColor',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Dark/Light Gray)', value: 'primary' },
            { label: 'Brand Blue (Accent)', value: 'brand' },
          ],
          admin: {
            description: 'Color scheme for the headline. Brand Blue shows accent blue in dark mode and dark blue in light mode.',
          },
        },
        {
          name: 'textAlignment',
          type: 'select',
          defaultValue: 'left',
          options: [
            { label: 'Left Aligned', value: 'left' },
            { label: 'Centered', value: 'center' },
          ],
          admin: {
            description: 'Text alignment for headline and subtitle',
          },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
          ],
          admin: {
            description: 'Vertical spacing around the hero section',
          },
        },
        {
          name: 'subtitleSize',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Small (75% of normal size)', value: 'small' },
            { label: 'Normal (100%)', value: 'normal' },
          ],
          admin: {
            description: 'Size variant for the subtitle text - Small reduces to 75% of normal size',
          },
        },
      ],
    },
    {
      name: 'bg',
      type: 'group',
      label: 'Background',
      admin: {
        condition: (_, siblingData) => siblingData?.fullHeight === true,
        description: 'Configure hero background - only available when Full Height is enabled',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Background Type',
          defaultValue: 'none',
          options: [
            { label: 'None (transparent)', value: 'none' },
            { label: 'Gradient', value: 'gradient' },
            { label: 'Image', value: 'image' },
            { label: 'Custom Class (for animations)', value: 'custom' },
          ],
          admin: {
            description: 'Background type - choose gradient for CSS gradients, image for uploads, or custom for animation containers',
          },
        },
        {
          name: 'gradient',
          type: 'select',
          label: 'Gradient Preset',
          defaultValue: 'brand-radial',
          options: [
            { label: 'Brand Blue Radial', value: 'brand-radial' },
            { label: 'Accent Gradient', value: 'accent-gradient' },
            { label: 'Dark to Light', value: 'dark-light' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'gradient',
            description: 'Pre-configured gradient styles using theme colors',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Upload background image - will be optimized automatically',
          },
        },
        {
          name: 'imageOpacity',
          type: 'number',
          label: 'Image Overlay Opacity',
          min: 0,
          max: 100,
          defaultValue: 40,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'image',
            description: 'Overlay darkness (0-100) - helps ensure text readability over images',
          },
        },
        {
          name: 'customClass',
          type: 'text',
          label: 'Custom Class Name',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'custom',
            description: 'Custom CSS class for animation containers or React-based effects',
            placeholder: 'animated-gradient',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Hero Header',
    plural: 'Hero Headers',
  },
}
