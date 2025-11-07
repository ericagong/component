import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import cx from './cx';

import useSingleSelect from '@/hooks/atomic/useSingleSelect';

type AccordionContextValue = {
  openItem: string | null;
  toggle: (value: string) => void;
};

type AccordionRootProps = {
  children: ReactNode;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion compound components must be used within <AccordionRoot>');
  }

  return context;
};

const AccordionRoot = ({ children }: AccordionRootProps) => {
  const { selected: openItem, toggle } = useSingleSelect<string>(null);

  const contextValue = useMemo(
    () => ({
      openItem,
      toggle,
    }),
    [openItem, toggle],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <ul className={cx('root')}>{children}</ul>
    </AccordionContext.Provider>
  );
};

export { useAccordionContext };
export default AccordionRoot;
