'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const SocialLinkRowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Footer['socialLinks']>[number]>()

  // Format platform name to be more readable
  const formatPlatform = (platform?: string) => {
    if (!platform) return 'Unknown'

    const platformMap: Record<string, string> = {
      'x': 'X (Twitter)',
      'linkedin': 'LinkedIn',
      'facebook': 'Facebook',
      'github': 'GitHub',
      'angellist': 'AngelList',
      'dribbble': 'Dribbble',
      'layers': 'Layers'
    }

    return platformMap[platform] || platform
  }

  const label = data?.data?.platform
    ? `Social ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${formatPlatform(data.data.platform)}`
    : `Social Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  return <div>{label}</div>
}