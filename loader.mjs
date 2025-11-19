/**
 * Custom ESM loader to handle CSS imports during Payload type generation
 * This fixes the "Unknown file extension .css" error when running payload generate:types
 * 
 * Uses Node.js module customization hooks to intercept CSS file imports
 */

export function resolve(specifier, context, nextResolve) {
  // Pass through to default resolver
  return nextResolve(specifier, context);
}

export function load(url, context, nextLoad) {
  // If the file is a CSS file, return an empty module
  if (url.endsWith('.css')) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default {};',
    };
  }

  // For all other files, use the default loader
  return nextLoad(url, context);
}

export function getFormat(url, context, defaultGetFormat) {
  // Handle CSS files
  if (url.endsWith('.css')) {
    return {
      format: 'module',
    };
  }
  
  return defaultGetFormat(url, context, defaultGetFormat);
}
