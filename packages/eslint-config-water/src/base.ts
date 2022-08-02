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
  },
};

export = baseEslintConfig;
