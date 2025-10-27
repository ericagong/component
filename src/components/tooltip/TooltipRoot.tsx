import { useState, useMemo, createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import cx from './cx';

type TooltipContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

type TooltipRootProps = {
  children: ReactNode;
  className?: string;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
  const ctx = useContext(TooltipContext);

  if (!ctx) throw new Error('Tooltip components must be used within <TooltipRoot>');

  return ctx;
};

const TooltipRoot = ({ children, className }: TooltipRootProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const contextValue = useMemo(() => ({ isOpen, open, close }), [isOpen]);

  return (
    <TooltipContext.Provider value={contextValue}>
      <div className={cx('root', className)}>{children}</div>
    </TooltipContext.Provider>
  );
};

export { useTooltipContext };
export default TooltipRoot;
