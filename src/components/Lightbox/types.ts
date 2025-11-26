import type { Media } from '@/payload-types'

export interface LightboxImage {
  id: string
  media: Media | string
  caption?: string | null
}

export interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  className?: string
}

