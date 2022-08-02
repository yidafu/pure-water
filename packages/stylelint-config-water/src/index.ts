import { Config } from 'stylelint';

const stylelintConfig: Config = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
  ],
  rules: {},
};

export = stylelintConfig;
