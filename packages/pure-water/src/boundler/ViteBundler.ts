import { Bundler } from "./Bundler";

class ViteBundler extends Bundler {
  cleanDist(): void {
    
  }
  async dev(): Promise<void> {
    console.log('vite dev function');
  }

  async build(): Promise<void> {
    console.log('vite build function');
  }
  
}

export { ViteBundler };