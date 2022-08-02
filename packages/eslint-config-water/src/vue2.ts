import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';
import baseEslintConfig from './base';

const vueBaseEslintConfig: Linter.Config = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};

const vue2EslintConfig: Linter.Config = deepmerge(baseEslintConfig, vueBaseEslintConfig);

export = vue2EslintConfig;
