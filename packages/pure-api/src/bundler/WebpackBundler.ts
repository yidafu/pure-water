import path from 'path';
import fs from 'fs/promises';
import webpack, { Configuration } from 'webpack';
import ChainConfig from 'webpack-chain';
import mergeWebpack from 'webpack-merge';
import { ensureDirectory, runAsyncFns } from '../utils';
import { Bundler } from './Bundler';

class WebpackBundler extends Bundler {

  get compileOption(): Promise<Configuration> {
    const prjConfig = this.service.getProjectConfig().webpackConfig ?? {};
    const plgConfig = new ChainConfig();
    return runAsyncFns(this.service.chainWebpackConfigFns, plgConfig)
      .then(() => {
        return mergeWebpack(plgConfig.toConfig(), prjConfig);
      });
  }

  cleanDist(): void {
    throw new Error('Method not implemented.');
  }

  async startDevServer(): Promise<void> {
    const compileOption = await this.compileOption; 
    const compiler = webpack(compileOption);
    compiler.watch({}, (err, status) => {
      console.log(status);
      console.log(err);
    });
  }

  async runBuiding(): Promise<void> {
    const compileOption = await this.compileOption;
    const compiler = webpack(compileOption);
    compiler.run((err, status) => {
      console.log(status);
      console.log(err);
    });
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