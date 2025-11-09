import { useEffect, useRef } from 'react';

const usePortalRoot = (id: string) => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let $root = document.getElementById(id);

    if (!$root) {
      $root = document.createElement('div');
      $root.id = id;
      document.body.appendChild($root);
    }

    rootRef.current = $root;
  }, [id]);

  return rootRef.current;
};

export default usePortalRoot;
