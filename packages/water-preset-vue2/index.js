
module.exports = {
  bundler: 'webpack',
  plugins: {
    lint: {
      presetEslint: 'vue2',
      presetCommitlint: 'loose',
      eslint: {},
    },
    vue2: {},
    babel: {
      typeCheck: false,
      presets: [ '@babel/preset-env' ],
    },
    'webpack-config': {},
  },
};
