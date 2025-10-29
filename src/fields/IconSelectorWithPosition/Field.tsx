'use client'

import React, { useState, useEffect } from 'react'
import { useField } from '@payloadcms/ui'
import { IconGrid } from '../IconSelector/Component'
import type { Icon } from '@/payload-types'

export const IconSelectorWithPositionField = (props: any) => {
  const { path, field } = props
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
  const [showGrid, setShowGrid] = useState(false)

  // Debug: Log the props to understand the field structure
  console.log('[IconSelector] Component Props:', { path, fieldName: field?.name, props })

  // Use separate useField hooks for each nested field
  const basePath = path || 'buttonIconConfig'
  console.log('[IconSelector] Using basePath:', basePath)

  const { value: iconValue, setValue: setIconValue } = useField<string>({
    path: `${basePath}.icon`
  })
  const { value: positionValue, setValue: setPositionValue } = useField<string>({
    path: `${basePath}.position`
  })

  console.log('[IconSelector] Current values:', { iconValue, positionValue })

  // Default position to trailing if not set
  const currentPosition = positionValue || 'trailing'

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
    console.log('[IconSelector] Setting icon:', iconId)
    setIconValue(iconId)
    setShowGrid(false)
  }

  const handleClear = () => {
    console.log('[IconSelector] Clearing icon')
    setIconValue(null as any)
    setSelectedIcon(null)
  }

  const handlePositionChange = (position: 'leading' | 'trailing') => {
    console.log('[IconSelector] Setting position:', position)
    setPositionValue(position)
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
                  currentPosition === 'leading'
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
                  currentPosition === 'trailing'
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
