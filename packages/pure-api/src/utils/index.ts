import chalk from 'chalk';
import debug from 'debug';
import { createRequire } from 'module';

const log = debug('pure:api:utils');

type AnyAsnycFn = (...args: any[]) => Promise<any>;

export async function runAsyncFns(fns: AnyAsnycFn[], ...args: any[]) {
  for (const fn of fns) {
      await fn(...args);
    }
}

/**
 * @see https://stackoverflow.com/questions/54977743/do-require-resolve-for-es-modules
 * @param filepath 
 * @returns 
 */
export function tryResolve(filepath: string, root = import.meta.url) {
  try {
    const customRequire = createRequire(root);
    return customRequire.resolve(filepath);
  } catch (err) {
    log('try resolve fail', err)
    return false;
  }
};

export async function requireDefault(filepath: string) {
  // let mod = require(filepath);
  // return mod.__esModule ? mod.default : mod;
  return import(filepath).then((mod) => mod.default);
}

export function exitWithMessage(msg: string) {
  console.log(chalk.red(msg));
  process.exit(1);
}