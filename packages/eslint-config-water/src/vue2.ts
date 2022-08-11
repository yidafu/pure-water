import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';

import baseEslintConfig from './base';

const vueBaseEslintConfig: Linter.Config = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters'],
          'extends',
          'mixins',
          ['provide', 'inject'],
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          ['props', 'propsData'],
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ],
  },
};

const vue2EslintConfig: Linter.Config = deepmerge(baseEslintConfig, vueBaseEslintConfig);

export = vue2EslintConfig;
