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
          onClose={() => setAlertOpen(false)}
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
          onClose={() => setConfirmOpen(false)}
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
          onClose={() => setFormOpen(false)}
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

export const Nested: Story = {
  render: () => {
    const [parentOpen, setParentOpen] = useState(false);
    const [childOpen, setChildOpen] = useState(false);

    const closeParent = () => {
      setChildOpen(false);
      setParentOpen(false);
    };

    return (
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Nested Modals</h3>
        <button onClick={() => setParentOpen(true)}>부모 모달 열기</button>

        <Modal id='parent-modal' isOpen={parentOpen} onClose={closeParent} closeOnClickOutside>
          <Modal.Header title='부모 모달' onClose={closeParent} />
          <Modal.Content>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '600px',
                height: '400px',
              }}
            >
              <p>이 모달 안에서 또 다른 모달을 열 수 있습니다.</p>
              <input type='text' placeholder='부모 모달 입력 필드' />
              <button type='button'>부모 모달 액션 버튼 1</button>
              <button type='button'>부모 모달 액션 버튼 2</button>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                포커스 가능한 링크
              </a>
              <button type='button' onClick={() => setChildOpen(true)}>
                자식 모달 열기
              </button>
            </div>
          </Modal.Content>
          <Modal.Footer>
            <button onClick={closeParent}>닫기</button>
          </Modal.Footer>
        </Modal>

        <Modal id='child-modal' isOpen={childOpen} onClose={() => setChildOpen(false)} closeOnClickOutside>
          <Modal.Header title='자식 모달' onClose={() => setChildOpen(false)} />
          <Modal.Content>
            <p>이 모달이 최상단이기 때문에 배경 딤 처리가 이 모달에만 적용됩니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <button onClick={() => setChildOpen(false)}>자식 모달 닫기</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};
