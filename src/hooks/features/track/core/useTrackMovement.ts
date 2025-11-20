import type { RefObject } from 'react';
import { useMemo } from 'react';

type TrackMovementStrategy = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  moveBy: (offset: number) => void;
};

type CreateTranslateXMovementParams = {
  trackRef: RefObject<HTMLDivElement | null>;
  getIndex: () => number;
  setIndex: (i: number) => void;
  slideCount: number;
};

type UseTrackMovementParams = {
  mode: 'slider' | 'carousel';
  trackRef: RefObject<HTMLDivElement | null>;
  getIndex: () => number;
  setIndex: (index: number) => void;
  slideCount: number;
};

const createTranslateXMovement = ({
  trackRef,
  getIndex,
  setIndex,
  slideCount,
}: CreateTranslateXMovementParams): TrackMovementStrategy => {
  const syncTrackPosition = (index: number) => {
    const $track = trackRef.current;

    if (!$track) return;

    $track.style.transition = 'transform 0.3s ease-out';
    $track.style.transform = `translateX(-${index * 100}%)`;
  };

  return {
    next: () => {
      const nextIndex = Math.min(getIndex() + 1, slideCount - 1);
      setIndex(nextIndex);
      syncTrackPosition(nextIndex);
    },
    prev: () => {
      const prevIndex = Math.max(getIndex() - 1, 0);
      setIndex(prevIndex);
      syncTrackPosition(prevIndex);
    },
    goTo: (index: number) => {
      setIndex(index);
      syncTrackPosition(index);
    },
    moveBy: (offset: number) => {
      const $track = trackRef.current;

      if (!$track) return;

      $track.style.transition = 'none';
      $track.style.transform = `translateX(${offset}px)`;
    },
  };
};

const useTrackMovement = ({ mode, trackRef, getIndex, setIndex, slideCount }: UseTrackMovementParams) => useMemo(() => {
    switch (mode) {
      case 'slider':
        return createTranslateXMovement({
          trackRef,
          getIndex,
          setIndex,
          slideCount,
        });
      default:
        throw new Error(`Unknown movement mode: ${mode}`);
    }
  }, [mode, trackRef, getIndex, setIndex, slideCount]);

export default useTrackMovement;
