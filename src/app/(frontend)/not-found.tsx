import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'

export default async function NotFound() {
  const payload = await getPayload({ config: configPromise })

  const notFoundData = await payload.findGlobal({
    slug: 'notFound',
  })

  // Fallback data if global is not configured
  const heading = notFoundData?.heading || '404'
  const subheading = notFoundData?.subheading || 'This page could not be found.'
  const link = notFoundData?.link

  return (
    <section className="relative lg:flex lg:items-center py-16 lg:py-24">
      <div className="mx-auto max-w-container px-4 md:px-8 flex w-full items-center">
        <div className="flex flex-col w-full items-start text-left">
          <h1
            className={cn('mt-4 font-semibold text-accent-500 dark:text-accent-500')}
            style={{
              whiteSpace: 'pre-line',
              fontFamily: 'var(--font-poppins, Poppins)',
              fontSize: 'clamp(2.1rem, 5vw + 1rem, 6rem)',
              lineHeight: '1.2',
              fontWeight: '700',
            }}
          >
            {heading}
          </h1>
          {subheading && (
            <p
              className="text-gray-600 dark:text-gray-400 mt-6 font-normal max-w-[48rem]"
              style={{
                fontSize: 'clamp(1.1rem, 1.5vw + 0.5rem, 1.5rem)',
                lineHeight: '1.5',
              }}
            >
              {subheading}
            </p>
          )}
          {link && link.label && (link.url || link.reference) && (
            <div className="mt-8">
              <CMSLink
                type={link.type}
                url={link.url}
                label={link.label}
                newTab={link.newTab}
                reference={link.reference}
                uuiColor={link.uuiColor}
                uuiSize={link.uuiSize}
                buttonIcon={link.buttonIcon}
                iconPos={link.iconPos}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
