---
"@pure-org/api": patch
"@pure-org/water-plugin-lint": patch
"@pure-org/water-plugin-vue2": patch
"@pure-org/water-plugin-webpack-config": patch
"@pure-org/eslint-config-water": patch
"@pure-org/cli": patch
"@pure-org/stylelint-config-water": patch
"@pure-org/tsconfig": patch
"@pure-org/water-plugin-babel": patch
"@pure-org/water-preset-vue": patch
"@pure-org/water-preset-vue2": patch
---

fix some known problem by yidafu [#36](https://github.com/yidafu/pure-water/pull/36)
- using stringify-obejct replace JSON.stringify
- fix incorrect generated husky config
- fix messing output filename