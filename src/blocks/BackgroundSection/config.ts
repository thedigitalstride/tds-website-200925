import type { Block } from 'payload'

// Import blocks that can be nested inside BackgroundSection
import { CardGridBlock } from '../CardGridBlock/config'
import { Content } from '../Content/config'
import { CallToAction } from '../CallToAction/config'
import { MediaBlock } from '../MediaBlock/config'
import { AccordionBlock } from '../AccordionBlock/config'

export const BackgroundSection: Block = {
  slug: 'backgroundSection',
  interfaceName: 'BackgroundSection',
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          name: 'showHeader',
          type: 'checkbox',
          defaultValue: false,
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
            description: 'Small text above heading (e.g., "Our Services", "What We Offer")',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Section Heading',
          admin: {
            description: 'Main heading for the section',
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
          defaultValue: 'center',
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
        {
          name: 'textColor',
          type: 'select',
          defaultValue: 'auto',
          label: 'Header Text Color',
          options: [
            { label: 'Auto (adapts to background)', value: 'auto' },
            { label: 'Light (white text)', value: 'light' },
            { label: 'Dark (dark text)', value: 'dark' },
          ],
          admin: {
            description: 'Override text color for better contrast on backgrounds',
            condition: (_, siblingData) => siblingData?.showHeader === true,
          },
        },
      ],
    },
    {
      label: 'Background Settings',
      type: 'collapsible',
      admin: {
        initCollapsed: false,
        description: 'Configure the background style for this section',
      },
      fields: [
        {
          name: 'backgroundType',
          type: 'select',
          defaultValue: 'none',
          label: 'Background Type',
          options: [
            { label: 'None (transparent)', value: 'none' },
            { label: 'Solid Color', value: 'solid' },
            { label: 'Gradient', value: 'gradient' },
            { label: 'Image', value: 'image' },
            { label: 'Custom Animation', value: 'custom' },
          ],
          admin: {
            description: 'Choose the type of background for this section',
          },
        },
        {
          name: 'solidColor',
          type: 'select',
          label: 'Background Color',
          defaultValue: 'primary',
          options: [
            { label: 'Primary (adapts to theme)', value: 'primary' },
            { label: 'Primary Reversed', value: 'primary-reversed' },
            { label: 'Secondary (subtle gray)', value: 'secondary' },
            { label: 'Tertiary (medium gray)', value: 'tertiary' },
            { label: 'Accent (brand blue)', value: 'accent' },
            { label: 'White', value: 'white' },
            { label: 'Dark', value: 'dark' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'solid',
            description: 'Select a solid background color from the theme',
          },
        },
        {
          name: 'gradient',
          type: 'select',
          label: 'Gradient Style',
          defaultValue: 'brand-radial',
          options: [
            { label: 'Brand Blue Radial', value: 'brand-radial' },
            { label: 'Accent Gradient (Blue to Light)', value: 'accent-gradient' },
            { label: 'Dark to Light', value: 'dark-light' },
            { label: 'Sunrise (Warm)', value: 'sunrise' },
            { label: 'Ocean (Cool)', value: 'ocean' },
            { label: 'Purple Haze', value: 'purple-haze' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'gradient',
            description: 'Choose a pre-defined gradient style',
          },
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'image',
            description: 'Upload a background image - will be optimized automatically',
          },
        },
        {
          name: 'imageOverlay',
          type: 'select',
          label: 'Image Overlay',
          defaultValue: 'dark-40',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Light 20%', value: 'light-20' },
            { label: 'Light 40%', value: 'light-40' },
            { label: 'Light 60%', value: 'light-60' },
            { label: 'Dark 20%', value: 'dark-20' },
            { label: 'Dark 40%', value: 'dark-40' },
            { label: 'Dark 60%', value: 'dark-60' },
            { label: 'Dark 80%', value: 'dark-80' },
            { label: 'Brand Blue 40%', value: 'brand-40' },
            { label: 'Brand Blue 60%', value: 'brand-60' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'image',
            description: 'Add an overlay to ensure text readability',
          },
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          defaultValue: 'center',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Top', value: 'top' },
            { label: 'Bottom', value: 'bottom' },
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'image',
            description: 'Control the focal point of the background image',
          },
        },
        {
          name: 'enableParallax',
          type: 'checkbox',
          label: 'Enable Parallax Effect',
          defaultValue: false,
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'image',
            description: 'Add a subtle parallax scrolling effect to the background image',
          },
        },
        {
          name: 'customClass',
          type: 'text',
          label: 'Custom Animation Class',
          admin: {
            condition: (_, siblingData) => siblingData?.backgroundType === 'custom',
            description: 'CSS class name for custom animations (e.g., "animated-gradient", "particle-bg")',
            placeholder: 'animated-gradient',
          },
        },
      ],
    },
    {
      name: 'contentBlocks',
      type: 'blocks',
      label: 'Content Blocks',
      required: true,
      minRows: 1,
      maxRows: 5,
      blocks: [
        CardGridBlock,
        Content,
        CallToAction,
        MediaBlock,
        AccordionBlock,
      ],
      admin: {
        description: 'Add content blocks that will appear inside this background section',
        initCollapsed: false,
      },
    },
    {
      label: 'Layout Options',
      type: 'collapsible',
      admin: {
        initCollapsed: true,
        description: 'Configure spacing and layout settings',
      },
      fields: [
        {
          name: 'spacing',
          type: 'select',
          defaultValue: 'normal',
          label: 'Section Spacing',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Compact', value: 'compact' },
            { label: 'Normal', value: 'normal' },
            { label: 'Spacious', value: 'spacious' },
            { label: 'Extra Spacious', value: 'extra' },
          ],
          admin: {
            description: 'Vertical padding for this section',
          },
        },
        {
          name: 'contentWidth',
          type: 'select',
          defaultValue: 'container',
          label: 'Content Width',
          options: [
            { label: 'Standard Container', value: 'container' },
            { label: 'Wide Container', value: 'wide' },
            { label: 'Full Width', value: 'full' },
          ],
          admin: {
            description: 'Maximum width for the content inside this section',
          },
        },
        {
          name: 'colorMode',
          type: 'select',
          defaultValue: 'auto',
          label: 'Content Color Mode',
          options: [
            { label: 'Auto (adapts to background)', value: 'auto' },
            { label: 'Force Light (white text)', value: 'light' },
            { label: 'Force Dark (dark text)', value: 'dark' },
          ],
          admin: {
            description: 'Override text colors for all content in this section',
          },
        },
      ],
    },
  ],
  labels: {
    singular: 'Background Section',
    plural: 'Background Sections',
  },
}