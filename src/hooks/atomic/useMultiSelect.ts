import { useState, useCallback } from 'react';

type UseMultiSelectReturn<T extends string = string> = {
  selected: T[];
  toggle: (value: T) => void;
  clear: () => void;
};

const useMultiSelect = <T extends string>(initialValues: T[] = []): UseMultiSelectReturn<T> => {
  const [selected, setSelected] = useState<T[]>(initialValues);

  const toggle = useCallback((value: T) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  return { selected, toggle, clear };
};

export default useMultiSelect;
