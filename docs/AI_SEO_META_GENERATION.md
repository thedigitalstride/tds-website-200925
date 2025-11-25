# AI-Powered SEO Meta Title & Description Generation

## Overview

The TDS website now includes an AI-powered system for generating SEO-optimized meta titles and descriptions for both Pages and Posts. This feature uses OpenAI's GPT-4o (with support for additional providers coming soon) to analyze page content, incorporate target keywords, and create compelling SEO metadata that follows current best practices.

## Features

- **Manual Generation**: Click-to-generate buttons for both meta titles and descriptions
- **Content-Aware**: AI analyzes full page content, including layout blocks (Pages) and rich text (Posts)
- **Keyword Integration**: Naturally incorporates user-provided target keywords
- **Custom Guidance**: Optional page-specific instructions for tone, audience, and focus areas
- **SEO Optimized**: Follows 2025 SEO guidelines (60 chars for titles, 150-160 chars for descriptions)
- **Character Counting**: Real-time character count with visual indicators (green/amber/red)
- **Cost Tracking**: Displays API usage costs and token consumption
- **Audit Logging**: Persistent logs of all AI-generated metadata in ai-logs collection
- **LLM Agnostic**: Designed to support multiple AI providers (OpenAI, Anthropic Claude, custom endpoints)

## Architecture

### Service Layer (`src/services/ai/`)

```
src/services/ai/
├── types.ts                    # TypeScript interfaces
├── providers/
│   ├── base.ts                 # Abstract provider interface
│   ├── openai.ts               # OpenAI implementation
│   └── index.ts                # Provider registry
├── contentAnalyzer.ts          # Content extraction and analysis
├── seoMetaGenerator.ts         # SEO title/description generation
├── altTagGenerator.ts          # ALT tag generation (existing)
└── index.ts                    # Main service exports
```

**Key Components:**

1. **Content Analyzer**: Extracts meaningful text from Pages (layout blocks) and Posts (Lexical richtext)
2. **SEO Meta Generator**: Generates titles and descriptions using AI with content context
3. **Provider Abstraction**: All providers implement the `AiProvider` interface
4. **Type Safety**: Comprehensive TypeScript types for all operations

### UI Components (`src/components/SEO/`)

```
src/components/SEO/
├── SeoTitleField.tsx           # Custom title field with generate button
├── SeoTitleField.scss          # Title field styling
├── SeoDescriptionField.tsx     # Custom description field with generate button
└── SeoDescriptionField.scss    # Description field styling
```

**Features:**
- Character count display with color-coded status
- Generate button with loading states
- Real-time validation and warnings
- Toast notifications for success/errors
- Cost and metadata display

### Configuration (`src/AiSettings/config.ts`)

Global configuration accessible at `/admin/globals/aiSettings` with dedicated "SEO Meta Generation" tab:

1. **Meta Title Settings**: System primer, max length, brand name inclusion
2. **Meta Description Settings**: System primer, min/max length
3. **Content Analysis Settings**: Full content analysis toggle, keyword vs content priority, theme extraction

### Collection Integration

Both Pages and Posts collections include:

1. **SEO Keywords & Guidance** (collapsible in Meta tab):
   - `seoKeywords` (textarea): Target keywords (one per line or comma-separated)
   - `seoGuidance` (textarea): Page-specific AI instructions

2. **AI-Powered SEO Meta** (collapsible in Meta tab):
   - `aiSeoTitle` (text): AI-generated title with generate button
   - `aiSeoDescription` (textarea): AI-generated description with generate button

## Setup Instructions

### 1. Enable SEO Meta Generation

1. Navigate to `/admin/globals/aiSettings`
2. Go to the **"SEO Meta Generation"** tab
3. Check **"Enable SEO Meta Generation"**
4. Review and customize the **Title Generation Primer** if needed (default is optimized for SEO)
5. Review and customize the **Description Generation Primer** if needed
6. Adjust character limits if desired (defaults: 60 for title, 150-160 for description)
7. Configure **Content Analysis Settings**:
   - Enable "Analyze Full Page Content" to extract key themes
   - Set content vs keywords priority (balanced recommended)
   - Adjust max content tokens (higher = more context but higher cost)

### 2. Configure AI Provider (if not already done)

1. Go to the **"Provider Configuration"** tab
2. Select your AI provider (currently only OpenAI is available)
3. Enter your OpenAI API key (starts with `sk-`)
4. Choose a model (recommended: `gpt-4o` for best quality, `gpt-4o-mini` for lower cost)
5. Optionally adjust advanced settings (temperature, max tokens, timeout)

### 3. Environment Variables

Add your OpenAI API key to your environment variables:

```bash
# .env or .env.local
OPENAI_API_KEY=sk-...
```

Alternatively, you can enter the API key directly in the admin panel (it will be stored in the database).

## Usage Guide

### Generating SEO Meta Titles

1. Navigate to a Page or Post in `/admin/collections/pages` or `/admin/collections/posts`
2. Save the document if it's new (document ID is required)
3. Go to the **Meta** tab
4. Expand **"SEO Keywords & Guidance"** (optional but recommended):
   - Enter target keywords (one per line or comma-separated)
   - Provide specific guidance for AI generation (tone, audience, focus areas)
5. Expand **"AI-Powered SEO Meta"**
6. Click the **"Generate Title"** button next to the title field
7. Wait for the AI to generate the title (you'll see "Generating..." text)
8. A success toast notification will appear when complete, showing cost and character count
9. Review the generated title and edit if needed
10. Copy to the SEO tab's meta.title field if satisfied, or regenerate with different guidance

### Generating SEO Meta Descriptions

1. Follow the same steps as above
2. Click the **"Generate Description"** button next to the description field
3. AI will analyze content and create a 150-160 character description
4. Review, edit if needed, and copy to the SEO tab's meta.description field

### Best Practices

1. **Provide Keywords**: Always enter target keywords for best results
2. **Use Guidance**: Provide specific instructions for tone, audience, and focus areas
3. **Analyze Content**: Ensure content is complete before generating SEO metadata
4. **Review Output**: Always review and refine AI-generated text
5. **Character Limits**: Watch the character count indicator (green = good, amber = warning, red = over limit)
6. **Iterate**: Regenerate with different keywords or guidance if not satisfied
7. **Copy to SEO Tab**: After finalizing, manually copy the generated text to the SEO plugin's fields in the SEO tab

## SEO Guidelines (2025 Standards)

The system follows current SEO best practices:

### Meta Title

- **Length**: 50-60 characters (optimal for SERP display)
- **Keywords**: Include primary keyword naturally (near beginning)
- **Brand Name**: Include brand name at end if appropriate (" | The Digital Stride")
- **Uniqueness**: Unique per page
- **Compelling**: Click-worthy and accurate
- **User Intent**: Match what users are searching for
- **No Keyword Stuffing**: Natural language, not a keyword list
- **Title Case**: Consistent capitalization

### Meta Description

- **Length**: 150-160 characters (optimal for SERP display)
- **Keywords**: Include primary + 1-2 secondary keywords naturally
- **Value Proposition**: Clear statement of page value
- **Call-to-Action**: When appropriate (e.g., "Learn more", "Get started")
- **Accuracy**: Accurate page description (no clickbait)
- **Natural Language**: Readable and compelling, not just keywords
- **Benefits**: Focus on outcomes and benefits for the user
- **User Intent**: Match search intent and user expectations

## AI Prompt Engineering

The system primers instruct the AI to:

1. **Analyze Content**: Read and understand the full page content
2. **Identify Topics**: Extract main topic, subtopics, and key points
3. **Incorporate Keywords**: Use target keywords naturally (no forced insertion)
4. **Understand Intent**: Determine user intent from content type (service page, blog, product, etc.)
5. **Focus on Benefits**: Create benefit-focused copy (what user gains)
6. **Use Active Voice**: Active voice and action words for engagement
7. **Include Specifics**: Numbers and specifics when relevant (e.g., "10+ Years", "500+ Clients")
8. **Brand Voice**: Maintain consistent brand voice and tone
9. **Optimize for Snippets**: Consider featured snippet potential (especially descriptions)
10. **Stand Out**: Create compelling copy that differentiates from competition

## Content Analysis

The AI analyzes different content types:

### Pages (Layout Blocks)

- **Hero Heading**: Main heading and subheading
- **Content Blocks**: Rich text from content columns
- **CTA Blocks**: Call-to-action headings and text
- **Features**: Feature cards with titles and descriptions
- **Card Grids**: Card titles and descriptions
- **Accordions/FAQs**: Questions and answers
- **Breadcrumbs**: Page hierarchy and structure

### Posts (Lexical Richtext)

- **Title & Subtitle**: Post title and lead paragraph
- **Rich Text Content**: Full Lexical editor content
- **Categories**: Post categories and taxonomy
- **Hero Image**: Hero image ALT tag for additional context
- **Table of Contents**: Section headings and structure
- **Related Posts**: Context from related content

### Content Weighting

Different sections are weighted by importance:
- **Hero/Title**: Highest weight (primary message)
- **Body Content**: High weight (main information)
- **Features/Benefits**: Medium weight (value propositions)
- **Footer/CTAs**: Lower weight (secondary information)

## Cost Estimation

### OpenAI GPT-4o Pricing (as of January 2025)

- **Input**: $2.50 per 1M tokens
- **Output**: $10.00 per 1M tokens
- **Typical SEO Generation**: ~1500 tokens (content + prompt + response)
- **Estimated Cost**: $0.015 per generation (title or description)

### OpenAI GPT-4o-mini Pricing

- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens
- **Estimated Cost**: $0.001 per generation (10x cheaper)

### Monthly Cost Examples

| Generations/Month | Model | Estimated Cost |
|-------------------|-------|----------------|
| 100 | gpt-4o | $1.50 |
| 100 | gpt-4o-mini | $0.10 |
| 500 | gpt-4o | $7.50 |
| 500 | gpt-4o-mini | $0.50 |
| 1000 | gpt-4o | $15.00 |
| 1000 | gpt-4o-mini | $1.00 |

**Note**: Costs are for SEO title/description generation only. ALT tag generation is additional.

## Troubleshooting

### SEO Metadata Not Generating

1. **Check AI Settings**: Ensure SEO meta generation is enabled at `/admin/globals/aiSettings`
2. **Verify API Key**: Make sure your OpenAI API key is valid and has credits
3. **Check Server Logs**: Look for detailed logs in the server console
4. **Save Document First**: Document must be saved (have an ID) before generation
5. **Check Collection**: Only Pages and Posts collections are supported

### Poor Quality Output

1. **Add Keywords**: Provide specific target keywords for better focus
2. **Add Guidance**: Include page-specific instructions for tone and audience
3. **Complete Content**: Ensure page content is complete before generating SEO metadata
4. **Adjust System Primer**: Customize the system primer in AI Settings
5. **Lower Temperature**: Reduce temperature (0.1-0.3) for more deterministic results
6. **Try Different Model**: Switch to `gpt-4o` for higher quality (from `gpt-4o-mini`)

### Character Count Issues

1. **Title Too Long**: Regenerate with guidance to be more concise
2. **Description Too Short**: Regenerate with guidance to be more detailed
3. **Adjust Limits**: Change max/min limits in AI Settings if needed
4. **Manual Edit**: Fine-tune the generated text manually to fit limits

### API Errors

Common errors and solutions:

- **`Invalid API key`**: Check that your key starts with `sk-` and has active credits
- **`Rate limit exceeded`**: You're making too many requests; wait or upgrade your OpenAI plan
- **`Timeout`**: Increase timeout in advanced settings (default: 30s)
- **`Model not found`**: Ensure you're using `gpt-4o` or `gpt-4o-mini`
- **`Document not found`**: Save the document before generating

## Technical Details

### API Routes

- **`/api/generate-seo-title`**: POST endpoint for title generation
  - Body: `{ collectionSlug, documentId, keywords?, guidance? }`
  - Returns: `{ success, text, metadata: { cost, tokens, characterCount, ... } }`

- **`/api/generate-seo-description`**: POST endpoint for description generation
  - Body: `{ collectionSlug, documentId, keywords?, guidance? }`
  - Returns: `{ success, text, metadata: { cost, tokens, characterCount, ... } }`

### Workflow

1. User clicks "Generate Title" or "Generate Description" button
2. Client component calls API route with document ID, keywords, and guidance
3. API route fetches full document from Payload
4. Content analyzer extracts meaningful text from layout blocks or richtext
5. Keywords are parsed and cleaned (deduplicated, normalized)
6. Content context is built with title, keywords, guidance, and content summary
7. System primer + content context sent to AI provider
8. AI generates optimized title or description
9. Response is cleaned, validated, and length-enforced
10. Result returned to client with metadata (cost, tokens, character count)
11. Client updates field value and displays success toast
12. Generation logged to ai-logs collection (if enabled)

### Data Flow

```
User Input (Keywords + Guidance)
        ↓
Content Analyzer (Extract text from blocks/richtext)
        ↓
Prompt Builder (Combine primer + keywords + guidance + content)
        ↓
AI Provider (OpenAI GPT-4o)
        ↓
Response Cleaner (Remove quotes, enforce length)
        ↓
Field Update (Display in UI)
        ↓
Logging (Audit trail in ai-logs)
```

## Future Enhancements

### Coming Soon

- **Anthropic Claude Support**: Use Claude 3.5 Sonnet for text generation
- **Custom Endpoints**: Support for self-hosted or alternative AI providers
- **Batch Regeneration**: Regenerate SEO for multiple pages at once
- **A/B Testing**: Test different variations and track performance
- **Multi-language**: Generate SEO metadata in multiple languages
- **Auto-sync to SEO Tab**: Automatically populate SEO plugin fields via hook
- **SERP Preview**: Show Google search result preview in real-time
- **Competitor Analysis**: Analyze top-ranking pages for insights
- **Performance Tracking**: Track which SEO metadata gets best CTR

### Potential Features

- **Semantic Keyword Expansion**: AI suggests related keywords and LSI terms
- **Duplicate Detection**: Warn if title/description is too similar to other pages
- **Readability Score**: Calculate and display readability metrics
- **Click-Through Optimization**: Score based on engagement potential
- **Schema Integration**: Generate FAQ schema markup from content
- **Scheduled Updates**: Periodically refresh SEO metadata for evergreen content

## Integration with SEO Plugin

The current implementation creates separate fields (`aiSeoTitle`, `aiSeoDescription`) in the Meta tab because the SEO plugin's fields are in a separate SEO tab created by the plugin.

**Manual Workflow:**
1. Generate AI-powered SEO metadata in the Meta tab
2. Review and refine as needed
3. Copy the generated text to the SEO tab's `meta.title` and `meta.description` fields
4. Save the document

**Future Auto-sync:** A `beforeChange` hook could automatically sync these fields:

```typescript
// Future enhancement: Auto-sync hook
beforeChange: [
  async ({ data }) => {
    if (data.aiSeoTitle && !data.meta?.title) {
      data.meta = data.meta || {}
      data.meta.title = data.aiSeoTitle
    }
    if (data.aiSeoDescription && !data.meta?.description) {
      data.meta = data.meta || {}
      data.meta.description = data.aiSeoDescription
    }
    return data
  }
]
```

## Version History

- **v1.0.0** (2025-01-25): Initial release with OpenAI GPT-4o support for Pages and Posts

## Support

For issues or questions:

1. Check this documentation first
2. Review server logs for error messages
3. Verify AI Settings configuration
4. Test with simple content first
5. Create an issue in the project repository

## Related Documentation

- [AI_ALT_TAG_GENERATION.md](./AI_ALT_TAG_GENERATION.md) - ALT tag generation system
- [STYLING_SYSTEM.md](./STYLING_SYSTEM.md) - Theme and styling system
- [DATABASE_MIGRATIONS.md](./DATABASE_MIGRATIONS.md) - Database migration guide
- [BLOG_IMPLEMENTATION.md](./BLOG_IMPLEMENTATION.md) - Blog/posts system documentation
