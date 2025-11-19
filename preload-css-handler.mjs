/**
 * CSS Import Handler for Payload Type Generation
 * 
 * Registers hooks to stub CSS/SCSS/SASS imports as empty modules,
 * preventing parse errors during type generation.
 */

import { register } from 'node:module';

const loaderCode = `
export async function load(url, context, nextLoad) {
  // Strip query parameters to check the actual file extension
  const cleanUrl = url.split('?')[0];
  
  if (cleanUrl.endsWith('.css') || cleanUrl.endsWith('.scss') || cleanUrl.endsWith('.sass') || cleanUrl.endsWith('.less')) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default {};'
    };
  }
  
  return nextLoad(url, context);
}
`;

register(`data:text/javascript,${encodeURIComponent(loaderCode)}`, import.meta.url);

console.log('✓ CSS import handler registered');
