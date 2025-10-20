import type { Block } from 'payload'
import { link } from '@/fields/link'

export const HeroHeadingBlock: Block = {
  slug: 'heroHeading',
  interfaceName: 'HeroHeadingBlock',
  fields: [
    {
      name: 'heroLayout',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Split Image Contained', value: 'splitImage' },
        { label: 'Standard Contained', value: 'standardContained' },
      ],
      admin: {
        description: 'Choose the hero layout style. Split Image displays content on left with optional image on right. Standard Contained is a clean, boxed layout without backgrounds.',
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
      type: 'textarea',
      required: false,
      admin: {
        description: 'Subtitle text displayed below the headline',
        placeholder: 'Take it all in your Stride',
        rows: 3,
      },
    },
    {
      name: 'enableTypewriter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.heroLayout === 'standard',
        description: 'Enable typewriter animation effect for the headline (only available for Standard layout)',
      },
    },
    {
      label: 'Layout & Styling',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Configure how the hero section is displayed',
      },
      fields: [
        {
          name: 'headlineColor',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (Dark/Light Gray)', value: 'primary' },
            { label: 'Accent Blue', value: 'brand' },
          ],
          admin: {
            description: 'Color scheme for the headline. Brand Blue shows accent blue in dark mode and dark blue in light mode.',
          },
        },
        {
          name: 'subheadingColor',
          type: 'select',
          defaultValue: 'default',
          options: [
            { label: 'Default (Brand/White)', value: 'default' },
            { label: 'White (White/White)', value: 'white' },
          ],
          admin: {
            description: 'Color scheme for the subheading. Default shows brand-500 in light mode and white in dark mode.',
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
            condition: (_, siblingData) => siblingData?.heroLayout !== 'splitImage',
            description: 'Text alignment for headline and subtitle (not available for Split Image layout)',
          },
        },
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          options: [
            { label: 'Spacious', value: 'spacious' },
            { label: 'Normal', value: 'normal' },
            { label: 'Compact', value: 'compact' },
            { label: 'Minimal', value: 'minimal' },
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
        {
          name: 'heroBackground',
          type: 'select',
          label: 'Background Style',
          defaultValue: 'primary',
          options: [
            {
              label: 'Primary',
              value: 'primary',
            },
            {
              label: 'Secondary',
              value: 'secondary',
            },
            {
              label: 'Accent',
              value: 'accent',
            },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.heroLayout === 'splitImage' || siblingData?.heroLayout === 'standardContained',
            description: 'Background style for the contained layout',
          },
        },
      ],
    },
    {
      name: 'splitImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Split Image',
      required: false,
      admin: {
        condition: (_, siblingData) => siblingData?.heroLayout === 'splitImage',
        description: 'Optional image for split layout. Appears on right side (desktop) with 30° diagonal edge, or below headline (mobile). Alt text is automatically used from the media upload.',
      },
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Call-to-Action Buttons',
      maxRows: 2,
      admin: {
        condition: (_, siblingData) => siblingData?.heroLayout === 'splitImage' || siblingData?.heroLayout === 'standardContained',
        description: 'Add up to 2 CTA buttons (e.g., "Get Started", "Learn More")',
      },
      fields: [
        link({
          enableUUIButton: true,
          uuiColors: ['primary', 'accent', 'secondary', 'tertiary'],
          uuiSizes: ['md', 'lg', 'xl'],
          defaultUUIColor: 'primary',
          defaultUUISize: 'xl',
          appearances: false,
        }),
      ],
    },
    {
      name: 'bg',
      type: 'group',
      label: 'Custom Background',
      admin: {
        condition: (_, siblingData) => siblingData?.heroLayout !== 'splitImage' && siblingData?.heroLayout !== 'standardContained',
        description: 'Add custom background with image, gradient, or custom styling (only available for Standard layout)',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Custom Background',
          defaultValue: false,
          admin: {
            description: 'Toggle to enable background customization',
          },
        },
        {
          name: 'heightVariant',
          type: 'select',
          label: 'Height Variant',
          defaultValue: 'default',
          options: [
            { label: 'Default (Standard Height)', value: 'default' },
            { label: 'Full Height (Extends Behind Header)', value: 'fullHeight' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.enabled === true,
            description: 'Choose how tall the hero section should be. Full Height creates a full-screen hero that extends behind the header.',
          },
        },
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
            condition: (_, siblingData) => siblingData?.enabled === true,
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
            condition: (_, siblingData) => siblingData?.enabled === true && siblingData?.type === 'gradient',
            description: 'Pre-configured gradient styles using theme colors',
          },
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled === true && siblingData?.type === 'image',
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
            condition: (_, siblingData) => siblingData?.enabled === true && siblingData?.type === 'image',
            description: 'Overlay darkness (0-100) - helps ensure text readability over images',
          },
        },
        {
          name: 'customClass',
          type: 'text',
          label: 'Custom Class Name',
          admin: {
            condition: (_, siblingData) => siblingData?.enabled === true && siblingData?.type === 'custom',
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