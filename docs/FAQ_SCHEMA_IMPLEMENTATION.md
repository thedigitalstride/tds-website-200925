# Google FAQ Schema Implementation Plan

**Status:** 📋 Planned (Not Yet Implemented)
**Priority:** Medium
**Implement After:** Core FAQ/Accordion functionality is perfected and tested

---

## 🎯 Overview

This document outlines the complete implementation plan for adding Google FAQPage structured data (JSON-LD) to all pages containing AccordionBlocks. This will improve SEO, enable voice search optimization, and provide semantic understanding of FAQ content to search engines.

---

## 📦 What Will Be Implemented

### 1. **Utility Function: `generateFAQSchema`**
**File:** `src/utilities/generateFAQSchema.ts`

**Purpose:** Convert FAQ data (with Lexical content) to Google FAQPage JSON-LD schema

**Key Features:**
- Converts Lexical rich text to plain text for answer text
- Validates FAQ data (questions must have visible text)
- Returns proper FAQPage schema structure
- Handles multiple FAQs in one schema object
- Gracefully handles invalid or missing data

**Function Signature:**
```typescript
export async function generateFAQSchema(
  faqs: PopulatedFAQ[]
): Promise<Record<string, any> | null>
```

**Output Format:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get started?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To get started, simply sign up and follow the onboarding process..."
      }
    }
  ]
}
```

---

### 2. **Helper Function: `lexicalToPlainText`**
**File:** `src/utilities/lexicalToPlainText.ts`

**Purpose:** Convert Lexical JSON to plain text (for schema answer text)

**Why Plain Text:**
- Schema.org accepts HTML in answer text, BUT plain text is safer
- Preserves readability in search results
- Avoids validation issues with complex HTML
- Google recommends plain text or simple HTML only
- More portable across different contexts

**Features:**
- Recursively walks Lexical node tree
- Extracts text from paragraphs, headings, lists
- Preserves line breaks for readability
- Handles nested structures (lists, blocks)
- Ignores media/code blocks (non-textual content)
- Handles text formatting (bold, italic) by stripping to plain text

**Implementation Pattern:**
```typescript
export function lexicalToPlainText(lexicalData: any): string {
  // Walk the node tree
  // Extract text content
  // Preserve basic formatting with line breaks
  // Return clean plain text
}
```

---

### 3. **Updated Page Component**
**File:** `src/app/(frontend)/[...slug]/page.tsx`

**Changes:**
- Extract AccordionBlocks from page layout
- Fetch FAQ data for each AccordionBlock
- Generate FAQPage schema for all FAQs on page
- Inject JSON-LD script in page `<head>` via Next.js component

**Implementation Pattern:**
```typescript
// In page component (server-side)
const faqSchema = await generatePageFAQSchema(page.layout)

// Return in page with schema
return (
  <>
    {faqSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    )}
    <article>
      <RenderBlocks blocks={layout || []} breadcrumbs={breadcrumbs} />
    </article>
  </>
)
```

---

### 4. **Helper Function: `generatePageFAQSchema`**
**File:** `src/utilities/generatePageFAQSchema.ts`

**Purpose:** Extract all FAQs from a page's layout blocks and generate combined schema

**Logic Flow:**
1. Walk through page layout blocks
2. Find all AccordionBlocks
3. For each AccordionBlock:
   - Determine content source (dynamic or manual)
   - Fetch FAQs using same logic as AccordionBlock Component
   - Apply filters, sorting, limits
4. Deduplicate FAQs (same FAQ in multiple blocks)
5. Generate single FAQPage schema with all FAQs
6. Return null if no FAQs found

**Deduplication Strategy:**
- Track FAQs by ID using Set or Map
- If same FAQ appears multiple times, include only once
- Maintain order of first appearance

---

## 🔄 Implementation Steps

### Phase 1: Lexical Conversion Utilities

**File:** `src/utilities/lexicalToPlainText.ts`

**Implementation Tasks:**
1. Create main conversion function
2. Handle paragraph nodes → extract text + line break
3. Handle heading nodes → extract text + line break
4. Handle list nodes (ordered/unordered) → format as list with bullets/numbers
5. Handle text nodes with formatting (bold, italic, links) → strip to plain text
6. Handle nested structures → recursion
7. Add line breaks for readability between sections
8. Handle edge cases (empty nodes, null data)

**Test Cases:**
- Simple text paragraph
- Text with bold/italic formatting
- Unordered list
- Ordered list
- Headings (h2, h3, h4)
- Mixed content (paragraphs + lists + headings)
- Empty/null data
- Nested structures

---

### Phase 2: FAQ Schema Generator

**File:** `src/utilities/generateFAQSchema.ts`

**Implementation Tasks:**
1. Import lexicalToPlainText
2. Create TypeScript interfaces:
   ```typescript
   interface FAQPageSchema {
     "@context": string
     "@type": "FAQPage"
     mainEntity: QuestionSchema[]
   }

   interface QuestionSchema {
     "@type": "Question"
     name: string
     acceptedAnswer: AnswerSchema
   }

   interface AnswerSchema {
     "@type": "Answer"
     text: string
   }
   ```
3. Build Question objects from FAQ data:
   - Question name = FAQ question text
   - Answer text = Lexical content → plain text
4. Validate each FAQ:
   - Skip if question is empty
   - Skip if answer is empty
   - Log warnings for invalid FAQs
5. Return proper schema structure
6. Return null if no valid FAQs

**Validation Rules:**
- Question must have non-empty text
- Answer must have non-empty text (after Lexical conversion)
- Skip FAQs that fail validation
- At least 1 valid FAQ required to generate schema

---

### Phase 3: Page-Level Schema Generation

**File:** `src/utilities/generatePageFAQSchema.ts`

**Implementation Tasks:**
1. Import necessary types and utilities
2. Walk layout blocks recursively:
   ```typescript
   function findAccordionBlocks(blocks: any[]): AccordionBlock[] {
     // Recursively find all accordion blocks
     // Return array of AccordionBlock configs
   }
   ```
3. For each AccordionBlock, re-implement FAQ fetching logic:
   - Dynamic mode: Query by categories, filters, sort, limit
   - Manual mode: Use selected FAQs
   - Apply same sorting (featured first, then order/date)
4. Collect all FAQs from all blocks
5. Deduplicate by FAQ ID:
   ```typescript
   const uniqueFAQs = Array.from(
     new Map(allFAQs.map(faq => [faq.id, faq])).values()
   )
   ```
6. Call `generateFAQSchema(uniqueFAQs)`
7. Return schema or null

**Edge Cases:**
- No AccordionBlocks on page → return null
- AccordionBlocks with no FAQs → return null
- Invalid FAQ data → skip gracefully
- Duplicate FAQs across blocks → deduplicate

---

### Phase 4: Integrate into Page Component

**File:** `src/app/(frontend)/[...slug]/page.tsx`

**Changes:**
1. Import at top:
   ```typescript
   import { generatePageFAQSchema } from '@/utilities/generatePageFAQSchema'
   ```

2. In page component (before return), add:
   ```typescript
   // Generate FAQ schema for this page
   const faqSchema = await generatePageFAQSchema(layout || [])
   ```

3. Update return statement:
   ```typescript
   return (
     <>
       {faqSchema && (
         <script
           type="application/ld+json"
           dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
           key="faq-schema"
         />
       )}
       <article>
         <PayloadRedirects disableNotFound url={url} />
         {draft && <LivePreviewLoader />}
         <RenderBlocks blocks={layout || []} breadcrumbs={breadcrumbs} />
       </article>
     </>
   )
   ```

**Important Notes:**
- Schema generated server-side (no client rendering)
- Script tag injected into page HTML
- No hydration issues (static content)
- Cached with Next.js page cache

---

### Phase 5: Testing & Validation

**Manual Testing Steps:**

1. **Create Test Page:**
   - Add AccordionBlock to page
   - Include 3-5 FAQs
   - Mix of simple and complex answers

2. **Verify Schema in Source:**
   - Navigate to page
   - View page source (Ctrl+U or Cmd+Option+U)
   - Find `<script type="application/ld+json">` in `<head>`
   - Verify JSON is valid and complete

3. **Validate with Google:**
   - Copy JSON-LD content
   - Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Paste schema
   - Verify "Valid FAQPage detected"
   - Check for warnings/errors

4. **Test Edge Cases:**
   - Page with no AccordionBlocks → no schema
   - Page with empty AccordionBlock → no schema
   - Page with multiple AccordionBlocks → combined schema
   - Page with duplicate FAQs → deduplicated

5. **Performance Check:**
   - Measure page load time before/after
   - Should be negligible impact (<5ms)
   - Verify server-side rendering (no client JS)

---

## 📋 Technical Considerations

### Google's 2025 Restrictions

**Critical Information:**
As of 2023-2025, Google FAQ rich results are **only available for well-known, authoritative government or health websites**.

**What This Means:**
- Most commercial sites won't get FAQ rich snippets in Google Search
- You won't see the expanded FAQ dropdown in search results
- This is a Google policy change, not a technical limitation

**Why Implement Anyway:**

Despite the restriction, FAQ schema is still valuable for:

1. **Voice Search Optimization**
   - Google Assistant, Siri, Alexa prioritize structured FAQ data
   - Growing importance as voice search increases

2. **Semantic Understanding**
   - Helps Google understand your content better
   - Improves relevance for search queries
   - May influence ranking signals

3. **Other Search Engines**
   - Bing, DuckDuckGo, etc. may still show FAQ rich results
   - Not all search engines have Google's restrictions

4. **Future-Proofing**
   - Google policies may change
   - Schema already in place when/if restrictions lift

5. **Best Practices**
   - Structured data is SEO best practice regardless
   - Shows technical sophistication
   - Part of comprehensive SEO strategy

**Recommendation:** Implement the schema anyway. The benefits outweigh the minimal effort, even without rich results in Google.

---

### Content Requirements

Per Google's guidelines, FAQ schema content must:

✅ **Allowed:**
- Questions and answers fully visible on page
- Authentic FAQs written by site owner
- Answers can include HTML formatting
- Multiple FAQs per page
- FAQs that help users

❌ **Not Allowed:**
- Hidden or collapsed content (our accordions are fine - they're visible when expanded)
- User-generated content (Q&A forums)
- Advertising purposes
- Duplicate FAQs across many pages
- Questions without answers
- Obscene, profane, or hateful content

**Our Implementation:** ✅ All requirements met
- FAQs visible when accordion expanded
- Content managed by site owner in CMS
- Authentic, helpful information
- No user-generated content

---

### Lexical to Text Conversion Strategy

**Chosen Approach:** Convert Lexical JSON → **Plain Text** (not HTML)

**Reasoning:**

1. **Simplicity**
   - Plain text is simpler to generate
   - Fewer edge cases and bugs
   - Easier to maintain

2. **Safety**
   - No HTML validation issues
   - No risk of broken markup
   - No XSS concerns

3. **Compatibility**
   - Schema.org accepts both plain text and HTML
   - Google shows plain text in search results anyway
   - Plain text works across all search engines

4. **Performance**
   - Faster conversion
   - Smaller output size
   - Less processing overhead

**Alternative (if needed later):**

If HTML formatting is desired:
- Use `convertLexicalToHTML` from `@payloadcms/richtext-lexical/html`
- Strip complex HTML tags
- Keep only basic formatting (bold, italic, lists)
- More complex but preserves some formatting

**Decision:** Start with plain text, add HTML support later if requested.

---

### Deduplication Logic

**Scenario:** Same FAQ appears in multiple AccordionBlocks on one page

**Strategy:**
```typescript
// Collect all FAQs from all blocks
const allFAQs: PopulatedFAQ[] = []
for (const block of accordionBlocks) {
  const blockFAQs = await fetchFAQsForBlock(block)
  allFAQs.push(...blockFAQs)
}

// Deduplicate by ID (keep first occurrence)
const uniqueFAQs = Array.from(
  new Map(allFAQs.map(faq => [faq.id, faq])).values()
)

// Generate schema from unique FAQs
const schema = await generateFAQSchema(uniqueFAQs)
```

**Why Deduplicate:**
- Google guidelines discourage repetitive FAQs
- Cleaner schema output
- Better SEO practice
- Reduces schema size

**Order Preservation:**
- First occurrence of FAQ is kept
- Maintains order from page layout
- Featured FAQs appear first (if sorted that way)

---

### Performance Considerations

**Server-Side Generation:**
- Schema generated during SSR
- No client-side JavaScript
- No hydration issues
- Cached with Next.js page cache

**Expected Impact:**
- ~1-2ms per page (negligible)
- One-time generation per page build
- No runtime overhead
- No additional network requests

**Optimization:**
- Only process pages with AccordionBlocks
- Skip schema generation if no FAQs
- Efficient deduplication with Map
- Minimal Lexical traversal

---

## 🎨 Example Output

### Given: Page with 1 AccordionBlock containing 3 FAQs

**Generated Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I get started?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To get started, simply sign up for an account and follow our onboarding process. You'll be guided through the setup step by step.\n\nKey steps:\n1. Create your account\n2. Verify your email\n3. Complete your profile\n4. Start exploring!"
      }
    },
    {
      "@type": "Question",
      "name": "What are your pricing plans?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer three pricing plans:\n\nStarter: $29/month - Perfect for individuals and small teams\nPro: $99/month - Great for growing businesses\nEnterprise: Custom pricing - For large organizations\n\nAll plans include our core features with varying limits. Contact us for a custom quote."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer refunds?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer a 30-day money-back guarantee on all plans. If you're not satisfied with our service for any reason, simply contact our support team within 30 days of your purchase for a full refund."
      }
    }
  ]
}
```

### Injected in HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Pricing | The Digital Stride</title>
  <meta name="description" content="..." />

  <!-- FAQ Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To get started, simply sign up for an account..."
        }
      }
    ]
  }
  </script>
</head>
<body>
  <!-- Page content -->
</body>
</html>
```

---

## 📁 Files to Create/Modify

### New Files:
1. **`src/utilities/lexicalToPlainText.ts`** (~100-150 lines)
   - Main conversion function
   - Node type handlers (paragraph, heading, list, text)
   - Recursive traversal
   - Edge case handling

2. **`src/utilities/generateFAQSchema.ts`** (~80-100 lines)
   - TypeScript interfaces
   - Schema generation logic
   - Validation
   - Error handling

3. **`src/utilities/generatePageFAQSchema.ts`** (~150-200 lines)
   - Block traversal
   - FAQ fetching (replicates AccordionBlock logic)
   - Deduplication
   - Integration with generateFAQSchema

### Modified Files:
1. **`src/app/(frontend)/[...slug]/page.tsx`** (~10-15 lines added)
   - Import generatePageFAQSchema
   - Call function before return
   - Add script tag to output

---

## ✅ Success Criteria

### 1. Schema Validation
- ✅ Passes [Google Rich Results Test](https://search.google.com/test/rich-results)
- ✅ Valid JSON-LD syntax
- ✅ Proper FAQPage structure with all required fields
- ✅ No validation warnings or errors

### 2. Content Accuracy
- ✅ Questions match visible FAQ questions exactly
- ✅ Answers match visible FAQ answers (plain text equivalent)
- ✅ No truncation or data loss in conversion
- ✅ Line breaks preserved for readability

### 3. Performance
- ✅ No noticeable impact on page load time (<5ms)
- ✅ Server-side generation only (no client JS)
- ✅ Efficient deduplication (no duplicate processing)
- ✅ Cached with Next.js page cache

### 4. Edge Cases Handled
- ✅ Pages with no FAQs → no schema generated
- ✅ FAQs with invalid data → skipped gracefully with warnings
- ✅ Multiple AccordionBlocks → combined into single schema
- ✅ Duplicate FAQs → deduplicated by ID
- ✅ Empty AccordionBlocks → handled gracefully

### 5. Testing
- ✅ Validated with Google Rich Results Test
- ✅ Tested on multiple pages (with/without FAQs)
- ✅ Verified SSR (schema in initial HTML source)
- ✅ Checked all edge cases
- ✅ No console errors or warnings

---

## 🚀 Post-Implementation Tasks

### Testing Procedure

1. **Validation Testing:**
   - Navigate to page with AccordionBlock
   - View page source (Ctrl+U or Cmd+Option+U)
   - Find `<script type="application/ld+json">` in `<head>`
   - Copy JSON content
   - Paste into [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Verify "Valid FAQPage detected" message
   - Check for any warnings or errors

2. **Content Testing:**
   - Compare schema questions with visible FAQs
   - Compare schema answers with visible FAQ answers
   - Verify formatting is preserved (line breaks, lists)
   - Check special characters render correctly

3. **Edge Case Testing:**
   - Test page with no AccordionBlocks
   - Test page with empty AccordionBlock
   - Test page with multiple AccordionBlocks
   - Test page with same FAQ in multiple blocks
   - Test FAQ with complex Lexical content (lists, headings, etc.)

4. **Performance Testing:**
   - Measure page load time before implementation
   - Measure page load time after implementation
   - Verify difference is <5ms
   - Check server logs for any errors

### Documentation Updates

**Add to `docs/ACCORDION_SYSTEM.md`:**

New section: "FAQ Schema (Structured Data)"
- Explain automatic schema generation
- Show example output
- Explain Google's restrictions
- Document benefits beyond rich results
- Show how to validate with Google's tool
- Troubleshooting common issues

**Content to Add:**
```markdown
## FAQ Schema (Structured Data)

Every page with AccordionBlocks automatically generates Google FAQPage structured data.

### What is FAQ Schema?

JSON-LD structured data that helps search engines understand your FAQ content.

### Benefits:
- Voice search optimization (Google Assistant, Siri, Alexa)
- Semantic understanding for better ranking
- Works with Bing and other search engines
- Future-proofs for when Google policies change

### Note About Rich Results:
Google currently limits FAQ rich results to government/health sites. You won't see the FAQ dropdown in Google search, but the schema still provides SEO value.

### How to Validate:
1. View page source
2. Find `<script type="application/ld+json">`
3. Copy JSON content
4. Paste into [Google Rich Results Test](https://search.google.com/test/rich-results)
5. Verify "Valid FAQPage" message

### Example Output:
[Show example schema]

### Troubleshooting:
- No schema on page → Check if AccordionBlock has published FAQs
- Invalid schema → Check FAQ content for special characters
- Duplicate questions → Same FAQ appearing multiple times is deduplicated
```

### Future Enhancements (Not in Initial Implementation)

**Possible additions later:**

1. **Admin Control:**
   - Add checkbox to AccordionBlock: "Include in FAQ Schema"
   - Allow disabling schema per block
   - Global setting: "Enable FAQ Schema"

2. **Schema Customization:**
   - Character limits for answers (optimize for snippets)
   - Option to use HTML instead of plain text
   - Custom formatting rules

3. **Standalone FAQ Pages:**
   - Add schema to dedicated `/faq` page
   - Support for FAQ collection pages
   - Breadcrumb schema integration

4. **Monitoring:**
   - Track schema validation errors in admin
   - Log warnings for invalid FAQs
   - Dashboard showing which pages have schema

5. **Testing Tools:**
   - Admin panel tool to preview schema
   - One-click validation from admin
   - Schema diff viewer for changes

---

## ⚠️ Important Notes

### 1. Rich Results Limitation
**Reality:** Most sites won't see FAQ rich snippets in Google due to 2025 policy (government/health only).

**Our Response:** Implement anyway for other SEO benefits (voice search, semantic understanding, other search engines, future-proofing).

### 2. Content Visibility
**Requirement:** FAQs must be visible on page.

**Our Implementation:** ✅ Accordions expand to show content, meeting requirement.

### 3. Lexical Conversion
**Approach:** Using plain text conversion (simpler, safer) rather than HTML.

**Rationale:** Plain text avoids validation issues, works everywhere, and Google shows plain text in results anyway.

### 4. Deduplication
**Behavior:** Same FAQ on page multiple times = one schema entry.

**Reason:** Google guidelines discourage repetitive content in schema.

### 5. Server-Side Only
**Implementation:** No client-side generation, no hydration issues.

**Benefit:** Schema in initial HTML, faster page loads, better SEO.

### 6. No Posts Support (Initially)
**Scope:** Implementation focuses on pages with AccordionBlocks.

**Future:** Could be extended to blog posts with inline FAQs.

---

## 📊 Implementation Checklist

Use this checklist when implementing:

### Planning Phase:
- [ ] Review this document
- [ ] Confirm core FAQ functionality is stable
- [ ] Understand Google's 2025 restrictions
- [ ] Set expectations (no rich results, but still valuable)

### Development Phase:
- [ ] Create `lexicalToPlainText.ts`
  - [ ] Handle paragraph nodes
  - [ ] Handle heading nodes
  - [ ] Handle list nodes
  - [ ] Handle text nodes
  - [ ] Handle nested structures
  - [ ] Test with sample data
- [ ] Create `generateFAQSchema.ts`
  - [ ] Define TypeScript interfaces
  - [ ] Implement schema generation
  - [ ] Add validation logic
  - [ ] Handle edge cases
- [ ] Create `generatePageFAQSchema.ts`
  - [ ] Implement block traversal
  - [ ] Replicate FAQ fetching logic
  - [ ] Add deduplication
  - [ ] Test with various page layouts
- [ ] Update `[...slug]/page.tsx`
  - [ ] Import generatePageFAQSchema
  - [ ] Call function server-side
  - [ ] Add script tag to output
  - [ ] Test rendering

### Testing Phase:
- [ ] Test on page with 1 AccordionBlock
- [ ] Test on page with multiple AccordionBlocks
- [ ] Test on page with no AccordionBlocks
- [ ] Test with duplicate FAQs
- [ ] Test with complex Lexical content
- [ ] Validate with Google Rich Results Test
- [ ] Check page source for schema
- [ ] Verify SSR (schema in initial HTML)
- [ ] Test performance impact
- [ ] Test edge cases

### Documentation Phase:
- [ ] Update `docs/ACCORDION_SYSTEM.md`
- [ ] Add validation instructions
- [ ] Document Google restrictions
- [ ] Add troubleshooting section
- [ ] Include example output

### Deployment Phase:
- [ ] Generate types (`pnpm generate:types`)
- [ ] Test in development
- [ ] Test in production (or staging)
- [ ] Validate live pages with Google tool
- [ ] Monitor for errors

---

## 🎓 Resources

### Google Documentation:
- [FAQPage Structured Data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### Schema.org:
- [FAQPage Type](https://schema.org/FAQPage)
- [Question Type](https://schema.org/Question)
- [Answer Type](https://schema.org/Answer)

### Payload CMS:
- [Lexical Rich Text](https://payloadcms.com/docs/rich-text/overview)
- [Lexical Converters](https://payloadcms.com/docs/rich-text/converters)

### Next.js:
- [Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [JSON-LD](https://nextjs.org/docs/app/building-your-application/optimizing/metadata#json-ld)

---

## 📝 Summary

This implementation will add professional, SEO-optimized structured data to your FAQ sections. While Google's 2025 policy limits rich results to government/health sites, the schema still provides significant value for:

✅ Voice search optimization
✅ Semantic SEO
✅ Other search engines
✅ Future-proofing
✅ Best practices compliance

The implementation is straightforward, performant, and follows all best practices. Once the core FAQ functionality is stable, this can be implemented in a few hours with thorough testing.

**Ready to implement when you are!**
