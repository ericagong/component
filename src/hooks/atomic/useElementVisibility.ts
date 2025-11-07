import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type UseElementVisibilityOptions = {
  once?: boolean;
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  onEnter?: () => void;
  onLeave?: () => void;
};

type UseElementVisibilityReturn<T extends HTMLElement> = {
  targetRef: RefObject<T | null>;
  isVisible: boolean;
};

const useElementVisibility = <T extends HTMLElement = HTMLElement>(
  options: UseElementVisibilityOptions = {},
): UseElementVisibilityReturn<T> => {
  const { once = true, threshold = 0, root = null, rootMargin = '0px' } = options;

  const [isVisible, setIsVisible] = useState(false);

  const targetRef = useRef<T | null>(null);

  const onEnterRef = useRef(options.onEnter);
  const onLeaveRef = useRef(options.onLeave);

  useEffect(() => {
    onEnterRef.current = options.onEnter;
    onLeaveRef.current = options.onLeave;
  }, [options.onEnter, options.onLeave]);

  useEffect(() => {
    const $target = targetRef.current;

    if (!$target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;

        setIsVisible(visible);

        if (visible) {
          onEnterRef.current?.();

          if (once) observer.unobserve($target);
        } else {
          onLeaveRef.current?.();
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe($target);

    return () => observer.unobserve($target);
  }, [once, threshold, root, rootMargin]);

  return { targetRef, isVisible };
};

export default useElementVisibility;
