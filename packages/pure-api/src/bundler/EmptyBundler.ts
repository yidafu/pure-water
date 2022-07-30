import { Bundler } from './Bundler';

class EmptyBundler extends Bundler {
  get compileOption(): any {
    throw new Error('You should specify --bundler option');
  }

  cleanDist(): void {
    throw new Error('You should specify --bundler option');
  }

  startDevServer(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }

  runBuiding(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }

  dumpCompileConfig(): Promise<void> {
    throw new Error('You should specify --bundler option');
  }
  
}

export { EmptyBundler };