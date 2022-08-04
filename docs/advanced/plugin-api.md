# Plugin API

```ts
class DemoPlugin extends Plugin {
  /* ====================== 继承的方法属性 ====================== */
  /**
   * 获取项目根目录地址
   */
  PROJECT_ROOT: string;

  /**
   * dist/ 目录地址
   */
  OUTPUT_PATH: string;

  /**
   * public/ 目录地址
   */
  PUBLIC_PATH: string;

  /**
   * 获取某个插件配置
   */
  getPluginOption(pluginName: string): Record<string, any>
  /* ====================== 继承的方法属性 ====================== */


  /**
   * 插件有限级. 1 优先级最高、最先执行； 100 优先级最低、最后执行
   *
   */
  public static priority = 100;

  /**
   * 配置 webpack 的钩子
   */
  chainWebpackConfig?: PluginChainWebpackConfigHook;

  /**
   * 配置 vite 的钩子
   *
   */
  viteConfig?: PluginViteConfigHook;

  /**
   * 注册 Cli 命令
   */
  registerCommand?: () => (ICommand | ICommand[]);

  /**
   * 编译开始前执行的钩子
   */
  beforeCompile?: PluginBeforeCompileHook;

  /**
   * 所有插件加载完成后执行
   */
  onPluginReady?: PluginOnPluginReadyHook;

  /**
   * dev server 就绪后执行
   */
  onDevServerReady?: PluginOnDevServerReadyHook;

  /**
   * dev 编译完成的钩子。目前只有 webpack 支持
   */
  onDevCompileDone?: PluginOnDevCompileDoneHook;

  /**
   * build 构建完成后执行
   */
  afterBuild?: PluginAfterBuildHook;
}
```
