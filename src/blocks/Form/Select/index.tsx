import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { Select as SelectComponent } from '@/components/uui/base/select/select'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
  const hasError = !!errors[name]

  // Transform options to UUI Select format
  const selectItems = options.map(({ label, value }) => ({
    id: value,
    label: label,
  }))

  return (
    <Width width={width}>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <SelectComponent
              label={label}
              selectedKey={value || undefined}
              onSelectionChange={(key) => onChange(key)}
              isRequired={required}
              isInvalid={hasError}
              size="md"
              placeholder={label || 'Select an option'}
              items={selectItems}
            >
              {(item) => <SelectComponent.Item id={item.id}>{item.label}</SelectComponent.Item>}
            </SelectComponent>
          )
        }}
        rules={{ required }}
      />
      {hasError && <Error name={name} />}
    </Width>
  )
}
