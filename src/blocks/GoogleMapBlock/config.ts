import type { Block } from 'payload'

export const GoogleMapBlock: Block = {
  slug: 'googleMap',
  interfaceName: 'GoogleMapBlock',
  fields: [
    {
      name: 'latitude',
      type: 'number',
      label: 'Latitude',
      required: true,
      admin: {
        description:
          'Latitude coordinate (e.g., 52.2925). To find coordinates: right-click on Google Maps → "What\'s here?"',
        step: 0.000001,
      },
      validate: (value: number | null | undefined, { siblingData }: { siblingData?: any }) => {
        if (value == null) {
          return 'Latitude is required'
        }

        if (typeof value !== 'number' || isNaN(value)) {
          return 'Latitude must be a valid number'
        }

        if (siblingData?.longitude == null) {
          return 'Both latitude and longitude are required'
        }

        if (value < -90 || value > 90) {
          return 'Latitude must be between -90 and 90'
        }

        return true
      },
    },
    {
      name: 'longitude',
      type: 'number',
      label: 'Longitude',
      required: true,
      admin: {
        description:
          'Longitude coordinate (e.g., -1.5376). To find coordinates: right-click on Google Maps → "What\'s here?"',
        step: 0.000001,
      },
      validate: (value: number | null | undefined, { siblingData }: { siblingData?: any }) => {
        if (value == null) {
          return 'Longitude is required'
        }

        if (typeof value !== 'number' || isNaN(value)) {
          return 'Longitude must be a valid number'
        }

        if (siblingData?.latitude == null) {
          return 'Both latitude and longitude are required'
        }

        if (value < -180 || value > 180) {
          return 'Longitude must be between -180 and 180'
        }

        return true
      },
    },
    {
      name: 'zoom',
      type: 'number',
      label: 'Zoom Level',
      defaultValue: 15,
      min: 1,
      max: 20,
      admin: {
        description: 'Map zoom level (1 = world view, 20 = building level). Default: 15',
      },
    },
    {
      name: 'markerTitle',
      type: 'text',
      label: 'Marker Title',
      admin: {
        description: 'Optional tooltip text shown when hovering over the marker',
      },
    },
    {
      name: 'aspectRatio',
      type: 'select',
      label: 'Map Height',
      defaultValue: '16:9',
      options: [
        {
          label: '16:9 (Widescreen)',
          value: '16:9',
        },
        {
          label: '4:3 (Standard)',
          value: '4:3',
        },
        {
          label: 'Square (1:1)',
          value: 'square',
        },
        {
          label: 'Custom Height',
          value: 'custom',
        },
      ],
      admin: {
        description: 'Aspect ratio or custom height for the map container',
      },
    },
    {
      name: 'customHeight',
      type: 'number',
      label: 'Custom Height (px)',
      min: 200,
      max: 1000,
      defaultValue: 400,
      admin: {
        description: 'Custom height in pixels (200-1000px)',
        condition: (_, siblingData) => siblingData?.aspectRatio === 'custom',
      },
    },
  ],
  labels: {
    singular: 'Google Map',
    plural: 'Google Maps',
  },
}

