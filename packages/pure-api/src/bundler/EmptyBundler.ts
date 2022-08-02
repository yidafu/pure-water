import { Bundler } from './Bundler';

class EmptyBundler extends Bundler {
  name = 'empty';

  // eslint-disable-next-line class-methods-use-this
  get compileOption(): any {
    throw new Error('You should specify --bundler option');
  }

  // eslint-disable-next-line class-methods-use-this
  cleanDist(): void {
    throw new Error('You should specify --bundler option');
  }

  // eslint-disable-next-line class-methods-use-this
  startDevServer(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }

  // eslint-disable-next-line class-methods-use-this
  runBuiding(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }

  // eslint-disable-next-line class-methods-use-this
  dumpCompileConfig(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }
}

export { EmptyBundler };
