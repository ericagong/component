type AnimationKeyframes = Keyframe[];

type AnimationOptions = KeyframeAnimationOptions;

type AnimationStrategy = {
  mount: {
    keyframes: AnimationKeyframes;
    options?: AnimationOptions;
  };
  unmount: {
    keyframes: AnimationKeyframes;
    options?: AnimationOptions;
  };
};

// 기본 슬라이드 + 페이드 전략
const slideFade: AnimationStrategy = {
  mount: {
    keyframes: [
      { transform: 'translateY(50px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ],
    options: {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards',
    },
  },
  unmount: {
    keyframes: [
      { transform: 'translateY(0)', opacity: 1 },
      { transform: 'translateY(50px)', opacity: 0 },
    ],
    options: {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards',
    },
  },
};

export { slideFade };
export type { AnimationStrategy };
