import WebpackChain from 'webpack-chain';

export function assetConfig(config: WebpackChain) {
  config.module
    .rule('svg-asset')
    .test(/\.(svg)(\?.*)?$/)
    .type('asset/resource' as any)
    .end()

    .rule('image-asset')
    .test(/\.(png|jpe?g|gif|webp|avif)(\?.*)?$/)
    .type('asset' as any)
    .end()

    .rule('media-asset')
    .type('asset' as any)
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .end()

    .rule('font-asset')
    .type('asset' as any)
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
    .store.set('generator', { filename: 'media/[name]_[hash:8][ext]' });
}
