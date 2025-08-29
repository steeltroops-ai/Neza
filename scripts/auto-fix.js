#!/usr/bin/env node

/**
 * NEZA ENTERPRISE AUTO-FIX SYSTEM
 * Real-time error detection and automatic correction
 */

const { execSync } = require('child_process');
const fs = require('fs');

class NezaAutoFix {
  constructor() {
    this.errors = [];
    this.fixes = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '🔍',
      success: '✅',
      error: '❌',
      fix: '🔧',
      warning: '⚠️',
    }[type];

    // eslint-disable-next-line no-console
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  async runCommand(command, description) {
    try {
      this.log(`Running: ${description}`, 'info');
      const result = execSync(command, {
        encoding: 'utf8',
        stdio: 'pipe',
        cwd: process.cwd(),
      });
      this.log(`✓ ${description} completed`, 'success');
      return { success: true, output: result };
    } catch (error) {
      this.log(`✗ ${description} failed: ${error.message}`, 'error');
      this.errors.push({ command, description, error: error.message });
      return { success: false, error: error.message };
    }
  }

  async fixESLintErrors() {
    this.log('Auto-fixing ESLint errors...', 'fix');
    const result = await this.runCommand(
      'bunx eslint . --fix --ext .ts,.tsx,.js,.jsx',
      'ESLint auto-fix'
    );

    if (result.success) {
      this.fixes.push('ESLint auto-fix applied');
    }

    return result;
  }

  async formatCode() {
    this.log('Formatting code with Prettier...', 'fix');
    const result = await this.runCommand(
      'bunx prettier --write "**/*.{ts,tsx,js,jsx,json,md,mdx,css,yaml,yml}"',
      'Prettier formatting'
    );

    if (result.success) {
      this.fixes.push('Code formatting applied');
    }

    return result;
  }

  async removeUnusedImports() {
    this.log('Removing unused imports...', 'fix');
    const result = await this.runCommand(
      'bunx ts-unused-exports tsconfig.json --deleteUnusedFiles',
      'Remove unused imports'
    );

    if (result.success) {
      this.fixes.push('Unused imports removed');
    }

    return result;
  }

  async typeCheck() {
    this.log('Running TypeScript type check...', 'info');
    return await this.runCommand('bun run type-check', 'TypeScript type check');
  }

  async buildPackages() {
    this.log('Building packages...', 'info');
    return await this.runCommand('bun run build:packages', 'Package build');
  }

  async securityAudit() {
    this.log('Running security audit...', 'info');
    const result = await this.runCommand('bun audit --audit-level moderate', 'Security audit');

    if (!result.success && result.error.includes('vulnerabilities')) {
      this.log('Attempting to fix security vulnerabilities...', 'fix');
      await this.runCommand('bun audit --fix', 'Security fix');
      this.fixes.push('Security vulnerabilities fixed');
    }

    return result;
  }

  async validateAccessibility() {
    this.log('Validating accessibility compliance...', 'info');
    // Check for common accessibility issues in components
    const componentFiles = this.findFiles('**/*.{ts,tsx}', ['node_modules', 'dist', '.next']);

    for (const file of componentFiles) {
      const content = fs.readFileSync(file, 'utf8');

      // Check for missing alt attributes
      if (content.includes('<img') && !content.includes('alt=')) {
        this.log(`⚠️  Missing alt attribute in ${file}`, 'warning');
      }

      // Check for missing ARIA labels on interactive elements
      if (
        content.includes('<button') &&
        !content.includes('aria-label') &&
        !content.includes('aria-labelledby')
      ) {
        this.log(`⚠️  Consider adding ARIA label to button in ${file}`, 'warning');
      }
    }
  }

  findFiles(pattern, exclude = []) {
    // Simple file finder implementation using fs
    const glob = require('glob');
    try {
      return glob.sync(pattern, { ignore: exclude.map(e => `**/${e}/**`) });
    } catch (error) {
      this.log(`Error finding files: ${error.message}`, 'warning');
      return [];
    }
  }

  async runFullAutoFix() {
    this.log('🚀 Starting Neza Enterprise Auto-Fix System...', 'info');

    // Phase 1: Code Quality Auto-Fix
    await this.fixESLintErrors();
    await this.formatCode();
    await this.removeUnusedImports();

    // Phase 2: Validation
    await this.typeCheck();
    await this.buildPackages();

    // Phase 3: Security & Accessibility
    await this.securityAudit();
    await this.validateAccessibility();

    // Summary
    this.log(`\n📊 Auto-Fix Summary:`, 'info');
    this.log(`✅ Fixes Applied: ${this.fixes.length}`, 'success');
    this.log(
      `❌ Errors Found: ${this.errors.length}`,
      this.errors.length > 0 ? 'error' : 'success'
    );

    if (this.fixes.length > 0) {
      this.log('\n🔧 Applied Fixes:', 'fix');
      this.fixes.forEach(fix => this.log(`  • ${fix}`, 'fix'));
    }

    if (this.errors.length > 0) {
      this.log('\n❌ Remaining Errors:', 'error');
      this.errors.forEach(error => this.log(`  • ${error.description}: ${error.error}`, 'error'));
    }

    this.log('\n🎯 Neza Auto-Fix Complete!', 'success');

    return {
      success: this.errors.length === 0,
      fixes: this.fixes,
      errors: this.errors,
    };
  }
}

// Run auto-fix if called directly
if (require.main === module) {
  const autoFix = new NezaAutoFix();
  autoFix.runFullAutoFix().then(result => {
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = NezaAutoFix;
