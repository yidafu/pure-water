import { Linter } from 'eslint';
import baseEslintConfig from './base';
import vueEslintConfig from './vue';
import vue3EslintConfig from './vue3';

const ESLINT_CONFIG_MAP = new Map<string, Linter.Config>([
  ['base', baseEslintConfig],
  ['vue', vueEslintConfig],
  ['vue3', vue3EslintConfig],
]);

export default baseEslintConfig;

export {
  baseEslintConfig,
  vueEslintConfig,
  vue3EslintConfig,
  ESLINT_CONFIG_MAP,
};
