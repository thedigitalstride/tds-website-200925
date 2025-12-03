import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'
import type { getTextColorClasses } from '@/utilities/backgroundVariants'

// Type for text color context passed from styled columns
export type TextColorContext = ReturnType<typeof getTextColorClasses> | null

import { AccordionBlock } from '@/blocks/AccordionBlock/Component'
import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BackgroundSectionBlock } from '@/blocks/BackgroundSection/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { ButtonBlockComponent } from '@/blocks/ButtonBlock/Component'
import { HeroHeadingBlock } from '@/blocks/HeroHeadingBlock/Component'
import { BreadcrumbBlock } from '@/blocks/BreadcrumbBlock/Component'
import { CardGridBlock } from '@/blocks/CardGridBlock/Component'
import { LatestPostsBlock } from '@/blocks/LatestPostsBlock/Component'
import { RichTextBlock } from '@/blocks/RichTextBlock/Component'
import { InlineCardBlock } from '@/blocks/InlineCardBlock/Component'
import { SpacerBlock } from '@/blocks/SpacerBlock/Component'
import { TestimonialsBlock } from '@/blocks/TestimonialsBlock/Component'
import { LightboxBlock } from '@/blocks/LightboxBlock/Component'
import { GoogleMapBlock } from '@/blocks/GoogleMapBlock/Component'

const blockComponents = {
  accordion: AccordionBlock,
  backgroundSection: BackgroundSectionBlock,
  heroHeading: HeroHeadingBlock,
  breadcrumb: BreadcrumbBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  buttonBlock: ButtonBlockComponent,
  cardGrid: CardGridBlock,
  latestPosts: LatestPostsBlock,
  richText: RichTextBlock,
  inlineCard: InlineCardBlock,
  spacer: SpacerBlock,
  testimonials: TestimonialsBlock,
  lightboxBlock: LightboxBlock,
  googleMap: GoogleMapBlock,
}

type BreadcrumbItem = NonNullable<Page['breadcrumbs']>[number]
type LayoutBlock = NonNullable<Page['layout']>[number]

export const RenderBlocks: React.FC<{
  blocks: (LayoutBlock | any)[]
  breadcrumbs?: BreadcrumbItem[] | null
  disableInnerContainer?: boolean
  textColorContext?: TextColorContext
}> = (props) => {
  const { blocks, breadcrumbs, disableInnerContainer, textColorContext } = props

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
                <Block
                  key={(block as any).id || `${blockType}-${index}`}
                  {...block}
                  breadcrumbs={breadcrumbs}
                  {...(disableInnerContainer && { disableInnerContainer })}
                  {...(textColorContext && { textColorContext })}
                />
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
