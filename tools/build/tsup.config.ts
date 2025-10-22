// 라이브러리 배포용 설정

import path from 'node:path';

import { defineConfig } from 'tsup';

const root = path.resolve(__dirname, '../..');

export default defineConfig({
  entry: [path.join(root, 'src/index.ts')],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: path.join(root, 'dist'),
  target: 'esnext',
  minify: false,
  splitting: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'], // react 중복 번들링 방지
});
