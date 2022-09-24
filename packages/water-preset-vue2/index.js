const path = require('path');

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
      presets: [
        // [
        '@vue/babel-preset-app',
        //   { targets: ['> 2%', 'not dead', 'last 2 versions'] },
        // ],
      ],
    },
    'webpack-config': {
      compress: process.env.NODE_ENV === 'production',
      customConfig(config, ctx) {
        config.resolve.alias.set('@', path.join(ctx.projectRoot, 'src'));
      },
    },
  },
};
