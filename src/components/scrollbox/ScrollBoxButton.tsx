import type { ReactNode } from 'react';

import { useScrollBoxContext } from './ScrollBoxRoot';
import cx from './cx';

import type { ButtonDirection } from '@/hooks/features/useScrollButtonsState';

type ButtonProps = {
  direction: ButtonDirection;
  children?: ReactNode;
};

const ScrollBoxButton = ({ direction, children }: ButtonProps) => {
  const { scroll, prevButtonEnabled, nextButtonEnabled } = useScrollBoxContext();

  const isEnabled = direction === 'prev' ? prevButtonEnabled : nextButtonEnabled;

  return (
    <button
      type='button'
      className={cx('scroll-button', direction, { on: isEnabled })}
      onClick={() => scroll(direction)}
      disabled={!isEnabled}
    >
      {children}
    </button>
  );
};

export default ScrollBoxButton;
