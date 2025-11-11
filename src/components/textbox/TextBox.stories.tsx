import type { Meta, StoryObj } from '@storybook/react-vite';

import TextBox from './index';

const meta: Meta<typeof TextBox> = {
  title: 'Components/TextBox',
  component: TextBox,
};

export default meta;
type Story = StoryObj<typeof TextBox>;

export const Basic: Story = {
  render: () => (
    <TextBox>
      <TextBox.Area placeholder='최소 3줄, 최대 5줄까지' />
    </TextBox>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <TextBox>
          <TextBox.Area placeholder='최소 3줄, 최대 5줄까지' />
        </TextBox>
        `,
      },
    },
  },
};

export const LimitedRange: Story = {
  render: () => (
    <TextBox minRows={5} maxRows={10}>
      <TextBox.Area placeholder='최소 5줄, 최대 10줄까지' />
    </TextBox>
  ),
};
