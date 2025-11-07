import { useState, useCallback } from 'react';

type UseSingleSelectReturn<T extends string = string> = {
  selected: T | null;
  toggle: (value: T) => void;
};

const useSingleSelect = <T extends string>(initialValue: T | null = null): UseSingleSelectReturn<T> => {
  const [selected, setSelected] = useState<T | null>(initialValue);

  const toggle = useCallback((value: T) => {
    setSelected((prev) => (prev === value ? null : value));
  }, []);

  return { selected, toggle };
};

export default useSingleSelect;
