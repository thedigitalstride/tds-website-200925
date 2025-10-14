import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { Card } from '../../components/Card'
import { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
  gridColumns?: {
    desktop?: string | null
    tablet?: string | null
    mobile?: string | null
  } | null
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent, gridColumns } = props

  const desktopCols = gridColumns?.desktop || '3'
  const tabletCols = gridColumns?.tablet || '2'
  const mobileCols = gridColumns?.mobile || '1'

  const gridClasses = clsx(
    'grid gap-4 md:gap-8 items-stretch',
    mobileCols === '1' ? 'grid-cols-1' : 'grid-cols-2',
    tabletCols === '2'
      ? 'md:grid-cols-2'
      : tabletCols === '3'
        ? 'md:grid-cols-3'
        : tabletCols === '4'
          ? 'md:grid-cols-4'
          : 'md:grid-cols-2',
    desktopCols === '2'
      ? 'lg:grid-cols-2'
      : desktopCols === '3'
        ? 'lg:grid-cols-3'
        : desktopCols === '4'
          ? 'lg:grid-cols-4'
          : 'lg:grid-cols-3',
  )

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className={gridClasses}>
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return <Card key={index} doc={doc} relationTo="posts" showCategories />
        })}
      </div>
    </div>
  )
}
