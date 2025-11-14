import type { ReactNode, SyntheticEvent } from 'react';

import Modal from './Modal';

type FormModalProps = {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  onClose: () => void;
};

const FormModal = ({ id, isOpen, children, onSubmit, onCancel, onClose }: FormModalProps) => {
  const formId = `form-${id}`;

  const handleSumbit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    onSubmit?.(data);
    onClose();
  };

  const handleClose = () => {
    onCancel?.();
    onClose();
  };

  return (
    <Modal id={id} isOpen={isOpen} onClose={close} shouldCloseOnClickOutside>
      <Modal.Header onClose={handleClose} />
      <Modal.Content>
        <form id={formId} onSubmit={handleSumbit}>
          {children}
        </form>
      </Modal.Content>
      <Modal.Footer>
        <button type='submit' form={formId}>
          제출
        </button>
        <button type='button' onClick={handleClose}>
          취소
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
