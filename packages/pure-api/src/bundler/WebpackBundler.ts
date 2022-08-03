import fs from 'fs/promises';
import path from 'path';

import webpack, { Configuration } from 'webpack';
import ChainConfig from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import mergeWebpack from 'webpack-merge';

import { ensureDirectory, isDev, runAsyncFns } from '../utils';

import { Bundler } from './Bundler';
import { WebpackDevCompileDonePlugin } from './WacbpackDevCompileDonePlugin';

class WebpackBundler extends Bundler {
  name = 'webpack';

  private _cacheConfig?: Configuration;

  get compileOption(): Promise<Configuration> {
    if (this._cacheConfig) {
      return Promise.resolve(this._cacheConfig!);
    }

    const prjConfig = this.service.getProjectConfig().webpackConfig ?? {};
    const plgConfig = new ChainConfig();
    if (isDev()) {
      plgConfig
        .plugin('WebpackDevCompileDonePlugin')
        .use(WebpackDevCompileDonePlugin, [this.service.onDevCompileDoneFns]);
    }

    return runAsyncFns(this.service.chainWebpackConfigFns, plgConfig)
      .then(() => { 
        this._cacheConfig = mergeWebpack(plgConfig.toConfig(), prjConfig)
        return this._cacheConfig!;
      });
  }

  // eslint-disable-next-line class-methods-use-this
  cleanDist(): void {
    throw new Error('Method not implemented.');
  }

  async startDevServer(): Promise<void> {
    const compileOption = await this.compileOption;
    try {
      const compiler = webpack(compileOption);
      const { staticOptions, ...restOpts } = compileOption.devServer as any;
      const server = new WebpackDevServer(
        {
          static: staticOptions,
          ...restOpts,
          client: {
            progress: true,
          },
          devMiddleware: {
            writeToDisk: true,
          },
          open: true,
        },
        compiler,
      );
      server.start();
    } catch (err: any) {
      console.error(err.message);
    }
  }

  async runBuiding(): Promise<void> {
    const compileOption = await this.compileOption;
    try {
      const compiler = webpack(compileOption);
      await new Promise((resolve, reject) => {
        compiler.run((err, status) => {
          if ((status?.compilation?.errors?.length ?? 0) > 0) {
            console.log(status?.compilation?.errors.join('\n'));
          }
          if (err) {
            reject(err);
          } else {
            resolve(status);
          }
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  async dumpCompileConfig(): Promise<void> {
    const compileOption = await this.compileOption;
    await ensureDirectory(this.service.paths.outputPath!);
    const outputPath = path.join(
      this.service.paths.outputPath!,
      'webpack.config.js',
    );
    await fs.writeFile(outputPath, JSON.stringify(compileOption, null, 2));
  }
}

export { WebpackBundler };
