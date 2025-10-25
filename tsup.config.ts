// 라이브러리 배포용 설정
import { defineConfig } from 'tsup';

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
  loader: {
    '.scss': 'empty',
  },
});
