import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { useFormContext } from 'react-hook-form'

import { Checkbox as CheckboxUi } from '@/components/uui/base/checkbox/checkbox'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  CheckboxField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  const props = register(name, {
    required: required ? 'This field is required' : false,
  })
  const { setValue } = useFormContext()
  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <CheckboxUi
        label={
          <>
            {label}
            {required && <span className="text-[rgb(217_45_32)] ml-1">*</span>}
          </>
        }
        defaultSelected={defaultValue}
        id={name}
        size="md"
        isInvalid={hasError}
        {...props}
        onChange={(checked) => {
          setValue(props.name, checked)
        }}
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
