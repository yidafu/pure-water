import { Plugin } from '@pure-org/api';
import { ESLint } from 'eslint';
import { ESLINT_CONFIG_MAP } from '@pure-org/eslint-config-water';
import stylelintConfig from '@pure-org/stylelint-config-water';
import stylelint from 'stylelint';
import { UserConfig } from '@commitlint/types';
import { runCommitlint } from './commitlint';
import { runStylelint } from './stylelint';
import { runEslint } from './eslint';
import { ICommitlintMode } from './commitlint-config';

declare module '@pure-org/api' {
  interface IProjectPluginConfig {
    lint: ILintPluginOption
  }
}

interface ILintPluginActionOption {
  fix: boolean;
}

type StylelintOption = stylelint.LinterOptions & { entry?: string[], disable?: boolean };
type ESlintOption = ESLint.Options & { entry?: string[], disable?: boolean };
export interface ILintPluginOption {
  presetCommitlint?: ICommitlintMode
  commitlint?: UserConfig & { disable?: boolean },
  presetEslint?: 'base' | 'vue2' | 'vue';
  eslint?: ESlintOption,
  stylelint?: StylelintOption,
}

class LintPlugin extends Plugin {
  registerCommand = () => {
    const lintPlgOption: ILintPluginOption = this.getPluginOption('lint');
    /**
     * TODO: only lint commit before commit
     *
     * @param {ILintPluginActionOption} option
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function commitMsgLintAction(_option: ILintPluginActionOption) {
      const {
        presetCommitlint,
        commitlint: commitlintOption = {},
      } = lintPlgOption;

      const { diable, ...restCommitlintOption } = commitlintOption;
      if (!diable) {
        await runCommitlint(presetCommitlint, restCommitlintOption);
      }
    }
    async function preCommitAction(option: ILintPluginActionOption) {
      const {
        presetEslint,
        eslint: eslintOption = {},
        stylelint: stylelitOption = {} as StylelintOption,
      } = lintPlgOption;

      const eslintConfig = ESLINT_CONFIG_MAP.get(presetEslint ?? 'base');
      const {
        entry: eslintEntry = [],
        disable: eslintDisable = false,
        ...restEslintConfig
      } = eslintOption;
      if (!eslintDisable) {
        await runEslint(eslintEntry, {
          ...restEslintConfig,
          baseConfig: eslintConfig,
          fix: option.fix,
        });
      }
      const {
        entry: stylelintEntry = [],
        disable: stylelintDisable = false,
        ...restStylelintConfig
      } = stylelitOption;
      if (!stylelintDisable) {
        await runStylelint({
          config: stylelintConfig,
          formatter: 'string',
          files: stylelintEntry,
          ...restStylelintConfig,
          fix: option.fix,
        });
      }
    }
    return [
      {
        name: 'commit-msg',
        options: {} as any,
        action: commitMsgLintAction,
        description: 'lint commit message',
      },
      {
        name: 'lint',
        alias: 'pre-commit',
        options: {
          '--fix': 'Automatically fix problems',
        },
        action: preCommitAction,
        description: 'lint TS/JS/CSS Code',
      },
    ];
  };
}

// eslint-disable-next-line import/no-default-export
export default LintPlugin;
