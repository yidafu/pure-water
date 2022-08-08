import path from 'path';

import { Plugin, PluginChainWebpackConfigHook } from '@pure-org/api';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';

import { assetConfig, ISpriteOption } from './asset-config';
import { cssConfig } from './css-config';

declare module '@pure-org/api' {
  interface IProjectPluginConfig {
    vue2: IPluginVu2Options
  }
}

export interface IPluginVu2Options {
  htmlOption: HtmlWebpackPlugin.Options,
  sprite: ISpriteOption | false;
  /**
   *
   * @see https://juejin.cn/post/6844903918518927367#heading-2
   * @type {boolean}
   * @memberof IPluginVu2Options
   */
  enableXss: boolean;
}

// eslint-disable-next-line import/no-default-export
export default class Vu2Plugin extends Plugin {
  static priority = 40;

  chainWebpackConfig: PluginChainWebpackConfigHook = async (config) => {
    const vue2Options: Partial<IPluginVu2Options> = this.getPluginOption('vue2');
    const { htmlOption = {}, sprite, enableXss } = vue2Options;
    config.resolve.extensions.add('.vue');
    config.module
      .rule('compile-vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader(require.resolve('vue-loader'))
      .options({
        compileOptions: {
          preserveWhitespace: false,
          directives: {
            html: enableXss ? (node: any, directiveMeta: any) => {
              // eslint-disable-next-line no-param-reassign
              (node.props || (node.props = [])).push({
                name: 'innerHTML',
                value: `xss(_s(${directiveMeta.value}))`,
              });
            } : undefined,
          },
        },
      })
      .end();

    cssConfig(config);

    assetConfig(config, { sprite, projectRoot: this.PROJECT_ROOT });

    config.plugin('vue-loader-plugin').use(VueLoaderPlugin);

    config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [{
      filename: path.join(this.PROJECT_ROOT, 'dist/index.html'),
      template: path.join(this.PROJECT_ROOT, 'public/index.html'),
      templateParameters: {
        BASE_URL: '/',
      },
      publicPath: '/',
      ...htmlOption,
    }]);

    // TODO: Eslint Webpack config
  };
}
