import fs from 'fs/promises';
import path from 'path';

import debug from 'debug';
import stringifyObject from 'stringify-object';

import {
  createServer, UserConfig as ViteUserConfig, build, mergeConfig,
} from 'vite';

import { ensureDirectory } from '../utils';

import { Bundler } from './Bundler';

const log = debug('pure:api:bundler:vite');

/**
 * Vite Bundler implement
 *
 * @class ViteBundler
 * @extends {Bundler}
 */
class ViteBundler extends Bundler {
  name = 'vite';

  cacheConfig?: ViteUserConfig;

  /**
   *
   *
   * @readonly
   * @type {ViteUserConfig}
   * @memberof ViteBundler
   */
  get compileOption(): ViteUserConfig {
    if (this.cacheConfig) {
      return this.cacheConfig!;
    }

    let baseConfig = this.service.getProjectConfig().viteConfig ?? {};
    // eslint-disable-next-line no-restricted-syntax
    for (const viteConfigFn of this.service.viteConfigFns) {
      const overrideConfig = viteConfigFn();
      baseConfig = mergeConfig(baseConfig, overrideConfig, false);
    }

    this.cacheConfig = baseConfig;
    return this.cacheConfig!;
  }

  /**
   *
   *
   * @memberof ViteBundler
   */
  // eslint-disable-next-line class-methods-use-this
  cleanDist(): void {}

  /**
   *
   *
   * @return {Promise<void>}
   * @memberof ViteBundler
   */
  async startDevServer(): Promise<void> {
    const { compileOption } = this;
    log('Vite compile config => %o', compileOption);
    const server = await createServer({
      configFile: false,
      root: process.cwd(),
      ...compileOption,
    });

    await server.listen();

    server.printUrls();
  }

  async runBuiding(): Promise<void> {
    const config = this.compileOption;
    await build(config);
  }

  async dumpCompileConfig(): Promise<void> {
    const viteConfigFile = `export default ${stringifyObject(this.compileOption, {
      transform(object: any, property: any, originalResult: any) {
        if (typeof object[property] === 'function') {
          return 'function () { /* omitted long function */ }';
        }
        return originalResult;
      },
    })}`;
    const outputPath = path.join(
      this.service.paths.outputPath!,
      'vite.config.js',
    );
    await ensureDirectory(this.service.paths.outputPath!);
    await fs.writeFile(outputPath, viteConfigFile);
  }
}

export { ViteBundler };
