import { deepmerge } from '@pure-org/api';
import { Linter } from 'eslint';

import baseEslintConfig from './base';

const nodeBaseEslintConfig: Linter.Config = {
  env: {
    node: true,
    jest: true,
  },
};

const nodeEslintConfig = deepmerge(baseEslintConfig, nodeBaseEslintConfig);

export = nodeEslintConfig;
