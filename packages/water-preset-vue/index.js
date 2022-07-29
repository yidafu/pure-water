const vue = require('@vitejs/plugin-vue');

module.exports = {
  viteConfig: {
    plugins: [vue()],
  },
  plugins: {
    lint: {
      presetEslint: 'vue3',
      eslint: {},
      presetCommitlint: 'recommended',
    },
  },
};
