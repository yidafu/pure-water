import { isProd } from '@pure-org/api';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DartSass from 'sass';
import WebpackChain from 'webpack-chain';

export function cssConfig(config: WebpackChain) {
  config.module
    .rule('compile-style')
    .test(/\.s?css$/i)
    .use('css-extract').loader(MiniCssExtractPlugin.loader)
    .options({ publicPath: '/' })
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options({ esModule: false, sourceMap: false })
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .options({ sourceMap: !isProd() })
    .end()
    .use('sass-loader')
    .loader(require.resolve('sass-loader'))
    .options({ implementation: DartSass, sourceMap: !isProd() })
    .end();

  config.plugin('mini-css-extract-plugin').use(MiniCssExtractPlugin, [{
    filename: 'css/[name]_[contenthash:8].css',
    chunkFilename: 'css/[name]_[contenthash:8].css',
  }]).end();
}
