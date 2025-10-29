import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import cx from './cx';
import { useTooltipContext } from './TooltipRoot';

type TooltipContentProps = {
  children: ReactNode;
  className?: string;
};

const TooltipContent = ({ children, className }: TooltipContentProps) => {
  const { isOpen, floating } = useTooltipContext();

  if (!isOpen) return null;

  return createPortal(
    <div className={cx('content', 'is-open', className)} ref={floating.setFloating} style={floating.styles}>
      {children}
    </div>,
    document.body,
  );
};

export default TooltipContent;
