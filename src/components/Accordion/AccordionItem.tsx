import { createContext, useContext, useMemo, memo } from 'react';
import type { ReactNode } from 'react';

import cx from './cx';

type AccordionItemContextValue = { value: string };
type AccordionItemProps = { value: string; children: ReactNode };

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export const useAccordionItemContext = () => {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error('AccordionItem compound components must be used within <AccordionItem>');
  }

  return context;
};

const AccordionItemComponent = ({ value, children }: AccordionItemProps) => {
  const contextValue = useMemo(() => ({ value }), [value]);

  return (
    <AccordionItemContext.Provider value={contextValue}>
      <li className={cx('item')}>{children}</li>
    </AccordionItemContext.Provider>
  );
};

const AccordionItem = memo(AccordionItemComponent);
AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
