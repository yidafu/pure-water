# Lint 插件

Lint 插件主要提供了 Ts/Js/Scss/Vue 文件默认 Lint 规则和能力。并且可以通过插件配置控制Lint的开启关闭或者修改默认配置。

## 使用方式

### 1. 安装依赖

```sh
pnpm install @pure-org/water-plugin-lint --save-dev
```

### 2. 启用配置

修改 `pure.config.js` 或者 `preset` 的配置

```diff
 module.exports = {
   plugins: {
+    lint: {}
   }
 }
```

### 命令行

```sh
npx pure lint
```

如果想要 autofix 报错，加上`--fix`参数即可

```sh
npx pure lint --fix
```

## 插件配置

插件配置定义如下：

```ts
export interface ILintPluginOption {
  commitlintMode?: ICommitlintMode
  commitlint?: ICommitLintOption,

  eslintMode?: ESLintMode;
  eslint?: IESlintOption,

  stylelint?: IStylelintOption,
}
```

### Commitlint

> 如不了解 Commit Message 推荐格式，推荐阅读：[Concept: Commit conventions](https://commitlint.js.org/#/concepts-commit-conventions)

#### commitlintMode

commitlint 预设配置，默认是：`recommended`。

```ts
type ICommitlintMode = 'loose' | 'recommended' | 'strict';
```

+ `loose`: 只须有 `type`, 不限制 `scope`/`subject`/`body`,但会告警
+ `recommended`: 必须要有 `type`/`scope`，且 `subject` 在 20~80 之间，`header`总长度在`30~100`
+ `strict`: 同 `recommended`，增加必须有`biz-moduel`/`body` 限制

#### commitlint

Commintlint 配置

```ts
import { UserConfig } from '@commitlint/types';

interface ICommitLintOption extends UserConfig {
  disable?: boolean
};
```

+ `disable`: 是否启用 commitlint. 设为 `true` 将不检查 Commit Message, 默认：`false`
+ rest option 请参考 `@commitlint/types` 的 `UserConfig` 配置

### ESLint

ESLint 规则是继承自：`eslint-config-airbnb-base` `eslint-config-airbnb-typescript`, 除此之外还有一些自定义的 rules。

#### eslintMode

ESLint 预设配置，默认是：`base`。

```ts
type ESLintMode = 'base' | 'vue2' | 'vue';
```

+ `base`: 针对纯 TS 项目
+ `vue2`: 对 Vue2 项目，除了上面的 airbnb 的规则还有 Vue 官方的 vue2 推荐规则
+ `vue`: 对 Vue3 项目，除了上面的 airbnb 的规则还有 Vue 官方的 vue3 推荐规则

#### eslint

自定义 eslint 配置

```ts
import { ESLint } from 'eslint';

interface IESLintOption extends ESLint.Options {
  entry?: string[];
  disable?: boolean;
};
```

+ `disable`: 是否启用 eslint. 设为 `true` 将不检查 Ts/Js/Vue 代码, 默认：`false`
+ `entry`: 需要检查代码文件的路径模式匹配字符串，默认：`['src/**/*.js','src/**/*.ts']`
+ rest option 请参考 `eslint` 的 `ESLint.Options` 配置

### StyleLint

#### stylelint

自定义 stylelint 配置

```ts
import stylelint from 'stylelint';

interface IStylelintOption extends stylelint.LinterOptions {
  entry?: string[];
  disable?: boolean;
};
```

+ `disable`: 是否启用 stylelint. 设为 `true` 将不检查 Ts/Js/Vue 代码, 默认：`false`
+ `entry`: 需要检查代码文件的路径模式匹配字符串，默认：`['src/**/*.js','src/**/*.ts']`
+ rest option 请参考 `stylelint` 的 `LinterOptions` 配置
