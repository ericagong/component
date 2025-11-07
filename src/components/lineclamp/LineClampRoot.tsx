import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useClone from '@/hooks/atomic/useClone';
import useLineCount from '@/hooks/atomic/useLineCount';
import useClamp from '@/hooks/features/useClamp';

type LineClampContextValue = {
  text: string;
  maxLines: number;
  isClamped: boolean;
  isExpanded: boolean;
  toggle: () => void;
  targetRef: ReturnType<typeof useClone>['targetRef'];
  cloneRef: ReturnType<typeof useClone>['cloneRef'];
};

type LineClampRootProps = {
  text: string;
  maxLines?: number;
  children: ReactNode;
};

const LineClampContext = createContext<LineClampContextValue | null>(null);

const useLineClampContext = () => {
  const context = useContext(LineClampContext);

  if (!context) throw new Error('LineClamp compound components must be used within <LineClampRoot />');

  return context;
};

const LineClampRoot = ({ text, maxLines = 3, children }: LineClampRootProps) => {
  const { targetRef, cloneRef } = useClone<HTMLDivElement>();

  const lineCount = useLineCount({ targetRef: cloneRef, text });

  const { isClamped, isExpanded, toggle } = useClamp({
    targetRef,
    lineCount,
    maxLines,
  });

  const value = useMemo<LineClampContextValue>(
    () => ({
      text,
      maxLines,
      isClamped,
      isExpanded,
      toggle,
      targetRef,
      cloneRef,
    }),
    [text, maxLines, isClamped, toggle, targetRef, cloneRef],
  );

  return <LineClampContext.Provider value={value}>{children}</LineClampContext.Provider>;
};

export default LineClampRoot;
export { useLineClampContext };
