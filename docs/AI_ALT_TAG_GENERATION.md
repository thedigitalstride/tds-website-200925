# AI-Powered ALT Tag Generation

## Overview

The TDS website now includes an AI-powered system that automatically generates SEO-optimized ALT tags for images when they are uploaded. This feature uses OpenAI's GPT-4o Vision API (with support for additional providers coming soon) to analyze images and create descriptive, accessible ALT text that follows current SEO best practices.

## Features

- **Automatic Generation**: ALT tags are generated automatically when images are uploaded without ALT text
- **SEO Optimized**: Generated ALT text follows 2024-2025 SEO guidelines (125 characters or less, descriptive, keyword-aware)
- **Accessibility First**: Prioritizes screen reader compatibility and WCAG compliance
- **LLM Agnostic**: Designed to support multiple AI providers (OpenAI, Anthropic Claude, custom endpoints)
- **Configurable**: Editable system prompts allow fine-tuning without code changes
- **Fallback Strategy**: Falls back to cleaned filename if AI generation fails
- **Cost Tracking**: Optional monitoring of API usage and estimated costs
- **Logging**: Audit trail of all AI-generated ALT tags

## Architecture

### Service Layer (`src/services/ai/`)

```
src/services/ai/
├── types.ts                    # TypeScript interfaces and types
├── providers/
│   ├── base.ts                # Abstract provider interface
│   ├── openai.ts              # OpenAI Vision implementation
│   └── index.ts               # Provider registry
├── altTagGenerator.ts         # Core ALT tag generation logic
└── index.ts                   # Main service exports
```

**Key Components:**

1. **Provider Abstraction**: All providers implement the `AiProvider` interface, making it easy to add new LLM providers
2. **Type Safety**: Comprehensive TypeScript types for all operations
3. **Error Handling**: Graceful degradation with fallback strategies
4. **Cost Estimation**: Built-in cost tracking based on token usage

### Configuration (`src/AiSettings/config.ts`)

Global configuration accessible at `/admin/globals/aiSettings` with four main tabs:

1. **Provider Configuration**: API credentials, model selection, advanced settings
2. **ALT Tag Generator**: System prompt, max length, quality controls
3. **Future AI Features**: Placeholder for upcoming features (blog generation, meta optimization)
4. **Usage & Monitoring**: Cost tracking and usage statistics

### Media Collection Hook (`src/collections/Media/hooks/generateAltTag.ts`)

The `afterChange` hook automatically:
- Detects when ALT text is missing on new uploads
- Fetches AI Settings to check if generation is enabled
- Calls the AI service to generate ALT text
- Updates the media document with generated text
- Prevents infinite loops using context flags

## Setup Instructions

### 1. Configure AI Provider

1. Navigate to `/admin/globals/aiSettings` in the Payload admin panel
2. Go to the **Provider Configuration** tab
3. Select your AI provider (currently only OpenAI is available)
4. Enter your OpenAI API key (starts with `sk-`)
5. Choose a model (recommended: `gpt-4o` for best quality, `gpt-4o-mini` for lower cost)
6. Optionally adjust advanced settings (temperature, max tokens, timeout)

### 2. Enable ALT Tag Generation

1. Go to the **ALT Tag Generator** tab
2. Check **"Enable Automatic ALT Tag Generation"**
3. Review and customize the **System Primer** if needed (default is optimized for SEO)
4. Set your preferred **Maximum ALT Text Length** (default: 125 characters)
5. Configure quality controls:
   - **Require Human Review**: Mark AI-generated tags for review
   - **Fallback to Filename**: Use cleaned filename if AI fails
   - **Log All Generations**: Keep audit trail of generations

### 3. Environment Variables

Add your OpenAI API key to your environment variables:

```bash
# .env or .env.local
OPENAI_API_KEY=sk-...
```

Alternatively, you can enter the API key directly in the admin panel (it will be stored in the database).

### 4. Test the System

1. Upload a new image to the Media collection (`/admin/collections/media`)
2. Leave the ALT text field empty
3. After upload, the system should automatically generate ALT text within a few seconds
4. Check the server logs for confirmation: `[AI ALT Tag] Generated: "..."`

## Usage Guidelines

### When ALT Tags Are Generated

ALT tags are automatically generated when:
- ✅ A new image is uploaded (`create` operation)
- ✅ The ALT text field is empty or blank
- ✅ The file is an image (MIME type starts with `image/`)
- ✅ AI Settings has ALT tag generation enabled
- ✅ A valid API key is configured

ALT tags are NOT generated when:
- ❌ ALT text is already provided
- ❌ The file is not an image
- ❌ AI generation is disabled in settings
- ❌ Updating existing media (not a `create` operation)

### Customizing the System Primer

The system primer is the instruction prompt sent to the AI. The default primer is:

```
Generate concise, SEO-optimized alt text under 125 characters.
Describe key visual elements, context, and relevant details for
accessibility and search engines. Focus on what is important,
avoid phrases like "image of" or "picture of". Be specific and
descriptive.
```

**Tips for customizing:**
- Keep it concise and clear
- Specify the desired tone (professional, casual, technical)
- Include any brand-specific requirements
- Emphasize SEO keywords if relevant to your industry
- Test changes with a few uploads before rolling out widely

### Best Practices

1. **Review AI-Generated Tags**: Enable "Require Human Review" initially to ensure quality
2. **Monitor Costs**: Enable cost tracking to avoid unexpected API bills
3. **Provide Context**: Use the "Include Page Context" option for more relevant ALT text
4. **Test Different Models**: `gpt-4o-mini` is 10x cheaper but slightly lower quality
5. **Fallback Strategy**: Keep "Fallback to Filename" enabled as a safety net
6. **Batch Review**: Periodically review generated tags for quality and consistency

## SEO Guidelines (2024-2025)

The system follows current SEO best practices:

- **Length**: 125 characters or less (optimal for screen readers and search engines)
- **Descriptive**: Focus on key visual elements and context
- **Natural Language**: Avoid keyword stuffing, use natural phrasing
- **No Redundancy**: Don't use "image of" or "picture of" (screen readers announce "image" automatically)
- **Specificity**: Be specific about what's in the image, not generic descriptions
- **Keywords**: Include relevant keywords naturally, based on image content
- **Context-Aware**: Consider surrounding content (page title, category) when available

## Cost Estimation

### OpenAI GPT-4o Pricing (as of January 2025)

- **Input**: $2.50 per 1M tokens
- **Output**: $10.00 per 1M tokens
- **Typical ALT Tag**: ~1000 tokens (image + prompt + response)
- **Estimated Cost**: $0.01 per image

### OpenAI GPT-4o-mini Pricing

- **Input**: $0.15 per 1M tokens
- **Output**: $0.60 per 1M tokens
- **Estimated Cost**: $0.0008 per image (10x cheaper)

### Monthly Cost Examples

| Images/Month | Model | Estimated Cost |
|--------------|-------|----------------|
| 100 | gpt-4o | $1.00 |
| 100 | gpt-4o-mini | $0.08 |
| 500 | gpt-4o | $5.00 |
| 500 | gpt-4o-mini | $0.40 |
| 1000 | gpt-4o | $10.00 |
| 1000 | gpt-4o-mini | $0.80 |

## Troubleshooting

### ALT Tags Not Being Generated

1. **Check AI Settings**: Ensure ALT tag generation is enabled at `/admin/globals/aiSettings`
2. **Verify API Key**: Make sure your OpenAI API key is valid and has credits
3. **Check Server Logs**: Look for detailed logs in the server console
   - Look for lines starting with `[AI ALT Tag Hook]`
   - Check for emoji indicators: 🚀 (starting), ✅ (success), ❌ (error), ⏸️ (disabled)
   - Logs now show exactly why generation is skipped or fails
4. **Test Manually**: Use the "Generate ALT Tag" button to test
5. **Verify MIME Type**: Ensure the file is detected as an image (check `mimeType` field)
6. **Check URL Availability**: The hook needs the URL to be available (check server logs for "No URL available")

### Common Log Messages and What They Mean

- `Skipping - already generated in this operation` - Hook already ran, normal behavior
- `Skipping - operation is "update", not "create"` - Only auto-generates on new uploads
- `Skipping - ALT text already exists` - Image already has ALT text
- `No URL available for image` - Image still processing, this is normal
- `AI generation is not enabled in settings` - Go enable it in AI Settings
- `Generation failed and no fallback available` - Check API key and settings

### Poor Quality ALT Tags

1. **Adjust System Primer**: Make it more specific to your needs
2. **Lower Temperature**: Reduce temperature (0.1-0.3) for more deterministic results
3. **Try Different Model**: Switch to `gpt-4o` for higher quality
4. **Add Context**: Enable "Include Page Context" for more relevant descriptions
5. **Review and Edit**: Use "Require Human Review" to catch issues early

### API Errors

Common errors and solutions:

- **`Invalid API key`**: Check that your key starts with `sk-` and has active credits
- **`Rate limit exceeded`**: You're making too many requests; wait or upgrade your OpenAI plan
- **`Timeout`**: Increase timeout in advanced settings (default: 30s)
- **`Model not found`**: Ensure you're using a vision-capable model (gpt-4o, gpt-4-turbo)

### Cost Issues

1. **Enable Cost Tracking**: Turn on cost tracking in AI Settings
2. **Set Budget Alerts**: Configure monthly budget alerts
3. **Switch to Mini**: Use `gpt-4o-mini` for 10x cost reduction
4. **Review Logs**: Check which operations are using the most tokens
5. **Batch Operations**: Avoid regenerating ALT tags unnecessarily

## Future Enhancements

### Coming Soon

- **Anthropic Claude Support**: Use Claude 3.5 Sonnet for vision tasks
- **Custom Endpoints**: Support for self-hosted or alternative AI providers
- **Batch Regeneration**: Regenerate ALT tags for existing media in bulk
- **A/B Testing**: Test different system prompts and compare results
- **Multi-language**: Generate ALT tags in multiple languages
- **Admin UI Button**: "Regenerate ALT Tag" button in media edit view
- **Persistent Logging**: Store logs in a dedicated collection for auditing

### Future AI Features

The AI infrastructure supports future features:

- **Blog Post Generation**: AI-assisted content creation
- **Meta Description Optimization**: Auto-generate SEO descriptions
- **Content Summarization**: Generate excerpts automatically
- **Translation Services**: Multi-language content generation
- **Image Categorization**: Auto-categorize and tag images
- **Accessibility Audits**: Identify and fix accessibility issues

## Technical Details

### Hook Lifecycle

1. User uploads image via admin panel
2. `beforeOperation` hook sanitizes filename
3. Image is uploaded to Vercel Blob Storage
4. Media document is created in database
5. `afterChange` hook fires
6. Hook checks if ALT is missing and generation is enabled
7. AI service fetches settings and creates provider
8. Provider sends image URL + prompt to OpenAI API
9. Response is cleaned and length-enforced
10. Media document is updated with generated ALT tag
11. Generation is logged for auditing

### Preventing Infinite Loops

The hook uses a context flag to prevent infinite loops:

```typescript
context: {
  aiAltTagGenerated: true
}
```

This flag is checked at the start of the hook, and if present, the hook returns early without generating.

### Error Handling

The system has multiple fallback layers:

1. **AI Generation**: Primary method
2. **Filename Fallback**: If AI fails and enabled
3. **Empty String**: If all fallbacks disabled
4. **Silent Failure**: Errors are logged but don't block upload

### Security Considerations

- **API Keys**: Store API keys in environment variables or encrypted in database
- **Rate Limiting**: Consider implementing rate limiting for AI calls
- **Cost Controls**: Set budget alerts to prevent runaway costs
- **Input Validation**: All image URLs are validated before sending to AI
- **Output Sanitization**: AI responses are cleaned and length-enforced

## Support

For issues or questions:

1. Check this documentation first
2. Review server logs for error messages
3. Test with a simple image upload
4. Verify API key and settings configuration
5. Create an issue in the project repository

## Manual ALT Tag Generation

In addition to automatic generation on upload, you can manually generate or regenerate ALT tags using the "Generate ALT Tag" button in the admin UI.

### Using the Generate Button

1. Navigate to any media item in `/admin/collections/media`
2. Find the ALT text field
3. Click the **"Generate ALT Tag"** button next to the input field
4. Wait for the AI to generate the ALT tag (you'll see "Generating..." text)
5. A success toast notification will appear when complete
6. The ALT field will be populated with the generated text
7. Review and edit if needed, then save

### When to Use Manual Generation

- **Regenerate Existing**: Improve quality of existing ALT tags
- **After Settings Change**: Test new system prompts or models
- **AI Settings Were Off**: Generate ALT for images uploaded before enabling AI
- **Failed Auto-Generation**: Retry generation if automatic failed
- **Fine-tuning**: Generate, review, and regenerate until satisfied

### Button States

- **Enabled**: When image URL and filename are available
- **Disabled**: During new uploads before URL is generated
- **Loading**: Shows "Generating..." while AI is working
- **Error**: Toast notification shows error if generation fails

## Version History

- **v1.1.0** (2024-01-24): Added manual "Generate ALT Tag" button, fixed validation blocking issue, improved logging
- **v1.0.0** (2024-01-24): Initial release with OpenAI GPT-4o support
