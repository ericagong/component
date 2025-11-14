import { useRef } from 'react';
import type { ReactNode, RefObject, Ref } from 'react';
import { createPortal } from 'react-dom';

import cx from './cx';

import usePortalRoot from '@/hooks/atomic/usePortalRoot';
import useFocusTrap from '@/hooks/atomic/useFocusTrap';
import useScrollLock from '@/hooks/atomic/useScrollLock';
import useEscapeClose from '@/hooks/atomic/useEscapeClose';

type ModalProps = {
  id: string;
  isOpen: boolean;
  close: () => void;
  closeOnClickOutside?: boolean;
  children: ReactNode;
};

type ModalOverlayProps = {
  close: () => void;
  closeOnClickOutside?: boolean;
};

type ModalPanelProps = {
  panelRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
};

const ModalOverlay = ({ close, closeOnClickOutside }: ModalOverlayProps) => {
  const handleClick = () => {
    if (closeOnClickOutside) close();
  };

  return <div className={cx('modal-overlay')} onClick={handleClick} />;
};

const ModalPanel = ({ panelRef, children }: ModalPanelProps) => {
  return (
    <div ref={panelRef as Ref<HTMLDivElement>} className={cx('modal-panel')} onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

const ModalRoot = ({ isOpen, close, closeOnClickOutside, children }: ModalProps) => {
  const $portalRoot = usePortalRoot('modals-root');

  const panelRef = useRef<HTMLDivElement>(null);

  useFocusTrap({ isOpen, targetRef: panelRef });
  useScrollLock({ isOpen });
  useEscapeClose({ isOpen, close });

  if (!isOpen || !$portalRoot) return null;

  return createPortal(
    <div className={cx('modal-root')}>
      <ModalOverlay close={close} closeOnClickOutside={closeOnClickOutside} />
      <ModalPanel panelRef={panelRef}>{children}</ModalPanel>
    </div>,
    $portalRoot,
  );
};

type ModalHeaderProps = {
  title?: string;
  close?: () => void;
  children?: ReactNode;
};

type ModalContentProps = {
  children: ReactNode;
};

type ModalFooterProps = {
  children: ReactNode;
};

const ModalHeader = ({ title, children, close }: ModalHeaderProps) => (
  <div className={cx('modal-header')}>
    <div className={cx('title')}>{title}</div>
    {children}
    <button className={cx('close-trigger')} onClick={close} />
  </div>
);

const ModalContent = ({ children }: ModalContentProps) => <div className={cx('modal-content')}>{children}</div>;

const ModalFooter = ({ children }: ModalFooterProps) => <div className={cx('modal-footer')}>{children}</div>;

const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter,
});

export default Modal;
