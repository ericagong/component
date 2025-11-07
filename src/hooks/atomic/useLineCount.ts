import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

type UseMeasureLinesParams = {
  targetRef: RefObject<HTMLElement | null>;
  text: string;
};

const useLineCount = ({ targetRef, text }: UseMeasureLinesParams) => {
  const [lines, setLines] = useState(0);

  useLayoutEffect(() => {
    const $target = targetRef.current;

    if (!$target) return;

    $target.textContent = text || ' ';

    const style = window.getComputedStyle($target);

    const safeLineHeight =
      style.lineHeight === 'normal' ? parseFloat(style.fontSize) * 1.2 : parseFloat(style.lineHeight); // browser fallback

    if (!safeLineHeight) return;

    const total = Math.floor($target.scrollHeight / safeLineHeight);

    setLines(total);
  }, [text, targetRef]);

  return lines;
};

export default useLineCount;
