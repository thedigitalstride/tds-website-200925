#!/usr/bin/env node

/**
 * Custom script to generate Payload types while handling CSS imports
 * 
 * This script runs the Payload type generation with --disable-transpile
 * after pre-compiling the config with tsx, avoiding CSS import issues
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const configPath = './src/payload.config.ts';

try {
  console.log('🔄 Generating Payload types with CSS import handling...\n');
  
  // Use the payload CLI with tsx, but ensure CSS files are handled
  // by setting NODE_OPTIONS to include our loader
  const env = {
    ...process.env,
    NODE_OPTIONS: '--import ./css-import-stub.mjs'
  };
  
  execSync('pnpm exec payload generate:types --disable-transpile', {
    stdio: 'inherit',
    env
  });
  
  console.log('\n✅ Types generated successfully!');
} catch (error) {
  console.error('\n❌ Type generation failed:', error.message);
  process.exit(1);
}

