import { createPortal } from 'react-dom';
import type { ReactNode, Ref } from 'react';

import { useSnackbarContext } from './SnackbarRoot';
import cx from './cx';

import usePortalRoot from '@/hooks/atomic/usePortalRoot';
import useAnimationTransition from '@/hooks/atomic/useAnimationTransition';
import { slideFade } from '@/utils/animations';

type SnackbarPanelProps = {
  children: ReactNode;
};

const SnackbarPanel = ({ children }: SnackbarPanelProps) => {
  const { isOpen, close } = useSnackbarContext();

  const root = usePortalRoot('snackbar-root');

  const { targetRef, shouldRender } = useAnimationTransition({
    trigger: isOpen,
    strategy: slideFade,
    onUnmount: close,
  });

  if (!root || !shouldRender) return null;

  return createPortal(
    <div ref={targetRef as Ref<HTMLDivElement>} className={cx('snackbar-panel')}>
      <div className={cx('snackbar-panel-message')}>{children}</div>
      <button className={cx('snackbar-panel-close')} aria-label='닫기' onClick={close} />
    </div>,
    root,
  );
};

export default SnackbarPanel;
