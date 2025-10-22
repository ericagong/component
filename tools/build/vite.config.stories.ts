// storybook 설정
// stories 테스트

/// <reference types="vitest/config" />

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // storybook .stories.tsx 파일을 테스트 포함
          storybookTest({
            configDir: path.resolve(root, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          // 브라우저 기반(Playwright)에서 story 렌더링 검증
          browser: {
            enabled: true,
            headless: true, // 검증 과정 보고 싶으면 false로 설정
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: [path.resolve(root, '.storybook/vitest.setup.ts')],
        },
      },
    ],
  },
});
