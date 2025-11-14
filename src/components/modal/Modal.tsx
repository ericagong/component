import { useRef } from 'react';
import type { ReactNode, RefObject, Ref } from 'react';
import { createPortal } from 'react-dom';

import cx from './cx';

import usePortalRoot from '@/hooks/atomic/usePortalRoot';
import useFocusTrap from '@/hooks/atomic/useFocusTrap';
import useScrollLock from '@/hooks/atomic/useScrollLock';
import useEscapeClose from '@/hooks/atomic/useEscapeClose';
import useModalManager from '@/hooks/features/useModalManager';

type ModalRootProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  shouldCloseOnClickOutside?: boolean;
  children: ReactNode;
};

type ModalOverlayProps = {
  onClose: () => void;
  shouldCloseOnClickOutside?: boolean;
  shouldDimmed?: boolean;
};

type ModalPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

const ModalOverlay = ({ onClose, shouldCloseOnClickOutside = true, shouldDimmed }: ModalOverlayProps) => {
  const handleClick = () => {
    if (shouldCloseOnClickOutside) onClose();
  };

  return <div className={cx('modal-overlay', shouldDimmed && 'dimmed')} onClick={handleClick} />;
};

const ModalPanel = ({ panelRef, children }: ModalPanelProps) => {
  return (
    <div ref={panelRef as Ref<HTMLDivElement>} className={cx('modal-panel')} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

const ModalRoot = ({ id, isOpen, onClose, shouldCloseOnClickOutside, children }: ModalRootProps) => {
  const portalRoot = usePortalRoot('modals-root');
  const panelRef = useRef<HTMLDivElement>(null);

  const { isTop } = useModalManager({ id, isOpen });

  useFocusTrap({ shouldTrapOnFocus: isOpen && isTop, targetRef: panelRef });
  useEscapeClose({ shouldCloseOnEscape: isOpen && isTop, onClose });
  useScrollLock({ shouldLockScroll: isOpen && isTop });

  if (!isOpen || !portalRoot) return null;

  return createPortal(
    <div className={cx('modal-root')}>
      <ModalOverlay onClose={onClose} shouldCloseOnClickOutside={shouldCloseOnClickOutside} shouldDimmed={isTop} />
      <ModalPanel panelRef={panelRef}>{children}</ModalPanel>
    </div>,
    portalRoot,
  );
};

type ModalHeaderProps = {
  title?: string;
  onClose?: () => void;
  children?: ReactNode;
};

type ModalContentProps = {
  children: ReactNode;
};

type ModalFooterProps = {
  children: ReactNode;
};

const ModalHeader = ({ title, children, onClose }: ModalHeaderProps) => (
  <div className={cx('modal-header')}>
    <div className={cx('title')}>{title}</div>
    {children}
    <button className={cx('close-trigger')} onClick={onClose} />
  </div>
);

const ModalContent = ({ children }: ModalContentProps) => <div className={cx('modal-content')}>{children}</div>;

const ModalFooter = ({ children }: ModalFooterProps) => <div className={cx('modal-footer')}>{children}</div>;

// Compound
const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});

export default Modal;
