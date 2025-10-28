import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { IconIntelligence } from '@/services/ai/iconIntelligence'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { documentId, iconName, field } = await request.json()

    // Verify user is logged in
    const { user } = await payload.auth({ headers: request.headers })
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get AI settings
    const aiSettings = await payload.findGlobal({
      slug: 'aiSettings',
      depth: 0,
    })

    if (!aiSettings?.iconEnhancement?.enabled || !aiSettings?.apiKey) {
      return NextResponse.json(
        { error: 'AI icon enhancement is not enabled. Please configure in AI Settings.' },
        { status: 400 }
      )
    }

    // Get the model to use
    const modelToUse = aiSettings.iconEnhancement?.model || aiSettings.model || 'gpt-4o-mini'

    // Initialize AI service
    const iconAI = new IconIntelligence(aiSettings.apiKey, modelToUse)

    // Generate metadata
    const metadata = await iconAI.suggestMetadata(iconName)

    // Log the operation
    await payload.create({
      collection: 'ai-logs',
      data: {
        operation: 'icon-enhancement',
        provider: 'openai',
        model: modelToUse,
        tokensUsed: 100, // Estimate
        cost: 0.0001, // Estimate
        success: true,
        duration: 1000,
        metadata: {
          type: 'icon_metadata_generation',
          iconName,
          field,
        },
        user: user.id,
      },
    })

    // Return the requested field(s) with metadata
    const responseData: any = {
      success: true,
      metadata: {
        cost: 0.0001, // Estimate - should be calculated based on actual usage
        model: modelToUse,
      },
    }

    if (field === 'keywords') {
      responseData.keywords = metadata.metadata.keywords
      responseData.metadata.keywordCount = metadata.metadata.keywords.length
    } else if (field === 'description') {
      responseData.description = metadata.metadata.description
      responseData.metadata.characterCount = metadata.metadata.description.length
    } else if (field === 'category') {
      responseData.category = metadata.metadata.category
    } else {
      // Return all metadata
      Object.assign(responseData, metadata.metadata)
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error generating icon metadata:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate metadata' },
      { status: 500 }
    )
  }
}