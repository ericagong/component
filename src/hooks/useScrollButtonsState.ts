import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import useMultiVisibilityObserver from './useMultiVisibilityObservers';

type ButtonDirection = 'prev' | 'next';
type ButtonsEnabled = { prev: boolean; next: boolean };

type UseScrollButtonStateParams = {
  sentinelRefs: RefObject<(HTMLElement | null)[]>;
};

type UseScrollButtonStateReturn = {
  prevButtonEnabled: boolean;
  nextButtonEnabled: boolean;
};

const useScrollButtonsState = ({ sentinelRefs }: UseScrollButtonStateParams): UseScrollButtonStateReturn => {
  const { visibleEntries: visibleSentinels } = useMultiVisibilityObserver(sentinelRefs);

  const [buttonsEnabled, setButtonsEnabled] = useState<ButtonsEnabled>({
    prev: false, // 처음에는 왼쪽 끝이니까 비활성화
    next: true,
  });

  useEffect(() => {
    // sentinel이 아무것도 감지되지 않으면 둘 다 활성화 (스크롤 중간일 수도 있음)
    if (!visibleSentinels.length) {
      setButtonsEnabled({ prev: true, next: true });

      return;
    }

    // sentinel이 감지된 방향만 false로, 나머지는 true로
    const nextState: ButtonsEnabled = { prev: true, next: true };

    visibleSentinels.forEach((entry) => {
      const direction = (entry.target as HTMLElement).dataset.direction as ButtonDirection;

      if (direction === 'prev' || direction === 'next') {
        nextState[direction] = false;
      }
    });

    setButtonsEnabled(nextState);
  }, [visibleSentinels]);

  return { prevButtonEnabled: buttonsEnabled.prev, nextButtonEnabled: buttonsEnabled.next };
};

export default useScrollButtonsState;
export type { ButtonDirection };
