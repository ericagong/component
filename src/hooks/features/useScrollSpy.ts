import { useRef, useState, useEffect, useCallback } from 'react';
import type { RefObject } from 'react';

import useElementsVisibility from '@/hooks/atomic/useElementsVisibility';

type UseScrollSpyOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  headerOffset?: number; // 고정 헤더 높이 (ex. sticky nav)
};

type UseScrollSpyReturn = {
  containerRef: RefObject<HTMLUListElement | null>;
  sectionRefs: RefObject<(HTMLElement | null)[]>;
  activeIndex: number | null;
  scrollToSection: (index: number) => void;
};

const useScrollSpy = ({
  root = null,
  rootMargin = '0px 0px -40% 0px',
  threshold = 0.5,
  headerOffset = 0,
}: UseScrollSpyOptions = {}): UseScrollSpyReturn => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const { visibleTargets } = useElementsVisibility(sectionRefs, { root, rootMargin, threshold });

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!visibleTargets.length) return;

    // 가장 상단에 가까운 entry 선택
    const topMostEntry = visibleTargets.reduce((prev, curr) =>
      curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev,
    );

    const $target = topMostEntry.target as HTMLElement;
    const indexAttr = $target.dataset.index;

    if (indexAttr) setActiveIndex(Number(indexAttr));
  }, [visibleTargets]);

  const scrollToSection = useCallback(
    (index: number) => {
      const $target = sectionRefs.current[index];

      if (!$target) return;

      const sectionStartY = window.scrollY - headerOffset + $target.getBoundingClientRect().top;

      window.scrollTo({
        top: sectionStartY,
        behavior: 'smooth',
      });
    },
    [headerOffset],
  );

  return { containerRef, sectionRefs, activeIndex, scrollToSection };
};

export default useScrollSpy;
