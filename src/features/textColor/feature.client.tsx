'use client'

import { useEffect } from 'react'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  createCommand,
  LexicalCommand,
  LexicalEditor,
} from 'lexical'
import { $patchStyleText } from '@lexical/selection'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { createClientFeature } from '@payloadcms/richtext-lexical/client'
import { toolbarAddDropdownGroupWithItems } from '@payloadcms/richtext-lexical/client'

// Extend Window interface for lexicalEditor
declare global {
  interface Window {
    lexicalEditor?: LexicalEditor
  }
}

const APPLY_TEXT_COLOR_COMMAND: LexicalCommand<string> = createCommand('APPLY_TEXT_COLOR_COMMAND')

// Plugin component to register the text color command
function TextColorPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Store editor reference globally for button clicks
    window.lexicalEditor = editor

    // Register command handler
    const removeCommand = editor.registerCommand(
      APPLY_TEXT_COLOR_COMMAND,
      (color: string) => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) return false

        // Apply or remove color
        if (color) {
          $patchStyleText(selection, { color })
        } else {
          // Remove color by setting to empty
          $patchStyleText(selection, { color: '' })
        }

        return true
      },
      COMMAND_PRIORITY_LOW
    )

    return () => {
      removeCommand()
      if (window.lexicalEditor === editor) {
        delete window.lexicalEditor
      }
    }
  }, [editor])

  return null
}

export const TextColorFeatureClient = createClientFeature({
  plugins: [
    {
      Component: TextColorPlugin,
      position: 'normal',
    },
  ],
  toolbarFixed: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: () => (
            <div style={{ width: 150 }}>
              <div style={{ padding: '8px', fontWeight: 'bold' }}>Text Color</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '0 8px 8px' }}>
                <button
                  onClick={() => {
                    const editor = window.lexicalEditor
                    if (editor) {
                      editor.dispatchCommand(APPLY_TEXT_COLOR_COMMAND, '')
                    }
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    border: '1px solid #ccc',
                    background: 'white',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                  title="Default"
                />
                <button
                  onClick={() => {
                    const editor = window.lexicalEditor
                    if (editor) {
                      editor.dispatchCommand(APPLY_TEXT_COLOR_COMMAND, '#1689FF')
                    }
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    border: '1px solid #ccc',
                    background: '#1689FF',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                  title="Accent Blue"
                />
                <button
                  onClick={() => {
                    const editor = window.lexicalEditor
                    if (editor) {
                      editor.dispatchCommand(APPLY_TEXT_COLOR_COMMAND, '#031A43')
                    }
                  }}
                  style={{
                    width: '24px',
                    height: '24px',
                    border: '1px solid #ccc',
                    background: '#031A43',
                    cursor: 'pointer',
                    borderRadius: '2px',
                  }}
                  title="Brand Blue"
                />
              </div>
            </div>
          ),
          key: 'text-color-dropdown',
          label: 'Color',
          order: 20,
        },
      ]),
    ],
  },
})