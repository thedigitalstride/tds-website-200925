/**
 * CSS Import Stub for Node.js ESM Loader
 * 
 * This module provides a custom import hook to handle .css file imports
 * during Payload type generation, preventing "Unknown file extension .css" errors.
 * 
 * To use: node --import ./css-import-stub.mjs your-script.js
 */

import { register } from 'node:module';

register('data:text/javascript,' + encodeURIComponent(`
  export async function load(url, context, nextLoad) {
    if (url.endsWith('.css') || url.endsWith('.scss') || url.endsWith('.sass')) {
      return {
        format: 'module',
        shortCircuit: true,
        source: 'export default {};'
      };
    }
    return nextLoad(url, context);
  }
`), import.meta.url);

