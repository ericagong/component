// 앱 단위 내부 로직 테스트 환경
// RTL, JSDOM 중심의 단위 / 컴포넌트 테스트 설정

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // 가상 브라우저 환경
    setupFiles: './src/test/setup.ts', // RTL 초기화
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      // 테스트 결과 리포트 설정
      reporter: ['text', 'html'],
    },
  },
});
