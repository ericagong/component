import type { ReactNode } from 'react';

import { useAccordionContext } from './AccordionRoot';
import { useAccordionItemContext } from './AccordionItem';
import cx from './cx';

type AccordionTriggerProps = { children: ReactNode };

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  const { toggleItem, openItem } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const isOpen = openItem === value;
  const handleClick = () => toggleItem(value);

  return (
    <button type='button' onClick={handleClick} className={cx('trigger', { 'is-open': isOpen })}>
      {children}
    </button>
  );
};

export default AccordionTrigger;
