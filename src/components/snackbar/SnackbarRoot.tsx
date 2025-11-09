import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useTimedDisclosure from '@/hooks/atomic/useTimedDisclosure';

type SnackbarContextValue = ReturnType<typeof useTimedDisclosure>;

type SnackbarRootProps = {
  duration?: number;
  children: ReactNode;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) throw new Error('Snackbar compound components must be used within <SnackbarRoot>');

  return context;
};

const SnackbarRoot = ({ duration = 3000, children }: SnackbarRootProps) => {
  const { isOpen, open, close } = useTimedDisclosure(duration);

  const contextValue = useMemo(() => {
    return { isOpen, open, close };
  }, [isOpen, open, close]);

  return <SnackbarContext.Provider value={contextValue}>{children}</SnackbarContext.Provider>;
};

export default SnackbarRoot;
export { useSnackbarContext };
