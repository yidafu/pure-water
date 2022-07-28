import { Plugin } from '@pure/api';
import { ESLint } from 'eslint';
import { runEslint } from './eslint';
import { runStylelint } from './stylelint';
import { ESLINT_CONFIG_MAP } from './eslint-config';
import { STYLELINT_CONFIG } from './stylelint-config';
import stylelint from 'stylelint';
import { runCommitlint } from './commitlint';
import { UserConfig } from '@commitlint/types';
import { ICommitlintMode } from './commitlint-config';

interface ILintPluginActionOption {
  fix: boolean;
}

interface ILintPluginOption {
  type?: 'base' | 'vue' | 'vue3';
  eslint?: ESLint.Options,
  stylelint?: stylelint.LinterOptions,
  commitlint?: { mode?: ICommitlintMode } & UserConfig,
}

class LintPlugin extends Plugin {
  registerCommand = () => {
    const lintPlgOption: ILintPluginOption = this.getPluginOption('lint');
    return {
      name: 'lint',
      options: {
        '--fix': 'Automatically fix problems',
      },
      async action(option: ILintPluginActionOption) {
        const { type, eslint: eslintOption = {}, stylelint: stylelitOption = {}, commitlint = {} } = lintPlgOption;
        const eslintConfig = ESLINT_CONFIG_MAP.get(type ?? 'base');

        const { mode, ...commitlintUserOpt } = commitlint;
        await runCommitlint(mode, commitlintUserOpt);

        await runEslint({
          ...eslintOption,
          baseConfig: eslintConfig,
          fix: option.fix,
        });

        await runStylelint({
          config: STYLELINT_CONFIG,
          formatter: 'string',
          files: ['src/**/*.css', 'src/**.scss'],
          ...stylelitOption,
          fix: option.fix,
        });
      },
      description: 'lint project',
    };
  };
}

export * from './eslint-config';
export default LintPlugin;
