import React, { useState, useEffect } from 'react';
import type { Decorator } from '@storybook/react-vite';

import ensureIframePortalRoot from '../utils/ensureIframePortalRoot';

const withPortalRoot = (id: string): Decorator => {
  return (Story, context) => {
    const Wrapper = () => {
      const [container, setContainer] = useState<HTMLElement | null>(null);

      // useEffect(() => {
      //   let rafId: number;

      //   const check = () => {
      //     const $root = ensureIframePortalRoot(id);

      //     console.log($root);

      //     if ($root) setContainer($root);
      //     else {
      //       rafId = requestAnimationFrame(check);
      //     }
      //   };

      //   check();

      //   return () => cancelAnimationFrame(rafId);
      // }, []);

      return <Story {...context} args={{ ...context.args, $portalContainer: container }} />;
    };

    return <Wrapper />;
  };
};

export default withPortalRoot;
