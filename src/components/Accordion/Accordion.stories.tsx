import type { Meta, StoryObj } from '@storybook/react-vite';

import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '.';

const meta: Meta<typeof AccordionRoot> = {
  title: 'Components/Accordion',
  component: AccordionRoot,
};

export default meta;

type Story = StoryObj<typeof AccordionRoot>;

export const Basic: Story = {
  render: () => (
    <AccordionRoot>
      <AccordionItem value='item-1'>
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>React is a JavaScript library for building user interfaces.</AccordionContent>
      </AccordionItem>
      <AccordionItem value='item-2'>
        <AccordionTrigger>What is Headless UI?</AccordionTrigger>
        <AccordionContent>Headless UI separates logic from presentation.</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  ),
};
