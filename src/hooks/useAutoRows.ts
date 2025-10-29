import { useLayoutEffect, useRef } from 'react';

import clamp from '@/utils/clamp';

type UseAutoRowsParams = {
  min?: number;
  max?: number;
};

const useAutoRows = ({ min = 3, max = 5 }: UseAutoRowsParams = {}) => {
  const targetRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const $target = targetRef.current;
    const $clone = cloneRef.current;

    if (!$target || !$clone) return;

    const style = window.getComputedStyle($target);
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

    for (const prop of copyProps) {
      const value = style.getPropertyValue(prop);

      if (value) {
        // @ts-expect-error: targetRef가 null일 가능성을 무시
        $clone.style[prop] = value;
      }
    }

    Object.assign($clone.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '-1',
      opacity: '0',
      visibility: 'visible', // layout 계산 유지
      pointerEvents: 'none',
      overflow: 'hidden',
      height: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
    });

    const updateRows = () => {
      $clone.value = $target.value || ' ';

      const cloneStyle = window.getComputedStyle($clone);
      const lineHeight = parseFloat(cloneStyle.lineHeight);

      if (!lineHeight) return;

      const totalLines = Math.round($clone.scrollHeight / lineHeight);

      const clamped = clamp(totalLines, min, max);

      $target.style.height = `${clamped * lineHeight}px`;
    };

    updateRows();

    $target.addEventListener('input', updateRows);

    return () => {
      $target.removeEventListener('input', updateRows);
    };
  }, [min, max]);

  return { targetRef, cloneRef };
};

export default useAutoRows;
