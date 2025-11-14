import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import cx from './cx';
import { usePopoverContext } from './PopoverRoot';

type PopoverContentProps = {
  className?: string;
  children: ReactNode;
};

const PopoverPanel = ({ className, children }: PopoverContentProps) => {
  const { isOpen, close, setFloating, style } = usePopoverContext();

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className={cx('popover-overlay')} onClick={close} />
      <div
        className={cx('popover-panel', { 'is-open': isOpen }, className)}
        ref={setFloating}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>,
    document.body,
  );
};

export default PopoverPanel;
