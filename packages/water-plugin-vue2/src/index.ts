import { Plugin, PluginChainWebpackConfig } from '@pure-org/api';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { cssConfig } from './css-config';
import { assetConfig } from './asset-config';

export interface IPluginVu2Options {
  htmlOption: HtmlWebpackPlugin.Options,
}

// eslint-disable-next-line import/no-default-export
export default class Vu2Plugin extends Plugin {
  static priority = 40;

  chainWebpackConfig: PluginChainWebpackConfig = async (config) => {
    const vue2Options = this.getPluginOption('vue2');
    const { htmlOption } = vue2Options;
    config.resolve.extensions.add('.vue');
    config.module
      .rule('compile-vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .loader(require.resolve('vue-loader'))
      .options({
        compileOptions: {
          preserveWhitespace: false,
        },
      })
      .end();

    cssConfig(config);

    assetConfig(config);

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
