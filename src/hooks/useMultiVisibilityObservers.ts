import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

type VisibilityEntry = Pick<IntersectionObserverEntry, 'target' | 'isIntersecting'>;

type UseMultiVisibilityObserverOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
};

type UseMultiVisibilityObserverReturn = {
  visibleEntries: VisibilityEntry[];
};

const useMultiVisibilityObserver = (
  targetsRef: RefObject<(HTMLElement | null)[]>,
  options: UseMultiVisibilityObserverOptions = {},
): UseMultiVisibilityObserverReturn => {
  const { threshold = 0, root = null, rootMargin = '0px' } = options;

  const [visibleEntries, setVisibleEntries] = useState<VisibilityEntry[]>([]);

  useEffect(() => {
    const $targets = targetsRef.current;

    if (!$targets?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleEntries(entries.filter((entry) => entry.isIntersecting));
      },
      { threshold, root, rootMargin },
    );

    $targets.forEach(($target) => $target && observer.observe($target));

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, targetsRef]);

  return { visibleEntries };
};

export default useMultiVisibilityObserver;
