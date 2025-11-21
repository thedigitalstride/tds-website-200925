import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'off', // Disabled - too many false positives with Payload/OAuth
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      // Disable overly strict React 19 rules for valid patterns
      // These effects are intentionally syncing with external systems (DOM, window, Lenis)
      'react-hooks/set-state-in-effect': 'off',
      // Allow modifying router for live preview functionality
      'react-hooks/immutability': 'off',
      // Allow component definitions for conditional rendering patterns
      'react-hooks/static-components': 'off',
      // Allow refs from Motion library to be passed to components
      'react-hooks/refs': 'off',
      // Allow manual memoization until React Compiler is stable
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
  {
    ignores: ['.next/', 'src/app/(frontend)/style-guide/'],
  },
]

export default eslintConfig
