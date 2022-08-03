import { Linter } from 'eslint';

const baseEslintConfig: Linter.Config = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'consistent-return': 'warn',
    'import/no-cycle': 'warn',
    'import/order': ['error', {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
      'newlines-between': 'always-and-inside-groups',
      alphabetize: {
        order: 'asc',
      },
    }],
  },
};

export = baseEslintConfig;
