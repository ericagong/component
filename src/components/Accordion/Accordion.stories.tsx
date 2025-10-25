import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from './index';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <Accordion>
      <Accordion.Item value='item-1'>
        <Accordion.Trigger>What is cheese?</Accordion.Trigger>
        <Accordion.Content>Cheese is a dairy product made from milk 🧀</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value='item-2'>
        <Accordion.Trigger>Who is 은채?</Accordion.Trigger>
        <Accordion.Content>은채는 Erica입니다 😎</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
