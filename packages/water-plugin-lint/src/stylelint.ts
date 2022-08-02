import ora from 'ora';
import debug from 'debug';
import stylelint from 'stylelint';

const log = debug('pure:lint:stylelint');

export async function runStylelint(options: stylelint.LinterOptions) {
  const spinner = ora({
    text: '开始 Style Lint ...',
    spinner: 'dots8Bit',
    color: 'green',
  }).start();

  try {
    log('[start] stylelint %s', JSON.stringify(options));
    const data = await stylelint.lint(options);
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
