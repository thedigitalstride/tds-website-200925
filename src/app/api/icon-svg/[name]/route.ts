import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * API endpoint to fetch icon SVG by name
 * GET /api/icons/[name]
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params

    if (!name) {
      return NextResponse.json(
        { error: 'Icon name is required' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Fetch the icon from the collection
    const result = await payload.find({
      collection: 'icons',
      where: {
        name: {
          equals: name,
        },
      },
      limit: 1,
    })

    if (!result.docs.length) {
      return NextResponse.json(
        { error: `Icon '${name}' not found` },
        { status: 404 }
      )
    }

    const icon = result.docs[0]

    // Return the icon data with caching headers
    return NextResponse.json(
      {
        name: icon.name,
        svgCode: icon.svgCode,
        label: icon.label,
        category: icon.category,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
          'CDN-Cache-Control': 'public, max-age=31536000',
        },
      }
    )
  } catch (error) {
    console.error('Error fetching icon:', error)
    return NextResponse.json(
      { error: 'Failed to fetch icon' },
      { status: 500 }
    )
  }
}