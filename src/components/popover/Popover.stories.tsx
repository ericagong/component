import type { Meta, StoryObj } from '@storybook/react-vite';

import Popover from './index';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>프로필 보기</Popover.Trigger>
      <Popover.Panel>
        <div style={{ padding: '16px', width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <strong style={{ fontSize: '14px' }}>홍길동</strong>
          <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>메일로 새로운 소식을 받아보세요.</p>
          <button
            type='button'
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
            }}
          >
            알림 설정
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Popover>
  <Popover.Trigger>프로필 보기</Popover.Trigger>
  <Popover.Panel>
    <div style={{ padding: '16px', width: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <strong style={{ fontSize: '14px' }}>홍길동</strong>
      <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>메일로 새로운 소식을 받아보세요.</p>
      <button
        type='button'
        style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: '1px solid #ddd',
          backgroundColor: '#f5f5f5',
          cursor: 'pointer',
        }}
      >
        알림 설정
      </button>
    </div>
  </Popover.Panel>
</Popover>`,
      },
    },
  },
};

export const WithList: Story = {
  render: () => (
    <Popover>
      <Popover.Trigger>빠른 작업</Popover.Trigger>
      <Popover.Panel>
        <div style={{ padding: '12px 0', minWidth: '180px' }}>
          <button
            type='button'
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              textAlign: 'left',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            초대 링크 복사
          </button>
          <button
            type='button'
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              textAlign: 'left',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            프로젝트 설정
          </button>
          <button
            type='button'
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              textAlign: 'left',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            팀원 관리
          </button>
        </div>
      </Popover.Panel>
    </Popover>
  ),
};
