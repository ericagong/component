import type { Meta, StoryObj } from '@storybook/react-vite';

import Snackbar from './index';
import '@/styles/global.scss'; // 필요 시 전역 스타일 import (선택)

const meta: Meta<typeof Snackbar> = {
  title: 'Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

type Story = StoryObj<typeof Snackbar>;

export const Default: Story = {
  render: () => (
    <Snackbar>
      <Snackbar.Trigger label='Show Snackbar' />
      <Snackbar.Panel>기본 스낵바입니다.</Snackbar.Panel>
    </Snackbar>
  ),
  parameters: {
    docs: {
      source: {
        code: `
        <Snackbar>
          <Snackbar.Trigger label='Show Snackbar' />
          <Snackbar.Panel>기본 스낵바입니다.</Snackbar.Panel>
        </Snackbar>
        `,
      },
    },
  },
};

export const WithCustomDuration: Story = {
  render: () => (
    <Snackbar duration={1000}>
      <Snackbar.Trigger label='1초 후 닫힘' />
      <Snackbar.Panel>1초 뒤 자동으로 닫힙니다.</Snackbar.Panel>
    </Snackbar>
  ),
};

export const MultipleSnackbars: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Snackbar>
        <Snackbar.Trigger label='첫 번째 스낵바' />
        <Snackbar.Panel>첫 번째 알림입니다.</Snackbar.Panel>
      </Snackbar>

      <Snackbar>
        <Snackbar.Trigger label='두 번째 스낵바' />
        <Snackbar.Panel>두 번째 알림입니다.</Snackbar.Panel>
      </Snackbar>

      <Snackbar duration={5000}>
        <Snackbar.Trigger label='세 번째 (5초 유지)' />
        <Snackbar.Panel>세 번째 알림 — 5초간 유지됩니다.</Snackbar.Panel>
      </Snackbar>
    </div>
  ),
};

export const ManualClose: Story = {
  render: () => (
    <Snackbar>
      <Snackbar.Trigger label='수동 닫기 테스트' />
      <Snackbar.Panel>
        <p>닫기 버튼(×)을 눌러 직접 닫을 수 있습니다.</p>
      </Snackbar.Panel>
    </Snackbar>
  ),
};
