# Plugin

`Plugin` 提供了扩展 Pure Cli 的能力，包括以下方面：

+ 修改 Webpack/Vite 配置
+ 注册 Pure Cli 命令。比如：`@pure-org/water-plugin-lint` 注册 `lint` 命令
+ 在 Pure Cli 的生命周期或者代码编译的指定时机执行你的逻辑

## 插件定义

插件可以是一个 NPM 包，或者单个文件，只需要默认导出一个 `Plugin` 类即可。

以 `@pure-org/water-plugin-lint` 为例

大致的目录结构如下，核心是 `src/index.ts` 导出了继承了 `Plugin` 抽象类的 `LintPlugin` 类。

```txt
├── CHANGELOG.md
├── package.json
├── src
│   ├── many-other-files.ts
│   └── index.ts
└── tsconfig.json
```

`LintPlugin` 类，实现了注册`lint`命令，检查项目是否安装了`husky`/`lint-staged`包等能力。

```ts
import { Plugin } from '@pure-org/api';

export default class LintPlugin extends Plugin {
  // 实现了一些 Plugin 基类的方法、属性
}
```

> `Plugin` 基类提供了哪些能力，请参考: [Plugin API](/advanced/plugin-api)
