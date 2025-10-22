// node 환경에서 utils 테스트

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'node', // 순수 로직
    include: [path.join(root, 'src/utils/**/*.{test,spec}.{ts,tsx}')],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: path.join(root, 'coverage/unit'),
    },
  },
});
