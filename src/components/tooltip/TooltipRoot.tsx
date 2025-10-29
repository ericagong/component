import { useState, useMemo, createContext, useContext, type ReactNode } from 'react';

import cx from './cx';

import useFloating from '@/hooks/useFloating/useFloating';
import type { UseFloatingReturn } from '@/hooks/useFloating/useFloating';

type TooltipContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  floating: UseFloatingReturn;
};

type TooltipRootProps = {
  children: ReactNode;
  className?: string;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export const useTooltipContext = () => {
  const ctx = useContext(TooltipContext);

  if (!ctx) throw new Error('Tooltip components must be used within <TooltipRoot>');

  return ctx;
};

const TooltipRoot = ({ children, className }: TooltipRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const floating = useFloating({
    placement: 'top',
    offset: 8,
    flip: true,
    clamp: true,
  });

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
      floating,
    }),
    [isOpen, floating],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div className={cx('root', className)}>{children}</div>
    </TooltipContext.Provider>
  );
};

export default TooltipRoot;
