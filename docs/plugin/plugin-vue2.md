# Vue2 Webpack 配置插件

Vue2 相关的 Webpack 配置。

> 需要注意 Vue 2.6 和 Vue 2.7 是不兼容，升级请充分测试保证兼容 

## 使用方式

支持 Vue 版本 `>= 2.6.0`

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
interface ISpriteOption {
  sourceDir: string;
}

interface IPluginVu2Options {
  htmlOption?: HtmlWebpackPlugin.Options,

  sprite: ISpriteOption | false;

  enableXss: boolean;
}
```
### htmlOption

参考 `html-webpack-plugin` 的 [HtmlWebpackPlugin#Options](https://github.com/jantimon/html-webpack-plugin#options)

### sprite

基于`svg-sprite-loader`实现。默认是：`false` 关闭雪碧图 Loader

`sourceDir` 存放 svg 格式的雪碧图目录。

### enableXss

vue 是 `v-html` 指令是否做 XSS 过滤。

如果开启需要，项目里安装`xss`包，并将`xss`挂载到 vue 原型上。

```js
import xss from 'xss';
Vue.prototype.xss = xss
```
## index.html

默认 index.html 在 `<projectRoot>/public/index.html`。

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
