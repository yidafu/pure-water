const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');

module.exports = {
  viteConfig: defineConfig({
    plugins: [react()],
  }),
  plugins: {
    lint: {
      presetEslint: 'react',
      eslint: {
        entry: ['src/**/*.ts', 'src/**/*.tsx'],
      },
      stylelint: {
        entry: ['src/**/*.css', 'src/**/*.scss'],
      },
      presetCommitlint: 'recommended',
    },
  },
};
