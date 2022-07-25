import merge from 'lodash.merge';
import debug from 'debug';
import {Bundler} from '../bundler';
import minimist, {ParsedArgs} from 'minimist';
import {
  exitWithMessage,
  requireDefault,
  runAsyncFns,
  tryResolve,
} from '../utils';
import {UserConfig} from 'vite';
import {resolveProjectConfig} from './utils';

interface IProjectConfig {
  name: string;
  presets: string[];
  plugins: string[];
  viteConfig: UserConfig,
}

interface IPurePaths {
  projectConfig: string;
}

type CommandOption = string | {
  description: string;
  defaultValue?: string;
}

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

  private paths: Partial<IPurePaths> = {};

  private apiMethods = [];

  private onProcessExitFns = [];

  private onPluginReadyFns = [];

  private beforeCompileFns = [];

  private onDevServerReadyFns = [];

  private onCleanFns = [];

  /**
   * Creates an instance of CommandService.
   * @param {Bundler} BundlerKlass
   * @memberof CommandService
   */
  constructor(BundlerKlass: new (service: CommandService) => Bundler) {
    this.bundler = new BundlerKlass(this);
    this.argv = minimist(process.argv.slice(2));
  }
  /**
   * main logic
   *
   * @memberof CommandService
   */
  async load() {
    await this.loadProjectConfig();

    await this.addBuiltinCommands();

    await this.getPaths();

    await this.loadGlobalConfig();

    this.processExitGuardor();

    await this.loadPlugins();
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
   * @return {IProjectConfig}
   * @memberof CommandService
   */
  getProjectConfig() {
    return this.projectConfig;
  }

  /**
   *
   *
   * @memberof CommandService
   */
  async loadProjectConfig() {
    this.projectConfig = {};
    this.paths.projectConfig = await resolveProjectConfig(this.argv.config);

    // this.projectConfig = require(configFilePath);
    this.projectConfig = (await import(this.paths.projectConfig)).default;

    const presets = await this.loadPresets();
    this.projectConfig = presets.reduce((pV, cV) => {
      return merge(cV, pV);
    }, this.projectConfig);
  }
  /**
   *
   *
   * @return {Promise<IProjectConfig>}
   * @memberof CommandService
   */
  async loadPresets() {
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

  }

  /**
   *
   *
   * @memberof CommandService
   */
  async getPaths() {
    // throw new Error("Method not implemented.");
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
  processExitGuardor() {
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
}

export {CommandService, IProjectConfig};
