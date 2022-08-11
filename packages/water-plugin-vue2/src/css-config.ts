import { isProd } from '@pure-org/api';
import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import DartSass from 'sass';
import WebpackChain from 'webpack-chain';

export function cssConfig(config: WebpackChain) {
  const loaderOptions = {
    css: { esModule: false, sourceMap: false },
    postcss: {
      sourceMap: !isProd(),
      postcssOptions: {
        plugins: [autoprefixer],
      },
    },
    scss: {
      implementation: DartSass,
      sourceMap: !isProd(),
    },
  };

  config.module
    .rule('compile-css')
    .test(/\.css$/i)
    .use('css-extract').loader(MiniCssExtractPlugin.loader)
    .options({ publicPath: '/' })
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options(loaderOptions.css)
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .options(loaderOptions.postcss)
    .end()
    .end();

  config.module
    .rule('compile-scss')
    .test(/\.scss$/i)
    .use('css-extract').loader(MiniCssExtractPlugin.loader)
    .options({ publicPath: '/' })
    .end()
    .use('css-loader')
    .loader(require.resolve('css-loader'))
    .options(loaderOptions.css)
    .end()
    .use('postcss-loader')
    .loader(require.resolve('postcss-loader'))
    .options(loaderOptions.postcss)
    .end()
    .use('sass-loader')
    .loader(require.resolve('sass-loader'))
    .options(loaderOptions.scss)
    .end();

  config.plugin('mini-css-extract-plugin').use(MiniCssExtractPlugin, [{
    filename: '[name]_[contenthash:8].css',
    chunkFilename: '[name]_[contenthash:8].css',
  }]).end();
}
