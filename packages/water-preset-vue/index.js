const vue = require('@vitejs/plugin-vue');
const { defineConfig } = require('vite');

module.exports = {
  viteConfig: defineConfig({
    plugins: [vue()],
  }),
  plugins: {
    lint: {
      presetEslint: 'vue',
      eslint: {
        entry: ['src/**/*.ts', 'src/**/*.vue'],
      },
      stylelint: {
        entry: ['src/**/*.css', 'src/**/*.scss'],
      },
      presetCommitlint: 'recommended',
    },
  },
};
