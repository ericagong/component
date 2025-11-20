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
  parameters: {
    docs: {
      source: {
        code: `
        <Tooltip>
          <Tooltip.Trigger>툴팁 버튼</Tooltip.Trigger>
          <Tooltip.Content>이건 툴팁 내용입니다</Tooltip.Content>
        </Tooltip>
        `,
      },
    },
  },
};

export default meta;

export const ScrollBottomTest: Story = {
  render: () => {
    return (
      <div
        style={{
          width: '300px',
          height: '200px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '20px',
          margin: '50px auto',
        }}
      >
        <div style={{ height: '600px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ marginTop: '550px' }}>
            <Tooltip>
              <Tooltip.Trigger>아래쪽 버튼</Tooltip.Trigger>
              <Tooltip.Content>flip upward?</Tooltip.Content>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  },
};
