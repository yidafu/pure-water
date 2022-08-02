import { UserConfig } from '@commitlint/types';
import { bizModulePlugin } from './biz-module-plugin';

export const STRICT_COMMITLINT_CONFIG: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 30],

    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', ['camel-case', 'pascal-case', 'lower-case']],

    'subject-max-length': [2, 'always', 80],
    'subject-min-length': [2, 'always', 20],
    'subject-biz-module': [2, 'always'],

    'body-empty': [2, 'never'],
    'body-min-length': [2, 'always', 50],
    'body-case': [2, 'always', ['camel-case', 'pascal-case', 'pascal-case', 'upper-case', 'lower-case']],
  },
  plugins: [bizModulePlugin],
};
