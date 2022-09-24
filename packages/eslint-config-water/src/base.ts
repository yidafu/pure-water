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
    // rewrite airbnb config, remove ForOfStatement limit
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
};

export = baseEslintConfig;
