// storybook entry point
import path from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  viteFinal: async (conf) => {
    conf.resolve = {
      ...conf.resolve,
      alias: {
        ...conf.resolve?.alias,
        '@': path.resolve(__dirname, '../src'),
      },
    };

    return conf;
  },
};

export default config;
