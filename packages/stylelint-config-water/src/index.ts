import { Config } from 'stylelint';

const stylelintConfig: Config = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  plugins: [
    'stylelint-order',
  ],
  rules: {
    'order/properties-alphabetical-order': 'always',
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
  },
};

export = stylelintConfig;
