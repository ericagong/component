import { createContext, useContext } from 'react';
import type { ReactNode, CSSProperties } from 'react';

import useDisclosure from '@/hooks/atomic/useDisclosure';
import useFloating from '@/hooks/features/useFloating';

type PopoverContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setAnchor: (el: HTMLElement | null) => void;
  setFloating: (el: HTMLElement | null) => void;
  style: CSSProperties;
  updatePosition: () => void;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const context = useContext(PopoverContext);

  if (!context) throw new Error('Popover compound components must be used inside <Popover.Root>');

  return context;
};

type PopoverRootProps = { children: ReactNode };

const PopoverRoot = ({ children }: PopoverRootProps) => {
  const { isOpen, open, close } = useDisclosure();

  const { setAnchor, setFloating, style, updatePosition } = useFloating({
    placement: 'top',
    offset: 8,
    flip: true,
    clamp: true,
  });

  const value: PopoverContextValue = {
    isOpen,
    open,
    close,
    setAnchor,
    setFloating,
    style,
    updatePosition,
  };

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>;
};

export default PopoverRoot;
export { usePopoverContext };
