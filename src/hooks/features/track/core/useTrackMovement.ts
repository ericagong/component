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
  setIndex: (index: number) => void;
  slideCount: number;
};

type CreateScrollLeftMovementParams = {
  viewportRef: RefObject<HTMLDivElement | null>;
  getIndex: () => number;
  setIndex: (index: number) => void;
  slideCount: number;
};

type UseTrackMovementParams = {
  mode: 'slider' | 'carousel';
  viewportRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  getIndex: () => number;
  setIndex: (index: number) => void;
  slideCount: number;
};

/* ------------------------------
 * ① Slider: translateX movement
 * ------------------------------ */
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

/* ------------------------------
 * ② Carousel: scrollLeft movement
 * ------------------------------ */
const createScrollLeftMovement = ({
  viewportRef,
  getIndex,
  setIndex,
  slideCount,
}: CreateScrollLeftMovementParams): TrackMovementStrategy => {
  const syncViewportPosition = (index: number) => {
    const $viewport = viewportRef.current;

    if (!$viewport) return;

    const width = $viewport.clientWidth;

    $viewport.scrollTo({
      left: index * width,
      behavior: 'smooth',
    });
  };

  return {
    next: () => {
      const nextIndex = Math.min(getIndex() + 1, slideCount - 1);
      setIndex(nextIndex);
      syncViewportPosition(nextIndex);
    },
    prev: () => {
      const prevIndex = Math.max(getIndex() - 1, 0);
      setIndex(prevIndex);
      syncViewportPosition(prevIndex);
    },
    goTo: (index: number) => {
      setIndex(index);
      syncViewportPosition(index);
    },
    moveBy: (delta: number) => {
      const $viewport = viewportRef.current;

      if (!$viewport) return;

      $viewport.scrollLeft += delta;
    },
  };
};

const useTrackMovement = ({ mode, trackRef, viewportRef, getIndex, setIndex, slideCount }: UseTrackMovementParams) =>
  useMemo(() => {
    switch (mode) {
      case 'slider':
        return createTranslateXMovement({
          trackRef,
          getIndex,
          setIndex,
          slideCount,
        });
      case 'carousel':
        return createScrollLeftMovement({
          viewportRef,
          getIndex,
          setIndex,
          slideCount,
        });
      default:
        throw new Error(`Unknown movement mode: ${mode}`);
    }
  }, [mode, trackRef, viewportRef, getIndex, setIndex, slideCount]);

export default useTrackMovement;
