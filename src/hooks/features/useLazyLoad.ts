import { useState, useEffect } from 'react';

import useElementVisibility from '../atomic/observer/useElementVisibility';

type UseLazyLoadOptions = {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
};

const useLazyLoad = <T extends HTMLElement = HTMLElement>(options: UseLazyLoadOptions = {}) => {
  const { targetRef, isVisible } = useElementVisibility<T>({
    once: true,
    ...options,
  });

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isVisible) setShouldLoad(true);
  }, [isVisible]);

  return { targetRef, shouldLoad };
};

export default useLazyLoad;
