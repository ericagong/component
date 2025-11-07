import { memo, useCallback } from 'react';
import type { ReactNode } from 'react';

import cx from './cx';
import { useTabsContext } from './TabsRoot';

type TabsTriggerProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  const { activeTab, open } = useTabsContext();
  const isOpen = activeTab === value;

  const handleClick = useCallback(() => {
    open(value);
  }, [open, value]);

  return (
    <button type='button' className={cx('trigger', { 'is-open': isOpen }, className)} onClick={handleClick}>
      {children}
    </button>
  );
};

const memoizedTabsTrigger = memo(TabsTrigger);

export default memoizedTabsTrigger;
