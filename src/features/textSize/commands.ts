import { createCommand, LexicalCommand } from '@payloadcms/richtext-lexical/lexical'

export type TextSizePayload = {
  size: 'normal' | 'large' | 'small' | 'lead'
}

export const APPLY_TEXT_SIZE_COMMAND: LexicalCommand<TextSizePayload> =
  createCommand('APPLY_TEXT_SIZE_COMMAND')

export const TEXT_SIZES = {
  normal: {
    label: 'Normal',
    fontSize: null, // null to remove styles
    lineHeight: null
  },
  small: {
    label: 'Small',
    fontSize: '14px', // 0.875rem equivalent at 16px base
    lineHeight: '20px', // 1.25rem equivalent
  },
  large: {
    label: 'Large Text',
    fontSize: '18px', // 1.125rem equivalent at 16px base
    lineHeight: '28px', // 1.75rem equivalent
  },
  lead: {
    label: 'Lead',
    fontSize: '20px', // 1.25rem equivalent at 16px base
    lineHeight: '30px', // 1.875rem equivalent
  },
} as const