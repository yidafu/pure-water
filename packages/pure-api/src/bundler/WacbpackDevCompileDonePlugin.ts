import webpack from 'webpack';

import { PluginOnDevCompileDoneHook } from '../plugin';
import { runAsyncFns } from '../utils';

class WebpackDevCompileDonePlugin {
  hookFns: PluginOnDevCompileDoneHook[];

  isFirstCompile: boolean = true;

  constructor(hookFns: PluginOnDevCompileDoneHook[]) {
    this.hookFns = hookFns;
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapPromise('WebpackDevCompileDonePlugin', async () => {
      await runAsyncFns(this.hookFns, { isFirstCompile: this.isFirstCompile });
      this.isFirstCompile = false;
    });
  }
}

export { WebpackDevCompileDonePlugin };
