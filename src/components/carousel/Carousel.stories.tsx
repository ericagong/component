import type { Meta, StoryObj } from '@storybook/react-vite';

import Carousel from './Carousel';

type Story = StoryObj<typeof Carousel>;

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Default: Story = {
  render: () => <Carousel />,
  parameters: {
    docs: {
      source: {
        code: `
        import Carousel from './Carousel';

        const Example = () => {
          return (
            <Carousel />
          );
        };
        `,
      },
    },
  },
};
