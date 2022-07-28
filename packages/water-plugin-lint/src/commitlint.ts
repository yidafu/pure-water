import debug from 'debug';
import load from '@commitlint/load';
import read from '@commitlint/read';
import lint from '@commitlint/lint';
import format from '@commitlint/format';
import { LintOptions, ParserOptions, UserConfig } from '@commitlint/types';
import { COMMITLINT_CONFIG_MAP, ICommitlintMode } from './commitlint-config';
import { deepmerge } from '@pure/api';

type LoadFn = typeof load;
type ReadFn = typeof read;
type LintFn = typeof lint;
type FormatFn = typeof format;

// FIXME: commitlint 导出有点问题
const realLoad = (load as any).default as LoadFn;
const realRead = (read as any).default as ReadFn;
const realLint = (lint as any).default as LintFn;
const realFormat = (format as any).default as FormatFn;

const log = debug('pure:lint:commitlint');

export async function runCommitlint(
  mode: ICommitlintMode = 'recommended',
  commitlintOption: UserConfig = {},
) {
  const defaultConfig = COMMITLINT_CONFIG_MAP.get(mode)!;
  
  const userConfig = deepmerge(defaultConfig, commitlintOption);
  log('[start] commitlint config mode => %s, => %s', mode, JSON.stringify(userConfig));
  const [config, messages]  = await Promise.all([realLoad(userConfig), realRead({ edit: true })]);

  const { rules, parserPreset, plugins = [] } = config;
  for (const msg of messages) {
    log('lint commit message => %s', msg);
    const result = await realLint(
      msg, 
      rules, 
      (parserPreset ? { parserOpts: parserPreset.parserOpts as ParserOptions, plugins } : {}) as LintOptions,
    );
    const output = realFormat({
      results: [result],
    });
    console.log(output);
    if (!result.valid) {
      process.exit(1);
    }
  }
  log('[end] commitlint');
}