import { Plugin, PluginChainWebpackConfig } from '@pure/api';
import DartSass from 'sass';
import { VueLoaderPlugin } from 'vue-loader';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

export interface IPluginVu2Options {
  htmlOption: HtmlWebpackPlugin.Options,
}

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
      }).end();

    config.module
      .rule('compile-style')
      .test(/\.s?css$/i)
      .use('vue-style-loader').loader(require.resolve('vue-style-loader')).options({
        ssrId: false,
      }).end()
      .use('css-loader').loader(require.resolve('css-loader')).options({ esModule: false }).end()
      // .use(require.resolve('')).options()
      .use('sass-loader').loader(require.resolve('sass-loader')).options({
        implementation: DartSass,
      }).end();

    config.module.rule('assets')
      .test(/\.(ttf|eot|svg|gif|png|jpg|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/)
      .use('file-loader').loader(require.resolve('file-loader')).end();

    config.plugin('vue-loader-plugin').use(VueLoaderPlugin);

    config.plugin('html-webpack-plugin').use(HtmlWebpackPlugin, [{
      filename: path.join(this.PROJECT_ROOT, 'dist/index.html'),
      template: path.join(this.PROJECT_ROOT, 'public/index.html'),
      templateParameters: {
        BASE_URL: '/',
      },
      publicPath: 'http://127.0.0.1:5501/packages/demo-vue2/dist',
      ...htmlOption,
    }]);
  };
}