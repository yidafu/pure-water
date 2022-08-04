# Vue2 项目

`@pure-org/water-preset-vue2` 是基于 Webpack 封装，提供给 Vue2 + JavaScript 项目的 Preset。

**Babel 配置 preset-env 构建产物的目标配置是：`> 2%, not dead`。**

提供以下能力：

+ `pure dev`: 启动 Dev Server
+ `pure build`: 构建生产资源产物
+ `pure lint`: 检查 Js/Vue 代码，以及 CSS 和 Scss 样式代码
+ commit message lint: 宽松的校验规则
  + 可以不填 scope
  + 不限制 header/body/footer 长度，会警告
