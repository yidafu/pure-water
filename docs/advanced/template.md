# 模板

项目模板是一个普通的 NPM 包，`@pure-org/create`从 NPM 源下载 npm 包，对其解压并把所有文件复制到指定目录。

## `pure-create` 命令

```sh
Usage: pure-create [options] <app-name>

从模板创建项目

Arguments:
  app-name                   new app to create

Options:
  -t, --template <name>      模板的 NPM 包名, 如: @pure-org/water-template-vue
  -r, --registry <registry>  指定下载模板的 npm 源
  -f, --force                在已存在的目录里创建项目, 会覆盖同名文件
  -h, --help                 display help for command
```

## 模板文件

模板中有需要做变量替换的需求，比如：将`package.json`的`name`字段替换成开发者输入的内容。

`@pure-org/create` 约定说有需要替换支持变量的文件后缀名都是`.tpl`。`.tpl`会在从临时目录移动到目标目录的过程中去掉。比如：npm 包里有 `package.json` 和 `package.json.tpl`，`package.json.tpl`复制过去后边会覆盖原来的`package.json`。

替换变量的格式是`<%= variableName %>`。如下面例子：

```js
{
  "name": "<%= appName %>",
  "version": "1.0.0",
  ...
}
```

目前支持变量有：

+ appName: 开发者输入的应用名
+ packageVersion: `@pure-cli/cli`的版本
