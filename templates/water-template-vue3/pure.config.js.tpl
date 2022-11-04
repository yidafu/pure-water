module.exports = {
  name: '<%= appName %>',
  presets: ['vue'],
  viteConfig: {
    resolve: {
      alias: {
        "@": pathResolve("./src"), // 设置 `@` 指向 `src` 目录
        assets: pathResolve("./src/assets"),
        util: pathResolve("./src/util"),
        pages: pathResolve("./src/pages"),
        components: pathResolve("./src/components"),
      },
    },
  },
  plugins: {
    lint: {
      stylelint: {
        entry: ['src/**/*.scss'],
      },
    },
  },
};
