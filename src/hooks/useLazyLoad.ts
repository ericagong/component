import { useState, useEffect } from 'react';

import useVisibilityTrigger from './useVisibilityTrigger';

type UseLazyLoadOptions = {
  once?: boolean;
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
};

const useLazyLoad = <T extends HTMLElement = HTMLElement>(options: UseLazyLoadOptions = {}) => {
  const { targetRef, isVisible } = useVisibilityTrigger<T>(options);

  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isVisible) setShouldLoad(true);
  }, [isVisible]);

  return { targetRef, shouldLoad };
};

export default useLazyLoad;
