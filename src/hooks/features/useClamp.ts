import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

type UseClampParams = {
  targetRef: RefObject<HTMLElement | null>;
  lineCount: number;
  maxLines: number;
};

type UseClampReturn = {
  isClamped: boolean;
  isExpanded: boolean;
  toggle: () => void;
};

const useClamp = ({ targetRef, lineCount, maxLines }: UseClampParams): UseClampReturn => {
  const [isClamped, setIsClamped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const $target = targetRef.current;

    if (!$target) return;

    const shouldClamp = lineCount > maxLines;
    setIsClamped(shouldClamp);

    if (shouldClamp && !isExpanded) {
      Object.assign($target.style, {
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: `${maxLines}`,
        overflow: 'hidden',
      });
    } else {
      Object.assign($target.style, {
        display: 'block',
        WebkitLineClamp: 'unset',
        overflow: 'visible',
      });
    }
  }, [targetRef, lineCount, maxLines, isExpanded]);

  const toggle = () => setIsExpanded((prev) => !prev);

  return { isClamped, isExpanded, toggle };
};

export default useClamp;
