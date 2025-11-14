import { useEffect } from 'react';

type UseScrollLockParams = {
  shouldLockScroll: boolean;
};

let lockCount = 0;
let overflowContext: string | null = null;

const SCROLL_LOCK_STYLE = 'hidden';

const lockScroll = () => {
  if (lockCount === 0) {
    overflowContext = document.body.style.overflow;
    document.body.style.overflow = SCROLL_LOCK_STYLE;
  }
  lockCount++;
};

const unlockScroll = () => {
  lockCount--;
  if (lockCount === 0) {
    document.body.style.overflow = overflowContext ?? '';
  }
};

const useScrollLock = ({ shouldLockScroll }: UseScrollLockParams) => {
  useEffect(() => {
    if (!shouldLockScroll) return;

    lockScroll();

    return () => unlockScroll();
  }, [shouldLockScroll]);
};

export default useScrollLock;
