import { createPortal } from 'react-dom';

import cx from './cx';
import { useTooltipContext } from './TooltipRoot';

type TooltipContentProps = {
  children: React.ReactNode;
  className?: string;
};

const TooltipContent = ({ children, className }: TooltipContentProps) => {
  const { isOpen, floating } = useTooltipContext();

  return createPortal(
    <div className={cx('content', { 'is-open': isOpen }, className)} ref={floating.setFloating} style={floating.styles}>
      {children}
    </div>,
    document.body,
  );
};

export default TooltipContent;
