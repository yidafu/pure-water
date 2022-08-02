import { fileExist, Plugin, PluginChainWebpackConfigHook } from '@pure-org/api';
import path from 'path';
import ForkTsCheckerWepackPlugin from 'fork-ts-checker-webpack-plugin';

export interface IPluginBabelOption {
  compilePackages?: string[];
  checkType: boolean;
  presets?: string[];
  plugins?: string[];
}

// eslint-disable-next-line import/no-default-export
export default class BabelPlugin extends Plugin {
  chainWebpackConfig: PluginChainWebpackConfigHook = async (config) => {
    const babelOption = this.getPluginOption('babel');
    const {
      compilePackages, presets, plugins, checkType,
    } = babelOption;
    config.resolve.extensions.merge(['.js', '.ts', '.jsx', '.tsx', '.mjs']).end();

    const babelExcludeRegExp = compilePackages?.length > 0
      ? new RegExp(`node_modules\\/(?!${compilePackages.join('|')})`)
      : /node_modules/;
    config.module.rule('compile-script')
      .test(/\.(js|ts|jsx|tsx|mjs)/)
      .exclude.add(babelExcludeRegExp).end()
      .use('babel').loader(require.resolve('babel-loader'))
      .options({
        cwd: this.PROJECT_ROOT,
        presets,
        plugins,
        // TODO: cache config
      })
      .end();

    // ts check
    const tsconfigPath = path.join(this.PROJECT_ROOT, 'tsconfig.json');
    if (await fileExist(tsconfigPath) && checkType) {
      config.plugin('fork-ts-checker')
        .use(ForkTsCheckerWepackPlugin, [{
          typescript: {
            memoryLimit: 1024 * 8,
            extensions: {
              vue: {
                enabled: true,
                compiler: 'vue-template-compiler',
              },
            },
          },
          logger: {
            log(msg: any) {
              console.log(msg);
            },
            error(msg: any) {
              console.error(msg);
            },
          },
        }]).end();
    }
  };
}
