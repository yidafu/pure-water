import { spawn } from 'child_process';
import { readFile, access } from 'fs/promises';
import { join } from 'path';

import { fileExist } from '@pure-org/api';
import ora from 'ora';

async function readPacakgeJson(dir: string) {
  const buffer = await readFile(join(dir, 'package.json'), { encoding: 'utf-8' });
  return JSON.parse(buffer.toString());
}

async function getPackageManager(dir: string) {
  try {
    await access(join(dir, 'package-lock.json'));
    return 'npm';
  } catch (_err) {
    try {
      await access(join(dir, 'yarn.lock'));
      return 'yarn';
    } catch (_err2) {
      return 'pnpm';
    }
  }
}

function execCommand(command: string, args: readonly string[]) {
  return new Promise<void>((resolve, reject) => {
    const chilhProc = spawn(command, args, { timeout: 2 * 60 * 1000 });
    const outputBuffer = [];
    chilhProc.stdout.on('data', (data) => {
      outputBuffer.push(data);
    });
    chilhProc.stderr.on('data', (data) => {
      outputBuffer.push(data);
    });
    chilhProc.on('close', (code) => {
      if (code !== 0) {
        console.log(`\nrun \`${command} ${args.join(' ')}\` failed, exit with ${code}`);
        console.log(`child process output =>\n\t${outputBuffer.join('')}`);
        reject(code);
      } else {
        resolve();
      }
    });
    chilhProc.on('error', (err) => {
      console.log(`run \`${command} ${args.join(' ')}\` failed`);
      console.log(`child process output =>\n${outputBuffer.join('')}`);
      reject(err);
    });
  });
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
/**
 * init lint config
 *  1. husky
 *    1.1. pre-commit and commit-msg hook
 *  2. lint-staged
 *
 * @export
 * @param {string} projectRoot
 */
export async function initLint(projectRoot: string) {
  const pkgJson = await readPacakgeJson(projectRoot);
  const pkgManager = await getPackageManager(projectRoot);
  const isWorkspace = !!pkgJson.workspaces
    || await fileExist(join(projectRoot, 'pnpm-workpsace.yaml'));
  const wpFlag = isWorkspace ? '--workspace-root' : '';

  if (
    !pkgJson?.devDependencies?.husky
    && !pkgJson?.scripts?.prepare?.includes('husky install')
  ) {
    const spinner = ora({
      text: '没有配置 husky, 开始自动配置 ...',
      spinner: 'dots3',
      color: 'green',
    }).start();

    await sleep(1000);
    try {
      spinner.text = '安装 husky 到 devDependencies';
      await execCommand(pkgManager, ['install', 'husky', '--save-dev', wpFlag]);

      spinner.text = '开始配置 husky';
      await execCommand('npx', ['husky', 'install']);
      await execCommand('npm', ['pkg', 'set', 'scripts.prepare="husky install"']);
      await execCommand('npx', ['husky', 'add', '.husky/pre-commit', '"npx pure lint"']);
      await execCommand('npx', ['husky', 'add', '.husky/commit', '"npx pure commit-msg"']);
      spinner.succeed('husky 配置成功');
    } catch (err) {
      spinner.fail('husky 配置失败');
      console.error(err);
      process.exit(1);
    }
  }
  if (!pkgJson?.devDependencies?.['lint-staged']) {
    const spinner = ora({
      text: '没有安装 lint-staged, 开始安装配置 ...',
      spinner: 'dots3',
      color: 'green',
    }).start();
    await sleep(1000);

    try {
      spinner.text = '安装 lint-staged 到 devDependencies';
      await execCommand(pkgManager, ['install', 'lint-staged', '--save-dev', wpFlag]);

      if (pkgJson?.dependencies?.react) {
        await execCommand('npm', ['pkg', 'set', `lint-staged=${JSON.stringify({
          '*.{js,ts,jsx,tsx}': 'pure lint',
          '*.{css,scss}': 'pure lint',
        })}`, '--json']);
      } else if (pkgJson?.dependencies?.vue) {
        await execCommand('npm', ['pkg', 'set', `lint-staged=${JSON.stringify({
          '*.*.{js,ts,vue}': 'pure lint',
          '*.{css,scss}': 'pure lint',
        })}`, '--json']);
      } else {
        await execCommand('npm', ['pkg', 'set', `lint-staged=${JSON.stringify({
          '*.*.{js,ts}': 'pure lint',
        })}`, '--json']);
      }

      spinner.succeed('配置 lint-staged 成功');
    } catch (err) {
      spinner.fail('配置 lint-staged 失败');
      process.exit(1);
    }
  }
}