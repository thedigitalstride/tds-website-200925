'use client'

import React from 'react'
import type { TextFieldClientComponent } from 'payload'

export const IconSelectorField: TextFieldClientComponent = (props) => {
  return (
    <div className="field-type-text">
      <label className="field-label">
        {props.field.label || props.field.name}
      </label>
      <p>Icon Selector - Coming Soon</p>
    </div>
  )
}
