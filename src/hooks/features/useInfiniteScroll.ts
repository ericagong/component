import { useEffect, useRef, useCallback, useState } from 'react';
import type { RefObject } from 'react';

import useElementVisibility from '../atomic/useElementVisibility';

type UseInfiniteScrollOptions = {
  once?: boolean;
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  fetchNext: () => Promise<void> | void;
  hasMore?: boolean;
};

type UseInfiniteScrollReturn<T extends HTMLElement> = {
  sentinelRef: RefObject<T | null>;
  isLoading: boolean;
};

const useInfiniteScroll = <T extends HTMLElement = HTMLElement>(
  options: UseInfiniteScrollOptions,
): UseInfiniteScrollReturn<T> => {
  const { fetchNext, hasMore = true, ...observerOptions } = options;

  const { targetRef: sentinelRef, isVisible: sentinelIsVisible } = useElementVisibility<T>({
    ...observerOptions,
    once: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const fetchingLockRef = useRef(false);

  const loadMore = useCallback(async () => {
    if (fetchingLockRef.current || !hasMore) return;

    fetchingLockRef.current = true;

    setIsLoading(true);

    await Promise.resolve(fetchNext());

    fetchingLockRef.current = false;

    setIsLoading(false);
  }, [fetchNext, hasMore]);

  useEffect(() => {
    if (sentinelIsVisible && hasMore) loadMore();
  }, [sentinelIsVisible, hasMore, loadMore]);

  return { sentinelRef, isLoading };
};

export default useInfiniteScroll;
