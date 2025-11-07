import { useState, useCallback } from 'react';

type UseExclusiveSelectReturn<T extends string = string> = {
  selected: T;
  select: (value: T) => void;
};

const useExclusiveSelect = <T extends string>(defaultValue: T): UseExclusiveSelectReturn<T> => {
  const [selected, setSelected] = useState<T>(defaultValue);

  const select = useCallback((value: T) => setSelected(value), []);

  return { selected, select };
};

export default useExclusiveSelect;
