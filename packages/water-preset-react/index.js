const react = require('@vitejs/plugin-react');
const { defineConfig } = require('vite');

module.exports = {
  viteConfig: defineConfig({
    plugins: [react()],
    server: {
      port: 8201,
    },
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
