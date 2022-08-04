# Preset

`Preset` 本质上是一个 JS 对象，包含了**预定义**的插件和配置。跟 `Babel`、`ESLint` 的 `preset` 是同一个概念。

所有配置项都尽可能的收敛到`Preset`里，上层应用只需要引入 `preset`，这样应用开发者就不需要关心各种工具配置。应用开发者只应该通过`pure.config.js` 修改`preset`的默认值配置，尽量避免现在项目里新增配置和插件。

`Preset` 配置项和 `pure.cofnig.js` 是完全一致。具体配置参考：[pure.config.js](/advanced/pure-config)
