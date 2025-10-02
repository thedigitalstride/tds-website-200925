# UntitledUI Integration Guide

This document outlines how to properly install and manage UntitledUI components in this Payload CMS project.

## Overview

We use a hybrid approach that allows UntitledUI components to serve as reference templates for creating Payload-friendly components. The project structure maintains clean separation between:

- `src/components/ui/` - Existing shadcn/ui components
- `src/components/uui/` - UntitledUI reference components
- `src/components/payload-ui/` - Payload-adapted components using UUI patterns
- `src/utilities/` - Consolidated utility functions

## Installation Process

### ✅ Correct Way to Install UUI Components

Use our custom command that automatically handles cleanup:

```bash
# Install any UntitledUI component
pnpm uui:add button
pnpm uui:add input
pnpm uui:add card
pnpm uui:add modal
```

This command:
1. Runs `npx untitledui@latest add [component] --path src/components/uui`
2. Automatically runs our cleanup script
3. Results in clean, flat structure at `src/components/uui/[component].tsx`

### 🔧 Manual Cleanup (if needed)

If something goes wrong or you install manually:

```bash
pnpm fix:uui
```

This script:
- Removes any nested `src/src` directories
- Flattens UUI component structure
- Consolidates utility folders
- Updates import statements
- Creates index files

### ❌ What NOT to Do

- **Don't** use the CLI directly without the `--path` flag
- **Don't** enter any path other than `src/components/uui` when prompted
- **Don't** manually edit the utilities folder
- **Don't** create nested directory structures

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (existing)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── uui/             # UntitledUI reference components
│   │   ├── button.tsx   # UUI button patterns
│   │   ├── input.tsx    # UUI input patterns
│   │   ├── index.ts     # Auto-generated exports
│   │   └── ...
│   └── payload-ui/      # Payload-adapted components
│       ├── UUIButton.tsx
│       ├── UUICard.tsx
│       └── ...
└── utilities/           # Consolidated utilities
    ├── ui.ts           # Existing utilities (cn, etc.)
    ├── cx.ts           # UUI class utilities
    ├── is-react-component.ts
    └── ...
```

## Using UntitledUI Components

### 1. As Reference Templates

UUI components in `src/components/uui/` are **reference implementations**:

```tsx
// Don't import UUI components directly in Payload blocks
// import { Button } from '@/components/uui'  ❌

// Instead, use them as reference to create Payload-friendly versions
```

### 2. Creating Payload-Adapted Components

Create adapted versions in `src/components/payload-ui/`:

```tsx
// src/components/payload-ui/UUIButton.tsx
import { Button as UUIButton } from '@/components/uui'
import type { ButtonProps } from '@/components/uui/button'

interface PayloadButtonProps extends Omit<ButtonProps, 'children'> {
  label?: string
  href?: string
  // Add Payload-specific props
}

export const UUIButton: React.FC<PayloadButtonProps> = ({
  label,
  href,
  ...props
}) => {
  if (href) {
    return (
      <UUIButton asChild {...props}>
        <a href={href}>{label}</a>
      </UUIButton>
    )
  }

  return <UUIButton {...props}>{label}</UUIButton>
}
```

### 3. In Payload Blocks

Use the adapted components in your Payload blocks:

```tsx
// src/blocks/CallToAction/Component.tsx
import { UUIButton } from '@/components/payload-ui/UUIButton'
import { UUICard } from '@/components/payload-ui/UUICard'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ data }) => {
  return (
    <UUICard className="container">
      <div className="flex justify-between items-center">
        <div>{/* Content */}</div>
        <UUIButton
          variant="primary"
          href={data.link.url}
          label={data.link.label}
        />
      </div>
    </UUICard>
  )
}
```

## Theme Integration

UntitledUI theme is integrated with your existing Tailwind v4 setup:

- UUI theme variables are in `src/styles/uui-theme.css`
- Imported in `src/app/(frontend)/globals.css`
- Compatible with existing Payload theme system
- Supports dark/light mode switching

## Troubleshooting

### Problem: Nested `src/src` directory appears
**Solution:** Run `pnpm fix:uui`

### Problem: Components installed in wrong location
**Solution:** Always use `pnpm uui:add [component]` instead of direct CLI

### Problem: Import errors after installation
**Solution:** The fix script automatically updates imports, but if issues persist:
```bash
pnpm fix:uui
```

### Problem: UUI components break Payload admin
**Solution:** UUI styles are scoped to frontend only. Admin uses separate styles.

## Available Scripts

| Script | Purpose |
|--------|---------|
| `pnpm uui:add [component]` | Install UUI component with automatic cleanup |
| `pnpm fix:uui` | Run structure cleanup manually |
| `pnpm build` | Verify everything builds correctly |
| `pnpm lint` | Check for any import/syntax issues |

## Best Practices

1. **Always use the provided scripts** for installing UUI components
2. **Use UUI as reference only** - create Payload-adapted versions
3. **Test after each installation** to ensure build succeeds
4. **Keep UUI and Payload styles separate** to avoid conflicts
5. **Document new adapted components** for team consistency

## Migration Strategy

For existing components that need UUI styling:

1. Install the UUI reference component: `pnpm uui:add [component]`
2. Study the UUI implementation patterns
3. Create a Payload-adapted version in `payload-ui/`
4. Update your blocks to use the adapted component
5. Test thoroughly in both development and build

## Support

If you encounter issues:

1. Check this documentation first
2. Run `pnpm fix:uui` to resolve structure issues
3. Verify the build with `pnpm build`
4. Check the scripts in `scripts/fix-uui-structure.js` for debugging

---

**Remember:** UntitledUI components are templates and references. Always create Payload-friendly adaptations for actual use in blocks and pages.