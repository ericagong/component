import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

import computeFloatingStyle from './computeFloatingStyle';
import type { FloatingOptions, Rects, Placement } from './computeFloatingStyle';

type UseFloatingParams = Partial<FloatingOptions>;
type UseFloatingReturn = {
  refs: {
    setAnchor: ($el: HTMLElement | null) => void;
    setFloating: ($el: HTMLElement | null) => void;
    anchor: HTMLElement | null;
    floating: HTMLElement | null;
  };
  styles: CSSProperties;
  update: () => void;
};

const useFloating = (options: UseFloatingParams = {}): UseFloatingReturn => {
  const { placement: initialPlacement = 'bottom', offset = 0, flip = true, clamp = true } = options;

  const anchorRef = useRef<HTMLElement | null>(null);
  const floatingRef = useRef<HTMLElement | null>(null);

  const [styles, setStyles] = useState<CSSProperties>({});

  // for debugging
  const [placement, setPlacement] = useState<Placement>(initialPlacement);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const computeStyle = useCallback(() => {
    const anchor = anchorRef.current;
    const floating = floatingRef.current;

    if (!anchor || !floating) return null;
    console.log(anchorRef.current, floatingRef.current);

    const rects: Rects = {
      anchorRect: anchor.getBoundingClientRect(),
      floatingRect: floating.getBoundingClientRect(),
    };

    const computed = computeFloatingStyle(rects, {
      placement: initialPlacement,
      offset,
      flip,
      clamp,
    });

    return {
      styles: {
        position: 'fixed',
        top: `${computed.y}px`,
        left: `${computed.x}px`,
      } as const,
      // for debugging
      placement: computed.placement,
      position: { x: computed.x, y: computed.y },
    };
  }, [initialPlacement, offset, flip, clamp]);

  const applyStyle = useCallback(() => {
    const computedStyle = computeStyle();

    if (!computedStyle) return;

    setStyles(computedStyle.styles);

    // for debugging
    setPlacement(computedStyle.placement);
    setPosition(computedStyle.position);
    console.log(placement, position);
  }, [computeStyle]);

  useLayoutEffect(() => {
    applyStyle();

    window.addEventListener('resize', applyStyle);
    window.addEventListener('scroll', applyStyle);

    return () => {
      window.removeEventListener('resize', applyStyle);
      window.removeEventListener('scroll', applyStyle);
    };
  }, [applyStyle]);

  return {
    refs: {
      setAnchor: ($el) => (anchorRef.current = $el),
      setFloating: ($el) => (floatingRef.current = $el),
      anchor: anchorRef.current,
      floating: floatingRef.current,
    },
    styles,
    update: applyStyle,
  };
};

export default useFloating;
export type { UseFloatingParams, UseFloatingReturn };
