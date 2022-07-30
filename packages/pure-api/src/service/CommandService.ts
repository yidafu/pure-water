import merge from 'lodash.merge';
import debug from 'debug';
import { Bundler, EmptyBundler, ViteBundler, WebpackBundler } from '../bundler';
import minimist, { ParsedArgs } from 'minimist';
import {
  exitWithMessage,
  isFunction,
  requireDefault,
  runAsyncFns,
  tryResolve,
} from '../utils';
import { UserConfig } from 'vite';
import { resolveProjectConfig } from './utils';
import { CURRENT_DIRECTORY, PROJECT_ROOT } from '../constant';
import path from 'path';
import {
  IPluginConstructor,
  PluginAfterBuildHook,
  PluginBeforeCompileHook,
  PluginChainWebpackConfig,
  PluginOnCleanHook,
  PluginOnDevCompileDoneHook,
  PluginOnDevServerReadyHook,
  PluginOnPluginReadyHook,
} from '../plugin';
import { Configuration } from 'webpack';

interface IProjectConfig {
  name: string;
  
  bundler: 'vite' | 'webpack';

  devServer: boolean;
  outputPath: string;

  presets: string[];
  plugins: Record<string, any>;


  viteConfig: UserConfig,

  webpackConfig: Configuration,
}

interface IPurePaths {
  projectConfig: string;
  projectRoot: string;
  cwd: string;
  outputPath: string;
}

type CommandOption = string | {
  description: string;
  defaultValue?: string;
};

interface ICommand {
  name: string;
  alias?: string;
  action(...args: any[]): Promise<void>;
  options: Record<string, CommandOption>;
  description?: string;
}

const log = debug('pure:api:service');

/**
 *
 *
 * @class CommandService
 */
class CommandService {
  private bundler: Bundler;

  private projectConfig: Partial<IProjectConfig> = {};

  private argv: ParsedArgs;

  public commands: ICommand[] = [];

  public paths: Partial<IPurePaths> = {};

  private apiMethods = [];

  private onProcessExitFns = [];

  public chainWebpackConfigFns: PluginChainWebpackConfig[] = [];

  private onPluginReadyFns: PluginOnPluginReadyHook[] = [];

  public beforeCompileFns: PluginBeforeCompileHook[] = [];

  public onDevServerReadyFns: PluginOnDevServerReadyHook[] = [];

  public onDevCompileDoneFns: PluginOnDevCompileDoneHook[] = [];

  public afterBuildFns: PluginAfterBuildHook[] = [];

  public onCleanFns: PluginOnCleanHook[] = [];

  /**
   * Creates an instance of CommandService.
   * @param {Bundler} BundlerKlass
   * @memberof CommandService
   */
  constructor() {
    this.bundler = new EmptyBundler(this);
    this.argv = minimist(process.argv.slice(2));
  }

  /**
   *
   *
   * @param {string} pluginName
   * @return {any}
   * @memberof CommandService
   */
  getPluginOption(pluginName: string): any {
    return this.projectConfig.plugins?.[pluginName] ?? {};
  }

  /**
   * main logic
   *
   * @memberof CommandService
   */
  async load() {
    await this.initPaths();

    await this.loadProjectConfig();

    await this.addBuiltinCommands();

    // await this.loadGlobalConfig();

    await this.processExitGuard();

    await this.loadPlugins();
  }

  /**
   * init project paths
   *
   * @private
   * @memberof CommandService
   */
  private async initPaths() {
    this.paths = {
      projectConfig: await resolveProjectConfig(this.argv.config),
      projectRoot: PROJECT_ROOT,
      cwd: CURRENT_DIRECTORY,
      outputPath: path.join(PROJECT_ROOT, 'dist'),
    };
  }

  /**
   *
   *
   * @memberof CommandService
   */
  dev = async () => {
    await this.bundler.dev();
  };

  /**
   *
   *
   * @memberof CommandService
   */
  build = async () => {
    await this.bundler.build();
  };

  /**
   *
   *
   * @return {Partial<IProjectConfig>}
   * @memberof CommandService
   */
  getProjectConfig(): Partial<IProjectConfig> {
    return this.projectConfig ?? {};
  }

  /**
   *
   *
   * @memberof CommandService
   */
  async loadProjectConfig() {
    this.projectConfig = {};

    this.projectConfig = require(this.paths.projectConfig!);
    if (this.argv.bundler === 'webpack' || this.projectConfig.bundler === 'webpack') {
      this.bundler = new WebpackBundler(this);
    } else {
      this.bundler = new ViteBundler(this);
    }
    const presets = await this.loadPresets();
    this.projectConfig = presets.reduce((pV, cV) => {
      return merge(cV, pV);
    }, this.projectConfig);
  }

  /**
   *
   *
   * @return {Promise<IProjectConfig[]>}
   * @memberof CommandService
   */
  async loadPresets(): Promise<IProjectConfig[]> {
    log('preset will load %s', this.projectConfig.presets);
    if (!this.projectConfig.presets?.length) {
      return [];
    }
    const presetMap = new Map<string, IProjectConfig>();
    for (const presetName of this.projectConfig.presets) {
      if (presetMap.has(presetName)) {
        continue;
      }
      log(`[start] loading preset config: ${presetName}`);
      const presetCfg = await this.loadPreset(presetName);

      presetMap.set(presetName, presetCfg);
    }

    return Array.from(presetMap.values());
  }

  /**
   *
   *
   * @param {string} presetName
   * @return {Promise<IProjectConfig>}
   * @memberof CommandService
   */
  async loadPreset(presetName: string): Promise<IProjectConfig> {
    const presetPrefix = ['@pure/water-preset-'];
    const presetCfgList: IProjectConfig[] = [];
    for (const prefix of presetPrefix) {
      // FIXME:
      const filepathOrFail = tryResolve(
        prefix + presetName,
        this.paths.projectConfig,
      );
      if (typeof filepathOrFail === 'string') {
        presetCfgList.push(await requireDefault(filepathOrFail));
      }
    }

    const presetCfg = presetCfgList.find(Boolean);
    if (!presetCfg) {
      exitWithMessage('请检查是否已经配置过 pure 插件，或者插件配置是否正确');
    }

    return presetCfg!;
  }

  /**
   *
   *
   * @memberof CommandService
   */
  async loadPlugins() {
    const { plugins = {} } = this.projectConfig;

    const loadPlgPromises = Object.keys(plugins).map((pluginName) => {
      try {
        return this.loadPlugin(pluginName);
      } catch (err) {
        exitWithMessage(`加载插件[${pluginName}]失败,请检查依赖是否按住`);
      }
    });
    const pluginKlasses = await Promise.all(loadPlgPromises);
    pluginKlasses.sort((a, b) => (a?.priority ?? 100) - (b?.priority ?? 100))
      .forEach((PluginKlass) => {
        if (PluginKlass) {
          const plg = new PluginKlass(this);
          if (isFunction(plg.chainWebpackConfig)) {
            this.chainWebpackConfigFns.push((config) => plg.chainWebpackConfig!(config));
          }
          if (isFunction(plg.beforeCompile)) {
            this.beforeCompileFns.push(() => plg.beforeCompile!());
          }
          if (isFunction(plg.onDevServerReady)) {
            this.onDevServerReadyFns.push(() => plg.onDevServerReady!());
          }
          if (isFunction(plg.onDevCompileDone)) {
            this.onDevCompileDoneFns.push(() => plg.onDevCompileDone!());
          }
          if (isFunction(plg.afterBuild)) {
            this.afterBuildFns.push(() => plg.afterBuild!());
          }
          if (isFunction(plg.onClean)) {
            this.onCleanFns.push(() => plg.onClean!());
          }
          if (isFunction(plg.onPluginReady)) {
            this.onPluginReadyFns.push(() => plg.onPluginReady!());
          }
          if (isFunction(plg.registerCommand)) {
            const cmd = plg.registerCommand();
            if (cmd) {
              this.commands.push(cmd);
            }
          }
        }
      });
  }

  /**
   *
   *
   * @param {string} plgName
   * @return {Promise<Plugin>}
   * @memberof CommandService
   */
  async loadPlugin(
    plgName: string,
  ): Promise<IPluginConstructor> {
    const PLUGIN_PREFIX = ['@pure/water-plugin-'];
    const pluginPath = this.resolveWithPrifix(plgName, PLUGIN_PREFIX);
    if (pluginPath) {
      log('[start] loading plugin %s', plgName);
      const PlgKlass: IPluginConstructor = await requireDefault(pluginPath);
      log('[end] finish load plugin %s', plgName);
      return PlgKlass;
    }
    exitWithMessage('未找到插件, 请检查配置是否正确或依赖是否安装');
  }

  /**
   *
   *
   * @memberof CommandService
   */
  loadGlobalConfig() {
    // throw new Error("Method not implemented.");
  }

  /**
   *
   *
   * @memberof CommandService
   */
  processExitGuard() {
    // throw new Error("Method not implemented.");
  }

  /**
   *
   *
   * @param {ICommand} cmd
   * @memberof CommandService
   */
  registerCommand(cmd: ICommand) {
    this.commands.push(cmd);
  }

  /**
   *
   *
   * @private
   * @memberof CommandService
   */
  private addBuiltinCommands() {
    const defaultOptions = {
      // '--debug': '调试日志打印'
      '--bundler': {
        description: '打包器, 可选: vite/webpack, 默认: vite',
        defaultValue: 'vite',
      },
    };
    this.registerCommand({
      name: 'dev',
      action: this.dev,
      description: '启动本地开发服务',
      options: {
        ...defaultOptions,
      },
    });
    this.registerCommand({
      name: 'build',
      action: this.build,
      description: '构建生产环境资源',
      options: {
        ...defaultOptions,
      },
    });
    this.registerCommand({
      name: 'clean',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: async (e) => {
        // TODO: Clean logic
        // removeDirectory(this.paths.outputPath)
        if (this.onCleanFns.length > 0) {
          runAsyncFns(this.onCleanFns);
        }
      },
      options: {
        // '--all': '清理应用所有缓存',
      },
    });
  }

  /**
   *
   *
   * @param {string} pkgPostfix
   * @param {string[]} prefixList
   * @return {string}
   * @memberof CommandService
   */
  resolveWithPrifix(pkgPostfix: string, prefixList: string[]) {
    for (const prefix of prefixList) {
      const filepathOrFail = tryResolve(
        prefix + pkgPostfix,
        // FIXME: plugin 应为 preset 所在文件
        this.paths.projectConfig,
      );
      if (filepathOrFail) {
        return filepathOrFail;
      }
    }
  }
}

export { CommandService, ICommand, IProjectConfig };
