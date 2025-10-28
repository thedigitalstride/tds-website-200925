'use client'

import React, { useState, useEffect } from 'react'
import { IconGrid } from '../IconSelector/Component'
import type { Icon } from '@/payload-types'

export const IconSelectorWithPositionField = (props: any) => {
  const { value, setValue, path } = props
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
  const [showGrid, setShowGrid] = useState(false)

  // Extract icon and position from value
  const iconValue = value?.icon
  const positionValue = value?.position || 'trailing'

  // Fetch selected icon details when icon value changes
  useEffect(() => {
    if (iconValue && typeof iconValue === 'string') {
      fetch(`/api/icons/${iconValue}?depth=0`)
        .then((res) => res.json())
        .then((icon) => setSelectedIcon(icon))
        .catch((err) => console.error('Error fetching selected icon:', err))
    } else {
      setSelectedIcon(null)
    }
  }, [iconValue])

  const handleSelect = (iconId: string) => {
    setValue({
      icon: iconId,
      position: positionValue,
    })
    setShowGrid(false)
  }

  const handleClear = () => {
    setValue({
      icon: null,
      position: positionValue,
    })
    setSelectedIcon(null)
  }

  const handlePositionChange = (position: 'leading' | 'trailing') => {
    setValue({
      icon: iconValue,
      position,
    })
  }

  return (
    <div className="field-type-group icon-selector-with-position-field">
      <label className="field-label">
        {props.field.label || 'Button Icon'}
        {props.field.required && <span className="required">*</span>}
      </label>

      {props.field.admin?.description && (
        <div className="field-description">{props.field.admin.description}</div>
      )}

      {/* Selected Icon Preview */}
      {selectedIcon && (
        <div className="mb-4 rounded-md border border-gray-200 p-4">
          <div className="flex items-center gap-4">
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

          {/* Position Toggle */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="text-sm font-medium text-gray-700 mb-2">Icon Position</div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePositionChange('leading')}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  positionValue === 'leading'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Before Text (Leading)</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => handlePositionChange('trailing')}
                className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  positionValue === 'trailing'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span>After Text (Trailing)</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
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
      {showGrid && <IconGrid selectedIconId={iconValue as string} onSelect={handleSelect} />}

      {/* Position selector when no icon is selected */}
      {!selectedIcon && iconValue === null && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Select an icon above to configure its position in the button.
          </p>
        </div>
      )}
    </div>
  )
}
