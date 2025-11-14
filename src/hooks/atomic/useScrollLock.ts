import { useEffect } from 'react';

type UseScrollLockParams = {
  isOpen: boolean;
};

const SCROLL_LOCK_STYLE = 'hidden';

const useScrollLock = ({ isOpen }: UseScrollLockParams) => {
  useEffect(() => {
    if (!isOpen) return;

    const overflowContext = document.body.style.overflow;

    document.body.style.overflow = SCROLL_LOCK_STYLE;

    return () => {
      document.body.style.overflow = overflowContext;
    };
  }, [isOpen]);
};

export default useScrollLock;
