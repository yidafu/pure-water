import { tryResolve, requireDefault, deepmerge } from '@pure-org/api';
import stylelintConfig from '@pure-org/stylelint-config-water';
import debug from 'debug';
import ora from 'ora';
import stylelint from 'stylelint';

const log = debug('pure:lint:stylelint');

const STYLELINT_CONFIG_WATER = '@pure-org/stylelint-config-water';

export interface IStylelintOption extends stylelint.LinterOptions {
  entry?: string[];
  disable?: boolean;
}

export interface IStylelintContext {
  projectRoot: string;
}

export async function runStylelint(options: stylelint.LinterOptions, context: IStylelintContext) {
  const spinner = ora({
    text: '开始 Style Lint ...',
    spinner: 'dots3' as any,
    color: 'green',
  }).start();

  /**
    @see: https://stylelint.io/user-guide/usage/node-api/#config
    need manual merge <projectRoot>/.stylelintrc.js
  */
  const customStylelintConfig = await tryResolve('./.stylelintrc.js', context.projectRoot);
  let finalStylelintConfig = stylelintConfig;
  if (customStylelintConfig) {
    const customConfig: stylelint.Config = await requireDefault(customStylelintConfig);
    if (typeof customConfig.extends === 'string') {
      if (customConfig.extends === STYLELINT_CONFIG_WATER) {
        delete customConfig.extends;
      }
    } else if (Array.isArray(customConfig.extends)) {
      customConfig.extends = customConfig.extends.filter((etd) => etd !== STYLELINT_CONFIG_WATER);
    }
    finalStylelintConfig = deepmerge(customConfig, stylelintConfig);
  }

  const realStylelintOptions: stylelint.LinterOptions = {
    config: finalStylelintConfig,
    formatter: 'string',
    ...options,
  };

  try {
    log('[start] stylelint %s', JSON.stringify(realStylelintOptions));
    const data = await stylelint.lint(realStylelintOptions);
    if (data.errored) {
      spinner.fail('Style Lint 校验失败');
    } else {
      spinner.succeed('Style Lint 校验通过');
    }
    if (data.output) {
      console.log(data.output);
    }
    log('[end] styleint');
    if (data.errored) {
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
