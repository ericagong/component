import { useEffect, useSyncExternalStore } from 'react';

import modalManager from '@/managers/modalManager';

type UseModalManagerParams = {
  id: string;
  isOpen: boolean;
};

type UseModalManagerReturn = {
  isTop: boolean;
};

const useModalManager = ({ id, isOpen }: UseModalManagerParams): UseModalManagerReturn => {
  useEffect(() => {
    if (isOpen) modalManager.register(id);

    return () => modalManager.unregister(id);
  }, [id, isOpen]);

  const subscribe = (callback: () => void) => {
    const unsubscribe = modalManager.subscribe(callback);

    return unsubscribe;
  };

  const getSnapshot = () => modalManager.isTop(id);

  const getServerSnapshot = () => false;

  const isTop = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { isTop };
};

export default useModalManager;
