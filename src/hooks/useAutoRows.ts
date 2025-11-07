import { useLayoutEffect } from 'react';

import useClone from './atomic/useClone';

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
      const lineHeight = parseFloat(window.getComputedStyle($clone).lineHeight);

      if (!lineHeight) return;

      const totalLines = Math.round($clone.scrollHeight / lineHeight);
      const clamped = clamp(totalLines, min, max);

      $target.style.height = `${clamped * lineHeight}px`;
    };

    updateRows();
    $target.addEventListener('input', updateRows);

    return () => $target.removeEventListener('input', updateRows);
  }, [min, max]);

  return { targetRef, cloneRef };
};

export default useAutoRows;
