import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { RouteProvider } from '@/providers/route-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { SpeedInsights } from '@vercel/speed-insights/next';


import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = localFont({
  src: '../../../public/fonts/Inter-VariableFont_opsz,wght.ttf',
  variable: '--font-inter',
  display: 'swap',
  weight: '100 900',
  preload: true,
})

const poppins = localFont({
  src: [
    {
      path: '../../../public/fonts/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
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
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-[var(--color-bg-primary)] antialiased flex flex-col min-h-screen">
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
        <SpeedInsights />
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
