import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

type VisibilityMode = 'partial' | 'full';

type UseScrollVisibleRangeParams = {
  listRef: RefObject<HTMLElement | null>;
  itemRefs: RefObject<(HTMLElement | null)[]>;
  visibilityMode?: VisibilityMode;
};

type UseScrollVisibleRangeReturn = {
  leftIndex: number;
  rightIndex: number;
};

const useScrollVisibleRange = ({
  listRef,
  itemRefs,
  visibilityMode = 'partial',
}: UseScrollVisibleRangeParams): UseScrollVisibleRangeReturn => {
  const [range, setRange] = useState({ leftIndex: 0, rightIndex: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const $list = listRef.current;
      const $items = itemRefs.current;

      if (!$list || !$items?.length) return;

      const { left: listLeft, right: listRight } = $list.getBoundingClientRect();

      const isVisible = ($item: HTMLElement | null) => {
        if (!$item) return false;

        const { left: itemLeft, right: itemRight } = $item.getBoundingClientRect();

        return visibilityMode === 'full'
          ? listLeft <= itemLeft && itemRight <= listRight
          : itemLeft <= listRight && itemRight >= listLeft;
      };

      const leftIndex = Math.max($items.findIndex(isVisible), 0);
      const rightIndex = Math.min($items.findLastIndex(isVisible), $items.length - 1);

      setRange({ leftIndex, rightIndex });
    };

    update();

    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update);
    };
  }, [listRef, itemRefs, visibilityMode]);

  return range;
};

export default useScrollVisibleRange;
