import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type VisibilityEntry = Pick<IntersectionObserverEntry, 'target' | 'isIntersecting' | 'boundingClientRect'>;

type UseElementsVisibilityOptions = {
  once?: boolean;
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  onEnter?: (target: Element) => void;
  onLeave?: (target: Element) => void;
};

type UseElementsVisibilityReturn = {
  visibleTargets: VisibilityEntry[];
};

const useElementsVisibility = (
  targetsRef: RefObject<(HTMLElement | null)[]>,
  options: UseElementsVisibilityOptions = {},
): UseElementsVisibilityReturn => {
  const { once = false, threshold = 0, root = null, rootMargin = '0px' } = options;

  const [visibleTargets, setVisibleTargets] = useState<VisibilityEntry[]>([]);

  const onEnterRef = useRef(options.onEnter);
  const onLeaveRef = useRef(options.onLeave);

  useEffect(() => {
    onEnterRef.current = options.onEnter;
    onLeaveRef.current = options.onLeave;
  }, [options.onEnter, options.onLeave]);

  useEffect(() => {
    const $targets = targetsRef.current;

    if (!$targets?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        setVisibleTargets(visibleEntries);

        entries.forEach((entry) => {
          const $target = entry.target;
          const visible = entry.isIntersecting;

          if (visible) {
            onEnterRef.current?.($target);
            if (once) observer.unobserve($target);
          } else {
            onLeaveRef.current?.($target);
          }
        });
      },
      { threshold, root, rootMargin },
    );

    $targets.forEach(($target) => $target && observer.observe($target));

    return () => {
      $targets.forEach(($target) => $target && observer.unobserve($target));
    };
  }, [targetsRef, once, threshold, root, rootMargin]);

  return { visibleTargets };
};

export default useElementsVisibility;
