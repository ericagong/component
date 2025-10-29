import { useLayoutEffect, useRef } from 'react';

type UseCloneReturn<T extends HTMLElement> = {
  targetRef: React.RefObject<T | null>;
  cloneRef: React.RefObject<T | null>;
};

const copyProps = [
  'box-sizing',
  'width',
  'padding',
  'border',
  'font',
  'font-family',
  'font-size',
  'font-weight',
  'letter-spacing',
  'word-spacing',
  'line-height',
  'text-indent',
  'text-transform',
  'white-space',
  'overflow-wrap',
  'word-break',
];

const useClone = <T extends HTMLElement>(): UseCloneReturn<T> => {
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
        // @ts-expect-error: dynamic style copy
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
  });

  return { targetRef, cloneRef };
};

export default useClone;
