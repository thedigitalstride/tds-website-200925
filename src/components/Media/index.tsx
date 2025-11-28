import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedia } from './ImageMedia'
import { SvgMedia } from './SvgMedia'
import { VideoMedia } from './VideoMedia'

export const Media: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const isSvg = typeof resource === 'object' && resource?.mimeType === 'image/svg+xml'
  const Tag = htmlElement || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? (
        <VideoMedia {...props} />
      ) : isSvg ? (
        <SvgMedia {...props} />
      ) : (
        <ImageMedia {...props} />
      )}
    </Tag>
  )
}
