import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

type UseVisibilityTriggerOptions = {
  once?: boolean;
  threshold?: number | number[];
  root?: Element | null; // 관찰 기준 스크롤 컨테이너 (default: viewport = null)
  rootMargin?: string; // 감지 범위 여유값
  onEnter?: () => void;
  onLeave?: () => void;
};

type UseVisibilityTriggerReturn<T extends HTMLElement> = {
  targetRef: RefObject<T | null>;
  isVisible: boolean;
};

const useVisibilityTrigger = <T extends HTMLElement = HTMLElement>(
  options: UseVisibilityTriggerOptions = {},
): UseVisibilityTriggerReturn<T> => {
  const targetRef = useRef<T | null>(null);
  const optionsRef = useRef({
    once: options.once ?? true,
    threshold: options.threshold ?? 0,
    root: options.root ?? null,
    rootMargin: options.rootMargin ?? '0px',
    onEnter: options.onEnter,
    onLeave: options.onLeave,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const $target = targetRef.current;

    if (!$target) return;

    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      setIsVisible(visible);

      const { once, onEnter, onLeave } = optionsRef.current;

      if (visible) {
        onEnter?.();
        if (once) observer.unobserve($target);
      } else {
        onLeave?.();
      }
    }, optionsRef.current);

    observer.observe($target);

    return () => observer.disconnect();
  }, []);

  return { targetRef, isVisible };
};

export default useVisibilityTrigger;
