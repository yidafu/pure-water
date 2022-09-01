import path from 'path';

import {
  isDev, isProd, Plugin, PluginChainWebpackConfigHook,
} from '@pure-org/api';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import * as dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
// import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import Config from 'webpack-chain';
import WebpackBar from 'webpackbar';

declare module '@pure-org/api' {
  interface IProjectPluginConfig {
    'webpack-config': BaseConfigPluginOpitons
  }
}

export interface BaseConfigPluginOpitons {
  entry: string[];
  dist: string;
  /**
   * 是否开启压缩
   *
   * @type {boolean}
   * @memberof BaseConfigPluginOpitons
   */
  compress: boolean;

  customConfig(config: Config, context: { projectRoot: string }): void;
  // https://www.npmjs.com/package/webpack-bundle-analyzer

  /**
   *
   *
   * @type {{
   *
   *   }}
   * @memberof BaseConfigPluginOpitons
   */
  bundleAnalyzer: {
    enable: boolean,
  } & BundleAnalyzerPlugin.Options
}

// eslint-disable-next-line import/no-default-export
export default class BaseWebpackPlugin extends Plugin {
  static priority = 5;

  chainWebpackConfig: PluginChainWebpackConfigHook = async (config) => {
    const options: Partial<BaseConfigPluginOpitons> = this.getPluginOption('webpack-config');
    const {
      entry = [path.join(this.PROJECT_ROOT, './src/main.js')],
      dist,
      compress = false,
      customConfig,
      bundleAnalyzer,
    } = options;

    const { enable: analyzerEnable, ...restAnalyzerOption } = bundleAnalyzer ?? {};

    const entryConfig = config
      .entry('main');
    entry.forEach((e) => {
      entryConfig.add(e);
    });
    entryConfig.end();

    // output config
    config
      .output
      .path(path.join(this.PROJECT_ROOT, dist ?? 'dist'))
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

    config.stats('errors-only');

    config.context(this.PROJECT_ROOT);

    config.optimization
      .splitChunks({
        cacheGroups: {
          defaultVendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          fawkes: {
            name: 'chunk-fawkes',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?fawkes-lib(.*)/,
            chunks: 'initial',
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 30,
            chunks: 'initial',
            reuseExistingChunk: true,
          },
        },
      })
      .minimizer('terser').use(TerserPlugin);

    const envs = dotenv.config({
      path: `${this.PROJECT_ROOT}/.env${process.env.NODE_ENV
        ? `.${process.env.NODE_ENV}`
        : ''
      }`,
    });

    dotenvExpand.expand(envs);
    const processEnv: Record<string, string> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(envs.parsed ?? {})) {
      processEnv[key] = JSON.stringify(value);
    }

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
          ...processEnv,
        },
      }])
      .end()

      .plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin)
      .end()

      .plugin('copy-plugin')
      .use(CopyPlugin, [{
        patterns: [{
          from: path.resolve(this.PUBLIC_PATH),
          to: path.resolve(this.OUTPUT_PATH),
          globOptions: {
            // @see https://webpack.js.org/plugins/copy-webpack-plugin/#for-windows
            ignore: [
              path.posix.join(
                path.resolve(this.PUBLIC_PATH).replace(/\\/g, '/'),
                '**/.DS_Store',
              ),
              path.posix.join(path.resolve(this.PUBLIC_PATH).replace(/\\/g, '/'), '*.html'),
            ],
          },
          info: { minimized: true },
        }],
      }])
      .end();

    // .plugin('HardSourceWebpackPlugin')
    // .use(HardSourceWebpackPlugin)
    // .end();

    config.when(compress, (configInner) => {
      configInner
        .plugin('compress-webpack-plugin')
        .use(CompressionPlugin, [{
          algorithm: 'gzip',
          threshold: 10 * 1024, // 10kb
          test: /\.(js|css|html)/,
          deleteOriginalAssets: true,
        }])
        .end();
    });

    config.when(Boolean(analyzerEnable), (configInner) => {
      configInner
        .plugin('webpack-analyzer-plugin')
        .use(BundleAnalyzerPlugin, [restAnalyzerOption])
        .end();
    });

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

    customConfig?.(config, { projectRoot: this.PROJECT_ROOT });
  };
}
