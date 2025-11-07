import { useCallback } from 'react';
import type { RefObject } from 'react';

import useVisibleRange from '@/hooks/atomic/useVisibleRange';

type ButtonDirection = 'prev' | 'next';

type VisibilityMode = 'partial' | 'full';

type UseScrollActionOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  visibilityMode?: VisibilityMode;
};

type UseScrollActionParams = {
  listRef: RefObject<HTMLUListElement | null>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  options?: UseScrollActionOptions;
};

type UseScrollActionReturn = {
  scroll: (direction: ButtonDirection) => void;
};

const useScrollAction = ({ listRef, itemRefs, options = {} }: UseScrollActionParams): UseScrollActionReturn => {
  const { behavior = 'smooth', block = 'nearest', visibilityMode = 'partial' } = options;

  const { leftIndex, rightIndex } = useVisibleRange({ listRef, itemRefs, visibilityMode });

  const scroll = useCallback(
    (direction: ButtonDirection) => {
      const $items = itemRefs.current;

      if (!$items?.length) return;

      const target = direction === 'prev' ? ($items[leftIndex] ?? null) : ($items[rightIndex] ?? null);

      target?.scrollIntoView({
        behavior,
        block,
        inline: direction === 'prev' ? 'end' : 'start',
      });
    },
    [behavior, block, leftIndex, rightIndex, itemRefs],
  );

  return { scroll };
};

export default useScrollAction;
