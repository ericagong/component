import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, '../..');

export default defineConfig({
  test: {
    name: 'unit',
    globals: true,
    environment: 'node',
    root,
    include: ['src/utils/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: path.join(root, 'coverage/unit'),
    },
    passWithNoTests: true, // CI 초기 안정성용
  },
});
