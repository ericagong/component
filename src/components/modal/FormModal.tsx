import type { ReactNode, SyntheticEvent } from 'react';

import Modal from './Modal';

type FormModalProps = {
  id: string;
  isOpen: boolean;
  children: ReactNode;
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
  close: () => void;
};

const FormModal = ({ id, isOpen, children, onSubmit, onCancel, close }: FormModalProps) => {
  const formId = `form-${id}`;

  const handleSumbit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    onSubmit?.(data);
    close();
  };

  const handleClose = () => {
    onCancel?.();
    close();
  };

  return (
    <Modal id={id} isOpen={isOpen} close={close} closeOnClickOutside>
      <Modal.Header close={handleClose} />
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
