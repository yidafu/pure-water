# Change Log - @pure-org/cli

This log was last generated on Wed, 12 Oct 2022 12:52:13 GMT and should not be manually modified.

## 0.2.9

+ 修改推荐级别 commit-msg 的最长度为 10; 修改默认 dev server 端口 8201 by yidafu [#73](https://github.com/yidafu/pure-water/pull/73)

## 0.2.8
+ 修改 React 的 eslint 规则. 修改推荐的 commitlint subject 最小长度至少为 5 by yidafu [#72](https://github.com/yidafu/pure-water/pull/72)

## 0.2.7
+ 添加 React 和 NestJS 模板 by yidafu [#71](https://github.com/yidafu/pure-water/pull/71)

## 0.2.6
+ 如果项目根目录不存在`package.json`就不生成 git hook 配置 by yidafu [#70](https://github.com/yidafu/pure-water/pull/70)

## 0.2.5

+ 修复 pure.config.js 不符预期的数组合并行为 by yidafu [#69](https://github.com/yidafu/pure-water/pull/69)

## 0.2.4

+ js/css 资源放入子目录下 by yidafu [#68](https://github.com/yidafu/pure-water/pull/68)

## 0.2.3

+ 修复 webpack copy plugin 的 ignore 配置没有在 window 下生效 by yidafu [#67](https://github.com/yidafu/pure-water/pull/67)

## 0.2.2

+ 修复 `@pure-org/water-template-weapp` publishConfig
+ 修复 `pure.config.js` 配置 webpack 插件为报错 by yidafu [#66](https://github.com/yidafu/pure-water/pull/66)
+ 修复 vue2 eslint 配置缺失 `extraFileExtension: ['.vue']`

## 0.2.1

+ 修复 `template-vue3` 缺失文件和依赖问题 by yidafu [#65](https://github.com/yidafu/pure-water/pull/65)

_Version update only_
## 0.2.0

by yidafu

### feature

+ `@pure-org/create`
  + 新增`@pure-org/create`根据模板初始化项目 [#46]([#61](https://github.com/yidafu/pure-water/pull/46)
  + vue2/vue3 项目模板 [#45](https://github.com/yidafu/pure-water/pull/45)
  + 微信小程序项目木耙 [#57](https://github.com/yidafu/pure-water/pull/57)
+ @pure-org/lint
  + `pure lint`新增 `--only-eslint`/`--only-stylelint` 参数[#61](https://github.com/yidafu/pure-water/pull/61)
  + `pure lint` 支持读取项目目录下的 `.stylelintrc.js` [#61](https://github.com/yidafu/pure-water/pull/61)
  + 自动初始化 husky lint-staged 配置 [#33](https://github.com/yidafu/pure-water/pull/33)
  + JS/TS import 导出顺序 [#34](https://github.com/yidafu/pure-water/pull/34)
  + CSS 熟悉按字母排序 [#25](https://github.com/yidafu/pure-water/pull/25)
+ 完善的 webpack 配置
+ 使用 rush 替换 changeset [#48](https://github.com/yidafu/pure-water/pull/48)
+ 新增文档说明 [#38](https://github.com/yidafu/pure-water/pull/38)
+ 新增 `@pure-org/tsconfig` [#26](https://github.com/yidafu/pure-water/pull/26)

## 0.1.0

by yidafu

### Feature
+ 实现 webpack 的 bundler [#10](https://github.com/yidafu/pure-water/pull/10)
+ 支持向上查找`pure.config.js` [#11](https://github.com/yidafu/pure-water/pull/11)
+ 新增 vue 的 preset [#9](https://github.com/yidafu/pure-water/pull/9)
+ eslint 配置 airbnb 配置 [#7](https://github.com/yidafu/pure-water/pull/7)
+ 插件加载机制 [#6](https://github.com/yidafu/pure-water/pull/6)

_Initial release_


_Initial release_

