import { getPayload } from 'payload'
import config from '@payload-config'
import IconLibraryClient from './IconLibraryClient'

export default async function IconLibraryPage() {
  const payload = await getPayload({ config })

  // Fetch all icons from the collection
  const { docs: icons } = await payload.find({
    collection: 'icons',
    limit: 100,
    sort: 'name',
  })

  // Transform icons to match IconData interface
  const iconData = icons.map((icon) => ({
    ...icon,
    id: String(icon.id), // Convert number to string
    category: icon.category ?? undefined, // Convert null to undefined
    description: icon.description ?? undefined, // Convert null to undefined
    keywords: icon.keywords ?? undefined, // Convert null to undefined
    aiMetadata: icon.aiMetadata
      ? {
          enhanced: icon.aiMetadata.enhanced ?? undefined,
          confidence: icon.aiMetadata.confidence ?? undefined,
        }
      : undefined,
  }))

  return <IconLibraryClient icons={iconData} />
}
