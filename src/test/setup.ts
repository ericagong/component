// App 연관 단위(Unit / Component) 테스트
// vitest 전역 초기화(vitest.config.ts에서 setupFiles로 불러옴)

import '@testing-library/jest-dom';

// ResizeObserver mock
if (!global.ResizeObserver) {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
}

// Element.animate mock
if (typeof Element !== 'undefined' && !Element.prototype.animate) {
  Element.prototype.animate = function () {
    return {
      onfinish: null,
      cancel: () => {},
      finish() {
        if (this.onfinish) this.onfinish();
      },
      play: () => {},
      pause: () => {},
      reverse: () => {},
      updatePlaybackRate: () => {},
    } as any;
  };
}
