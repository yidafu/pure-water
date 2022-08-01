const { defineConfig } = require('vite');
const vue = require('@vitejs/plugin-vue');

module.exports = {
  viteConfig: defineConfig({
    plugins: [vue()],
  }),
  plugins: {
    lint: {
      presetEslint: 'vue',
      eslint: {},
      presetCommitlint: 'recommended',
    },
  },
};
