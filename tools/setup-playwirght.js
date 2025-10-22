import { execSync } from 'node:child_process';

try {
  console.log('Installing Playwright Chromium (if needed)...');
  execSync('pnpm exec playwright install chromium --with-deps=false', { stdio: 'inherit' });
  console.log('✅ Playwright Chromium installed successfully.');
} catch (error) {
  console.log('⚠️  Skipping installation — Chromium is probably already installed.');
}
