import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

import useClone from './useClone';

type UseClampParams = {
  text: string;
  maxLines: number;
};

type UseClampReturn = {
  targetRef: RefObject<HTMLDivElement | null>;
  cloneRef: RefObject<HTMLDivElement | null>;
  isClamped: boolean;
  toggleClamp: () => void;
};

const useClamp = ({ text, maxLines }: UseClampParams): UseClampReturn => {
  const { targetRef, cloneRef } = useClone<HTMLDivElement>();
  const [isClamped, setIsClamped] = useState(false);

  const toggleClamp = () => {
    setIsClamped((prev) => !prev);
  };

  useLayoutEffect(() => {
    const $target = targetRef.current;
    const $clone = cloneRef.current;

    if (!$target || !$clone) return;

    $clone.textContent = text || ' ';
    const lineHeight = parseFloat(window.getComputedStyle($clone).lineHeight);
    const totalLines = Math.floor($clone.scrollHeight / lineHeight);
    setIsClamped(totalLines > maxLines);
  }, [text, maxLines]);

  return { targetRef, cloneRef, isClamped, toggleClamp };
};

export default useClamp;
