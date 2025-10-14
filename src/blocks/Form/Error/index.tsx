'use client'

import * as React from 'react'
import { useFormContext } from 'react-hook-form'
import { HintText } from '@/components/uui/base/input/hint-text'

export const Error = ({ name }: { name: string }) => {
  const {
    formState: { errors },
  } = useFormContext()
  return (
    <HintText isInvalid={true}>
      {(errors[name]?.message as string) || 'This field is required'}
    </HintText>
  )
}
