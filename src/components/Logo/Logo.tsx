import clsx from 'clsx'
import React from 'react'
import { OptimizedImage } from '@/components/OptimizedImage'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <OptimizedImage
      src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-logo-light.svg"
      alt="Payload Logo"
      width={193}
      height={34}
      loading={loading}
      priority={priority === 'high'}
      className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
    />
  )
}
