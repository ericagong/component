import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Modal from './Modal';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';
import FormModal from './FormModal';

const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
  decorators: [
    (Story) => {
      const existing = document.getElementById('modals-root');

      if (!existing) {
        const root = document.createElement('div');

        root.id = 'modals-root';

        document.body.appendChild(root);
      }

      return <Story />;
    },
  ],
};
export default meta;

type Story = StoryObj;

export const Alert: Story = {
  render: () => {
    const [alertOpen, setAlertOpen] = useState(false);

    return (
      <div style={{ padding: '20px' }}>
        <h3>Alert Modal</h3>
        <button onClick={() => setAlertOpen(true)}>Alert Modal 열기</button>

        <AlertModal
          id='alert-1'
          isOpen={alertOpen}
          close={() => setAlertOpen(false)}
          content='이것은 알림 모달입니다.'
        />
      </div>
    );
  },
};

export const Confirm: Story = {
  render: () => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Confirm Modal</h3>
        <button onClick={() => setConfirmOpen(true)}>Confirm Modal 열기</button>

        <div>결과: {isConfirmed === null ? '아직 없음' : isConfirmed ? '확인됨' : '취소됨'}</div>

        <ConfirmModal
          id='confirm-1'
          isOpen={confirmOpen}
          isConfirmed={isConfirmed}
          close={() => setConfirmOpen(false)}
          onConfirm={() => {
            setIsConfirmed(true);
            setConfirmOpen(false);
          }}
          onCancel={() => {
            setIsConfirmed(false);
            setConfirmOpen(false);
          }}
        >
          <p>진행하시겠습니까?</p>
        </ConfirmModal>
      </div>
    );
  },
};

export const Form: Story = {
  render: () => {
    const [formOpen, setFormOpen] = useState(false);
    const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Form Modal</h3>
        <button onClick={() => setFormOpen(true)}>Form Modal 열기</button>

        {submitted && (
          <pre style={{ marginTop: '12px', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        )}

        <FormModal
          id='form-1'
          isOpen={formOpen}
          close={() => setFormOpen(false)}
          onSubmit={(data) => {
            const obj = Object.fromEntries(data.entries());
            setSubmitted(obj);
          }}
        >
          <input type='text' name='product' placeholder='상품명' />
          <input type='number' name='price' placeholder='가격' />
          <label>
            품절
            <input type='checkbox' name='soldOut' />
          </label>
        </FormModal>
      </div>
    );
  },
};
