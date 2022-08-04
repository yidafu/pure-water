# Vue3 项目

`@pure-org/water-preset-vue` 是基于 Vite 封装的 Vue3 + Typescript 项目的 Preset。

提供一下能力：

+ `pure dev`: 启动 Dev Server
+ `pure build`: 构建生产资源产物
+ `pure lint`: 检查 Js/Ts/Vue 代码，以及 CSS 和 Scss 样式代码
+ commit message lint: 严格程度适中的校验规则
  + 必须要有 scope
  + header 长度在 30~100 之间
  + subject 长度在 20~80 之间

## 使用方式

### 1. 安装依赖

```sh
pnpm install @pure-org/water-preset-vue --save-dev
```

### 2. 启用配置

修改 `pure.config.js`.

```diff
 module.exports = {
   name: 'your-project-name'
+  presets: ['vue']
 }
```
