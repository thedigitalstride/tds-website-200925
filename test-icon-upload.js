/**
 * Test script for Icon upload and AI enhancement
 * Run with: node test-icon-upload.js
 */

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test SVG icon (a simple home icon)
const testSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H9M19 10L21 12M19 10V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H15M9 22C9.53043 22 10.0391 21.7893 10.4142 21.4142C10.7893 21.0391 11 20.5304 11 20V16C11 15.4696 11.2107 14.9609 11.5858 14.5858C11.9609 14.2107 12.4696 14 13 14H11C11.5304 14 12.0391 14.2107 12.4142 14.5858C12.7893 14.9609 13 15.4696 13 16V20C13 20.5304 13.2107 21.0391 13.5858 21.4142C13.9609 21.7893 14.4696 22 15 22M9 22H15" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

async function testIconUpload() {
  const apiUrl = 'http://localhost:3000/api';

  console.log('🏠 Testing Icon Upload and AI Enhancement\n');
  console.log('===================================\n');

  // First, let's check if the dev server is running
  try {
    const healthCheck = await fetch('http://localhost:3000');
    if (!healthCheck.ok) {
      console.error('❌ Dev server is not responding. Make sure it\'s running on port 3000.');
      process.exit(1);
    }
    console.log('✅ Dev server is running\n');
  } catch (error) {
    console.error('❌ Cannot connect to dev server. Make sure it\'s running with `pnpm dev`');
    process.exit(1);
  }

  // Test 1: Check if AI Settings are configured
  console.log('1️⃣ Checking AI Settings...');
  try {
    // Note: This would require authentication to actually check
    console.log('   ℹ️  Please ensure AI Settings are configured in the admin panel:');
    console.log('   - Go to /admin/globals/aiSettings');
    console.log('   - Enable "Icon Enhancement"');
    console.log('   - Set API Key and Model\n');
  } catch (error) {
    console.error('   ❌ Error checking AI settings:', error.message);
  }

  // Test 2: Save test SVG to file
  console.log('2️⃣ Creating test SVG file...');
  const testFilePath = join(__dirname, 'test-home-icon.svg');
  writeFileSync(testFilePath, testSVG);
  console.log(`   ✅ Test SVG saved to: ${testFilePath}\n`);

  // Test 3: Instructions for manual upload
  console.log('3️⃣ Manual Upload Test:');
  console.log('   1. Go to http://localhost:3000/admin/collections/icons');
  console.log('   2. Click "Create new Icon"');
  console.log('   3. Enter name: "test-home"');
  console.log('   4. Enter label: "Test Home Icon"');
  console.log('   5. Paste the SVG code from test-home-icon.svg');
  console.log('   6. Save the icon\n');

  console.log('4️⃣ Expected Results:');
  console.log('   - SVG should be optimized (colors converted to currentColor)');
  console.log('   - AI should automatically generate keywords and description');
  console.log('   - Check AI Logs at /admin/collections/ai-logs for the operation\n');

  console.log('5️⃣ Testing "Generate with AI" buttons:');
  console.log('   1. Open an existing icon');
  console.log('   2. Click "Generate with AI" next to Keywords field');
  console.log('   3. Click "Generate with AI" next to Description field');
  console.log('   4. Both should generate content and show success toasts\n');

  // Test 4: Test the icon retrieval API
  console.log('6️⃣ Testing Icon API (after upload):');
  console.log('   Once uploaded, test the API:');
  console.log('   curl http://localhost:3000/api/icon-svg/test-home\n');

  console.log('===================================');
  console.log('📋 Checklist:');
  console.log('☐ AI Settings configured with API key');
  console.log('☐ Icon uploads successfully');
  console.log('☐ SVG is optimized (currentColor)');
  console.log('☐ AI generates keywords automatically on upload');
  console.log('☐ "Generate with AI" buttons work');
  console.log('☐ AI operations appear in AI Logs');
  console.log('☐ Icon API endpoint returns SVG');
}

testIconUpload();