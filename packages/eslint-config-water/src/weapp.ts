import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';

import baseEslintConfig from './base';

const weappEslintConfig: Linter.Config = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  ecmaFeatures: {
    modules: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
} as any;

const vue3EslintConfig = deepmerge(baseEslintConfig, weappEslintConfig);

export = vue3EslintConfig;
