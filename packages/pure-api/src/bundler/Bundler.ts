import debug from 'debug';
import { CommandService } from '../service/CommandService';
import { isProd, runAsyncFns } from '../utils';

const log = debug('pure:api:bundler');

/**
 * bundler abstract class
 *
 * @abstract
 * @class Bundler
 */
abstract class Bundler {
  name?: string;

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
  async build(): Promise<void> {
    log('run bundler', this.name);
    if (!isProd()) {
      await this.dumpCompileConfig();
    }
    await runAsyncFns(this.service.beforeCompileFns);
    await this.runBuiding();
    await runAsyncFns(this.service.afterBuildFns);
  }

  abstract runBuiding(): Promise<void>;

  /**
   *
   *
   * @memberof Bundler
   */
  abstract dumpCompileConfig(): Promise<void>;
}

export { Bundler };
