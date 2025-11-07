import { createContext, useMemo, useRef, useContext } from 'react';
import type { PropsWithChildren, RefObject } from 'react';

import useScrollNavigator from '@/hooks/features/useScrollNavigator';
import useScrollButtonsState from '@/hooks/features/useScrollButtonsState';
import type { ButtonDirection } from '@/hooks/features/useScrollButtonsState';

type ScrollBoxContextValue = {
  listRef: RefObject<HTMLUListElement | null>;
  itemRefs: RefObject<(HTMLLIElement | null)[]>;
  sentinelRefs: RefObject<(HTMLLIElement | null)[]>;
  scroll: (direction: ButtonDirection) => void;
  prevButtonEnabled: boolean;
  nextButtonEnabled: boolean;
};

const ScrollBoxContext = createContext<ScrollBoxContextValue | null>(null);

const useScrollBoxContext = () => {
  const context = useContext(ScrollBoxContext);

  if (!context) {
    throw new Error('ScrollBox compound components must be used within <ScrollBox.Root>');
  }

  return context;
};

const ScrollBoxRoot = ({ children }: PropsWithChildren) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLLIElement | null)[]>([]);

  const { scroll } = useScrollNavigator({
    listRef,
    itemRefs,
    options: { behavior: 'smooth', visibilityMode: 'partial' },
  });

  const { prevButtonEnabled, nextButtonEnabled } = useScrollButtonsState({ sentinelRefs });

  const value = useMemo(
    () => ({
      listRef,
      itemRefs,
      sentinelRefs,
      scroll,
      prevButtonEnabled,
      nextButtonEnabled,
    }),
    [prevButtonEnabled, nextButtonEnabled, scroll],
  );

  return <ScrollBoxContext.Provider value={value}>{children}</ScrollBoxContext.Provider>;
};

export default ScrollBoxRoot;
export { useScrollBoxContext };
