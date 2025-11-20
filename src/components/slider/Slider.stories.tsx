import type { Meta, StoryObj } from '@storybook/react-vite';

import Slider from './Slider';

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  render: () => <Slider />,
  parameters: {
    docs: {
      source: {
        code: `
        import Slider from './Slider';

        const slides = [1, 2, 3, 4, 5];

        const Example = () => {
          return (
            <Slider />
          );
        };
        `,
      },
    },
  },
};
