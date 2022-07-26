import debug from 'debug';
import { createServer, UserConfig as ViteUserConfig } from 'vite';
import { Bundler } from './Bundler';

const log = debug('pure:api:bundler:vite');

/**
 * Vite Bundler implement
 *
 * @class ViteBundler
 * @extends {Bundler}
 */
class ViteBundler extends Bundler {
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

  /**
   *
   *
   * @return {Promise<void>}
   * @memberof ViteBundler
   */
  async build(): Promise<void> {
    console.log('vite build function');
  }
}

export { ViteBundler };
