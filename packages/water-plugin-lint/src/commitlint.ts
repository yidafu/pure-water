import ora from 'ora';
import debug from 'debug';
import load from '@commitlint/load';
import read from '@commitlint/read';
import lint from '@commitlint/lint';
import format from '@commitlint/format';
import { LintOptions, ParserOptions, UserConfig } from '@commitlint/types';
import { deepmerge } from '@pure-org/api';
import { COMMITLINT_CONFIG_MAP, ICommitlintMode } from './commitlint-config';

const log = debug('pure:lint:commitlint');

export async function runCommitlint(
  mode: ICommitlintMode = 'recommended',
  commitlintOption: UserConfig = {},
) {
  const spinner = ora({
    text: '开始校验 Commit Message ...',
    spinner: 'dots13',
    color: 'green',
  }).start();
  const defaultConfig = COMMITLINT_CONFIG_MAP.get(mode)!;

  const userConfig = deepmerge(defaultConfig, commitlintOption);
  log('[start] commitlint config mode => %s, => %s', mode, JSON.stringify(userConfig));
  const [config, messages] = await Promise.all([load(userConfig), read({ edit: true })]);

  const { rules, parserPreset, plugins = [] } = config;
  // eslint-disable-next-line no-restricted-syntax
  for (const msg of messages) {
    log('lint commit message => %s', msg);
    // eslint-disable-next-line no-await-in-loop
    const result = await lint(
      msg,
      rules,
      (parserPreset
        ? {
          parserOpts: parserPreset.parserOpts as ParserOptions,
          plugins,
        }
        : {}) as LintOptions,
    );
    if (result.valid) {
      spinner.succeed('Commit Message 校验通过');
    } else {
      spinner.fail('Commit Message 校验失败');
    }
    const output = format({
      results: [result],
    });
    if (output) {
      console.log(output);
    }
    if (!result.valid) {
      process.exit(1);
    }
  }
  log('[end] commitlint');
}
