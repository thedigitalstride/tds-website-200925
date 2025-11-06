'use client'

import { createClientFeature, toolbarAddDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'
import { TextSizePlugin } from './plugin'
import { TextSizeIcon } from './components/TextSizeIcon'
import { APPLY_TEXT_SIZE_COMMAND, TEXT_SIZES } from './commands'

/**
 * Text Size Feature - Client Configuration
 *
 * Provides UI dropdown for text sizing in the Lexical editor toolbar
 * Uses official Payload toolbar API
 */
export const TextSizeFeatureClient = createClientFeature({
  // Register the command plugin
  plugins: [
    {
      Component: TextSizePlugin,
      position: 'normal',
    },
  ],

  // Add dropdown to fixed toolbar
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems(
        // Create toolbar items for each text size
        Object.entries(TEXT_SIZES).map(([key, config]) => ({
          ChildComponent: TextSizeIcon,
          key: `textSize-${key}`,
          label: () => config.label,
          onSelect: ({ editor }) => {
            editor.dispatchCommand(APPLY_TEXT_SIZE_COMMAND, {
              size: key as 'normal' | 'large' | 'small' | 'lead',
            })
          },
          isActive: () => false, // Could check current selection's font-size
        }))
      ),
    ],
  },
})