import { ESLint } from 'eslint';
import debug from 'debug';
const log = debug('pure:plugin:lint:eslint');

export async function runEslint(autofix: boolean) {
  try {
    log('[start] eslint');
    const eslint = new ESLint({ fix: autofix });

    const results = await eslint.lintFiles([
      'src/**/*.ts',
    ]);

    if (autofix) {
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