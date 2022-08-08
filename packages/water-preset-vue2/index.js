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
        [
          '@babel/preset-env',
          { targets: '> 2%, not dead' },
        ],
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
