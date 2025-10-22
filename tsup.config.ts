import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  target: 'esnext',
  minify: false,
  splitting: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'], // react 중복 번들링 방지
});
