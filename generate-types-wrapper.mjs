#!/usr/bin/env node

/**
 * Wrapper script for Payload type generation that handles CSS imports
 * 
 * This script patches the module loading system to handle .css files
 * before tsx attempts to load them, fixing the "Unknown file extension .css" error
 */

import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

// Register our custom loader BEFORE anything else loads
register('./loader.mjs', pathToFileURL('./'));

// Now dynamically import and run the payload CLI
const { default: payload } = await import('./node_modules/.pnpm/payload@3.61.1_bufferutil@4.0.9_graphql@16.11.0_typescript@5.7.3_utf-8-validate@6.0.5/node_modules/payload/bin.js');

