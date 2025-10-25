import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useAccordionState from './useAccordionState';
import cx from './cx';

type AccordionContextValue = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

type AccordionRootProps = {
  children: ReactNode;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion compound components must be used within <AccordionRoot>');
  }

  return context;
};

const AccordionRoot = ({ children }: AccordionRootProps) => {
  const { openItem, toggleItem } = useAccordionState();
  const contextValue = useMemo(() => ({ openItem, toggleItem }), [openItem, toggleItem]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={cx('root')}>{children}</ul>
    </AccordionContext.Provider>
  );
};

export default AccordionRoot;
