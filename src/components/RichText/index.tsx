import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  SerializedUploadNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { QuoteBlock } from '@/blocks/Quote/Component'
import { ConclusionBlock } from '@/blocks/Conclusion/Component'

import type {
  BannerBlock as BannerBlockProps,
  ButtonBlock as ButtonBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  QuoteBlock as QuoteBlockProps,
  ConclusionBlock as ConclusionBlockProps,
  Page,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { ButtonBlockComponent } from '@/blocks/ButtonBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { getPageUrl } from '@/utilities/pageHelpers'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | ButtonBlockProps | CodeBlockProps | QuoteBlockProps | ConclusionBlockProps>
  | SerializedUploadNode

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }

  // For posts, use the existing logic
  if (relationTo === 'posts') {
    return `/posts/${value.slug}`
  }

  // For pages, use the getPageUrl helper to support nested URLs
  // Cast to Partial<Page> since the link node might not have all page properties
  return getPageUrl(value as Partial<Page>)
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => {
  return {
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    // Add custom upload converter for inline images - Payload best practice
    upload: ({ node }: { node: SerializedUploadNode }) => {
      if (node.relationTo === 'media') {
        const uploadDoc = node.value
        if (typeof uploadDoc !== 'object') {
          return null
        }

        const { alt, height, url, width, updatedAt } = uploadDoc

        // Use getMediaUrl to add cache tag for Vercel Blob Storage
        const src = getMediaUrl(url, updatedAt)

        return (
          <figure className="richtext-inline-image col-start-2 my-8">
            <Image
              alt={alt || ''}
              height={height || 800}
              src={src}
              width={width || 1200}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            {uploadDoc.caption && typeof uploadDoc.caption === 'object' && 'root' in uploadDoc.caption && (
              <figcaption className="mt-4 text-sm text-tertiary">
                {/* Render rich text caption */}
                <ConvertRichText data={uploadDoc.caption} />
              </figcaption>
            )}
          </figure>
        )
      }
      return null
    },
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      buttonBlock: ({ node }) => <ButtonBlockComponent className="col-start-2 my-6" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer={true}
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
      quote: ({ node }) => <QuoteBlock className="col-start-2 mb-8" {...node.fields} />,
      conclusion: ({ node }) => <ConclusionBlock className="col-start-2" {...node.fields} />,
    },
  }
}

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
