import { existsSync, createWriteStream } from 'fs';
import { readFile, writeFile, rm as rmFile } from 'fs/promises';
import path from 'path';

import axios from 'axios';
import chalk from 'chalk';
import debug from 'debug';
import globby from 'globby';
import inquirer from 'inquirer';
import ora from 'ora';
import tar from 'tar';

import { ensureDirectory } from '../utils';

import { ICommand } from './CommandService';

const log = debug('pure:api:create');

interface ICreateCommandOptions {
  template?: string;
  registry?: string;
  force?: boolean;
}

async function download(url: string, target: string) {
  const resp = await axios({
    url,
    responseType: 'stream',
  });
  return new Promise<void>((resolve, reject) => {
    if (resp.status === 200) {
      const wSteam = createWriteStream(target);
      resp.data.pipe(wSteam);
      wSteam.on('finish', () => {
        wSteam.close();
        resolve();
      });
      wSteam.on('error', () => {
        reject();
      });
    } else {
      reject();
    }
  });
}

async function getRegistryInfo(pkgName: string, registry: string) {
  log('get registry info => %s', `${registry}/${pkgName}`);
  const resp = await axios.get(`${registry}/${pkgName}`);
  if (resp.status === 200) {
    return resp.data;
  }
  throw new Error(resp.data);
}

async function downloadTarball(versionInfo: any) {
  const { dist } = versionInfo;
  const tmpDir = `/tmp/pure_water/download/${
    encodeURIComponent(versionInfo.name)}/${
    encodeURIComponent(versionInfo.version)}`;
  const tempFile = `${tmpDir}/${encodeURIComponent(versionInfo.name)}.tgz`;
  log('临时文件: %s', tempFile);
  await ensureDirectory(tmpDir);
  await download(dist.tarball, tempFile);
  await tar.x({
    file: tempFile,
    cwd: tmpDir,
  });
  await rmFile(tempFile);
  return path.join(tmpDir, 'package');
}

async function downloadTemplate(tplName: string, registry: string) {
  const spinner = ora({ text: chalk.green('模板下载中... '), color: 'green' }).start();
  try {
    // eslint-disable-next-line no-await-in-loop
    const pkgInfo = await getRegistryInfo(tplName, registry);
    const lastVersion = pkgInfo['dist-tags'].latest;
    log('latest version %s', lastVersion);
    const lastVersionInfo = pkgInfo.versions[lastVersion];
    // eslint-disable-next-line no-await-in-loop
    const tmpDir = await downloadTarball(lastVersionInfo);
    spinner.succeed('模板下载成功');
    return tmpDir;
  } catch (err) {
    spinner.fail('下载模板失败,请确认模板名称是否正确');
    console.log(err);
  }
}

async function generateAppTemplate(
  templateDir: string,
  appDir: string,
  tmpleateParams: Record<string, string>,
) {
  const spinner = ora({ text: chalk.green('开始复制模板..'), color: 'green' }).start();
  console.log('');
  try {
    const files2Copy = await globby([`${templateDir}/**/*`], { dot: true });
    // eslint-disable-next-line no-restricted-syntax
    for (const sourcePath of files2Copy) {
      // eslint-disable-next-line no-await-in-loop
      let tmpelateFile = await readFile(sourcePath, { encoding: 'utf-8' });
      Object.entries(tmpleateParams).forEach(([key, value]) => {
        const replacementRegexp = new RegExp(`<%= ${key} %>`, 'g');
        tmpelateFile = tmpelateFile.replace(replacementRegexp, value);
      });

      const targetPath = sourcePath.replace(templateDir, appDir);
      // eslint-disable-next-line no-await-in-loop
      await ensureDirectory(path.dirname(targetPath));
      // eslint-disable-next-line no-await-in-loop
      await writeFile(targetPath, tmpelateFile);
      console.log(chalk.green(`  创建文件: ${targetPath.replace(appDir, '')}`));
    }
    spinner.succeed('完成复制模板');
  } catch (err) {
    spinner.fail('复制模板失败');
    console.log(err);
  } finally {
    await rmFile(templateDir, { recursive: true, force: true });
  }
}

const DEFAULT_TEMPLATE_MAP = new Map([
  ['Vue3(TypeScript + Vite)', '@pure-org/water-template-vue3'],
  ['Vue2(JavaScript + Webpack)', '@pure-org/water-template-vue2'],
]);

export const createCommand: ICommand = {
  name: 'create',
  args: {
    '<app-name>': 'new app to create',
  },
  options: {
    '-t, --template <name>': '模板的 NPM 包名, 如: @pure-org/water-template-vue',
    '-r, --registry <registry>': '指定下载模板的 npm 源',
    '-f, --force': '在已存在的目录里创建项目, 会覆盖同名文件',
  },
  description: '从模板创建项目',
  async action(appName: string, options: ICreateCommandOptions) {
    const promptList = [];
    if (!options.template) {
      promptList.push({
        name: 'tplName',
        message: '请选择你需要的模板',
        type: 'list',
        prefix: '👉',
        choices: DEFAULT_TEMPLATE_MAP.keys(),
        transformer(input: string) {
          return DEFAULT_TEMPLATE_MAP.get(input) ?? '@pure-org/water-template-vue3';
        },
      });
    }

    promptList.push({
      name: 'appName',
      message: '请输入项目名:',
      type: 'input',
      prefix: '👉',
      default() {
        if (appName === '.') {
          return path.parse(path.join(process.cwd(), appName)).name;
        }
        return appName;
      },
      validate(input: string) {
        const dirExist = existsSync(path.join(process.cwd(), input));
        if (dirExist && !options.force) {
          return '该目录已存在请重新输入, 或使用 --force 参数重新执行命令';
        }
        return true;
      },
    });

    const answer = await inquirer.prompt(promptList);

    const appDir = path.join(process.cwd(), answer.appName);
    const templateName = options.template ?? answer.tplName;
    const registry = options.registry ?? 'https://registry.npmjs.org';

    const tplDir = await downloadTemplate(templateName, registry);

    const tempalteParams: Record<string, string> = {
      appName,
    };
    await generateAppTemplate(tplDir!, appDir, tempalteParams);
    console.log(chalk.green(`

`));
  },
};
