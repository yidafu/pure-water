import { ESLint } from 'eslint';
import debug from 'debug';
const log = debug('pure:plugin:lint:eslint');

export async function runEslint(option: ESLint.Options) {
  try {
    log('[start] eslint %s', JSON.stringify(option));
    const eslint = new ESLint(option);

    // const config = await eslint.calculateConfigForFile('/mnt/d/gitlab/pure-water/packages/water-plugin-lint/test.js');
    // const { rules, ...cfg } = config;
    // console.log(cfg);

    const results = await eslint.lintFiles([
      'src/**/*.ts',
      'src/**/*.vue',
    ]);

    if (option.fix) {
      log('[running] eslint autofix');
      await ESLint.outputFixes(results);
    }

    const formatter = await eslint.loadFormatter('stylish');

    const resultText = await formatter.format(results);
    log('[end] eslint');
    console.log(resultText);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}