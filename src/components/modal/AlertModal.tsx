import Modal from './Modal';

type AlertModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  content: string;
};

const AlertModal = ({ id, isOpen, onClose, content }: AlertModalProps) => {
  return (
    <Modal id={id} isOpen={isOpen} onClose={onClose}>
      <Modal.Content>
        <p>{content}</p>
      </Modal.Content>
      <Modal.Footer>
        <button onClick={close}>확인</button>
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
