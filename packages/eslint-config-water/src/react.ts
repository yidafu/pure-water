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
    'import/extensions': ['error', { ts: 'never', tsx: 'never' }],
    'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.jsx'] }],
    'react/button-has-type': 'warn',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'object-curly-newline': ['error', { minProperties: 2 }],
  },
};

const reactEslintConfig = deepmerge(baseEslintConfig, reactBaseEslintConfig);

export = reactEslintConfig;
