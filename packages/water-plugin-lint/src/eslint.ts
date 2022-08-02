import { ESLint } from 'eslint';
import ora from 'ora';
import debug from 'debug';

const log = debug('pure:plugin:lint:eslint');

export async function runEslint(entry: string[], option: ESLint.Options) {
  const spinner = ora({
    text: '开始 ESlint ...',
    spinner: 'dots13',
    color: 'green',
  }).start();
  try {
    log('[start] eslint %s', JSON.stringify(option));
    const eslint = new ESLint(option);

    // const config = await eslint.calculateConfigForFile(
    //   '/mnt/d/gitlab/pure-water/packages/water-plugin-lint/test.js'
    // );
    // const { rules, ...cfg } = config;
    // console.log(cfg);
    log('eslint entry => %s', entry);
    const results = await eslint.lintFiles(entry);

    if (option.fix) {
      log('[running] eslint autofix');
      await ESLint.outputFixes(results);
    }

    const formatter = await eslint.loadFormatter('stylish');

    // 如果 lint 报错直接退出
    const hasError = results.find((res) => res.errorCount > 0 || res.fatalErrorCount > 0);
    if (hasError) {
      spinner.fail('ESlint 校验失败');
    } else {
      spinner.succeed('ESLint 校验通过');
    }

    const resultText = await formatter.format(results);
    if (resultText) {
      console.log(resultText);
    }

    log('[end] eslint');
    if (hasError) {
      process.exit(1);
    }
  } catch (err) {
    spinner.fail('ESlint 校验失败');
    console.error(err);
    process.exit(1);
  }
}
