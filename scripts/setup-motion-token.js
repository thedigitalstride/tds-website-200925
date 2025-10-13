#!/usr/bin/env node

/**
 * This script updates package.json with the Motion API token from environment variables
 * Run before install in CI/CD environments
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJsonPath = join(__dirname, '..', 'package.json')

const MOTION_TOKEN = process.env.MOTION_API_TOKEN

if (!MOTION_TOKEN) {
  console.log('⚠️  MOTION_API_TOKEN not found in environment variables')
  console.log('   Skipping Motion token setup')
  process.exit(0)
}

try {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'))

  // Update the motion-plus dependency with the token
  const motionPlusUrl = `https://api.motion.dev/registry?package=motion-plus&version=1.5.4&token=${MOTION_TOKEN}`

  if (packageJson.dependencies['motion-plus']) {
    packageJson.dependencies['motion-plus'] = motionPlusUrl
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n')
    console.log('✅ Motion API token configured successfully')
  }
} catch (error) {
  console.error('❌ Error setting up Motion token:', error.message)
  process.exit(1)
}
