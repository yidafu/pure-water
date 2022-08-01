import { Linter } from 'eslint';
import baseEslintConfig from './base';
import vue2EslintConfig from './vue2';
import vueEslintConfig from './vue';

const ESLINT_CONFIG_MAP = new Map<string, Linter.Config>([
  ['base', baseEslintConfig],
  ['vue2', vue2EslintConfig],
  ['vue', vueEslintConfig],
]);

export default baseEslintConfig;

export {
  baseEslintConfig,
  vue2EslintConfig,
  vueEslintConfig,
  ESLINT_CONFIG_MAP,
};
