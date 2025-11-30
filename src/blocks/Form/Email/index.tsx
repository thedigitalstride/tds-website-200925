import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/uui/input'
import React from 'react'
import { Mail01 } from '@untitledui/icons'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const hasError = !!errors[name]
  const { ref, onChange, onBlur, name: fieldName } = register(name, {
    required: required ? 'This field is required' : false,
    pattern: {
      value: /^\S[^\s@]*@\S+$/,
      message: 'Please enter a valid email address',
    },
  })

  return (
    <Width width={width}>
      <Input
        label={label || 'Email'}
        defaultValue={defaultValue}
        name={fieldName}
        id={name}
        type="email"
        isRequired={required}
        isInvalid={hasError}
        size="md"
        placeholder={label || 'Enter your email'}
        icon={Mail01}
        ref={ref}
        onChange={(value) => {
          onChange({ target: { value, name: fieldName }, type: 'change' })
        }}
        onBlur={onBlur}
        autoComplete="email"
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
