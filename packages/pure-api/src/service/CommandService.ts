import path from 'path';

import debug from 'debug';
import minimist, { ParsedArgs } from 'minimist';
import { UserConfig } from 'vite';
import { Configuration } from 'webpack';

import {
  Bundler, EmptyBundler, ViteBundler, WebpackBundler,
} from '../bundler';
import { CURRENT_DIRECTORY } from '../constant';
import {
  IPluginConstructor,
  PluginAfterBuildHook,
  PluginBeforeCompileHook,
  PluginChainWebpackConfigHook,
  PluginOnCleanHook,
  PluginOnDevCompileDoneHook,
  PluginOnDevServerReadyHook,
  PluginOnPluginReadyHook,
  PluginViteConfigHook,
} from '../plugin';
import {
  exitWithMessage,
  isFunction,
  requireDefault,
  resolveProjectRoot,
  runAsyncFns,
  tryResolve,
} from '../utils';

import { mergeProjectConfig } from './utils';

const PRESET_PATH_KEY = Symbol('__PRESET_PATH__');

interface IProjectPluginConfig {
  [key: string]: any;
}

interface IProjectConfig {
  name: string;

  bundler: 'vite' | 'webpack';

  devServer: boolean;
  outputPath: string;

  presets: string[];
  plugins: IProjectPluginConfig;

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

  public chainWebpackConfigFns: PluginChainWebpackConfigHook[] = [];

  public viteConfigFns: PluginViteConfigHook[] = [];

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
    const projectRoot = resolveProjectRoot(this.argv.config);
    this.paths = {
      projectRoot,
      projectConfig: path.join(projectRoot, this.argv.config ?? 'pure.config.js'),
      cwd: CURRENT_DIRECTORY,
      outputPath: path.join(projectRoot, 'dist'),
    };
  }

  /**
   *
   *
   * @memberof CommandService
   */
  dev = async () => {
    if ((this.argv.env ?? 'dev') === 'dev') {
      process.env.NODE_ENV = 'development';
    }
    await this.bundler.dev();
  };

  /**
   *
   *
   * @memberof CommandService
   */
  build = async () => {
    if ((this.argv.env ?? 'prod') === 'prod') {
      process.env.NODE_ENV = 'production';
    }
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

    this.projectConfig = await requireDefault(this.paths.projectConfig!);
    const presets = await this.loadPresets();
    this.projectConfig = presets.reduce(
      (pV, cV) => mergeProjectConfig(cV, pV),
      this.projectConfig,
    );

    if (this.argv.bundler === 'webpack' || this.projectConfig.bundler === 'webpack') {
      log('projectConfig#bundler => webpack');
      this.bundler = new WebpackBundler(this);
    } else {
      log('projectConfig#bundler => vite');
      this.bundler = new ViteBundler(this);
    }
  }

  /**
   *
   *
   * @return {Promise<IProjectConfig[]>}
   * @memberof CommandService
   */
  async loadPresets(): Promise<Partial<IProjectConfig>[]> {
    log('preset will load %s', this.projectConfig.presets);
    if (!this.projectConfig.presets?.length) {
      return [];
    }
    const presetMap = new Map<string, Partial<IProjectConfig>>();
    // eslint-disable-next-line no-restricted-syntax
    for (const presetName of this.projectConfig.presets) {
      if (presetMap.has(presetName)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      log(`[start] loading preset config: ${presetName}`);
      // eslint-disable-next-line no-await-in-loop
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
  // eslint-disable-next-line no-param-reassign
  async loadPreset(presetName: string): Promise<IProjectConfig> {
    const presetPrefix = ['@pure-org/water-preset-'];
    const presetCfgList: IProjectConfig[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const prefix of presetPrefix) {
      // FIXME:
      const filepathOrFail = tryResolve(
        prefix + presetName,
        this.paths.projectConfig,
      );
      if (typeof filepathOrFail === 'string') {
        // eslint-disable-next-line no-await-in-loop
        const presetCfg: IProjectConfig = await requireDefault(filepathOrFail);
        if (presetCfg) {
          if (presetCfg.plugins) {
            Object.values(presetCfg.plugins).forEach((plgCfg: any) => {
              // eslint-disable-next-line no-param-reassign
              plgCfg[PRESET_PATH_KEY] = [filepathOrFail];
            });
          }
          presetCfgList.push(presetCfg);
        }
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

    // eslint-disable-next-line array-callback-return
    const loadPlgPromises = Object.keys(plugins).map((pluginName) => {
      try {
        return this.loadPlugin(pluginName, plugins[pluginName][PRESET_PATH_KEY]);
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
          if (isFunction(plg.viteConfig)) {
            this.viteConfigFns.push(() => plg.viteConfig!());
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
              if (Array.isArray(cmd)) {
                this.commands.push(...cmd);
              } else {
                this.commands.push(cmd);
              }
            }
          }
        }
      });
    await runAsyncFns(this.onPluginReadyFns);
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
    rootPaths: string[],
  ): Promise<IPluginConstructor> {
    log('[start] loading plugin %s at root %s', plgName, rootPaths);
    const PLUGIN_PREFIX = ['@pure-org/water-plugin-'];
    // eslint-disable-next-line no-restricted-syntax
    for (const rootPath of rootPaths) {
      const pluginPath = this.resolveWithPrifix(plgName, PLUGIN_PREFIX, rootPath);
      if (pluginPath) {
        // eslint-disable-next-line no-await-in-loop
        const PlgKlass: IPluginConstructor = await requireDefault(pluginPath);
        log('[end] finish load plugin %s', plgName);
        return PlgKlass;
      }
    }

    exitWithMessage('未找到插件, 请检查配置是否正确或依赖是否安装');
  }

  /**
   *
   *
   * @memberof CommandService
   */
  // eslint-disable-next-line class-methods-use-this
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
      '--env': {
        description: '打包环境, 可选: dev/prod. dev 命令默认是: dev, build 命令默认是: prod',
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
   * @param {string} rootPath
   * @return {string}
   * @memberof CommandService
   */
  // eslint-disable-next-line class-methods-use-this
  resolveWithPrifix(pkgPostfix: string, prefixList: string[], rootPath: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const prefix of prefixList) {
      const filepathOrFail = tryResolve(
        prefix + pkgPostfix,
        rootPath,
      );
      if (filepathOrFail) {
        return filepathOrFail;
      }
    }
    return false;
  }
}

export {
  CommandService, ICommand, IProjectConfig, IProjectPluginConfig,
};
