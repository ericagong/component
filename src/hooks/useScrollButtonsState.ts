import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

import useMultiVisibilityObserver from './useMultiVisibilityObservers';

type ButtonDirection = 'prev' | 'next';
type ButtonsEnabled = { prev: boolean; next: boolean };

type UseScrollButtonStateParams = {
  targetRefs: RefObject<(HTMLElement | null)[]>;
};

type UseScrollButtonStateReturn = {
  prevEnabled: boolean;
  nextEnabled: boolean;
};

const useScrollButtonState = ({ targetRefs }: UseScrollButtonStateParams): UseScrollButtonStateReturn => {
  const { visibleEntries } = useMultiVisibilityObserver(targetRefs);

  const [buttonsEnabled, setButtonsEnabled] = useState<ButtonsEnabled>({
    prev: false,
    next: true,
  });

  useEffect(() => {
    if (!visibleEntries.length) {
      setButtonsEnabled({ prev: false, next: true });

      return;
    }

    setButtonsEnabled((prev) => {
      const next = { ...prev };
      visibleEntries.forEach((entry) => {
        const direction = (entry.target as HTMLElement).dataset.direction as ButtonDirection;

        if (direction === 'prev' || direction === 'next') {
          next[direction] = false;
        }
      });

      return next;
    });
  }, [visibleEntries]);

  return { prevEnabled: buttonsEnabled.prev, nextEnabled: buttonsEnabled.next };
};

export default useScrollButtonState;
export type { ButtonDirection };
