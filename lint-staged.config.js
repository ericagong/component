export default {
  '*.{ts,tsx,js,jsx}': (files) => {
    const fileList = files.join(' ');

    return [
      'echo ✨ Formatting source files with Prettier...',
      // format
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
      // eslint
      'echo 🧹 Linting and fixing source files with ESLint...',
      `pnpm lint:js:fix ${fileList}`,
      'echo ✅ Linting complete!',
    ];
  },

  '*.{scss,css}': (files) => {
    const fileList = files.join(' ');

    return [
      'echo ✨ Formatting style files with Prettier...',
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
      'echo 💅 Linting and fixing style files with Stylelint...',
      `pnpm lint:style:fix ${fileList}`,
      'echo ✅ Linting complete!',
    ];
  },

  '*.{md,json,yml,yaml}': (files) => {
    const fileList = files.join(' ');

    return [
      'echo ✨ Formatting markdown and config files with Prettier...',
      `pnpm format ${fileList}`,
      'echo ✅ Formatting complete!',
    ];
  },
};
