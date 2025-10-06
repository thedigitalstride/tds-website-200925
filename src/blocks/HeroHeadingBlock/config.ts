import type { Block } from 'payload'

export const HeroHeadingBlock: Block = {
  slug: 'heroHeading',
  interfaceName: 'HeroHeadingBlock',
  fields: [
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
            { label: 'Small (75% smaller)', value: 'small' },
            { label: 'Normal', value: 'normal' },
          ],
          admin: {
            description: 'Size variant for the subtitle text',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Hero Heading',
    plural: 'Hero Headings',
  },
}
