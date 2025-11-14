import { useEffect } from 'react';

type UseEscapeCloseParams = {
  isOpen: boolean;
  close: () => void;
};

const useEscapeClose = ({ isOpen, close }: UseEscapeCloseParams) => {
  useEffect(() => {
    if (!isOpen) return;

    const onCloseHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };

    document.addEventListener('keydown', onCloseHandler);

    return () => document.removeEventListener('keydown', onCloseHandler);
  }, [isOpen, close]);
};

export default useEscapeClose;
