import chalk from 'chalk';

type AnyAsnycFn = (...args: any[]) => Promise<any>;

export async function runAsyncFns(fns: AnyAsnycFn[], ...args: any[]) {
  for (const fn of fns) {
      await fn(...args);
    }
}

export function tryResolve(filepath: string) {
  try {
    console.log(require.resolve(filepath));
    return require.resolve(filepath);
  } catch (err) {
    return false;
  }
};

export async function requireDefault(filepath: string) {
  console.log(filepath)
  // let mod = require(filepath);
  // return mod.__esModule ? mod.default : mod;
  return import(filepath)
}

export function exitWithMessage(msg: string) {
  console.log(chalk.red(msg));
  process.exit(1);
}