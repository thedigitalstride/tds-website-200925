import type { Block, Field } from 'payload'
import type { RowLabelComponent } from 'payload'

import { link } from '@/fields/link'
import { richTextFull } from '@/fields/richTextWithButtons'
import { ColumnRowLabel } from './ColumnRowLabel'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'verticalAlign',
    type: 'radio',
    defaultValue: 'top',
    admin: {
      layout: 'horizontal',
      description: 'Vertical alignment of all content in this column (text, images, buttons)',
    },
    options: [
      { label: 'Top', value: 'top' },
      { label: 'Middle', value: 'middle' },
      { label: 'Bottom', value: 'bottom' },
    ],
  },
  {
    name: 'contentType',
    type: 'radio',
    defaultValue: 'richText',
    admin: {
      layout: 'horizontal',
      description: 'Choose between rich text content or a direct image upload',
    },
    options: [
      { label: 'Rich Text', value: 'richText' },
      { label: 'Image', value: 'image' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: richTextFull(),
    label: false,
    required: false,
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'richText',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    label: 'Image',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'image',
      description: 'Select or upload an image for this column',
    },
  },
  {
    name: 'imageOptions',
    type: 'group',
    label: 'Image Options',
    admin: {
      condition: (_data, siblingData) => siblingData?.contentType === 'image',
    },
    fields: [
      {
        name: 'fit',
        type: 'select',
        defaultValue: 'cover',
        label: 'Object Fit',
        options: [
          { label: 'Cover (fills space, may crop)', value: 'cover' },
          { label: 'Contain (fits inside, may have gaps)', value: 'contain' },
          { label: 'Fill (stretches to fill)', value: 'fill' },
          { label: 'None (original size)', value: 'none' },
        ],
        admin: {
          description: 'How the image should fit within its container',
        },
      },
      {
        name: 'ratio',
        type: 'select',
        defaultValue: 'auto',
        label: 'Aspect Ratio',
        options: [
          { label: 'Auto (natural dimensions)', value: 'auto' },
          { label: 'Square (1:1)', value: 'square' },
          { label: 'Video (16:9)', value: 'video' },
          { label: 'Portrait (3:4)', value: 'portrait' },
        ],
        admin: {
          description: 'Aspect ratio constraint for the image',
        },
      },
      {
        name: 'isSticky',
        type: 'checkbox',
        label: 'Enable Sticky Positioning',
        admin: {
          description: 'Make the image stick to the top of the viewport when scrolling',
        },
      },
      {
        name: 'stickyTop',
        type: 'text',
        label: 'Sticky Top Offset',
        defaultValue: '80px',
        admin: {
          condition: (_data, siblingData) => siblingData?.isSticky === true,
          description: 'Top offset when sticky (e.g., "80px" for header clearance)',
        },
      },
    ],
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    enableUUIButton: true,
    uuiColors: ['primary', 'primary-reversed', 'accent', 'secondary', 'tertiary', 'link'],
    uuiSizes: ['sm', 'md', 'lg', 'xl'],
    defaultUUIColor: 'primary',
    defaultUUISize: 'md',
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: ColumnRowLabel as unknown as RowLabelComponent,
        },
        description: 'Add and arrange columns by dragging to reorder',
      },
      fields: columnFields,
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
        description: 'Vertical spacing around this section',
      },
    },
  ],
}
