#!/usr/bin/env node

/**
 * Motion API Token Management
 *
 * This script manages the Motion API token in package.json:
 * - inject: Replace placeholder with real token from environment
 * - restore: Replace real token with placeholder
 *
 * Usage:
 *   node scripts/manage-motion-token.js inject
 *   node scripts/manage-motion-token.js restore
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJsonPath = join(__dirname, '..', 'package.json')

const PLACEHOLDER = 'MOTION_TOKEN_PLACEHOLDER'
const MOTION_PACKAGE_URL_BASE =
  'https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token='

// Simple .env file parser (avoids dependency on dotenv package)
function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return {}

  const content = readFileSync(filePath, 'utf8')
  const env = {}

  content.split('\n').forEach((line) => {
    line = line.trim()
    if (!line || line.startsWith('#')) return

    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      // Remove quotes if present
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      env[key] = value
    }
  })

  return env
}

// Load environment variables from .env.local and .env
const envLocal = loadEnvFile(join(__dirname, '..', '.env.local'))
const envFile = loadEnvFile(join(__dirname, '..', '.env'))
const env = { ...envFile, ...envLocal, ...process.env }

const command = process.argv[2]

function readPackageJson() {
  try {
    return JSON.parse(readFileSync(packageJsonPath, 'utf8'))
  } catch (error) {
    console.error('❌ Error reading package.json:', error.message)
    process.exit(1)
  }
}

function writePackageJson(packageJson) {
  try {
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
  } catch (error) {
    console.error('❌ Error writing package.json:', error.message)
    process.exit(1)
  }
}

function injectToken() {
  const MOTION_TOKEN = env.MOTION_API_TOKEN

  if (!MOTION_TOKEN) {
    console.error('❌ MOTION_API_TOKEN not found in environment variables')
    console.error('   Please add it to your .env.local file:')
    console.error('   MOTION_API_TOKEN=your-token-here')
    process.exit(1)
  }

  const packageJson = readPackageJson()
  const currentUrl = packageJson.dependencies['motion-plus']

  if (!currentUrl) {
    console.error('❌ motion-plus dependency not found in package.json')
    process.exit(1)
  }

  // Only inject if placeholder is present
  if (currentUrl.includes(PLACEHOLDER)) {
    packageJson.dependencies['motion-plus'] = MOTION_PACKAGE_URL_BASE + MOTION_TOKEN
    writePackageJson(packageJson)
    console.log('✅ Motion API token injected from environment')
  } else if (currentUrl.includes('token=') && !currentUrl.includes(PLACEHOLDER)) {
    // Token already present (maybe from previous inject)
    console.log('ℹ️  Motion API token already present in package.json')
  } else {
    console.error('❌ Unexpected motion-plus URL format:', currentUrl)
    process.exit(1)
  }
}

function restorePlaceholder() {
  const packageJson = readPackageJson()
  const currentUrl = packageJson.dependencies['motion-plus']

  if (!currentUrl) {
    console.error('❌ motion-plus dependency not found in package.json')
    process.exit(1)
  }

  // Only restore if a real token is present (not placeholder)
  if (currentUrl.includes('token=') && !currentUrl.includes(PLACEHOLDER)) {
    packageJson.dependencies['motion-plus'] = MOTION_PACKAGE_URL_BASE + PLACEHOLDER
    writePackageJson(packageJson)
    console.log('✅ Motion API token placeholder restored')
  } else if (currentUrl.includes(PLACEHOLDER)) {
    // Already has placeholder
    console.log('ℹ️  Motion API token placeholder already present')
  } else {
    console.error('❌ Unexpected motion-plus URL format:', currentUrl)
    process.exit(1)
  }
}

// Main execution
switch (command) {
  case 'inject':
    injectToken()
    break
  case 'restore':
    restorePlaceholder()
    break
  default:
    console.error('Usage: node scripts/manage-motion-token.js [inject|restore]')
    process.exit(1)
}
