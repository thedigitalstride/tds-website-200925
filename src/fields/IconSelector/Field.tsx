'use client'

import React, { useState, useEffect } from 'react'
import { IconGrid } from './Component'
import type { Icon } from '@/payload-types'

export const IconSelectorField = (props: any) => {
  const { value, setValue } = props
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
  const [showGrid, setShowGrid] = useState(false)

  // Fetch selected icon details when value changes
  useEffect(() => {
    if (value && typeof value === 'string') {
      fetch(`/api/icons/${value}?depth=0`)
        .then((res) => res.json())
        .then((icon) => setSelectedIcon(icon))
        .catch((err) => console.error('Error fetching selected icon:', err))
    } else {
      setSelectedIcon(null)
    }
  }, [value])

  const handleSelect = (iconId: string) => {
    setValue(iconId)
    setShowGrid(false)
  }

  const handleClear = () => {
    setValue(null)
    setSelectedIcon(null)
  }

  return (
    <div className="field-type-relationship icon-selector-field">
      <label className="field-label">
        {props.field.label || props.field.name}
        {props.field.required && <span className="required">*</span>}
      </label>

      {props.field.admin?.description && (
        <div className="field-description">{props.field.admin.description}</div>
      )}

      {/* Selected Icon Preview */}
      {selectedIcon && (
        <div className="mb-4 flex items-center gap-4 rounded-md border border-gray-200 p-4">
          <div
            className="h-12 w-12 flex-shrink-0 text-gray-700"
            dangerouslySetInnerHTML={{ __html: selectedIcon.svgCode || '' }}
          />
          <div className="flex-1">
            <div className="font-medium">{selectedIcon.label || selectedIcon.name}</div>
            {selectedIcon.description && (
              <div className="text-sm text-gray-600">{selectedIcon.description}</div>
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
          >
            Clear
          </button>
        </div>
      )}

      {/* Toggle Grid Button */}
      <button
        type="button"
        onClick={() => setShowGrid(!showGrid)}
        className="mb-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {selectedIcon ? 'Change Icon' : 'Select Icon'}
      </button>

      {/* Icon Grid (shown when toggled) */}
      {showGrid && <IconGrid selectedIconId={value as string} onSelect={handleSelect} />}
    </div>
  )
}
