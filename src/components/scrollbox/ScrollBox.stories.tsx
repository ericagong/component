import type { Meta, StoryObj } from '@storybook/react-vite';

import data from './data';

import ScrollBox from './index';


const WIDTH = 200;
const HEIGHT = 400;

const LazyLoadImage = ({ id, imgUrl, description }: { id: string; imgUrl: string; description: string }) => (
  <img key={id} src={imgUrl} alt={description} width={WIDTH} height={HEIGHT} loading='lazy' />
);

const meta: Meta<typeof ScrollBox> = {
  title: 'Components/ScrollBox',
  component: ScrollBox,
};

export default meta;

type Story = StoryObj<typeof ScrollBox>;

export const Default: Story = {
  render: () => (
    <ScrollBox>
      <ScrollBox.Button direction='prev' />
      <ScrollBox.Content>
        {data.map((item, index) => (
          <ScrollBox.Item key={item.id} index={index}>
            <LazyLoadImage {...item} />
          </ScrollBox.Item>
        ))}
      </ScrollBox.Content>
      <ScrollBox.Button direction='next' />
    </ScrollBox>
  ),
};
