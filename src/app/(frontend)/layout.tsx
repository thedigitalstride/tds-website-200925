import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { RouteProvider } from '@/providers/route-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  variable: '--font-poppins',
})

export const viewport: Viewport = {
  colorScheme: 'dark light', // Changed from "light" to "dark light"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload fonts for better PageSpeed scores */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-primary antialiased flex flex-col min-h-screen">
        <Providers>
          <RouteProvider>
            <ThemeProvider>
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />

              <Header />

              {/* Spacer to prevent content from being hidden under fixed header */}
              <div className="h-18 md:h-20" aria-hidden="true" />

              <main className="flex-1">{children}</main>
              <Footer />
            </ThemeProvider>
          </RouteProvider>
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
