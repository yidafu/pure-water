import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';

import baseEslintConfig from './base';

const vue3BaseEslintConfig: Linter.Config = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', 'check-file'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },
  rules: {
    'check-file/folder-match-with-fex': [
      'error',
      {
        '*.test.{js,jsx,ts,tsx}': '**/__tests__/',
        '*.styled.{jsx,tsx}': '**/pages/',
      },
    ],
    'check-file/filename-naming-convention': [
      'error',
      {
        '**/*.{jsx,tsx}': 'CAMEL_CASE',
        '**/*.{js,ts}': 'KEBAB_CASE',
      },
    ],
    'check-file/no-index': 'error',
    'check-file/folder-naming-convention': [
      'error',
      {
        'src/**/': 'CAMEL_CASE',
        'mocks/*/': 'KEBAB_CASE',
      },
    ],
  },
};

const vue3EslintConfig = deepmerge(baseEslintConfig, vue3BaseEslintConfig);

export = vue3EslintConfig;
