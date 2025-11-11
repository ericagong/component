// storybook 전역 데코레이터

import '../src/styles/index.scss';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: true,
      source: {
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    layout: 'centered',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      exclude: ['as', 'ref', 'children', 'className'],
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
      },
      defaultViewport: 'desktop',
    },
    a11y: {
      disable: false,
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
