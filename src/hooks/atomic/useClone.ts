import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

const copyProps = [
  'box-sizing',
  'width',
  'padding',
  'border',
  'font',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-indent',
  'text-transform',
  'white-space',
  'overflow-wrap',
  'word-break',
  'hyphens',
] as const;

type UseCloneReturn<T extends HTMLElement> = {
  targetRef: RefObject<T | null>;
  cloneRef: RefObject<T | null>;
};

const useClone = <T extends HTMLElement = HTMLElement>(): UseCloneReturn<T> => {
  const targetRef = useRef<T | null>(null);
  const cloneRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    const $target = targetRef.current;
    const $clone = cloneRef.current;

    if (!$target || !$clone) return;

    const style = window.getComputedStyle($target);

    for (const prop of copyProps) {
      const value = style.getPropertyValue(prop);

      if (value) {
        // @ts-expect-error: dynamic style assignment
        $clone.style[prop] = value;
      }
    }

    Object.assign($clone.style, {
      position: 'absolute',
      zIndex: '-1',
      opacity: '0',
      visibility: 'visible',
      pointerEvents: 'none',
      overflow: 'hidden',
      height: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    });
  }, []);

  return { targetRef, cloneRef };
};

export default useClone;
