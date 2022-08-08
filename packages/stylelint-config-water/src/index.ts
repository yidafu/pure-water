import { Config } from 'stylelint';

const stylelintConfig: Config = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss',
  ],
  rules: {
    'order/properties-alphabetical-order': 'always',
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['*.vue', '**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
};

export = stylelintConfig;
