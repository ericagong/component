import type { RefObject } from 'react';

import type { ButtonDirection } from './useScrollButtonsState';

// 아이템 가시성 판단 전략
type VisibilityMode = 'partial' | 'full';

type UseScrollNavigatorOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
  visibilityMode?: VisibilityMode;
};

type UseScrollNavigatorParams = {
  listRef: RefObject<HTMLUListElement | null>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  options?: UseScrollNavigatorOptions;
};

type UseScrollNavigatorReturn = {
  scroll: (direction: ButtonDirection) => void;
};

const useScrollNavigator = ({
  listRef,
  itemRefs,
  options = {},
}: UseScrollNavigatorParams): UseScrollNavigatorReturn => {
  const { behavior = 'smooth', block = 'nearest', visibilityMode = 'partial' } = options;

  const getVisibleItemsOnEdge = () => {
    const $list = listRef.current;
    const $items = itemRefs.current;

    if (!$list || !$items?.length) return {};

    const { left: listLeft, right: listRight } = $list.getBoundingClientRect();

    const isVisible = ($item: HTMLLIElement | null) => {
      if (!$item) return false;

      const { left: itemLeft, right: itemRight } = $item.getBoundingClientRect();

      // partial(default): 아이템이 부분적으로라도 보이면 true
      if (visibilityMode === 'partial') {
        return itemLeft <= listRight && itemRight >= listLeft;
      }

      // full: 아이템이 전체적으로 list 내에 들어온 경우 true
      return listLeft <= itemLeft && itemRight <= listRight;
    };

    const leftItemIndex = Math.max($items.findIndex(isVisible), 0);
    const rightItemIndex = Math.min($items.findLastIndex(isVisible), $items.length - 1);

    return {
      $leftItem: $items[leftItemIndex],
      $rightItem: $items[rightItemIndex],
    };
  };

  const scrollTargetIntoView = (target: HTMLElement | null, direction: ButtonDirection) => {
    target?.scrollIntoView({
      behavior,
      block,
      inline: direction === 'prev' ? 'end' : 'start',
    });
  };

  const scroll = (direction: ButtonDirection) => {
    const { $leftItem, $rightItem } = getVisibleItemsOnEdge();

    const $targetItem = direction === 'prev' ? $leftItem : $rightItem;

    scrollTargetIntoView($targetItem ?? null, direction);
  };

  return { scroll };
};

export default useScrollNavigator;
