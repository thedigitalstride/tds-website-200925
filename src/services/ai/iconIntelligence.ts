import OpenAI from 'openai'

export interface IconMetadata {
  keywords: string[]
  category: string
  description: string
  tags: string[]
  confidence?: number
}

export interface IconMetadataResponse {
  metadata: IconMetadata
  prompt: string
  rawResponse: string
}

/**
 * AI service for enhancing icon metadata
 */
export class IconIntelligence {
  private client: OpenAI | null = null
  private apiKey: string | null = null
  private model: string

  constructor(apiKey?: string, model?: string) {
    this.apiKey = apiKey || null
    this.model = model || 'gpt-4o-mini' // Default to mini model for cost efficiency
  }

  /**
   * Initialize the OpenAI client
   */
  private initClient(): OpenAI {
    if (!this.client) {
      if (!this.apiKey) {
        throw new Error('API key required for AI provider')
      }
      this.client = new OpenAI({
        apiKey: this.apiKey,
      })
    }
    return this.client
  }

  /**
   * Generate metadata for an icon based on its name
   */
  async suggestMetadata(iconName: string, svgPreview?: string): Promise<IconMetadataResponse> {
    const client = this.initClient()

    const prompt = `Analyze this icon and provide metadata for search and organization.

Icon name: "${iconName}"
${svgPreview ? `SVG preview context: This is a ${svgPreview}` : ''}

Based on the icon name and common icon usage patterns, provide:

1. Keywords (5-10 relevant search terms, including synonyms and related concepts)
2. Category (choose ONE from: navigation, action, social, communication, interface, file, device, commerce, media, custom)
3. Brief description (max 50 words, describing what the icon represents and its common use cases)
4. Tags (3-5 additional categorization tags)

Respond in JSON format:
{
  "keywords": ["keyword1", "keyword2", ...],
  "category": "category_name",
  "description": "Brief description",
  "tags": ["tag1", "tag2", ...],
  "confidence": 85
}

The confidence score (0-100) indicates how certain you are about the categorization.`

    try {
      const response = await client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert in icon design and categorization. Always respond with valid JSON.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
        response_format: { type: 'json_object' },
      })

      const content = response.choices[0]?.message?.content
      if (!content) {
        throw new Error('No response from AI')
      }

      // Parse JSON response
      const metadata = JSON.parse(content)

      // Validate response structure
      if (!metadata.keywords || !metadata.category || !metadata.description) {
        throw new Error('Invalid metadata structure')
      }

      return {
        metadata,
        prompt,
        rawResponse: content,
      }
    } catch (error) {
      console.error('Error generating icon metadata:', error)

      // Fallback to basic metadata
      const fallbackMetadata: IconMetadata = {
        keywords: [iconName.toLowerCase()],
        category: 'custom',
        description: `Icon: ${iconName}`,
        tags: [],
        confidence: 0,
      }

      return {
        metadata: fallbackMetadata,
        prompt,
        rawResponse: error instanceof Error ? `Error: ${error.message}` : 'Unknown error',
      }
    }
  }
}
