import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';

import baseEslintConfig from './base';

const reactBaseEslintConfig: Linter.Config = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/jsx-runtime',
  ],
  rules: {
    'import/extensions': ['error', { ts: 'always', tsx: 'never' }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/button-has-type': 'warn',
  },
};

const reactEslintConfig = deepmerge(baseEslintConfig, reactBaseEslintConfig);

export = reactEslintConfig;
