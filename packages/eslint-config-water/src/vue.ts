import { deepmerge } from '@pure/api';
import { Linter } from 'eslint';
import baseEslintConfig from './base';

const vueBaseEslintConfig: Linter.Config = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    'parser': '@typescript-eslint/parser',
  },
};

const vueEslintConfig: Linter.Config = deepmerge(baseEslintConfig, vueBaseEslintConfig);

export = vueEslintConfig;