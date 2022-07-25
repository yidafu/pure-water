import { createServer, UserConfig as ViteUserConfig } from 'vite';
import { Bundler } from "./Bundler";

class ViteBundler extends Bundler {
  get compileOption(): ViteUserConfig {
    return this.service.getProjectConfig().viteConfig ?? {};
  }

  cleanDist(): void {}

  async dev(): Promise<void> {
    const server = await createServer({
      configFile: false,
      root: process.cwd(),
      ...this.compileOption,
    });

    await server.listen();

    server.printUrls();
  }

  async build(): Promise<void> {
    console.log('vite build function');
  }
}

export { ViteBundler };