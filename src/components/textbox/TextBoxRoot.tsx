import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';

import useAutoRows from '@/hooks/features/useAutoRows';

type TextBoxContextValue = ReturnType<typeof useAutoRows>;

type TextBoxRootProps = {
  minRows?: number;
  maxRows?: number;
  children: ReactNode;
};

const TextBoxContext = createContext<TextBoxContextValue | null>(null);

const useTextBoxContext = () => {
  const context = useContext(TextBoxContext);

  if (!context) throw new Error('TextBox compound components must be used within <TextBoxRoot>');

  return context;
};

const TextBoxRoot = ({ minRows = 3, maxRows = 5, children }: TextBoxRootProps) => {
  const autoRows = useAutoRows({ min: minRows, max: maxRows });
  const value = useMemo(() => autoRows, [autoRows]);

  return <TextBoxContext.Provider value={value}>{children}</TextBoxContext.Provider>;
};

export { useTextBoxContext };
export default TextBoxRoot;
