import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

import computePosition from '@/utils/computePosition';
import type { FloatingOptions, Rects } from '@/utils/computePosition';

type UseFloatingParams = Partial<FloatingOptions>;

type UseFloatingReturn = {
  setAnchor: ($target: HTMLElement | null) => void;
  setFloating: ($target: HTMLElement | null) => void;
  style: CSSProperties;
  updatePosition: () => void;
};

const useFloating = (options: UseFloatingParams = {}): UseFloatingReturn => {
  const optionsRef = useRef({
    placement: options.placement ?? 'bottom',
    offset: options.offset ?? 0,
    flip: options.flip ?? true,
    clamp: options.clamp ?? true,
  });

  const anchorRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLElement | null>(null);

  const [style, setStyle] = useState<CSSProperties>({});

  const setAnchor = useCallback(($target: HTMLElement | null) => {
    anchorRef.current = $target;
  }, []);

  const setFloating = useCallback(($target: HTMLElement | null) => {
    floatingRef.current = $target;
  }, []);

  const updatePosition = useCallback(() => {
    const $anchor = anchorRef.current;
    const $floating = floatingRef.current;

    if (!$anchor || !$floating) return;

    const rects: Rects = {
      anchorRect: $anchor.getBoundingClientRect(),
      floatingRect: $floating.getBoundingClientRect(),
    };

    const computed = computePosition(rects, optionsRef.current);
    setStyle({
      position: 'fixed',
      top: `${computed.y}px`,
      left: `${computed.x}px`,
    });
  }, []);

  useLayoutEffect(() => {
    optionsRef.current = {
      placement: options.placement ?? 'bottom',
      offset: options.offset ?? 0,
      flip: options.flip ?? true,
      clamp: options.clamp ?? true,
    };

    updatePosition();
  }, [options.placement, options.offset, options.flip, options.clamp, updatePosition]);

  useLayoutEffect(() => {
    const $anchor = anchorRef.current;
    const $floating = floatingRef.current;

    if (!$anchor || !$floating) return;

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe($anchor);
    resizeObserver.observe($floating);

    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [updatePosition]);

  return { setAnchor, setFloating, style, updatePosition };
};

export default useFloating;
