'use client'

/**
 * Encrypted Field Component
 * Custom field component for displaying API keys with encryption indicator
 */

import React from 'react'
import { useField, TextInput } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'

export const EncryptedField: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField({ path })

  return (
    <div className="field-type text">
      <div className="encrypted-field-wrapper">
        <TextInput
          path={path}
          value={value as string}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          placeholder={field.admin?.placeholder}
          required={field.required}
        />
        <div
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>This value will be stored securely</span>
        </div>
      </div>
    </div>
  )
}

export default EncryptedField
