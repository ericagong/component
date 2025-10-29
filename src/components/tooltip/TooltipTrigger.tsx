import type { ReactNode } from 'react';

import cx from './cx';
import { useTooltipContext } from './TooltipRoot';

type TooltipTriggerProps = {
  children: ReactNode;
  className?: string;
};

const TooltipTrigger = ({ children, className }: TooltipTriggerProps) => {
  const { open, close, floating } = useTooltipContext();

  return (
    <button
      type='button'
      className={cx('trigger', className)}
      ref={floating.setAnchor}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      {children}
    </button>
  );
};

export default TooltipTrigger;
