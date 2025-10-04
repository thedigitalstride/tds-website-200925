#!/usr/bin/env node

/**
 * Migration Safety Check Script
 *
 * This script prevents accidental migration commands in development.
 * It checks if a migration-related command is being run and prompts
 * for confirmation in development environments.
 */

import { execSync } from 'child_process';
import readline from 'readline';

// Get the command arguments
const args = process.argv.slice(2);
const command = args[0];

// List of migration commands that should trigger a warning
const migrationCommands = [
  'migrate',
  'migrate:create',
  'migrate:down',
  'migrate:status',
  'migrate:refresh',
  'migrate:reset',
  'migrate:fresh'
];

// Check if this is a migration command
const isMigrationCommand = migrationCommands.some(cmd =>
  command === cmd || (command && command.startsWith('migrate'))
);

// Check if we're in production/CI environment
const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI === 'true' || process.env.VERCEL === '1';
const isVercelBuild = process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview';

// If not a migration command, or if in production/CI, proceed normally
if (!isMigrationCommand || isProduction || isCI || isVercelBuild) {
  // Execute the original payload command
  try {
    execSync(`cross-env NODE_OPTIONS=--no-deprecation payload ${args.join(' ')}`, {
      stdio: 'inherit',
      env: process.env
    });
    process.exit(0);
  } catch (error) {
    process.exit(error.status || 1);
  }
}

// If it's a migration command in development, show warning
console.log('\n⚠️  ⚠️  ⚠️  MIGRATION COMMAND DETECTED ⚠️  ⚠️  ⚠️\n');
console.log('You are about to run:', `payload ${args.join(' ')}`);
console.log('\n🚨 CRITICAL WARNING:');
console.log('├─ Migration commands should ONLY be used when preparing for production deployment');
console.log('├─ Running migrations in development can corrupt your local database');
console.log('└─ In development, Payload automatically syncs schema changes (no migrations needed)\n');

if (command === 'migrate:create') {
  console.log('✅ This command is SAFE if you are:');
  console.log('   - Preparing to deploy to production/preview');
  console.log('   - Creating a migration to capture your schema changes\n');
  console.log('❌ This command is DANGEROUS if you are:');
  console.log('   - Trying to fix local development issues');
  console.log('   - Attempting to sync your local database\n');
} else if (command === 'migrate') {
  console.log('❌ WARNING: This command should NEVER be run locally!');
  console.log('   - It\'s only for production deployments');
  console.log('   - Vercel runs this automatically during deployment\n');
} else {
  console.log('❌ This migration command is rarely needed in development\n');
}

console.log('💡 INSTEAD, YOU SHOULD:');
console.log('   1. Run "pnpm dev" to auto-sync schema changes');
console.log('   2. Wait for Payload to sync automatically');
console.log('   3. Your database will be updated without migrations\n');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask for confirmation
rl.question('Do you really want to proceed? (yes/no): ', (answer) => {
  rl.close();

  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
    console.log('\n⚡ Proceeding with migration command...\n');

    try {
      execSync(`cross-env NODE_OPTIONS=--no-deprecation payload ${args.join(' ')}`, {
        stdio: 'inherit',
        env: process.env
      });
      process.exit(0);
    } catch (error) {
      process.exit(error.status || 1);
    }
  } else {
    console.log('\n✅ Migration command cancelled. Good choice!');
    console.log('💡 Run "pnpm dev" instead to auto-sync your schema changes.\n');
    process.exit(0);
  }
});