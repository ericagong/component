import { useRef, useState, useCallback, useLayoutEffect } from 'react';
import type { RefObject } from 'react';

type UseTrackCoreParams = {
  slideCount: number;
};

type UseTrackCoreReturn = {
  trackRef: RefObject<HTMLDivElement | null>;
  currentIndex: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

const useTrackCore = ({ slideCount }: UseTrackCoreParams): UseTrackCoreReturn => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, slideCount - 1));
      setCurrentIndex(clamped);
    },
    [slideCount],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useLayoutEffect(() => {
    const $track = trackRef.current;

    if (!$track) return;

    $track.style.transition = 'transform 0.3s ease';
    $track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }, [currentIndex]);

  return {
    trackRef,
    currentIndex,
    goTo,
    next,
    prev,
  };
};

export default useTrackCore;
