import path from 'path';

import WebpackChain from 'webpack-chain';

export interface ISpriteOption {
  sourceDir: string;
}

export interface IAssetConfigOption {
  projectRoot: string;
  /**
   * default false
   *
   * @type {(ISpriteOption | false)}
   * @memberof IAssetConfigOption
   */
  sprite?: ISpriteOption | false;
}

export function assetConfig(config: WebpackChain, options: IAssetConfigOption) {
  const { projectRoot, sprite = false } = options;

  const webpackModuleConfig = config.module;
  if (sprite !== false) {
    webpackModuleConfig
      .rule('svg-asset')
      .test(/\.(svg)(\?.*)?$/)
      .type('asset/resource' as any)
      .exclude.add(path.join(projectRoot, sprite.sourceDir)).end()
      .end()

      .rule('sprite-icon')
      .test(/\.svg$/)
      .include.add(path.join(projectRoot, sprite.sourceDir)).end()
      .use('svg-sprite-loader')
      .loader(require.resolve('svg-sprite-loader'))
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  } else {
    webpackModuleConfig
      .rule('svg-asset')
      .test(/\.(svg)(\?.*)?$/)
      .type('asset/resource' as any)
      .end();
  }

  webpackModuleConfig
    .rule('image-asset')
    .test(/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/)
    .type('asset' as any)
    .end()

    .rule('media-asset')
    .type('asset/resource' as any)
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .end()

    .rule('font-asset')
    .type('asset/resource' as any)
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .end();

  // FIXME: webpack-chain module.rule() not suport generator
  (config.module.rules.get('svg-asset') as any)
    .store.set('generator', { filename: 'imgs/[name]_[hash:8][ext]' });
  (config.module.rules.get('image-asset') as any)
    .store.set('generator', { filename: 'imgs/[name]_[hash:8][ext]' });
  (config.module.rules.get('media-asset') as any)
    .store.set('generator', { filename: 'media/[name]_[hash:8][ext]' });
  (config.module.rules.get('font-asset') as any)
    .store.set('generator', { filename: 'fonts/[name]_[hash:8][ext]' });
}
