import { useRef, useState, useCallback } from 'react';
import type { RefObject } from 'react';

import useTrackMovement from './core/useTrackMovement';

type UseTrackCoreParams = {
  mode: 'slider' | 'carousel';
  slideCount: number;
};

type UseTrackCoreReturn = {
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  currentIndex: number;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  moveBy: (offset: number) => void; // drag/swipe
};

const useTrackCore = ({ slideCount, mode = 'slider' }: UseTrackCoreParams): UseTrackCoreReturn => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const setSafeIndex = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, slideCount - 1));

      setCurrentIndex(clampedIndex);
    },
    [slideCount],
  );

  const movement = useTrackMovement({
    mode,
    trackRef,
    viewportRef,
    getIndex: () => currentIndex,
    setIndex: setSafeIndex,
    slideCount,
  });

  return {
    viewportRef,
    trackRef,
    currentIndex,
    next: movement.next,
    prev: movement.prev,
    goTo: movement.goTo,
    moveBy: movement.moveBy,
  };
};

export default useTrackCore;
