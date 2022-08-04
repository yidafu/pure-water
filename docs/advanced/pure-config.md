# 配置文件

```ts
interface IProjectConfig {
  name: string;

  bundler: 'vite' | 'webpack';

  presets: string[];

  plugins: IProjectPluginConfig;

  viteConfig: UserConfig,

  webpackConfig: Configuration,
}
```

## name

项目名

## bundler

指定使用 `vite`/`webpack` 进行打包。

只有 preset 才可以配置，应用里不应该配置。

## presets

目前已有[`vue`](/preset/preset-vue)和[`vue2`](/preset/preset-vue2)两个 preset。

## viteConfig

用于特殊情况需要定制 Vite 配置。

## webpackConfig

用于特殊情况需要定制 Webpack 配置。
