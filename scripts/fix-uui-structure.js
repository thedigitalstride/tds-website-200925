#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔧 Fixing UntitledUI structure...');

/**
 * Recursively copy directory contents
 */
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Recursively find all files with specific extensions
 */
function findFiles(dir, extensions = ['.tsx', '.ts']) {
  const files = [];

  if (!fs.existsSync(dir)) return files;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findFiles(fullPath, extensions));
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Update imports in a file
 */
function updateImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Update utils imports to utilities
    if (content.includes('@/utils')) {
      content = content.replace(/@\/utils/g, '@/utilities');
      modified = true;
    }

    // Update relative imports that might be broken
    if (content.includes('../../../utils')) {
      content = content.replace(/\.\.\/\.\.\/\.\.\/utils/g, '@/utilities');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`   ✓ Updated imports in ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.warn(`   ⚠ Could not update imports in ${filePath}: ${error.message}`);
  }
}

// Step 1: Fix nested src issue
if (fs.existsSync('./src/src')) {
  console.log('📁 Fixing nested src directory...');

  // Move UUI components if they exist in nested structure
  if (fs.existsSync('./src/src/components/uui')) {
    if (!fs.existsSync('./src/components/uui-temp')) {
      console.log('   Moving UUI components from nested src...');
      fs.renameSync('./src/src/components/uui', './src/components/uui-temp');
    }
  }

  // Remove the nested src directory
  fs.rmSync('./src/src', { recursive: true, force: true });
  console.log('   ✓ Removed nested src directory');

  // Move components back to correct location
  if (fs.existsSync('./src/components/uui-temp')) {
    if (fs.existsSync('./src/components/uui')) {
      // Merge directories
      copyDirSync('./src/components/uui-temp', './src/components/uui');
      fs.rmSync('./src/components/uui-temp', { recursive: true });
    } else {
      fs.renameSync('./src/components/uui-temp', './src/components/uui');
    }
    console.log('   ✓ Restored UUI components to correct location');
  }
}

// Step 2: Flatten UUI component structure
if (fs.existsSync('./src/components/uui')) {
  console.log('📦 Flattening UUI component structure...');

  // Look for nested base structure
  if (fs.existsSync('./src/components/uui/base')) {
    const basePath = './src/components/uui/base';
    const entries = fs.readdirSync(basePath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const categoryPath = path.join(basePath, entry.name);
        const categoryEntries = fs.readdirSync(categoryPath, { withFileTypes: true });

        for (const component of categoryEntries) {
          if (component.name.endsWith('.tsx') || component.name.endsWith('.ts')) {
            const sourcePath = path.join(categoryPath, component.name);
            const destPath = path.join('./src/components/uui', component.name);

            if (!fs.existsSync(destPath)) {
              fs.copyFileSync(sourcePath, destPath);
              console.log(`   ✓ Moved ${component.name} to flat structure`);
            }
          }
        }
      }
    }

    // Remove the base directory after flattening
    fs.rmSync(basePath, { recursive: true, force: true });
    console.log('   ✓ Removed nested base structure');
  }
}

// Step 3: Consolidate utilities
if (fs.existsSync('./src/utils')) {
  console.log('🔧 Consolidating utility folders...');

  const utilsEntries = fs.readdirSync('./src/utils', { withFileTypes: true });

  for (const entry of utilsEntries) {
    if (entry.isFile()) {
      const sourcePath = path.join('./src/utils', entry.name);
      const destPath = path.join('./src/utilities', entry.name);

      if (!fs.existsSync(destPath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`   ✓ Moved ${entry.name} to utilities folder`);
      } else {
        console.log(`   ⚠ ${entry.name} already exists in utilities, skipping`);
      }
    }
  }

  // Remove the utils directory
  fs.rmSync('./src/utils', { recursive: true, force: true });
  console.log('   ✓ Removed duplicate utils folder');
}

// Step 4: Update imports
console.log('🔗 Updating imports...');

// Find all TypeScript/TSX files that might need import updates
const filesToUpdate = [
  ...findFiles('./src/components/uui'),
  ...findFiles('./src/components/payload-ui'),
  ...findFiles('./src/blocks'),
  ...findFiles('./src/app'),
];

filesToUpdate.forEach(updateImports);

// Step 5: Create index files for better organization
if (fs.existsSync('./src/components/uui')) {
  console.log('📝 Creating index files...');

  const uuiComponents = fs.readdirSync('./src/components/uui')
    .filter(file => file.endsWith('.tsx'))
    .map(file => file.replace('.tsx', ''));

  if (uuiComponents.length > 0) {
    const indexContent = uuiComponents
      .map(component => {
        // Convert kebab-case to PascalCase (e.g., 'hint-text' -> 'HintText')
        const componentName = component
          .split('-')
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join('');

        // Check if the component exports a named export rather than default
        try {
          const componentContent = fs.readFileSync(`./src/components/uui/${component}.tsx`, 'utf8');
          if (componentContent.includes(`export const ${componentName}`)) {
            return `export { ${componentName} } from './${component}';`;
          } else {
            return `export { default as ${componentName} } from './${component}';`;
          }
        } catch (error) {
          // Fallback to named export
          return `export { ${componentName} } from './${component}';`;
        }
      })
      .join('\n') + '\n';

    fs.writeFileSync('./src/components/uui/index.ts', indexContent);
    console.log('   ✓ Created UUI components index file');
  }
}

console.log('✅ UntitledUI structure cleanup completed!');
console.log('');
console.log('📋 Summary:');
console.log('   • Fixed nested src directories');
console.log('   • Flattened UUI component structure');
console.log('   • Consolidated utility folders');
console.log('   • Updated import statements');
console.log('   • Created index files');
console.log('');
console.log('🎯 Components are now available at: src/components/uui/[component].tsx');