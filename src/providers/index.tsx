import React from 'react'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return <>{children}</>
}

export { SmoothScrollProvider, useLenis, useLenisScroll } from './smooth-scroll-provider'
