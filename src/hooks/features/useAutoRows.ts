import { useLayoutEffect } from 'react';

import useClone from '../atomic/useClone';

import clamp from '@/utils/clamp';

type UseAutoRowsParams = {
  min?: number;
  max?: number;
};

const useAutoRows = ({ min = 3, max = 5 }: UseAutoRowsParams = {}) => {
  const { targetRef, cloneRef } = useClone<HTMLTextAreaElement>();

  useLayoutEffect(() => {
    const $target = targetRef.current;
    const $clone = cloneRef.current;

    if (!$target || !$clone) return;

    const updateRows = () => {
      $clone.value = $target.value || ' ';

      const style = window.getComputedStyle($target);

      const safeLineHeight =
        style.lineHeight === 'normal' ? parseFloat(style.fontSize) * 1.2 : parseFloat(style.lineHeight); // browser fallback

      if (!safeLineHeight) return;

      const totalLines = Math.round($clone.scrollHeight / safeLineHeight);

      const clamped = clamp(totalLines, min, max);

      $target.style.height = `${clamped * safeLineHeight}px`;
    };

    updateRows();

    $target.addEventListener('input', updateRows);

    return () => {
      $target.removeEventListener('input', updateRows);
    };
  }, [min, max, targetRef, cloneRef]);

  return { targetRef, cloneRef };
};

export default useAutoRows;
