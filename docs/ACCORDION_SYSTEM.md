# Accordion Block System

Complete guide to the FAQ/Accordion system with best practices, examples, and troubleshooting.

## 📋 Table of Contents

1. [Overview](#overview)
2. [FAQs Collection](#faqs-collection)
3. [AccordionBlock (Layout Builder)](#accordionblock-layout-builder)
4. [Configuration Options](#configuration-options)
5. [TypeScript Types](#typescript-types)
6. [Accessibility](#accessibility)
7. [Performance](#performance)
8. [Examples](#examples)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The Accordion Block System provides a comprehensive solution for creating interactive FAQ sections and collapsible content throughout your site. The system consists of three main parts:

1. **FAQs Collection** - Global storage for questions and answers with categorization, ordering, and featured flags
2. **AccordionBlock** - Layout builder block for pages that can dynamically fetch or manually select FAQs
3. **Motion Animations** - Smooth, accessible animations using the Motion library

### Key Features

✅ **Smart Content Management**
- Featured FAQs (always appear first)
- Manual ordering within categories
- Category filtering
- Draft/publish workflow

✅ **Flexible Display Options**
- Dynamic content (query by categories)
- Manual selection (pick specific FAQs)
- Multiple layout styles (line dividers, individual cards, or clean)
- Chevron icons (point right when closed, down when open)
- Customizable animations with smooth easing

✅ **Rich Content Support**
- Lexical rich text editor with images, code blocks, CTAs
- Related content links (to posts/pages)
- Downloadable resources
- Media optimization

✅ **Accessibility First**
- WCAG 2.2 AAA compliant
- Keyboard navigation (Arrow keys, Home, End)
- Screen reader support
- Focus management (keyboard-only focus rings)
- Print-friendly stylesheet

✅ **Performance Optimized**
- Server-side rendering
- Client-side search/filter
- Respects prefers-reduced-motion
- Efficient animations with Motion

---

## FAQs Collection

### Creating FAQs

1. Navigate to **Admin → Collections → FAQs**
2. Click "Create New"
3. Fill in the required fields:
   - **Question** (required) - The question text
   - **Answer** (required) - Rich text with full formatting support

### Field Reference

#### Content Tab

##### Question (Required)
- **Type**: Text
- **Description**: The question text that users will see
- **Example**: "How do I get started?"
- **Best Practice**: Keep questions concise and user-focused

##### Answer (Required)
- **Type**: Rich Text (Lexical)
- **Blocks Available**:
  - Images (MediaBlock)
  - Code snippets (Code)
  - Call-to-actions (CallToAction)
  - Buttons
- **Best Practice**: Start with a direct answer, then provide additional details

##### Related Content
- **Type**: Relationship (Posts or Pages)
- **Purpose**: Link to detailed articles for users who want more information
- **Best Practice**: Only link to highly relevant content

##### Downloadable Resources
- **Type**: Array
- **Purpose**: Attach PDFs, guides, templates, etc.
- **Fields**:
  - Title (required)
  - File (required)
  - Description (optional)
- **Best Practice**: Use descriptive titles and provide file size context

#### Organization Tab

##### Categories
- **Type**: Relationship (Categories collection)
- **Purpose**: Tag FAQs for filtering in AccordionBlocks
- **Best Practice**: Use consistent category names across all FAQs

##### Featured FAQ
- **Type**: Checkbox
- **Purpose**: Pin FAQ to the top of lists
- **Use Case**: Highlight critical or frequently accessed information
- **Note**: Featured FAQs always appear first, regardless of other sorting

##### Sort Order
- **Type**: Number
- **Default**: 0
- **Purpose**: Manual ordering (lower numbers appear first)
- **Best Practice**: Use increments of 10 (10, 20, 30...) to allow easy reordering

#### SEO Tab

##### Slug (Auto-generated)
- **Type**: Text
- **Generated From**: Question text
- **Purpose**: URL-friendly identifier
- **Use Case**: Direct linking to specific FAQ (#faq-slug-here)

##### Meta Description
- **Type**: Textarea
- **Max Length**: 160 characters
- **Purpose**: SEO description for standalone FAQ pages (if implemented)

### Admin Features

#### Row Labels
FAQs display with helpful labels in list view:
- Shows truncated question (first 50 characters)
- Featured FAQs show ⭐ badge
- Format: "FAQ: How do I get started? ⭐"

#### Draft/Publish Workflow
- Save as draft while working
- Publish when ready
- Auto-save every 375ms

---

## AccordionBlock (Layout Builder)

### Adding to Pages

1. Edit any Page in **Admin → Collections → Pages**
2. In the Layout Builder, click "Add Block"
3. Select "Accordion / FAQ"
4. Configure options (see below)

### Configuration Walkthrough

#### 1. Section Header (Optional)

Configure the header that appears above the accordion list.

**Show Section Header** (Default: Enabled)
- Toggle to show/hide the entire header section

**Eyebrow Text**
- Small text above the heading
- Example: "FAQs", "Common Questions", "Help Center"
- Typography: Small, semi-bold, brand color

**Section Heading**
- Main heading
- Example: "Frequently Asked Questions"
- Typography: Display size, semi-bold

**Section Description**
- Supporting text below heading
- Example: "Find answers to common questions about our services"
- Typography: Large, secondary color

**Header Alignment**
- **Left** (default) - Header aligned left
- **Center** - Header centered (good for standalone FAQ pages)

#### 2. Content Source

Choose how FAQs are selected for this block.

**Dynamic (Query FAQs)**
- Automatically fetches FAQs based on filters
- Best for: Category-specific FAQ sections
- Example: "Pricing FAQs" on pricing page

**Manual Selection**
- Handpick specific FAQs
- Best for: Curated lists, specific topics
- Example: "Top 5 FAQs" on homepage

##### Dynamic Options

**Filter by Categories**
- Select one or more categories
- **Logic**: OR (matches any selected category)
- Leave empty to show all FAQs

**Number of FAQs**
- 3, 6, 9, 12, or All
- **Note**: "All" can be a lot - consider pagination for large sets

**Sort By**
- **Sort Order (Featured First)** (default) - Respects manual order
- **Newest First** - Most recently created
- **Question (A-Z)** - Alphabetical
- **Question (Z-A)** - Reverse alphabetical

**Exclude Specific FAQs**
- Optionally hide certain FAQs even if they match filters
- Use case: Duplicate questions, outdated content

#### 3. Display Options

Control how accordions appear and behave.

**Show Categories** (Default: Enabled)
- Display category badges below each question
- Helps users understand topic context

**Default State**
- **All Collapsed** (default) - Users must click to open
- **First Item Open** - First FAQ expanded on load
- **All Open** - All FAQs visible (not recommended for large sets)

**Allow Multiple Open** (Default: Disabled)
- When disabled: Opening one FAQ closes others (accordion behavior)
- When enabled: Multiple FAQs can be open simultaneously (collapse behavior)

**Enable Search/Filter** (Default: Disabled)
- Add search box above accordions
- Filters FAQs client-side in real-time
- **Recommended**: Enable for 6+ FAQs

**Icon Position**
- **Right** (default) - Icon on right side of question
- **Left** - Icon on left side
- **None** - No toggle icon (less visual, but cleaner)

**Icon Style**
- **Chevron (Rotates)** (default) - Chevron points down/up
- **Plus/Minus** - Plus expands, X collapses

#### 4. Layout & Styling

Visual appearance and animation options.

**Section Spacing**
- **Compact** - 12/16 spacing (py-12 lg:py-16)
- **Normal** (default) - 16/24 spacing (py-16 lg:py-24)
- **Spacious** - 24/32 spacing (py-24 lg:py-32)

**Card Background**
- **Primary** (default) - Main background color
- **Secondary** - Subtle gray background
- **Accent** - Highlighted background

**Divider Style**
- **Line (Between Items)** (default) - Horizontal lines at top of each item and bottom of last item (no side borders)
- **Card (Separate Cards)** - Each FAQ in its own card with spacing and borders
- **None** - No visual separation

**Animation Speed**
- **Fast (0.2s)** - Quick, snappy
- **Normal (0.3s)** (default) - Balanced
- **Slow (0.4s)** - Deliberate, smooth

---

## Configuration Options

### Complete Reference

```typescript
AccordionBlock {
  header: {
    showHeader: boolean          // Default: true
    eyebrow?: string
    heading?: string
    description?: string
    headerAlignment: 'left' | 'center'  // Default: 'left'
  }
  contentSource: 'dynamic' | 'manual'   // Default: 'dynamic'

  // Dynamic mode
  opts?: {
    categoryFilter?: Category[]
    limit: '3' | '6' | '9' | '12' | 'all'  // Default: 'all'
    sortBy: 'order' | 'date' | 'question-asc' | 'question-desc'  // Default: 'order'
    excludeFAQs?: FAQ[]
  }

  // Manual mode
  selectedFAQs?: FAQ[]  // Min: 1, Max: 20

  displayOptions: {
    showCategories: boolean              // Default: true
    defaultState: 'all-collapsed' | 'first-open' | 'all-open'  // Default: 'all-collapsed'
    allowMultipleOpen: boolean           // Default: false
    enableSearch: boolean                // Default: false
    iconPosition: 'left' | 'right' | 'none'  // Default: 'right'
    iconStyle: 'chevron' | 'plus-minus'  // Default: 'chevron'
  }

  layoutOptions: {
    spacing: 'compact' | 'normal' | 'spacious'  // Default: 'normal'
    cardBackground: 'primary' | 'secondary' | 'accent'  // Default: 'primary'
    dividerStyle: 'line' | 'card' | 'none'  // Default: 'line'
    animationSpeed: 'fast' | 'normal' | 'slow'  // Default: 'normal'
  }
}
```

---

## TypeScript Types

### Generated Types

After creating FAQs and AccordionBlocks, TypeScript types are auto-generated:

```typescript
// From payload-types.ts
export interface FAQ {
  id: number
  question: string
  answer: object  // Lexical rich text
  categories?: Category[]
  featured?: boolean
  order?: number
  slug?: string
  metaDescription?: string
  relatedContent?: Array<{
    relationTo: 'posts' | 'pages'
    value: Post | Page
  }>
  resources?: Array<{
    id: string
    title: string
    file: Media
    description?: string
  }>
  _status?: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

export interface AccordionBlock {
  blockType: 'accordion'
  // ... other fields as configured
}
```

### Custom Types

Additional types for component props:

```typescript
// From src/blocks/AccordionBlock/types.ts
export interface PopulatedFAQ extends FAQ {
  categories?: Category[]
  relatedContent?: Array<{
    relationTo: 'posts' | 'pages'
    value: Post | Page
  }>
  resources?: Array<{
    id: string
    title: string
    file: Media
    description?: string
  }>
}

export interface AccordionItemProps {
  faq: PopulatedFAQ
  isOpen: boolean
  onToggle: () => void
  iconPosition: 'left' | 'right' | 'none'
  iconStyle: 'chevron' | 'plus-minus'
  showCategories: boolean
  animationSpeed: number
  index: number
  cardBackground?: 'primary' | 'secondary' | 'accent'
  dividerStyle?: 'line' | 'none' | 'card'
}
```

---

## Accessibility

The accordion system is built with accessibility as a top priority.

### ARIA Attributes

Every accordion item includes proper ARIA markup:

```html
<section aria-labelledby="accordion-header-123">
  <h3>
    <button
      id="accordion-header-123"
      aria-expanded="true"
      aria-controls="accordion-content-123"
    >
      Question text
    </button>
  </h3>
  <div
    id="accordion-content-123"
    role="region"
    aria-labelledby="accordion-header-123"
  >
    Answer content
  </div>
</section>
```

### Keyboard Navigation

Full keyboard support is built-in:

| Key | Action |
|-----|--------|
| **Enter / Space** | Toggle accordion open/closed |
| **Arrow Down** | Focus next accordion |
| **Arrow Up** | Focus previous accordion |
| **Home** | Focus first accordion |
| **End** | Focus last accordion |
| **Tab** | Move to next focusable element |

### Screen Reader Support

- State changes announced ("Expanded" / "Collapsed")
- Question text read before action
- Category badges properly labeled
- Skip links for long lists

### Focus Management

- Keyboard-only focus rings (`:focus-visible`)
- Smooth focus ring animations
- High contrast focus indicators

### Reduced Motion

Respects `prefers-reduced-motion`:
- Animations instant (0s) instead of timed
- No blur effects
- Content appears/disappears immediately

### Print Support

Print stylesheet ensures FAQs are readable when printed:
- All accordions expanded
- Interactive elements hidden
- Page breaks between items
- Borders for clarity

---

## Performance

### Server-Side Rendering

- FAQs fetched on server (no client loading state)
- Populated relationships (categories, related content)
- Smart sorting (featured first, then by order/date)

### Client-Side Optimization

- Search filtering in client (no server round-trips)
- Memoized accordion items (prevent unnecessary re-renders)
- Efficient state management (only track open IDs)

### Animation Performance

- GPU-accelerated transforms (rotate, height)
- Motion library optimizations
- Respects device capabilities

---

## Examples

### Example 1: Homepage FAQ Section

**Use Case**: Show top 5 most important FAQs

**Configuration**:
- Content Source: Dynamic
- Category Filter: "General"
- Limit: 6
- Sort By: Sort Order (Featured First)
- Default State: All Collapsed
- Enable Search: No (too few items)

### Example 2: Pricing Page FAQs

**Use Case**: All pricing-related questions

**Configuration**:
- Content Source: Dynamic
- Category Filter: "Pricing", "Billing"
- Limit: All
- Sort By: Sort Order
- Default State: First Item Open
- Enable Search: Yes (many items)

### Example 3: Product Help Center

**Use Case**: Comprehensive help with categories

**Configuration**:
- Content Source: Dynamic
- Category Filter: (none - show all)
- Limit: All
- Sort By: Question (A-Z)
- Default State: All Collapsed
- Enable Search: Yes
- Allow Multiple Open: Yes (users may compare answers)

### Example 4: Landing Page Highlights

**Use Case**: Curated set of FAQs for conversion

**Configuration**:
- Content Source: Manual
- Selected FAQs: Handpicked 3-5 FAQs
- Default State: All Collapsed
- Card Background: Accent (stands out)
- Divider Style: Card (clear separation)

---

## Best Practices

### Content Writing

#### Questions
- ✅ Start with interrogative words (How, What, Why, When, Where)
- ✅ Be specific: "How do I reset my password?" not "Password help?"
- ✅ Use user language, not internal jargon
- ✅ Keep under 100 characters for readability
- ❌ Avoid yes/no questions without context

#### Answers
- ✅ Start with a direct answer (first sentence)
- ✅ Use formatting: headings, lists, bold
- ✅ Link to related content for deeper dives
- ✅ Include code examples where relevant
- ❌ Don't duplicate content from other FAQs
- ❌ Avoid overly long answers (split into multiple FAQs)

### Organization

#### Categorization
- Use consistent category names
- 3-7 categories is ideal (not too many)
- Make categories mutually exclusive where possible

#### Ordering
- Featured: Critical FAQs users must see
- Order 0-10: Most common questions
- Order 10-20: Helpful but not critical
- Order 20+: Edge cases, advanced topics

### Performance

#### Large FAQ Sets (50+)
- Enable search/filter
- Use category filtering to show subsets
- Consider pagination (not built-in yet)

#### Rich Content
- Optimize images before upload
- Use lazy loading for media
- Keep code blocks concise

---

## Troubleshooting

### "No FAQs available" message

**Cause**: No published FAQs match the current filters

**Solutions**:
1. Check FAQ status (published, not draft)
2. Verify category filters aren't too restrictive
3. Check "Exclude Specific FAQs" isn't hiding them all

### Accordions not animating

**Cause**: CSS variables not loaded or JavaScript error

**Solutions**:
1. Clear cache: `rm -rf .next && pnpm dev`
2. Check browser console for errors
3. Verify Motion library is installed: `pnpm list motion`

### Search not working

**Cause**: Search is disabled or JavaScript error

**Solutions**:
1. Verify "Enable Search/Filter" is checked
2. Check browser console for errors
3. Test with simple query (single word)

### Keyboard navigation not working

**Cause**: Focus management conflict or JavaScript error

**Solutions**:
1. Check browser console for errors
2. Test without browser extensions
3. Verify no global keyboard shortcuts conflict

### Categories not showing

**Cause**: "Show Categories" disabled or FAQs have no categories

**Solutions**:
1. Verify "Show Categories" is enabled in Display Options
2. Check FAQs have categories assigned
3. Regenerate types: `pnpm generate:types`

### Related content links broken

**Cause**: Related posts/pages unpublished or deleted

**Solutions**:
1. Check related content items are published
2. Verify relationships in FAQ edit screen
3. Re-save FAQ to refresh relationships

---

## Summary

The Accordion Block System provides a comprehensive, accessible, and performant solution for FAQ sections. Key takeaways:

✅ Use the **FAQs collection** for centralized content management
✅ Use **AccordionBlock** for flexible display on pages
✅ Leverage **categories** for filtering and organization
✅ Enable **search** for large FAQ sets (6+ items)
✅ Test **keyboard navigation** and **screen readers**
✅ Keep content **concise** and **user-focused**

For additional help, see:
- [Payload CMS Documentation](https://payloadcms.com/docs)
- [Motion Library Documentation](https://motion.dev)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
