import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import useElementsVisibility from '../atomic/observer/useElementsVisibility';

type ButtonDirection = 'prev' | 'next';
type ButtonsEnabled = { prev: boolean; next: boolean };

type UseScrollButtonsStateParams = {
  sentinelRefs: RefObject<(HTMLElement | null)[]>;
};

type UseScrollButtonsStateReturn = {
  prevButtonEnabled: boolean;
  nextButtonEnabled: boolean;
};

const useScrollButtonsState = ({ sentinelRefs }: UseScrollButtonsStateParams): UseScrollButtonsStateReturn => {
  const { visibleTargets: visibleButtons } = useElementsVisibility(sentinelRefs);

  const [buttonsEnabled, setButtonsEnabled] = useState<ButtonsEnabled>({
    prev: false,
    next: true,
  });

  useEffect(() => {
    if (!visibleButtons.length) {
      setButtonsEnabled({ prev: true, next: true });

      return;
    }

    const nextState: ButtonsEnabled = { prev: true, next: true };

    visibleButtons.forEach((entry) => {
      const direction = (entry.target as HTMLElement).dataset.direction as ButtonDirection;

      if (direction === 'prev' || direction === 'next') nextState[direction] = false;
    });

    setButtonsEnabled(nextState);
  }, [visibleButtons]);

  return {
    prevButtonEnabled: buttonsEnabled.prev,
    nextButtonEnabled: buttonsEnabled.next,
  };
};

export default useScrollButtonsState;
export type { ButtonDirection };
