import { useRef, useEffect, useState } from 'react';
import type { RefObject } from 'react';

import type { AnimationStrategy } from '@/utils/animations';

type AnimationPhase = 'idle' | 'mounting' | 'visible' | 'unmounting';

type UseAnimationTransitionOptions = {
  trigger: boolean;
  strategy: AnimationStrategy;
  onUnmount: () => void;
};

type UseAnimationTransitionReturn = {
  targetRef: RefObject<HTMLElement | null>;
  shouldRender: boolean;
};

const useAnimationTransition = ({
  trigger,
  strategy,
  onUnmount,
}: UseAnimationTransitionOptions): UseAnimationTransitionReturn => {
  const targetRef = useRef<HTMLElement>(null);

  const [phase, setPhase] = useState<AnimationPhase>('idle');

  useEffect(() => {
    if (trigger && phase === 'idle') {
      setPhase('mounting');
    } else if (!trigger && phase === 'visible') {
      setPhase('unmounting');
    }
  }, [trigger, phase]);

  useEffect(() => {
    const $target = targetRef.current;

    if (!$target) return;

    const { mount, unmount } = strategy;
    let animation: Animation | null = null;

    if (phase === 'mounting') {
      animation = $target.animate(mount.keyframes, mount.options);

      animation.onfinish = () => setPhase('visible');
    }

    if (phase === 'unmounting') {
      animation = $target.animate(unmount.keyframes, unmount.options);

      animation.onfinish = () => {
        setPhase('idle');
        onUnmount();
      };
    }

    return () => animation?.cancel();
  }, [phase, strategy, onUnmount]);

  const shouldRender = phase !== 'idle';

  return { targetRef, shouldRender };
};

export default useAnimationTransition;
export type { AnimationPhase };
