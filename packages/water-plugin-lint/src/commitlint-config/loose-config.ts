import { UserConfig } from '@commitlint/types';

export const LOOSE_COMMITLINT_CONFIG: UserConfig  = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [1, 'always', 100],
    'header-min-length': [1, 'always', 30],
    
    'body-max-line-length': [1, 'always', 100],
    
    'footer-max-line-length': [1, 'always', 100],

    'scope-empty': [1, 'never'],

    'scope-case': [2, 'always', ['camel-case', 'pascal-case', 'lower-case']],
  },
};