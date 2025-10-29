import type { Meta, StoryObj } from '@storybook/react-vite';

import Tooltip from './index';

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export const Default: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger>툴팁 버튼</Tooltip.Trigger>
      <Tooltip.Content>이건 툴팁 내용입니다</Tooltip.Content>
    </Tooltip>
  ),
};

export default meta;
