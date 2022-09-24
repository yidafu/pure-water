import { UserConfig } from '@commitlint/types';
import { Plugin } from '@pure-org/api';
import { ESLINT_CONFIG_MAP } from '@pure-org/eslint-config-water';
import debug from 'debug';
import { ESLint } from 'eslint';

import { runCommitlint } from './commitlint';
import { ICommitlintMode } from './commitlint-config';
import { runEslint } from './eslint';
import { initLint } from './init-lint';
import { runStylelint, IStylelintOption } from './stylelint';

const log = debug('pure:plugin:lint');
declare module '@pure-org/api' {
  interface IProjectPluginConfig {
    lint: ILintPluginOption
  }
}

interface ILintPluginActionOption {
  fix: boolean;
  onlyEslint: boolean;
  onlyStylelint: boolean;
}

interface ICommitLintOption extends UserConfig {
  disable?: boolean
}

interface IESLintOption extends ESLint.Options {
  entry?: string[];
  disable?: boolean;
}

type ESLintMode = 'base' | 'vue2' | 'vue';

export interface ILintPluginOption {
  presetCommitlint?: ICommitlintMode
  commitlint?: ICommitLintOption

  eslintMode?: ESLintMode;
  eslint?: IESLintOption,

  stylelint?: IStylelintOption,
}

class LintPlugin extends Plugin {
  registerCommand = () => {
    const { PROJECT_ROOT } = this;
    const lintPlgOption: ILintPluginOption = this.getPluginOption('lint');
    /**
     * only lint commit before commit
     *
     * @param {ILintPluginActionOption} option
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function commitMsgLintAction(_option: ILintPluginActionOption) {
      const {
        presetCommitlint,
        commitlint: commitlintOption = {},
      } = lintPlgOption;

      const { disable, ...restCommitlintOption } = commitlintOption;
      if (!disable) {
        await runCommitlint(presetCommitlint, restCommitlintOption);
      }
    }
    async function preCommitAction(option: ILintPluginActionOption) {
      const {
        eslintMode,
        eslint: eslintOption = {},
        stylelint: stylelitOption = {} as IESLintOption,
      } = lintPlgOption;

      const eslintConfig = ESLINT_CONFIG_MAP.get(eslintMode ?? 'base');
      const {
        entry: eslintEntry = [],
        disable: eslintDisable = false,
        ...restEslintConfig
      } = eslintOption;
      if (!eslintDisable && !option.onlyStylelint) {
        // TODO: deep merge
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
      if (!stylelintDisable && !option.onlyEslint) {
        await runStylelint({
          files: stylelintEntry,
          ...restStylelintConfig,
          fix: option.fix,
        }, { projectRoot: PROJECT_ROOT });
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
          '-e, --only-eslint': 'only execute eslint',
          '-s, --only-stylelint': 'only execute stylelint',
        },
        action: preCommitAction,
        description: 'lint TS/JS/CSS Code',
      },
    ];
  };

  onPluginReady = async () => {
    log('lint plugin ready');
    await initLint(this.PROJECT_ROOT);
  };
}

// eslint-disable-next-line import/no-default-export
export default LintPlugin;
