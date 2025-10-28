# Icon Collection Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace text-based icon fields in CardGrid and Features blocks with a visual icon selector that uses Payload relationships and server-side SVG rendering from the Icons collection.

**Architecture:** Custom Payload field component with search/filter UI stores icon as relationship field with depth:1. Server components render inline SVG from icon.svgCode without client JavaScript. Clean cutover from UntitledUI text fields to Icons collection relationships.

**Tech Stack:** Payload CMS 3.59.1, Next.js 15.4.7 (App Router), React 19, TypeScript, Tailwind CSS 4.1.14

---

## Task 1: Create Icon Selector Field Component Structure

**Goal:** Set up the directory structure and base files for the custom icon selector field.

**Files:**
- Create: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/index.ts`
- Create: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Field.tsx`
- Create: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Component.tsx`

**Step 1: Create directory**

```bash
mkdir -p /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector
```

**Step 2: Create index.ts with field configuration export**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/index.ts`

```typescript
import type { Field } from 'payload'

export const iconSelectorField = (overrides?: Partial<Field>): Field => ({
  name: 'icon',
  type: 'relationship',
  relationTo: 'icons',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection',
  },
  ...overrides,
})
```

**Step 3: Create Field.tsx stub**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Field.tsx`

```typescript
'use client'

import React from 'react'
import type { TextFieldClientComponent } from 'payload'

export const IconSelectorField: TextFieldClientComponent = (props) => {
  return (
    <div className="field-type-text">
      <label className="field-label">
        {props.field.label || props.field.name}
      </label>
      <p>Icon Selector - Coming Soon</p>
    </div>
  )
}
```

**Step 4: Create Component.tsx stub**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Component.tsx`

```typescript
'use client'

import React from 'react'

export const IconGrid: React.FC = () => {
  return (
    <div className="icon-grid">
      <p>Icon grid will be implemented here</p>
    </div>
  )
}
```

**Step 5: Commit**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
git add src/fields/IconSelector/
git commit -m "feat(icons): create icon selector field structure

- Add iconSelectorField configuration helper
- Create Field.tsx component stub
- Create Component.tsx grid stub

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: Implement Icon Grid Component with Search and Filters

**Goal:** Build the icon grid UI that fetches icons from Payload and displays them with search and category filtering.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Component.tsx`

**Step 1: Read the Icons collection structure**

Check: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/collections/Icons.ts`

Note the fields:
- `name` (string)
- `label` (string)
- `svgCode` (string)
- `category` (select: navigation, action, social, communication, interface, file, device, commerce, media, custom)
- `keywords` (array)
- `description` (string)

**Step 2: Implement Component.tsx with full functionality**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Component.tsx`

```typescript
'use client'

import React, { useState, useEffect, useMemo } from 'react'
import type { Icon } from '@/payload-types'

interface IconGridProps {
  selectedIconId?: string
  onSelect: (iconId: string) => void
}

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'navigation', label: 'Navigation' },
  { value: 'action', label: 'Action' },
  { value: 'social', label: 'Social' },
  { value: 'communication', label: 'Communication' },
  { value: 'interface', label: 'Interface' },
  { value: 'file', label: 'File' },
  { value: 'device', label: 'Device' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'media', label: 'Media' },
  { value: 'custom', label: 'Custom' },
]

export const IconGrid: React.FC<IconGridProps> = ({ selectedIconId, onSelect }) => {
  const [icons, setIcons] = useState<Icon[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  // Fetch icons from Payload API
  useEffect(() => {
    const fetchIcons = async () => {
      try {
        const response = await fetch('/api/icons?limit=1000&depth=0')
        const data = await response.json()
        setIcons(data.docs || [])
      } catch (error) {
        console.error('Error fetching icons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIcons()
  }, [])

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    return icons.filter((icon) => {
      // Category filter
      if (categoryFilter && icon.category !== categoryFilter) {
        return false
      }

      // Search filter (searches name, label, description, keywords)
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesName = icon.name?.toLowerCase().includes(searchLower)
        const matchesLabel = icon.label?.toLowerCase().includes(searchLower)
        const matchesDescription = icon.description?.toLowerCase().includes(searchLower)
        const matchesKeywords = icon.keywords?.some((kw) =>
          kw.keyword?.toLowerCase().includes(searchLower),
        )

        return matchesName || matchesLabel || matchesDescription || matchesKeywords
      }

      return true
    })
  }, [icons, searchTerm, categoryFilter])

  if (loading) {
    return <div className="p-4">Loading icons...</div>
  }

  if (icons.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No icons available. Upload icons to the Icons collection first.
      </div>
    )
  }

  return (
    <div className="icon-selector-component">
      {/* Search and Filter Bar */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search icons by name, keyword, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <div className="mb-3 text-sm text-gray-600">
        {filteredIcons.length} {filteredIcons.length === 1 ? 'icon' : 'icons'} found
      </div>

      {/* Icon Grid */}
      <div className="grid max-h-96 grid-cols-6 gap-3 overflow-y-auto rounded-md border border-gray-200 p-4">
        {filteredIcons.length === 0 ? (
          <div className="col-span-6 py-8 text-center text-gray-500">
            No icons match your search criteria
          </div>
        ) : (
          filteredIcons.map((icon) => (
            <button
              key={icon.id}
              onClick={() => onSelect(icon.id)}
              className={`flex aspect-square flex-col items-center justify-center rounded-md border p-3 transition-all hover:border-blue-500 hover:bg-blue-50 ${
                selectedIconId === icon.id
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200'
              }`}
              title={icon.label || icon.name}
              type="button"
            >
              <div
                className="h-8 w-8 text-gray-700"
                dangerouslySetInnerHTML={{ __html: icon.svgCode || '' }}
              />
              <div className="mt-1 truncate text-xs text-gray-600">{icon.name}</div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
```

**Step 3: Test the component builds**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully

**Step 4: Commit**

```bash
git add src/fields/IconSelector/Component.tsx
git commit -m "feat(icons): implement icon grid with search and filters

- Fetch icons from Payload API
- Client-side search (name, keywords, description)
- Category filter dropdown
- Visual icon grid with SVG preview
- Selection state with visual feedback

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: Wire Icon Grid into Field Component

**Goal:** Connect the IconGrid component to Payload's form state management in the Field component.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Field.tsx`

**Step 1: Implement Field.tsx with Payload integration**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/Field.tsx`

```typescript
'use client'

import React, { useState, useEffect } from 'react'
import type { TextFieldClientComponent } from 'payload'
import { IconGrid } from './Component'
import type { Icon } from '@/payload-types'

export const IconSelectorField: TextFieldClientComponent = (props) => {
  const { value, setValue } = props
  const [selectedIcon, setSelectedIcon] = useState<Icon | null>(null)
  const [showGrid, setShowGrid] = useState(false)

  // Fetch selected icon details when value changes
  useEffect(() => {
    if (value && typeof value === 'string') {
      fetch(`/api/icons/${value}?depth=0`)
        .then((res) => res.json())
        .then((icon) => setSelectedIcon(icon))
        .catch((err) => console.error('Error fetching selected icon:', err))
    } else {
      setSelectedIcon(null)
    }
  }, [value])

  const handleSelect = (iconId: string) => {
    setValue(iconId)
    setShowGrid(false)
  }

  const handleClear = () => {
    setValue(null)
    setSelectedIcon(null)
  }

  return (
    <div className="field-type-relationship icon-selector-field">
      <label className="field-label">
        {props.field.label || props.field.name}
        {props.field.required && <span className="required">*</span>}
      </label>

      {props.field.admin?.description && (
        <div className="field-description">{props.field.admin.description}</div>
      )}

      {/* Selected Icon Preview */}
      {selectedIcon && (
        <div className="mb-4 flex items-center gap-4 rounded-md border border-gray-200 p-4">
          <div
            className="h-12 w-12 flex-shrink-0 text-gray-700"
            dangerouslySetInnerHTML={{ __html: selectedIcon.svgCode || '' }}
          />
          <div className="flex-1">
            <div className="font-medium">{selectedIcon.label || selectedIcon.name}</div>
            {selectedIcon.description && (
              <div className="text-sm text-gray-600">{selectedIcon.description}</div>
            )}
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="rounded-md bg-red-50 px-3 py-1 text-sm text-red-600 hover:bg-red-100"
          >
            Clear
          </button>
        </div>
      )}

      {/* Toggle Grid Button */}
      <button
        type="button"
        onClick={() => setShowGrid(!showGrid)}
        className="mb-3 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {selectedIcon ? 'Change Icon' : 'Select Icon'}
      </button>

      {/* Icon Grid (shown when toggled) */}
      {showGrid && <IconGrid selectedIconId={value as string} onSelect={handleSelect} />}
    </div>
  )
}
```

**Step 2: Update index.ts to export Field component**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/fields/IconSelector/index.ts`

```typescript
import type { Field } from 'payload'
import { IconSelectorField } from './Field'

export const iconSelectorField = (overrides?: Partial<Field>): Field => ({
  name: 'icon',
  type: 'relationship',
  relationTo: 'icons',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection',
    components: {
      Field: IconSelectorField,
    },
  },
  ...overrides,
})

export { IconSelectorField }
```

**Step 3: Test types generation**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully

**Step 4: Commit**

```bash
git add src/fields/IconSelector/
git commit -m "feat(icons): wire icon grid into Payload field component

- Integrate with Payload form state (setValue)
- Fetch and display selected icon preview
- Toggle grid visibility
- Clear selection button
- Export field configuration helper

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: Update CardGridBlock Configuration

**Goal:** Replace text icon field with icon selector relationship field in CardGridBlock.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/CardGridBlock/config.ts`

**Step 1: Read current icon field configuration**

Check: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/CardGridBlock/config.ts` around line 98-106

Current implementation uses text field with name 'icon'

**Step 2: Import icon selector field**

Add to imports at top of file:

```typescript
import { iconSelectorField } from '@/fields/IconSelector'
```

**Step 3: Replace icon text field with relationship field**

Find the `icon` field in the cards array configuration (around line 98-106) and replace it with:

```typescript
iconSelectorField({
  name: 'icon',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection to display in the card',
  },
}),
```

Remove the old text field that looks like:

```typescript
{
  name: 'icon',
  type: 'text',
  admin: {
    description: 'Icon name (e.g., Zap, MessageChatCircle)',
  },
},
```

**Step 4: Generate types to verify**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully, `payload-types.ts` updates with icon relationship type

**Step 5: Commit**

```bash
git add src/blocks/CardGridBlock/config.ts src/payload-types.ts
git commit -m "feat(cardgrid): replace icon text field with icon selector

- Import iconSelectorField helper
- Replace text field with relationship to icons collection
- Update admin description for clarity
- Regenerate Payload types

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: Update FeaturesBlock Configuration

**Goal:** Replace text icon field with icon selector relationship field in FeaturesBlock.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/FeaturesBlock/config.ts`

**Step 1: Read current icon field configuration**

Check: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/FeaturesBlock/config.ts` around line 74-83

Current implementation uses text field with name 'icon'

**Step 2: Import icon selector field**

Add to imports at top of file:

```typescript
import { iconSelectorField } from '@/fields/IconSelector'
```

**Step 3: Replace icon text field with relationship field**

Find the `icon` field in the cards array configuration and replace it with:

```typescript
iconSelectorField({
  name: 'icon',
  required: false,
  admin: {
    description: 'Select an icon from the Icons collection to display in the feature card',
  },
}),
```

**Step 4: Generate types to verify**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully

**Step 5: Commit**

```bash
git add src/blocks/FeaturesBlock/config.ts src/payload-types.ts
git commit -m "feat(features): replace icon text field with icon selector

- Import iconSelectorField helper
- Replace text field with relationship to icons collection
- Update admin description for clarity
- Regenerate Payload types

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: Create SVG Renderer Component

**Goal:** Create a reusable component for rendering inline SVG from icon svgCode.

**Files:**
- Create: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/components/IconSVG.tsx`

**Step 1: Create IconSVG component**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/components/IconSVG.tsx`

```typescript
import React from 'react'

interface IconSVGProps {
  svgCode: string
  className?: string
  'aria-label'?: string
}

/**
 * Renders inline SVG from svgCode string (server-side safe)
 * SVG must already be optimized with currentColor for color inheritance
 */
export const IconSVG: React.FC<IconSVGProps> = ({ svgCode, className, 'aria-label': ariaLabel }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: svgCode }}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  )
}
```

**Step 2: Test types generation**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully

**Step 3: Commit**

```bash
git add src/components/IconSVG.tsx
git commit -m "feat(icons): create IconSVG renderer component

- Render inline SVG from svgCode string
- Server-side safe (no client JavaScript)
- Supports className for styling
- Aria-label for accessibility

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: Update FeaturedIcon to Support SVG Code

**Goal:** Modify FeaturedIcon component to accept and render svgCode prop.

**Files:**
- Modify: Check for FeaturedIcon component location (likely `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/components/FeaturedIcon.tsx` or similar)

**Step 1: Locate FeaturedIcon component**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
find src -name "*FeaturedIcon*" -type f
```

Note: If FeaturedIcon doesn't exist, we'll need to update the block components directly to use IconSVG

**Step 2: Read current FeaturedIcon implementation**

Understand current props and rendering logic

**Step 3: Add svgCode prop and rendering logic**

Add to FeaturedIcon props:

```typescript
svgCode?: string
```

Add conditional rendering:

```typescript
{svgCode ? (
  <IconSVG svgCode={svgCode} className="h-full w-full" />
) : icon ? (
  <icon className="h-full w-full" />
) : null}
```

Import IconSVG:

```typescript
import { IconSVG } from '@/components/IconSVG'
```

**Step 4: Test types generation**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm generate:types
```

Expected: Types generate successfully

**Step 5: Commit**

```bash
git add src/components/FeaturedIcon.tsx
git commit -m "feat(icons): add svgCode prop to FeaturedIcon

- Accept svgCode string prop
- Render IconSVG when svgCode provided
- Fallback to icon component prop (backward compatibility)
- Import IconSVG renderer

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: Update CardGridBlock Component Rendering

**Goal:** Modify CardGridBlock to query icon with depth:1 and render SVG from icon.svgCode.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/CardGridBlock/Component.tsx`

**Step 1: Read current rendering logic**

Check: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/CardGridBlock/Component.tsx` around line 607

Current implementation: `getIcon(card.icon)`

**Step 2: Update page query to fetch icons with depth:1**

Find where the block data is queried (likely in the page component that renders blocks). Ensure icons are fetched with `depth: 1`:

```typescript
const page = await payload.findByID({
  collection: 'pages',
  id: params.id,
  depth: 2, // Ensure this is at least 2 to get icon relationship
})
```

**Step 3: Update icon rendering logic**

Find the icon rendering section (around line 607) and replace:

```typescript
// BEFORE
const IconComponent = getIcon(card.icon)
<FeaturedIcon icon={IconComponent} {...iconProps} />
```

With:

```typescript
// AFTER
const iconData = typeof card.icon === 'object' ? card.icon : null
<FeaturedIcon
  svgCode={iconData?.svgCode}
  {...iconProps}
/>
```

**Step 4: Remove getIcon import**

Remove or comment out the import:

```typescript
// import { getIcon } from '@/Header/utils/IconMap'
```

**Step 5: Test the build**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm build
```

Expected: Build succeeds with no TypeScript errors

**Step 6: Commit**

```bash
git add src/blocks/CardGridBlock/Component.tsx
git commit -m "feat(cardgrid): render icons from Icons collection

- Check if card.icon is object (relationship)
- Pass icon.svgCode to FeaturedIcon
- Remove getIcon utility import
- Server-side SVG rendering (zero client JS)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: Update FeaturesBlock Component Rendering

**Goal:** Modify FeaturesBlock to query icon with depth:1 and render SVG from icon.svgCode.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/FeaturesBlock/Component.tsx`

**Step 1: Read current rendering logic**

Check: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/src/blocks/FeaturesBlock/Component.tsx`

Current implementation likely uses `getIcon(card.icon)`

**Step 2: Update icon rendering logic**

Find the icon rendering section and replace:

```typescript
// BEFORE
const IconComponent = getIcon(card.icon)
<FeaturedIcon icon={IconComponent} {...iconProps} />
```

With:

```typescript
// AFTER
const iconData = typeof card.icon === 'object' ? card.icon : null
<FeaturedIcon
  svgCode={iconData?.svgCode}
  {...iconProps}
/>
```

**Step 3: Remove getIcon import**

Remove or comment out the import:

```typescript
// import { getIcon } from '@/Header/utils/IconMap'
```

**Step 4: Test the build**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
pnpm build
```

Expected: Build succeeds with no TypeScript errors

**Step 5: Commit**

```bash
git add src/blocks/FeaturesBlock/Component.tsx
git commit -m "feat(features): render icons from Icons collection

- Check if card.icon is object (relationship)
- Pass icon.svgCode to FeaturedIcon
- Remove getIcon utility import
- Server-side SVG rendering (zero client JS)

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: Test in Development Server

**Goal:** Verify the icon selector works in the Payload admin panel and renders correctly on the frontend.

**Files:**
- Test: Admin panel at `/admin`
- Test: Frontend pages with CardGrid/Features blocks

**Step 1: Start development server**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
rm -rf .next
pnpm dev
```

Expected: Server starts without errors

**Step 2: Test icon selector in admin panel**

1. Navigate to `/admin`
2. Edit or create a page with CardGrid or Features block
3. Click "Select Icon" button
4. Verify icon grid displays with search and category filter
5. Select an icon
6. Verify icon preview appears
7. Save the page

**Step 3: Test frontend rendering**

1. Navigate to the page with the block
2. Verify the icon renders as inline SVG
3. Inspect element - confirm it's SVG, not an image or component
4. Verify icon inherits color correctly (should use currentColor)

**Step 4: Test edge cases**

1. Create a card without an icon (verify no errors)
2. Clear a selected icon (verify it removes correctly)
3. Search for icons by keyword
4. Filter by category

**Step 5: Document test results**

Create test notes file:

```bash
echo "# Icon Selector Testing Results

## Admin Panel Tests
- [ ] Icon selector displays when clicking 'Select Icon'
- [ ] Search functionality works
- [ ] Category filter works
- [ ] Icon selection updates preview
- [ ] Clear button removes selection
- [ ] Saving page preserves icon selection

## Frontend Tests
- [ ] Icons render as inline SVG
- [ ] Icons inherit color correctly
- [ ] No JavaScript errors in console
- [ ] Icons render server-side (view page source)
- [ ] Missing icons handled gracefully

## Edge Cases
- [ ] Card without icon renders without errors
- [ ] Deleted icon doesn't crash page
- [ ] Empty Icons collection shows helpful message

---
Tested on: $(date)
" > test-results.md
```

**Step 6: Fix any issues found**

If issues are discovered, create additional tasks to fix them before proceeding.

**Step 7: Commit test results**

```bash
git add test-results.md
git commit -m "test(icons): document icon selector testing results

- Admin panel functionality verified
- Frontend rendering verified
- Edge cases tested
- Server-side rendering confirmed

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: Update Documentation

**Goal:** Document the icon selector usage for future reference and other developers.

**Files:**
- Modify: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/CLAUDE.md`
- Create: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/docs/ICON_SELECTOR.md`

**Step 1: Create ICON_SELECTOR.md documentation**

File: `/Users/ianhancock/My Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration/docs/ICON_SELECTOR.md`

```markdown
# Icon Selector Field

Visual icon selection component for Payload CMS that integrates with the Icons collection.

## Overview

The Icon Selector provides a searchable, filterable grid interface for selecting icons from the Icons collection. Selected icons are stored as relationships and rendered server-side as inline SVG.

## Usage in Block Configurations

```typescript
import { iconSelectorField } from '@/fields/IconSelector'

// In your block config
{
  name: 'cards',
  type: 'array',
  fields: [
    iconSelectorField({
      name: 'icon',
      required: false,
      admin: {
        description: 'Select an icon to display',
      },
    }),
    // ... other fields
  ],
}
```

## Features

- **Visual Selection**: Grid of icon previews with SVG rendering
- **Search**: Real-time search across icon name, label, keywords, and description
- **Category Filter**: Filter icons by category (navigation, action, social, etc.)
- **Preview**: Large preview of selected icon with metadata
- **Server-Side Rendering**: Icons rendered as inline SVG with zero client JavaScript

## Rendering Icons in Components

### Using FeaturedIcon Component

```typescript
const iconData = typeof card.icon === 'object' ? card.icon : null

<FeaturedIcon
  svgCode={iconData?.svgCode}
  color="primary"
  shape="rounded-square"
  size="lg"
/>
```

### Using IconSVG Component Directly

```typescript
import { IconSVG } from '@/components/IconSVG'

const iconData = typeof card.icon === 'object' ? card.icon : null

{iconData?.svgCode && (
  <IconSVG
    svgCode={iconData.svgCode}
    className="h-8 w-8 text-blue-500"
    aria-label={iconData.label || iconData.name}
  />
)}
```

## Data Structure

When queried with `depth: 1`, the icon field returns:

```typescript
{
  id: string
  name: string
  label: string
  svgCode: string  // Optimized SVG with currentColor
  category: string
  description?: string
  keywords?: Array<{ keyword: string }>
}
```

## Requirements

- Icons must be uploaded to the Icons collection first
- SVG code is automatically optimized by the processSVGHook
- Icons use `currentColor` for color inheritance

## Implementation Blocks

Currently integrated in:
- CardGridBlock (`/src/blocks/CardGridBlock/`)
- FeaturesBlock (`/src/blocks/FeaturesBlock/`)

## Related Files

- Field Component: `/src/fields/IconSelector/Field.tsx`
- Grid Component: `/src/fields/IconSelector/Component.tsx`
- SVG Renderer: `/src/components/IconSVG.tsx`
- Icons Collection: `/src/collections/Icons.ts`
```

**Step 2: Update CLAUDE.md**

Add to the "Collections Overview" or "Components & Best Practices" section:

```markdown
### Icon Selector Field

**Location**: `/src/fields/IconSelector/`

Visual icon picker that integrates with the Icons collection. Use `iconSelectorField()` helper in block configurations.

**Features**:
- Search and filter icons
- Visual grid preview
- Server-side SVG rendering
- Zero client JavaScript

**See**: [ICON_SELECTOR.md](/docs/ICON_SELECTOR.md) for usage guide
```

**Step 3: Test documentation rendering**

If using a docs site or markdown viewer, verify the documentation renders correctly.

**Step 4: Commit documentation**

```bash
git add docs/ICON_SELECTOR.md CLAUDE.md
git commit -m "docs(icons): add icon selector documentation

- Create ICON_SELECTOR.md usage guide
- Update CLAUDE.md with icon selector reference
- Document usage patterns and examples
- Document data structure and requirements

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: Final Verification and Cleanup

**Goal:** Verify all changes work together, clean up any unused code, and prepare for merge.

**Files:**
- Review: All modified files
- Clean: Unused imports and code

**Step 1: Run full build**

```bash
cd /Users/ianhancock/My\ Repos/tds-website-200925/tds-website-200925/.worktrees/icon-collection-integration
rm -rf .next
pnpm build
```

Expected: Build succeeds with no errors

**Step 2: Run linter**

```bash
pnpm lint
```

Expected: No linting errors (or fix any that appear)

**Step 3: Generate final types**

```bash
pnpm generate:types
```

Expected: Types generate successfully

**Step 4: Check for unused imports**

Search for any remaining `getIcon` imports that should be removed:

```bash
grep -r "getIcon" src/blocks/
```

Expected: No results (all removed)

**Step 5: Review git status**

```bash
git status
```

Expected: No uncommitted changes (all changes committed in previous tasks)

**Step 6: Create final summary commit** (if any cleanup was needed)

```bash
git add .
git commit -m "chore(icons): final cleanup and verification

- Remove unused getIcon imports
- Fix linting issues
- Regenerate types
- Verify build succeeds

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Step 7: Push branch (optional)**

```bash
git push -u origin feature/icon-collection-integration
```

---

## Completion Checklist

- [ ] Icon Selector field component created
- [ ] Icon grid with search and filters implemented
- [ ] CardGridBlock config updated to use icon selector
- [ ] FeaturesBlock config updated to use icon selector
- [ ] IconSVG renderer component created
- [ ] FeaturedIcon updated to support svgCode prop
- [ ] CardGridBlock rendering updated for SVG
- [ ] FeaturesBlock rendering updated for SVG
- [ ] Manual testing completed successfully
- [ ] Documentation created and updated
- [ ] Final build verification passed
- [ ] All changes committed with descriptive messages

## Success Criteria

1. Admin panel displays visual icon selector with search/filter
2. Icons render server-side as inline SVG (no client JS)
3. Icons inherit color correctly via currentColor
4. No TypeScript errors
5. Build succeeds
6. Documentation complete

## Rollback Plan

If issues occur:
1. Switch back to main branch: `git checkout preview`
2. Remove worktree: `git worktree remove .worktrees/icon-collection-integration`
3. Delete branch: `git branch -D feature/icon-collection-integration`

## Next Steps After Completion

1. Review changes with stakeholder
2. Test on staging environment
3. Create pull request to preview branch
4. Merge after approval
5. Clean up worktree using `superpowers:finishing-a-development-branch`
