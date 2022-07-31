import path from 'path';
import { isDev, isProd, Plugin, PluginChainWebpackConfig } from '@pure/api';
import WebpackBar from 'webpackbar';
import webpack from 'webpack';

export default class BaseWebpackPlugin extends Plugin {
  static priority = 5;

  chainWebpackConfig: PluginChainWebpackConfig = async (config) => {
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
      config.output.filename('[name]_contenthash:8.js')
        .chunkFilename('[name]_contenthash:8.js');
    } else {
      config.mode('development');
      config.output.filename('[name].js')
        .chunkFilename('name.js');
    }

    config.context(this.service.paths.projectRoot!);

    // config.optimization.splitChunks({
    //   cacheGroups: {
    //     // vendors: {
    //     //   name: 'vendors',
    //     //   minSzie: 0,
    //     //   minChunks: 2,
    //     //   chunks: 'all',
    //     //   priority: -10,
    //     //   reuseExistingChunk: true,
    //     // },
    //   },
    // });

    config.optimization.runtimeChunk({
      name: 'vendors',
    });

    config
      .plugin('webpack-bar')
      .use(WebpackBar, [{ color: 'green' }])
      .end()
      .plugin('define-plugin')
      .use(webpack.DefinePlugin, [{ __DEBUG__: JSON.stringify(isDev) }])
      .end();
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
  };
}