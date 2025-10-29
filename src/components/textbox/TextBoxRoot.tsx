import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useAutoRows from '@/hooks/useAutoRows';

type TextBoxContextValue = ReturnType<typeof useAutoRows>;

const TextBoxContext = createContext<TextBoxContextValue | null>(null);

type TextBoxRootProps = {
  minRows?: number;
  maxRows?: number;
  children: ReactNode;
};

const TextBoxRoot = ({ minRows = 3, maxRows = 15, children }: TextBoxRootProps) => {
  const autoRows = useAutoRows({ min: minRows, max: maxRows });

  const contextValue = useMemo(() => autoRows, [autoRows]);

  return <TextBoxContext.Provider value={contextValue}>{children}</TextBoxContext.Provider>;
};

const useTextBoxContext = () => {
  const ctx = useContext(TextBoxContext);

  if (!ctx) throw new Error('TextBox compound components must be used within <TextBoxRoot>');

  return ctx;
};

export default TextBoxRoot;
export { useTextBoxContext };
