import { Plugin } from '@pure/api';
import { ESLint } from 'eslint';
import { runEslint } from './eslint';
import { ESLINT_CONFIG_MAP } from './eslint-config';

interface ILintPluginActionOption {
  fix: boolean;
}

interface ILintPluginOption {
  type?: 'base' | 'vue' | 'vue3';
  eslintOption?: ESLint.Options,
}

class LintPlugin extends Plugin {
  registerCommand =  () => {
    const lintPlgOption: ILintPluginOption = this.getPluginOption('lint');
    return {
      name: 'lint',
      options: {
        '--fix': 'Automatically fix problems',
      },
      async action(option: ILintPluginActionOption) {
        const { type, eslintOption = {} } = lintPlgOption;
        const eslintConfig = ESLINT_CONFIG_MAP.get(type ?? 'base');

        await runEslint({
          ...eslintOption,
          baseConfig: eslintConfig,
          fix: option.fix,
        });
      },
      description: 'lint project',
    };
  };
}

export * from './eslint-config';
export default LintPlugin;
