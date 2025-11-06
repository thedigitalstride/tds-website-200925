'use client'

import type { PluginComponent } from '@payloadcms/richtext-lexical'
import { useLexicalComposerContext } from '@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW
} from '@payloadcms/richtext-lexical/lexical'
import { useEffect } from 'react'
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection'
import { APPLY_TEXT_SIZE_COMMAND, TEXT_SIZES, type TextSizePayload } from './commands'

/**
 * Text Size Plugin
 *
 * Registers the APPLY_TEXT_SIZE_COMMAND to apply font sizing to selected text
 */
export const TextSizePlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand<TextSizePayload>(
      APPLY_TEXT_SIZE_COMMAND,
      (payload) => {
        editor.update(() => {
          const selection = $getSelection()

          if (!$isRangeSelection(selection)) {
            return false
          }

          const { size } = payload
          const sizeConfig = TEXT_SIZES[size]

          // Use $patchStyleText to apply/remove inline styles
          if (size === 'normal' || !sizeConfig.fontSize) {
            // Remove font-size and line-height styles
            $patchStyleText(selection, {
              'font-size': null,
              'line-height': null,
            })
          } else {
            // Apply font-size and line-height as inline styles
            $patchStyleText(selection, {
              'font-size': sizeConfig.fontSize,
              'line-height': sizeConfig.lineHeight,
            })
          }
        })

        return true
      },
      COMMAND_PRIORITY_LOW
    )
  }, [editor])

  return null
}