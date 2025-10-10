import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/uui/input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const hasError = !!errors[name]
  const { ref, onChange, onBlur, name: fieldName } = register(name, { required })

  return (
    <Width width={width}>
      <Input
        label={label || ''}
        defaultValue={defaultValue}
        name={fieldName}
        id={name}
        type="text"
        isRequired={required}
        isInvalid={hasError}
        size="md"
        placeholder={label || ''}
        ref={ref}
        onChange={(value) => {
          onChange({ target: { value, name: fieldName }, type: 'change' })
        }}
        onBlur={onBlur}
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
