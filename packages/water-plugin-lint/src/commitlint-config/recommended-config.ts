import { UserConfig } from '@commitlint/types';

export const RECOMMENDED_COMMITLINT_CONFIG: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'header-min-length': [2, 'always', 30],

    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', ['camel-case', 'pascal-case', 'lower-case']],
    'subject-max-length': [2, 'always', 80],
    'subject-min-length': [2, 'always', 5],
  },
};
