import path from 'path';

import {
  isDev, isProd, Plugin, PluginChainWebpackConfigHook,
} from '@pure-org/api';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';

// eslint-disable-next-line import/no-default-export
export default class BaseWebpackPlugin extends Plugin {
  static priority = 5;

  chainWebpackConfig: PluginChainWebpackConfigHook = async (config) => {
    config
      .entry('main')
      .add(path.join(this.PROJECT_ROOT, './src/main.js'))
      .end();

    // output config
    config
      .output
      .path(path.join(this.PROJECT_ROOT, 'dist'))
      .publicPath('/');
    if (isProd()) {
      config.mode('production');
      config.output.filename('[name]_[contenthash:8].js')
        .chunkFilename('[name]_[contenthash:8].js');
    } else {
      config.mode('development');
      config.output.filename('[name].js')
        .chunkFilename('[name].js');
    }

    config.stats('minimal');

    config.context(this.PROJECT_ROOT);

    config.optimization
      .splitChunks({
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      })
      .minimizer('terser').use(TerserPlugin);

    config
      .plugin('webpack-bar')
      .use(WebpackBar, [{ color: 'green' }])
      .end()

      .plugin('define-plugin')
      .use(webpack.DefinePlugin, [{
        __DEBUG__: JSON.stringify(isDev()),
        'process.env': {
          NODE_ENV: isProd() ? '"production"' : '"development"',
          BASE_URL: '"/"',
        },
      }])
      .end()

      .plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin)
      .end()

      .plugin('copy-plugin')
      .use(CopyPlugin, [{
        patterns: [{
          from: this.PUBLIC_PATH,
          to: this.OUTPUT_PATH,
          globOptions: {
            ignore: [
              '**/.DS_Store',
              path.join(this.PUBLIC_PATH, 'index.html'),
            ],
          },
          info: { minimized: true },
        }],
      }]);

    if (isDev()) {
      config.devServer
        .staticOptions({
          directory: this.OUTPUT_PATH,
          publicPath: '/',
        })
        .hot(true)
        .host('127.0.0.1')
        .port(3000)
        // .http2(true)
        // .https(true)
        // .useLocalIp(true)
        // .writeToDisk(true)
        // .allowedHosts()
        .headers({ 'Access-Control-Allow-Origin': '*' });
    }

    // TODO: ESLint plugin
  };
}
