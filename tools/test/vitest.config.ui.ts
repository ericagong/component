// jsDOM 환경에서 hooks, components 테스트
// RTL renderhooks, render 의존 테스트 코드

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(root, 'src'),
    },
  },
  test: {
    name: 'ui',
    globals: true,
    environment: 'jsdom', // 가상 DOM 환경
    root,
    setupFiles: ['src/test/setup.ts'],
    include: ['src/{components,hooks}/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: path.join(root, 'coverage/ui'),
    },
    passWithNoTests: true, // 초기 CI 안정성 확보
  },
});
