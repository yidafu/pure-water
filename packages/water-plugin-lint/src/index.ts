import { Plugin } from '@pure/api';
import { ESLint } from 'eslint';
import { runEslint } from './eslint';
import { runStylelint } from './stylelint';
import { ESLINT_CONFIG_MAP } from '@pure/eslint-config-water';
import stylelintConfig from '@pure/stylelint-config-water';
import stylelint from 'stylelint';
import { runCommitlint } from './commitlint';
import { UserConfig } from '@commitlint/types';
import { ICommitlintMode } from './commitlint-config';

interface ILintPluginActionOption {
  fix: boolean;
}

export interface ILintPluginOption {
  presetCommitlint?: ICommitlintMode
  commitlint?: UserConfig,
  presetEslint?: 'base' | 'vue2' | 'vue';
  eslint?: ESLint.Options,
  stylelint?: stylelint.LinterOptions,
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
        const { 
          presetCommitlint,
          commitlint: commitlintUserOpt = {}, 
          presetEslint, 
          eslint: eslintOption = {}, 
          stylelint: stylelitOption = {},
        } = lintPlgOption;

        await runCommitlint(presetCommitlint, commitlintUserOpt);

        const eslintConfig = ESLINT_CONFIG_MAP.get(presetEslint ?? 'base');
        await runEslint({
          ...eslintOption,
          baseConfig: eslintConfig,
          fix: option.fix,
        });

        await runStylelint({
          config: stylelintConfig,
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

export default LintPlugin;
