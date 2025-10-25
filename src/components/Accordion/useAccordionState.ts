import { useState, useCallback } from 'react';

type UseAccordionState = {
  openItem: string | null;
  toggleItem: (value: string) => void;
};

const useAccordionState = (): UseAccordionState => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = useCallback((value: string) => {
    setOpenItem((prev) => (prev === value ? null : value));
  }, []);

  return { openItem, toggleItem };
};

export default useAccordionState;
