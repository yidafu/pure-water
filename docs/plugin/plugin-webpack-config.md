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
