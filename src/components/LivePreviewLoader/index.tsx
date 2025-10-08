'use client'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useTransition } from 'react'

/**
 * Wrapper component that adds a loading indicator for Live Preview refreshes.
 *
 * Enable/disable via environment variable:
 * NEXT_PUBLIC_ENABLE_PREVIEW_LOADING=true
 *
 * Shows a loading spinner while the preview iframe is reloading after content changes.
 * To remove this feature entirely, replace this component with <LivePreviewListener /> directly.
 */
export const LivePreviewLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_PREVIEW_LOADING === 'true'
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const hideTimeoutRef = useRef<NodeJS.Timeout>()

  // Use React's useTransition to detect when router.refresh() is running
  useEffect(() => {
    if (!isEnabled) return

    if (isPending) {
      setIsLoading(true)
      // Clear any existing hide timeout
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    } else {
      // Add a small delay before hiding to ensure content has rendered
      hideTimeoutRef.current = setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }

    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current)
      }
    }
  }, [isPending, isEnabled])

  // Wrap the router refresh to trigger loading state
  useEffect(() => {
    if (!isEnabled) return

    const originalRefresh = router.refresh.bind(router)

    router.refresh = () => {
      startTransition(() => {
        originalRefresh()
      })
    }

    return () => {
      router.refresh = originalRefresh
    }
  }, [router, startTransition, isEnabled])

  return (
    <>
      <LivePreviewListener />

      {isEnabled && isLoading && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-fg-quaternary/60 backdrop-blur-sm transition-opacity duration-200"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex flex-col items-center gap-3 rounded-2xl bg-bg-primary p-6 shadow-xl">
            <div
              className="h-8 w-8 rounded-full border-2 border-fg-quinary border-t-brand-solid"
              style={{ animation: 'var(--animate-spinner)' }}
              role="status"
              aria-label="Loading"
            />
            <p className="text-sm font-medium text-fg-secondary">
              Loading preview...
            </p>
          </div>
        </div>
      )}
    </>
  )
}
