/**
 * Custom Field Component for displaying costs as currency
 */

'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import type { NumberFieldClientComponent } from 'payload'

const CostField: NumberFieldClientComponent = ({ field, path }) => {
  const { value } = useField<number>({ path: path || field.name })

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  })

  const displayValue = value !== undefined && value !== null ? formatter.format(value) : '—'
  const color = value && value > 0.01 ? '#dc2626' : '#059669'

  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        color: color,
        fontWeight: '600',
      }}
    >
      {displayValue}
    </div>
  )
}

export default CostField
