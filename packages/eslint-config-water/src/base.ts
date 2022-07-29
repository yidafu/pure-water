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
};

export = baseEslintConfig;
