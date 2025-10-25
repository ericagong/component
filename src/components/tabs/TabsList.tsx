import type { ReactNode } from 'react';

import cx from './cx';

type TabsListProps = {
  children: ReactNode;
  className?: string;
};

const TabsList = ({ children, className }: TabsListProps) => {
  return <div className={cx('list', className)}>{children}</div>;
};

export default TabsList;
