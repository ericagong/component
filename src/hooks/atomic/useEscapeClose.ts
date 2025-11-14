import { useEffect } from 'react';

type UseEscapeCloseParams = {
  shouldCloseOnEscape: boolean;
  onClose: () => void;
};

const useEscapeClose = ({ shouldCloseOnEscape, onClose }: UseEscapeCloseParams) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!shouldCloseOnEscape) return;

      if (e.key !== 'Escape') return;

      onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shouldCloseOnEscape, onClose]);
};

export default useEscapeClose;
