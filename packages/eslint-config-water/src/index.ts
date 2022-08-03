import { Linter } from 'eslint';

import baseEslintConfig from './base';
import vueEslintConfig from './vue';
import vue2EslintConfig from './vue2';

const ESLINT_CONFIG_MAP = new Map<string, Linter.Config>([
  ['base', baseEslintConfig],
  ['vue2', vue2EslintConfig],
  ['vue', vueEslintConfig],
]);

// eslint-disable-next-line import/no-default-export
export default baseEslintConfig;

export {
  baseEslintConfig,
  vue2EslintConfig,
  vueEslintConfig,
  ESLINT_CONFIG_MAP,
};
