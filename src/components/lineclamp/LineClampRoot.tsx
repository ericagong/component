import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import useClamp from '@/hooks/useClamp';

type LineClampContextValue = ReturnType<typeof useClamp> & {
  text: string;
  maxLines: number;
};

const LineClampContext = createContext<LineClampContextValue | null>(null);

type LineClampRootProps = {
  text: string;
  maxLines: number;
  children: ReactNode;
};

const useLineClampContext = () => {
  const ctx = useContext(LineClampContext);

  if (!ctx) throw new Error('LineClamp compound components must be used within <LineClampRoot />');

  return ctx;
};

const LineClampRoot = ({ text, maxLines, children }: LineClampRootProps) => {
  const clamp = useClamp({ text, maxLines });
  const value = useMemo(() => {
    return { ...clamp, text, maxLines };
  }, [clamp, text, maxLines]);

  return <LineClampContext.Provider value={value}>{children}</LineClampContext.Provider>;
};

export default LineClampRoot;
export { useLineClampContext };
