import { useLayoutEffect, useRef, useState, useCallback } from 'react';
import type { CSSProperties } from 'react';

import computePosition from '@/utils/computePosition';
import type { FloatingOptions, Rects } from '@/utils/computePosition';

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

    const computed = computePosition(rects, optionsRef.current);

    setStyles({
      position: 'fixed',
      top: `${computed.y}px`,
      left: `${computed.x}px`,
    });
  }, []);

  const setAnchor = useCallback(($el: HTMLElement | null) => {
    anchorRef.current = $el;
  }, []);

  const setFloating = useCallback(($el: HTMLElement | null) => {
    floatingRef.current = $el;
  }, []);

  useLayoutEffect(() => {
    const $anchor = anchorRef.current;
    const $floating = floatingRef.current;

    if (!$anchor || !$floating) return;

    // $elem observe 등록 시, 최초 updatePosition 호출 보장
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

  return { setAnchor, setFloating, styles, updatePosition };
};

export default useFloating;
export type { UseFloatingParams, UseFloatingReturn };
