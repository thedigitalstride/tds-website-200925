import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/uui/input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const hasError = !!errors[name]
  const { ref, onChange, onBlur, name: fieldName } = register(name, {
    required: required ? 'This field is required' : false,
  })

  return (
    <Width width={width}>
      <Input
        label={label || ''}
        defaultValue={defaultValue}
        name={fieldName}
        id={name}
        type="number"
        isRequired={required}
        isInvalid={hasError}
        size="md"
        placeholder={label || 'Enter number'}
        ref={ref}
        onChange={(valueOrEvent: string | React.ChangeEvent<HTMLInputElement>) => {
          // React Aria may pass either a string or an event object
          // Extract the actual value in both cases
          const actualValue = typeof valueOrEvent === 'string' 
            ? valueOrEvent 
            : (valueOrEvent?.target?.value ?? valueOrEvent?.currentTarget?.value ?? '')
          
          // react-hook-form register expects an event with target.value
          onChange({
            target: { value: actualValue, name: fieldName },
          } as React.ChangeEvent<HTMLInputElement>)
        }}
        onBlur={onBlur}
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
