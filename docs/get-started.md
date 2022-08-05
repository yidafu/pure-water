# 快速入手

## 创建新应用

首先，全局安装 `@pure-org/create`

```sh
pnpm i -g @pure-org/create
```

然后，就可以通过 `pure-create` 命令创建应用了。

```sh
pure-create test-app
```

![Pure Create command](/imgs/pure-create.gif)

## 已有项目使用

以 Vue3 项目举例。

### 1. 安装依赖

```sh
pnpm install @pure-org/cli @pure-org/water-preset-vue --save-dev
```

### 2. 新增配置文件

现在项目根目录新建 `pure.config.js` 文件。内容如下：

```js
module.exports = {
  name: 'project-name',
  presets: ['vue'],
};
```

### 3. 修改`package.josn`

```diff
 "script": {
+    "dev": "pure dev",
+    "build": "pure build",
+    "lint": "pure lint",
 }
```

### 4. 初始化 lint 配置

在项目根目录执行一次下面的命令，该命令第一次执行的时候会自动安装 `husky` 和 `lint-staged`，并初始化好 `pre-commit` 和 `commit-msg` Git Hook。

```sh
pnpm run lint
```

#### 4.1 初始 eslint 配置（可选）

建议配置一下 eslint 规则，这样在开发时就能够通过编辑器检查代码。

先安装依赖

```sh
pnpm install @pure-org/eslint-config-water --save-dev
````

<p style="color: red"> 注意：版本需要和 @pure-org/cli 保持一致</p>

新增`.eslintrc.js`，内容如下：

```js
module.exports = {
  extends: ['@pure-org/eslint-config-water/vue']
}
```

#### 4.2 初始化 stylelint 配置（可选）

同样，建议配置一下 stylelint 规则。

先安装依赖：

```sh
pnpm install @pure-org/stylelint-config-water --save-dev
```

在项目根目录新增`.stylelintrc.js`，内容如下：

```js
module.exports = {
  extends: ['@pure-org/stylelint-config-water'],
}
```

### 4.3 配置 tsconfig.json

如果你的项目使用了 Typescript，建议依赖 pure 提供的 tsconfig。

先添加依赖

```sh
pnpm install @pure-org/tsconfig --save-dev
```

再修改 tsconfig.json

```diff
 {
+  "extends": '@pure-org/tsconfig/tsconfig.json',
   "compilerOptions": {
     ...
   }
 }
```
