#!/usr/bin/env node

/**
 * Preflight Check for Preview Builds
 *
 * This script verifies that the project is ready for a preview deployment.
 * It checks for common issues that cause preview builds to fail.
 *
 * Run this before creating a migration and pushing to a preview branch.
 */

import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

const symbols = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ',
};

let hasErrors = false;
let hasWarnings = false;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`${symbols.success} ${message}`, 'green');
}

function logError(message) {
  log(`${symbols.error} ${message}`, 'red');
  hasErrors = true;
}

function logWarning(message) {
  log(`${symbols.warning} ${message}`, 'yellow');
  hasWarnings = true;
}

function logInfo(message) {
  log(`${symbols.info} ${message}`, 'cyan');
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, 'blue');
  log(`${title}`, 'bold');
  log(`${'='.repeat(60)}`, 'blue');
}

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'pipe',
      shell: true,
    });

    let stdout = '';
    let stderr = '';

    proc.stdout?.on('data', (data) => {
      stdout += data.toString();
    });

    proc.stderr?.on('data', (data) => {
      stderr += data.toString();
    });

    proc.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    proc.on('error', (error) => {
      reject(error);
    });
  });
}

async function checkEnvironmentVariables() {
  logSection('1. Environment Variables');

  const requiredVars = [
    'POSTGRES_URL',
    'PAYLOAD_SECRET',
    'NEXT_PUBLIC_SERVER_URL',
  ];

  const optionalVars = [
    'BLOB_READ_WRITE_TOKEN',
    'CRON_SECRET',
    'PREVIEW_SECRET',
  ];

  // Check .env.local
  const envPath = resolve(process.cwd(), '.env.local');
  if (!existsSync(envPath)) {
    logWarning('.env.local file not found');
    logInfo('Preview deployments use Vercel environment variables');
    return;
  }

  const envContent = readFileSync(envPath, 'utf-8');

  for (const varName of requiredVars) {
    if (envContent.includes(`${varName}=`)) {
      logSuccess(`${varName} is defined locally`);
    } else {
      logWarning(`${varName} is not defined locally (OK if using Vercel)`);
    }
  }

  logInfo('Ensure these are set in Vercel project settings for preview deployments');
}

async function checkGitStatus() {
  logSection('2. Git Status');

  try {
    const { code, stdout } = await runCommand('git', ['status', '--porcelain']);

    if (code !== 0) {
      logError('Failed to get git status');
      return;
    }

    const uncommittedFiles = stdout.trim().split('\n').filter(Boolean);

    if (uncommittedFiles.length === 0) {
      logSuccess('Working directory is clean');
    } else {
      logWarning(`${uncommittedFiles.length} uncommitted file(s):`);
      uncommittedFiles.slice(0, 5).forEach(file => {
        logInfo(`  ${file}`);
      });
      if (uncommittedFiles.length > 5) {
        logInfo(`  ... and ${uncommittedFiles.length - 5} more`);
      }
      logInfo('Commit changes before pushing to preview');
    }

    // Check for migration files
    const migrationFiles = uncommittedFiles.filter(f => f.includes('src/migrations/'));
    if (migrationFiles.length > 0) {
      logWarning('Uncommitted migration files detected:');
      migrationFiles.forEach(file => {
        logInfo(`  ${file}`);
      });
      logInfo('Ensure migrations are committed before pushing');
    }
  } catch (error) {
    logError(`Git check failed: ${error.message}`);
  }
}

async function checkMigrations() {
  logSection('3. Database Migrations');

  const migrationsDir = resolve(process.cwd(), 'src/migrations');

  if (!existsSync(migrationsDir)) {
    logWarning('No migrations directory found');
    logInfo('If you made schema changes, create a migration: pnpm payload migrate:create');
    return;
  }

  try {
    const { readdirSync } = await import('fs');
    const files = readdirSync(migrationsDir);
    const migrationFiles = files.filter(f => f.endsWith('.ts') && !f.includes('index'));

    if (migrationFiles.length === 0) {
      logWarning('No migration files found');
      logInfo('If you made schema changes, create a migration: pnpm payload migrate:create');
    } else {
      logSuccess(`Found ${migrationFiles.length} migration file(s)`);

      // Show most recent migrations
      const recent = migrationFiles.slice(-3);
      logInfo('Most recent migrations:');
      recent.forEach(file => {
        logInfo(`  - ${file}`);
      });
    }
  } catch (error) {
    logError(`Failed to read migrations directory: ${error.message}`);
  }
}

async function checkTypeScript() {
  logSection('4. TypeScript & Types');

  // Check if payload-types.ts exists
  const typesPath = resolve(process.cwd(), 'src/payload-types.ts');
  if (!existsSync(typesPath)) {
    logError('src/payload-types.ts not found');
    logInfo('Run: pnpm generate:types');
    return;
  }

  logSuccess('Payload types file exists');

  // Run TypeScript type check
  logInfo('Running TypeScript type check...');
  try {
    const { code, stdout, stderr } = await runCommand('npx', ['tsc', '--noEmit']);

    if (code === 0) {
      logSuccess('TypeScript type check passed');
    } else {
      logError('TypeScript type check failed');
      // Show first few errors from both stdout and stderr
      const output = (stdout + stderr).trim();
      if (output) {
        const errors = output.split('\n').filter(Boolean).slice(0, 10);
        errors.forEach(error => {
          logInfo(`  ${error}`);
        });
        if (output.split('\n').length > 10) {
          logInfo(`  ... and more errors (run 'npx tsc --noEmit' for full output)`);
        }
      }
    }
  } catch (error) {
    logError(`TypeScript check failed: ${error.message}`);
  }
}

async function checkLinting() {
  logSection('5. Linting');

  logInfo('Running ESLint...');
  try {
    const { code, stdout, stderr } = await runCommand('pnpm', ['lint']);

    if (code === 0) {
      logSuccess('Linting passed');
    } else {
      logWarning('Linting issues found');
      const output = stdout || stderr;
      const lines = output.split('\n').filter(Boolean).slice(0, 15);
      lines.forEach(line => {
        logInfo(`  ${line}`);
      });
      if (output.split('\n').length > 15) {
        logInfo(`  ... run 'pnpm lint' for full output`);
      }
      logInfo('Consider running: pnpm lint:fix');
    }
  } catch (error) {
    logWarning(`Linting check failed: ${error.message}`);
  }
}

async function checkDependencies() {
  logSection('6. Dependencies');

  const packageJsonPath = resolve(process.cwd(), 'package.json');
  const lockfilePath = resolve(process.cwd(), 'pnpm-lock.yaml');

  if (!existsSync(packageJsonPath)) {
    logError('package.json not found');
    return;
  }

  if (!existsSync(lockfilePath)) {
    logWarning('pnpm-lock.yaml not found');
    logInfo('Run: pnpm install');
    return;
  }

  logSuccess('package.json and pnpm-lock.yaml exist');

  // Check for node_modules
  const nodeModulesPath = resolve(process.cwd(), 'node_modules');
  if (!existsSync(nodeModulesPath)) {
    logError('node_modules not found');
    logInfo('Run: pnpm install');
    return;
  }

  logSuccess('node_modules directory exists');
}

async function checkBuildCache() {
  logSection('7. Build Cache');

  const nextCachePath = resolve(process.cwd(), '.next');

  if (existsSync(nextCachePath)) {
    logInfo('Next.js cache exists (will be rebuilt on deploy)');
    logInfo('To test clean build locally: rm -rf .next && pnpm build');
  } else {
    logSuccess('No stale Next.js cache');
  }
}

async function checkCriticalFiles() {
  logSection('8. Critical Files');

  const criticalFiles = [
    'src/payload.config.ts',
    'next.config.js',
    'tsconfig.json',
    '.env.local',
  ];

  for (const file of criticalFiles) {
    const filePath = resolve(process.cwd(), file);
    if (existsSync(filePath)) {
      logSuccess(`${file} exists`);
    } else {
      if (file === '.env.local') {
        logWarning(`${file} not found (OK if using Vercel environment variables)`);
      } else {
        logError(`${file} not found`);
      }
    }
  }
}

async function printSummary() {
  logSection('Summary');

  if (hasErrors) {
    log(`\n${symbols.error} Preflight check FAILED with errors`, 'red');
    log('Fix the errors above before pushing to preview', 'red');
    process.exit(1);
  } else if (hasWarnings) {
    log(`\n${symbols.warning} Preflight check PASSED with warnings`, 'yellow');
    log('Review warnings above before pushing to preview', 'yellow');

    log('\nRecommended next steps:', 'cyan');
    log('1. Fix any warnings (optional)', 'cyan');
    log('2. If schema changed: pnpm payload migrate:create', 'cyan');
    log('3. Commit changes: git add . && git commit -m "..."', 'cyan');
    log('4. Push to preview: git push origin <branch-name>', 'cyan');
    process.exit(0);
  } else {
    log(`\n${symbols.success} Preflight check PASSED`, 'green');
    log('Your project is ready for preview deployment!', 'green');

    log('\nNext steps:', 'cyan');
    log('1. If schema changed: pnpm payload migrate:create', 'cyan');
    log('2. Commit changes: git add . && git commit -m "..."', 'cyan');
    log('3. Push to preview: git push origin <branch-name>', 'cyan');
    process.exit(0);
  }
}

async function main() {
  log(`\n${'='.repeat(60)}`, 'magenta');
  log('PREFLIGHT CHECK FOR PREVIEW BUILD', 'bold');
  log(`${'='.repeat(60)}`, 'magenta');
  log('Checking if project is ready for preview deployment...\n', 'cyan');

  await checkEnvironmentVariables();
  await checkGitStatus();
  await checkMigrations();
  await checkDependencies();
  await checkCriticalFiles();
  await checkTypeScript();
  await checkLinting();
  await checkBuildCache();

  await printSummary();
}

main().catch((error) => {
  logError(`Preflight check failed: ${error.message}`);
  process.exit(1);
});
