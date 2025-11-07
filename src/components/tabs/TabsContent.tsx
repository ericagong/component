import type { ReactNode } from 'react';

import cx from './cx';
import { useTabsContext } from './TabsRoot';

type TabsContentProps = {
  value: string;
  children: ReactNode;
  className?: string;
};

const TabsContent = ({ value, children, className }: TabsContentProps) => {
  const { activeTab } = useTabsContext();

  const isOpen = activeTab === value;

  if (!isOpen) return null;

  return <div className={cx('content', 'is-open', className)}>{children}</div>;
};

export default TabsContent;
