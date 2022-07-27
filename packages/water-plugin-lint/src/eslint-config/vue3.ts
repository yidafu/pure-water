import { deepmerge } from '@pure/api';
import { Linter } from 'eslint';
import { baseEslintConfig } from './base';

const vue3BaseEslintConfig: Linter.Config = {
  parser: 'vue-eslint-parser',
  extends: [ 'plugin:vue/vue3-recommended' ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    vueFeatures: {
      filter: true,
      interpolationAsNonHTML: false,
    },
  },
};

const vue3EslintConfig = deepmerge(baseEslintConfig, vue3BaseEslintConfig);

export { vue3EslintConfig }; 
