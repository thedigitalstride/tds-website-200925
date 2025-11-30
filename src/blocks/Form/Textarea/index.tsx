import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { TextArea } from '@/components/uui/base/textarea/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 3, width }) => {
  const hasError = !!errors[name]
  const { ref, onChange, onBlur, name: fieldName } = register(name, {
    required: required ? 'This field is required' : false,
  })

  return (
    <Width width={width}>
      <TextArea
        label={label || ''}
        defaultValue={defaultValue}
        name={fieldName}
        id={name}
        rows={rows}
        isRequired={required}
        isInvalid={hasError}
        placeholder={label || 'Enter text'}
        textAreaRef={ref}
        onChange={(value) => {
          onChange({ target: { value, name: fieldName }, type: 'change' })
        }}
        onBlur={onBlur}
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
