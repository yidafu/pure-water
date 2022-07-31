import chalk from 'chalk';
import debug from 'debug';
// import { createRequire } from 'module';
import deepmerge from 'deepmerge';

const log = debug('pure:api:utils');

type AnyAsnycFn = (...args: any[]) => Promise<any>;

/**
 * run async function list serially
 *
 * @export
 * @param {AnyAsnycFn[]} fns
 * @param {...any[]} args
 */
export async function runAsyncFns(fns: AnyAsnycFn[], ...args: any[]) {
  for (const fn of fns) {
    await fn(...args);
  }
}

/**
 * module path resolve by module.createRequire
 * @see https://stackoverflow.com/questions/54977743/do-require-resolve-for-es-modules
 *
 * @export
 * @param {string} filepath
 * @param {String} [root=import.meta.url]
 * @return {Promise<string | boolen>}
 */
export function tryResolve(filepath: string, root = __dirname) {
  try {
    // const customRequire = createRequire(root);
    // return customRequire.resolve(filepath);
    return require.resolve(filepath, { paths: [root] });
  } catch (err) {
    log('try resolve fail ' + root  + ' ==> ', err);
    return false;
  }
}

/**
 * import module default export
 *
 * @export
 * @param {string} filepath
 * @return {Promise<any>}
 */
export async function requireDefault(filepath: string) {
  let mod = require(filepath);
  return mod.__esModule ? mod.default : mod;
  // return import(filepath).then((mod) => mod.default);
}

/**
 * process exit with message
 *
 * @export
 * @param {string} msg
 */
export function exitWithMessage(msg: string): never {
  console.log(chalk.red(msg));
  process.exit(1);
}

/**
 *
 *
 * @export
 * @param {any} fn
 * @return {boolean}  {fn is Function}
 */
export function isFunction(fn: any): fn is Function {
  return typeof fn === 'function';
}

export { deepmerge };
export * from './fs';
export * from './env';
export * from './path';