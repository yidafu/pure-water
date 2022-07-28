import { Linter } from 'eslint';

export const baseEslintConfig: Linter.Config = {
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  plugins: ['import'],
  parserOptions: {
    project: './tsconfig.json',
  },
};
