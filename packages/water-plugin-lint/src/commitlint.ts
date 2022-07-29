import debug from 'debug';
import load from '@commitlint/load';
import read from '@commitlint/read';
import lint from '@commitlint/lint';
import format from '@commitlint/format';
import { LintOptions, ParserOptions, UserConfig } from '@commitlint/types';
import { COMMITLINT_CONFIG_MAP, ICommitlintMode } from './commitlint-config';
import { deepmerge } from '@pure/api';

const log = debug('pure:lint:commitlint');

export async function runCommitlint(
  mode: ICommitlintMode = 'recommended',
  commitlintOption: UserConfig = {},
) {
  const defaultConfig = COMMITLINT_CONFIG_MAP.get(mode)!;
  
  const userConfig = deepmerge(defaultConfig, commitlintOption);
  log('[start] commitlint config mode => %s, => %s', mode, JSON.stringify(userConfig));
  const [config, messages]  = await Promise.all([load(userConfig), read({ edit: true })]);

  const { rules, parserPreset, plugins = [] } = config;
  for (const msg of messages) {
    log('lint commit message => %s', msg);
    const result = await lint(
      msg, 
      rules, 
      (parserPreset ? { parserOpts: parserPreset.parserOpts as ParserOptions, plugins } : {}) as LintOptions,
    );
    const output = format({
      results: [result],
    });
    console.log(output);
    if (!result.valid) {
      process.exit(1);
    }
  }
  log('[end] commitlint');
}