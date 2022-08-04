# Babel 插件

Webpack 的 Babel 配置。

## 使用方式

### 1. 安装依赖

```sh
pnpm install @pure-org/water-plugin-babel --save-dev
```

### 2. 启用配置

修改 `pure.config.js` 或者 `preset` 的配置

```diff
 module.exports = {
   plugins: {
+    babel: {}
   }
 }
```

## 插件配置

```ts
export interface IPluginBabelOption {
  compilePackages?: string[];
  presets?: string[];
  plugins?: string[];
}
```

### compilePackages

需要 babel 编译 NPM 包列表。

**babel 插件默认不对 node_modules 的包进行编译。**如果某个 NPM 包里有较新的 ES 语法，可以通过这个配置来让 babel 编译。

### presets

同 `.babelrc.js` 的 presets

### plugins

同 `.babelrc.js` 的 plugins
