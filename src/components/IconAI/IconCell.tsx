'use client'

/**
 * Icon Cell Component for Table View
 * Displays the icon visually in the admin list table
 */

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import './IconCell.scss'

export const IconCell: React.FC<DefaultCellComponentProps> = ({ rowData }) => {
  const svgCode = rowData?.svgCode as string | undefined

  if (!svgCode) {
    return <span className="icon-cell-empty">—</span>
  }

  return (
    <div className="icon-cell">
      <div
        className="icon-cell-svg"
        dangerouslySetInnerHTML={{ __html: svgCode }}
      />
    </div>
  )
}

export default IconCell