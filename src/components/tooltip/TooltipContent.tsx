import type { ReactNode } from 'react';

import cx from './cx';
import { useTooltipContext } from './TooltipRoot';

type TooltipContentProps = {
  children: ReactNode;
  className?: string;
};

const TooltipContent = ({ children, className }: TooltipContentProps) => {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  return <div className={cx('content', 'is-open', className)}>{children}</div>;
};

export default TooltipContent;
