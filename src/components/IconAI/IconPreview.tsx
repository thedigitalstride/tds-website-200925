'use client'

/**
 * Icon Preview Component
 * Displays a visual preview of the icon under the name field
 */

import React, { useEffect, useState } from 'react'
import { useForm } from '@payloadcms/ui'
import './IconPreview.scss'

export const IconPreview: React.FC = () => {
  const { getDataByPath } = useForm()
  const [svgContent, setSvgContent] = useState<string>('')

  // Get the SVG code from the form
  const svgCode = getDataByPath('svgCode') as string | undefined

  useEffect(() => {
    if (svgCode) {
      setSvgContent(svgCode)
    }
  }, [svgCode])

  if (!svgContent) {
    return (
      <div className="icon-preview-empty">
        <p>Upload an SVG to see a preview</p>
      </div>
    )
  }

  return (
    <div className="icon-preview">
      <div className="icon-preview-label">Icon Preview:</div>
      <div className="icon-preview-grid">
        {/* Small size */}
        <div className="icon-preview-item">
          <div
            className="icon-preview-svg icon-preview-small"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <span className="icon-preview-size-label">16px</span>
        </div>

        {/* Medium size */}
        <div className="icon-preview-item">
          <div
            className="icon-preview-svg icon-preview-medium"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <span className="icon-preview-size-label">24px</span>
        </div>

        {/* Large size */}
        <div className="icon-preview-item">
          <div
            className="icon-preview-svg icon-preview-large"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <span className="icon-preview-size-label">32px</span>
        </div>

        {/* XL size */}
        <div className="icon-preview-item">
          <div
            className="icon-preview-svg icon-preview-xlarge"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <span className="icon-preview-size-label">48px</span>
        </div>
      </div>
      <div className="icon-preview-colors">
        <div className="icon-preview-label">Color variations:</div>
        <div className="icon-preview-color-grid">
          <div
            className="icon-preview-svg icon-preview-medium icon-preview-default"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            title="Default (currentColor)"
          />
          <div
            className="icon-preview-svg icon-preview-medium icon-preview-primary"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            title="Primary color"
          />
          <div
            className="icon-preview-svg icon-preview-medium icon-preview-muted"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            title="Muted"
          />
          <div
            className="icon-preview-svg icon-preview-medium icon-preview-inverted"
            dangerouslySetInnerHTML={{ __html: svgContent }}
            title="Inverted"
          />
        </div>
      </div>
    </div>
  )
}

export default IconPreview