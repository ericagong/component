import type { Meta, StoryObj } from '@storybook/react-vite';

import Tabs from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Template: Story = {
  render: () => (
    <Tabs defaultValue='tab1'>
      <Tabs.List>
        <Tabs.Trigger value='tab1'>탭 1</Tabs.Trigger>
        <Tabs.Trigger value='tab2'>탭 2</Tabs.Trigger>
        <Tabs.Trigger value='tab3'>탭 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='tab1'>탭 1의 콘텐츠입니다.</Tabs.Content>
      <Tabs.Content value='tab2'>탭 2의 콘텐츠입니다.</Tabs.Content>
      <Tabs.Content value='tab3'>탭 3의 콘텐츠입니다.</Tabs.Content>
    </Tabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue='tab1'>
  <Tabs.List>
    <Tabs.Trigger value='tab1'>탭 1</Tabs.Trigger>
    <Tabs.Trigger value='tab2'>탭 2</Tabs.Trigger>
    <Tabs.Trigger value='tab3'>탭 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value='tab1'>탭 1의 콘텐츠입니다.</Tabs.Content>
  <Tabs.Content value='tab2'>탭 2의 콘텐츠입니다.</Tabs.Content>
  <Tabs.Content value='tab3'>탭 3의 콘텐츠입니다.</Tabs.Content>
</Tabs>`,
      },
    },
  },
};
