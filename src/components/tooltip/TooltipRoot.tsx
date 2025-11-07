import { createContext, useContext, useMemo } from 'react';
import type { ReactNode, CSSProperties } from 'react';

import cx from './cx';

import useDisclosure from '@/hooks/atomic/useDisclosure';
import useFloating from '@/hooks/features/useFloating';

type TooltipContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setAnchor: (node: HTMLElement | null) => void;
  setFloating: (node: HTMLElement | null) => void;
  style: CSSProperties;
};

type TooltipRootProps = {
  children: ReactNode;
  className?: string;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

export const useTooltipContext = () => {
  const context = useContext(TooltipContext);

  if (!context) {
    throw new Error('Tooltip compound components must be used within <TooltipRoot>');
  }

  return context;
};

const TooltipRoot = ({ children, className }: TooltipRootProps) => {
  const { isOpen, open, close } = useDisclosure(false);

  const { setAnchor, setFloating, style } = useFloating({
    placement: 'top',
    offset: 1,
    flip: true,
    clamp: true,
  });

  const contextValue = useMemo(
    () => ({
      isOpen,
      open,
      close,
      setAnchor,
      setFloating,
      style,
    }),
    [isOpen, open, close, setAnchor, setFloating, style],
  );

  return (
    <TooltipContext.Provider value={contextValue}>
      <div className={cx('root', className)}>{children}</div>
    </TooltipContext.Provider>
  );
};

export default TooltipRoot;
