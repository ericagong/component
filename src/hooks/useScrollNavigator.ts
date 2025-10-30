import type { RefObject } from 'react';

import type { ButtonDirection } from './useScrollButtonsState';

type VisibilityMode = 'partial' | 'full';

type UseScrollNavigatorOptions = {
  behavior?: ScrollBehavior; // 'smooth' | 'auto'
  block?: ScrollLogicalPosition; // 'start' | 'center' | 'end' | 'nearest'
  visibilityMode?: VisibilityMode; // 아이템 가시성 판단 방식
};

type UseScrollNavigatorParams = {
  listRef: RefObject<HTMLUListElement>;
  itemsRef: RefObject<(HTMLLIElement | null)[]>;
  options?: UseScrollNavigatorOptions;
};

type UseScrollNavigatorReturn = {
  scroll: (direction: ButtonDirection) => void;
};

const useScrollNavigator = ({
  listRef,
  itemsRef,
  options = {},
}: UseScrollNavigatorParams): UseScrollNavigatorReturn => {
  const { behavior = 'smooth', block = 'nearest', visibilityMode = 'partial' } = options;

  const getVisibleItemsOnEdge = () => {
    const $list = listRef.current;
    const $items = itemsRef.current;

    if (!$list || !$items?.length) return {};

    const { left: listLeft, right: listRight } = $list.getBoundingClientRect();

    const isVisible = ($item: HTMLLIElement | null) => {
      if (!$item) return false;

      const { left: itemLeft, right: itemRight } = $item.getBoundingClientRect();

      if (visibilityMode === 'full') {
        // 아이템 전체가 리스트 뷰포트 안에 들어온 경우만 인정
        return listLeft <= itemLeft && itemRight <= listRight;
      }

      // (기본: visibilityMode === 'partial') 부분적으로라도 보이면 true
      return itemLeft <= listRight && itemRight >= listLeft;
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
