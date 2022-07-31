import debug from 'debug';
import path from 'path';
import fs from 'fs/promises';

import { createServer, UserConfig as ViteUserConfig, build } from 'vite';
import { Bundler } from './Bundler';
import { ensureDirectory } from '../utils';

const log = debug('pure:api:bundler:vite');

/**
 * Vite Bundler implement
 *
 * @class ViteBundler
 * @extends {Bundler}
 */
class ViteBundler extends Bundler {
  name = 'vite';

  /**
   *
   *
   * @readonly
   * @type {ViteUserConfig}
   * @memberof ViteBundler
   */
  get compileOption(): ViteUserConfig {
    return this.service.getProjectConfig().viteConfig ?? {};
  }

  /**
   *
   *
   * @memberof ViteBundler
   */
  cleanDist(): void {}

  /**
   *
   *
   * @return {Promise<void>}
   * @memberof ViteBundler
   */
  async startDevServer(): Promise<void> {
    log('Vite compile config => %o', this.compileOption);
    const server = await createServer({
      configFile: false,
      root: process.cwd(),
      ...this.compileOption,
    });

    await server.listen();

    server.printUrls();
  }

  async runBuiding(): Promise<void> {
    const config = this.compileOption;
    await build(config);
  }

  async dumpCompileConfig(): Promise<void> {
    {
      const viteConfigFile = `export default ${JSON.stringify(this.compileOption)
      }`;
      const outputPath = path.join(
        this.service.paths.outputPath!,
        'vite.config.js',
      );
      await ensureDirectory(this.service.paths.outputPath!);
      await fs.writeFile(outputPath, viteConfigFile);
    }
  }
}

export { ViteBundler };
