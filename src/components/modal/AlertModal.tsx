import Modal from './Modal';

type AlertModalProps = {
  id: string;
  isOpen: boolean;
  close: () => void;
  content: string;
};

const AlertModal = ({ id, isOpen, close, content }: AlertModalProps) => {
  return (
    <Modal id={id} isOpen={isOpen} close={close}>
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
