# Vue2 Webpack 配置插件

Vue2 相关的 Webpack 配置。

## 使用方式

### 1. 安装依赖

```sh
pnpm install @pure-org/water-plugin-vue2 --save-dev
```

### 2. 启用配置

修改 `pure.config.js` 或者 `preset` 的配置

```diff
 module.exports = {
   plugins: {
+    vue2: {}
   }
 }
```

## 插件配置

```ts
interface IPluginVu2Options {
  htmlOption?: HtmlWebpackPlugin.Options,
}
```

## index.html

默认 index.html 在 `<projectRoot>/public/index.html`。

### htmlOption

参考 `html-webpack-plugin` 的 `HtmlWebpackPlugin.Options`

## `.vue` 文件

支持 `.vue` 文件编译

## 样式文件

支持`.css` `.scss`样式文件编译。资源输出路径：`css/[name]_[contenthash:8].css`。

使用 Dart Sass 作为 Sass 解析实现，避免依赖安装问题。

## 媒体资源

支持 `.svg` `.png` `jpg` 等资源文件的转换。

默认将转换为：`(imgs|media|fonts)/[name]_[hash:8][ext]`

支持的文件后缀：

+ imgs 图片
  + svg
  + png
  + jpe?g
  + gif
  + webp
  + avif
+ media 视频
  + map4
  + webm
  + ogg
  + mp3
  + wav
  + flac
  + acc
+ fonts 字体
  + woff2
  + eot
  + ttf
  + otf
