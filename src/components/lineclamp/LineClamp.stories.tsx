import type { Meta, StoryObj } from '@storybook/react-vite';

import LineClamp from './index';

const meta: Meta<typeof LineClamp> = {
  title: 'Components/LineClamp',
  component: LineClamp,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LineClamp>;

export const Default: Story = {
  render: () => (
    <LineClamp
      text={`굉장히 긴 내용을 쓸건데요. 이 텍스트는 단순히 테스트용으로 작성된 문장입니다.
        줄이 자동으로 클램프되어야 하고, 세 줄 이상 넘어가는 경우에는 '더보기' 버튼이 노출됩니다.
        이 문장은 실제로는 사용자가 입력한 긴 문장을 시뮬레이션하기 위한 것입니다.
        클램프가 정상적으로 작동한다면, 아래 문장은 처음 세 줄까지만 표시되어야 합니다.`}
      maxLines={3}
    />
  ),
};
