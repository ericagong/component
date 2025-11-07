import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import useElementsVisibility from '@/hooks/atomic/observer/useElementsVisibility';

type ScrollDirection = 'left' | 'right';
type ScrollEdgesState = { left: boolean; right: boolean };

type UseScrollableParams = {
  sentinelRefs: RefObject<(HTMLElement | null)[]>;
};

type UseScrollableReturn = {
  canScrollLeft: boolean;
  canScrollRight: boolean;
};

const useScrollable = ({ sentinelRefs }: UseScrollableParams): UseScrollableReturn => {
  const { visibleTargets } = useElementsVisibility(sentinelRefs);

  const [edges, setEdges] = useState<ScrollEdgesState>({
    left: true, // 초기엔 왼쪽 끝에 위치
    right: false,
  });

  useEffect(() => {
    if (!visibleTargets.length) {
      setEdges({ left: false, right: false });

      return;
    }

    const nextEdges: ScrollEdgesState = { left: false, right: false };

    visibleTargets.forEach((entry) => {
      const direction = (entry.target as HTMLElement).dataset.direction as ScrollDirection;

      if (direction === 'left' || direction === 'right') {
        nextEdges[direction] = true;
      }
    });

    setEdges(nextEdges);
  }, [visibleTargets]);

  return {
    canScrollLeft: !edges.left,
    canScrollRight: !edges.right,
  };
};

export default useScrollable;
