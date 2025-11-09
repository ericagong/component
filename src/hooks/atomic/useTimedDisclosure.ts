import { useState } from 'react';

import useTimeout from './useTimeout';

const useTimedDisclosure = (duration = 3000) => {
  const [isOpen, setIsOpen] = useState(false);

  const { resetTimer, clearTimer } = useTimeout(() => setIsOpen(false), duration);

  const open = () => {
    setIsOpen(true);
    resetTimer();
  };

  const close = () => {
    setIsOpen(false);
    clearTimer();
  };

  return { isOpen, open, close };
};

export default useTimedDisclosure;
