import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ButtonBlockComponent } from '@/blocks/ButtonBlock/Component'
import { HeroHeadingBlock } from '@/blocks/HeroHeadingBlock/Component'
import { BreadcrumbBlock } from '@/blocks/BreadcrumbBlock/Component'
import { FeaturesBlock } from '@/blocks/FeaturesBlock/Component'
import { LatestPostsBlock } from '@/blocks/LatestPostsBlock/Component'

const blockComponents = {
  heroHeading: HeroHeadingBlock,
  breadcrumb: BreadcrumbBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  buttonBlock: ButtonBlockComponent,
  features: FeaturesBlock,
  latestPosts: LatestPostsBlock,
}

type BreadcrumbItem = NonNullable<Page['breadcrumbs']>[number]
type LayoutBlock = NonNullable<Page['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: (LayoutBlock | any)[]
  breadcrumbs?: BreadcrumbItem[] | null
}> = (props) => {
  const { blocks, breadcrumbs } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && typeof blockType === 'string' && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents]

            if (Block) {
              return (
                <Block key={index} {...block} breadcrumbs={breadcrumbs} disableInnerContainer />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}

export default RenderBlocks
