import type { ReactNode } from 'react';

import { useAccordionContext } from './AccordionRoot';
import { useAccordionItemContext } from './AccordionItem';
import cx from './cx';

type AccordionContentProps = { children: ReactNode };

const AccordionContent = ({ children }: AccordionContentProps) => {
  const { openItem } = useAccordionContext();

  const { value } = useAccordionItemContext();

  const isOpen = openItem === value;

  return <div className={cx('content', { 'is-open': isOpen })}>{children}</div>;
};

export default AccordionContent;
