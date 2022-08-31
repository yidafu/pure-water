module.exports = {
  plugins: {
    lint: {
      presetEslint: 'weapp',
      eslint: {
        entry: ['miniprogram/**/*.ts'],
      },
      stylelint: {
        entry: ['miniprogram/**/*.scss'],
      },
      presetCommitlint: 'recommended',
    },
  },
};
