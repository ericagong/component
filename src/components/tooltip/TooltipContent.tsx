import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import cx from './cx';
import { useTooltipContext } from './TooltipRoot';

type TooltipContentProps = {
  className?: string;
  children: ReactNode;
};

const TooltipContent = ({ className, children }: TooltipContentProps) => {
  const { isOpen, setFloating, style } = useTooltipContext();

  return createPortal(
    <div className={cx('content', { 'is-open': isOpen }, className)} ref={setFloating} style={style}>
      {children}
    </div>,
    document.body,
  );
};

export default TooltipContent;
