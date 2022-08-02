import WebpackChain from 'webpack-chain';
import DartSass from 'sass';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { isProd } from '@pure-org/api';

export function cssConfig(config: WebpackChain) {
  config.module
    .rule('compile-style')
    .test(/\.s?css$/i)
    .use('css-extract').loader(MiniCssExtractPlugin.loader).options({
      publicPath: '/',
    }).end()
    // .use('vue-style-loader').loader(require.resolve('vue-style-loader')).options({
    //   ssrId: false,
    // }).end()
    .use('css-loader').loader(require.resolve('css-loader')).options({
      esModule: false,
      sourceMap: false,
      modules: {
        localIdentName: isProd() ? '[name]_[hash:base64:8]' : '[name]',
      },
    }).end()
    .use('postcss-loader').loader(require.resolve('postcss-loader')).options({
      sourceMap: !isProd(),
    }).end()
    // .use(require.resolve('')).options()
    .use('sass-loader').loader(require.resolve('sass-loader')).options({
      implementation: DartSass,
      sourceMap: !isProd(),
    }).end();

  config.plugin('mini-css-extract-plugin').use(MiniCssExtractPlugin, [{
    filename: 'css/[name]-[contenthash:8].css',
    chunkFilename: 'css/[name]-[contenthash:8].css',
  }]).end();
}
