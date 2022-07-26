module.exports = {
  name: '<%= appName %>',
  plugins: {
    lint: {
      presetEslint: 'node',
      eslint: {
        entry: ['src/**/*.ts', 'test/**/*.ts'],
      },
      stylelint: {
        disable: true,
      },
      presetCommitlint: 'recommended',
    },
  },
};
