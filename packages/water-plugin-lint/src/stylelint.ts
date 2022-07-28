// 
// "stylelint-config-standard-scss",
// "stylelint-config-prettier-scss"
import debug from 'debug';
import stylelint from 'stylelint';

const log = debug('pure:lint:stylelint');

export async function runStylelint(options: stylelint.LinterOptions) {
  try {
    log('[start] stylelint %s', JSON.stringify(options));
    const data = await stylelint.lint(options);
    
    console.log(data.output);
    log('[end] styleint');
    if (data.errored) {
      process.exit(1);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}