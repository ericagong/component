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
        <Accordion.Trigger>Faker, THE LEGEND</Accordion.Trigger>
        <Accordion.Content>모든 길은 결국 다 저를 통합니다.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value='item-2'>
        <Accordion.Trigger>결국 중요한 것은?</Accordion.Trigger>
        <Accordion.Content>끊임없는 노력과 자기발전</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
