import { useState, useMemo, createContext, useContext, memo } from 'react';
import type { ReactNode } from 'react';

import cx from './cx';

import useExclusiveSelect from '@/hooks/atomic/useExclusiveSelect';

type TabsContextValue = {
  activeTab: string;
  open: (value: string) => void;
};

type TabsRootProps = {
  defaultValue: string;
  children: ReactNode;
  className?: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);

  if (!context) throw new Error('Tabs components must be used within <TabsRoot>');

  return context;
};

const TabsRoot = ({ defaultValue, children, className }: TabsRootProps) => {
  const { selected: activeTab, select: open } = useExclusiveSelect(defaultValue);

  const contextValue = useMemo(() => ({ activeTab, open }), [activeTab, open]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cx('root', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export { useTabsContext };
export default memo(TabsRoot);
