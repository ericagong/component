// 라이브러리 배포용 설정

import path from 'node:path';

import { defineConfig } from 'tsup';

console.log('🧩 [TSUP CONFIG] loaded ✅');
console.log('cwd:', process.cwd());
console.log('entry check:', path.resolve('src/index.ts'));

export default defineConfig({
  entry: ['src/index.ts'], // 루트 기준
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist', // dist 역시 루트 기준
  target: 'esnext',
  minify: false,
  splitting: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'], // react 중복 번들링 방지
});
