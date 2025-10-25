import AccordionRoot from './AccordionRoot';
import AccordionItem from './AccordionItem';
import AccordionTrigger from './AccordionTrigger';
import AccordionContent from './AccordionContent';

const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});

export default Accordion;
