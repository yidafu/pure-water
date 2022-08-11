# 基础 Webpack 配置插件

提供基础的 Webpack 配置。

做了一下约定：

+ 约定项目入口是：`src/main.js`
+ 构建产物目录是：`dist/`
+ 生产构建产物命名规则：`name]_[contenthash:8].js`
+ `node_modules/`依赖会被打包成`chunk-vendors`

## 使用方式

### 1. 安装依赖

```sh
pnpm install @pure-org/water-plugin-webpack-config --save-dev
```

### 2. 启用配置

修改 `pure.config.js` 或者 `preset` 的配置

```diff
 module.exports = {
   plugins: {
+    'webpack-config': {}
   }
 }
```

## 插件配置

```ts
interface BaseConfigPluginOpitons {
  entry: string[];

  dist: string;

  compress: boolean;

  customConfig(config: WebpackChian, context: { projectRoot: string }): void;

  bundleAnalyzer: { enable: boolean } & BundleAnalyzerPlugin.Options
}
```

### entry

webpack 编译入口，默认是：`src/main.js`

### dist

构建产物目录，默认是：`dist/`

### compress

是否压缩构建产物，默认生产环境会开启

### customConfig

用于自定义修改 webpack 配置，在插件最后执行

### bundleAnalyzer

打包分析插件 [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

#### enable

控制是否开启该插件，默认关闭

#### 属于参数

webpack-bundle-analyzer 配置，参考：[Options (for plugin)](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin)