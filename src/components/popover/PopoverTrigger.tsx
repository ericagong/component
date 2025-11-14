import type { ReactNode } from 'react';

import cx from './cx';
import { usePopoverContext } from './PopoverRoot';

type TooltipTriggerProps = {
  className?: string;
  children: ReactNode;
};

const PopoverTrigger = ({ className, children }: TooltipTriggerProps) => {
  const { open, setAnchor } = usePopoverContext();

  return (
    <button type='button' className={cx('popover-trigger', className)} ref={setAnchor} onClick={open}>
      {children}
    </button>
  );
};

export default PopoverTrigger;
