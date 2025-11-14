import type { ReactNode } from 'react';

import Modal from './Modal';

type ConfirmModalProps = {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  isConfirmed: boolean | null;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};

const ConfirmModal = ({ id, isOpen, children, isConfirmed, onConfirm, onCancel, onClose }: ConfirmModalProps) => {
  return (
    <Modal id={id} isOpen={isOpen} onClose={onClose}>
      <Modal.Header title={`#${id}. ${isConfirmed ? '확인된 컨펌' : '확인되지 않은 컨펌'}`} onClose={onClose} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Footer>
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
