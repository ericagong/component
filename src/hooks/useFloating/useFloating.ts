import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

import autoUpdate from './autoUpdate';
import computeFloatingStyle from './computeFloatingStyle';
import type { FloatingOptions, Rects } from './computeFloatingStyle';

type UseFloatingParams = Partial<FloatingOptions>;

type UseFloatingReturn = {
  setAnchor: ($el: HTMLElement | null) => void;
  setFloating: ($el: HTMLElement | null) => void;
  styles: CSSProperties;
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
  const [styles, setStyles] = useState<CSSProperties>({});

  const updatePosition = useCallback(() => {
    const $anchor = anchorRef.current;
    const $floating = floatingRef.current;

    if (!$anchor || !$floating) return;

    const rects: Rects = {
      anchorRect: $anchor.getBoundingClientRect(),
      floatingRect: $floating.getBoundingClientRect(),
    };

    const computed = computeFloatingStyle(rects, optionsRef.current);

    setStyles({
      position: 'fixed',
      top: `${computed.y}px`,
      left: `${computed.x}px`,
    });
  }, []);

  const readyRef = useRef(false);

  const tryInitialUpdate = useCallback(() => {
    if (!anchorRef.current || !floatingRef.current) return;

    if (readyRef.current) return;

    // layout이 안정화되었을 때만 최초 실행
    requestAnimationFrame(() => {
      updatePosition();
      readyRef.current = true;
    });
  }, [updatePosition]);

  const setAnchor = useCallback(
    ($el: HTMLElement | null) => {
      anchorRef.current = $el;
      tryInitialUpdate();
    },
    [tryInitialUpdate],
  );

  const setFloating = useCallback(
    ($el: HTMLElement | null) => {
      floatingRef.current = $el;
      tryInitialUpdate();
    },
    [tryInitialUpdate],
  );

  useLayoutEffect(() => {
    const $anchor = anchorRef.current;
    const $floating = floatingRef.current;

    if (!$anchor || !$floating) return;

    const cleanup = autoUpdate($anchor, $floating, updatePosition);

    return cleanup;
  }, [updatePosition]);

  return { setAnchor, setFloating, styles, updatePosition };
};

export default useFloating;
export type { UseFloatingParams, UseFloatingReturn };
