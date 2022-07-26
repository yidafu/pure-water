import fs from 'fs/promises';
import path from 'path';
import { CommandService } from '../service/CommandService';
import { runAsyncFns } from '../utils';

/**
 * bundler abstract class
 *
 * @abstract
 * @class Bundler
 */
abstract class Bundler {
  service: CommandService;

  abstract get compileOption(): any;

  /**
   * Creates an instance of Bundler.
   * @param {CommandService} service
   * @memberof Bundler
   */
  constructor(service: CommandService) {
    this.service = service;
  }

  /**
   * clean dist directory
   *
   * @abstract
   * @memberof Bundler
   */
  abstract cleanDist(): void;
  /**
   * start dev server
   *
   * @abstract
   * @return {Promise<void>}
   * @memberof Bundler
   */
  async dev(): Promise<void> {
    await runAsyncFns(this.service.beforeCompileFns);
    await this.startDevServer();
    await runAsyncFns(this.service.onDevServerReadyFns);
    await this.dumpCompileConfig();
  }

  abstract startDevServer(): Promise<void>;
  /**
   * build production asserts
   *
   * @abstract
   * @returns {Promise<void>}
   * @memberof Bundler
   */
  abstract build(): Promise<void>;

  /**
   *
   *
   * @memberof Bundler
   */
  async dumpCompileConfig() {
    const viteConfigFile = `export default ${
      JSON.stringify(this.compileOption)
    }`;
    const outputPath = path.join(
      this.service.paths.outputPath!,
      'vite.config.js',
    );
    fs.writeFile(outputPath, viteConfigFile);
  }
}

export { Bundler };
