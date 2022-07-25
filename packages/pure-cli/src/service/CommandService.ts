import merge from 'lodash.merge';
import debug from 'debug';
import { Bundler } from "../boundler";
import minimist, { ParsedArgs } from 'minimist';
import { exitWithMessage, requireDefault, runAsyncFns, tryResolve } from "../utils";
import { UserConfig } from 'vite';
import { resolveProjectConfig } from './utils';

interface IProjectConfig {
  name: string;
  presets: string[];
  plugins: string[];
  viteConfig: UserConfig,
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

const log = debug('pure:cli:service');

class CommandService {
  private bundler: Bundler;

  private projectConfig: Partial<IProjectConfig> = {};

  private argv: ParsedArgs;

  public commands: ICommand[] = [];

  private apiMethods = [];

  private onProcessExitFns = [];

  private onPluginReadyFns = [];

  private beforeCompileFns = [];

  private onDevServerReadyFns = [];

  private onCleanFns = [];

  constructor(BundlerKlass: new (service: CommandService) => Bundler) {
    this.bundler = new BundlerKlass(this);
    this.argv = minimist(process.argv.slice(2));

  }

  async load() {

    await this.loadProjectConfig();

    await this.addBuiltinCommands();

    await this.getPaths();

    await this.loadGlobalConfig();

    this.processExitGuardor();

    await this.loadPlugins();
  }


  dev = async () => {
    await this.bundler.dev();
  }

  build = async () => {
    await this.bundler.build();
  }

  getProjectConfig() {
    return this.projectConfig;
  }

  async loadProjectConfig() {
    this.projectConfig = {}
    const configFilePath = await resolveProjectConfig(this.argv.config);

    // this.projectConfig = require(configFilePath);
    console.log(configFilePath);
    this.projectConfig = await import(configFilePath);

    let presets = await this.loadPresets();
    presets.reduce((pV, cV) => {
      return merge(cV, pV);
    }, this.projectConfig);
  }

  async loadPresets() {
    if (!this.projectConfig.presets?.length) {
      return [];
    }
    let presetMap = new Map<string, IProjectConfig>();
    for (const presetName of this.projectConfig.presets) {

      if (presetMap.has(presetName)) {
        continue;
      }
      log(`[start] loading preset config: ${presetName}`);
      let presetCfg = await this.loadPreset(presetName);

      presetMap.set(presetName, presetCfg);
    }

    return Array.from(presetMap.values());
  }

  async loadPreset(presetName: string): Promise<IProjectConfig> {
    const presetPrefix = ['@pure/water-preset-']
    let presetCfg = (await Promise.all(presetPrefix.map(prefix => {
      let filepathOrFail = tryResolve(prefix + presetName);
      if (typeof filepathOrFail === 'string') {
        return requireDefault(filepathOrFail);
      }
    }))).find(Boolean);

    if (!presetCfg) {
      exitWithMessage('请检查是否已经配置过 pure 插件，或者插件配置是否正确');
    }

    return presetCfg;
  }
  loadPlugins() {

  }

  getPaths() {
    // throw new Error("Method not implemented.");
  }

  loadGlobalConfig() {
    // throw new Error("Method not implemented.");
  }

  processExitGuardor() {
    // throw new Error("Method not implemented.");
  }

  registerCommand(cmd: ICommand) {
    this.commands.push(cmd);
  }

  private addBuiltinCommands() {
    const defaultOptions = {
      // '--debug': '调试日志打印'
    }
    this.registerCommand({
      name: 'dev',
      action: this.dev,
      description: '启动本地开发服务',
      options: {
        ...defaultOptions,
      }
    });
    this.registerCommand({
      name: 'build',
      action: this.build,
      description: '构建生产环境资源',
      options: {
        ...defaultOptions,
      }
    });
    this.registerCommand({
      name: 'clean',
      action: async e => {
        // TODO: Clean logic
        // removeDirectory(this.paths.outputPath)
        if (this.onCleanFns.length > 0) {
          runAsyncFns(this.onCleanFns);
        }
      },
      options: {
        // '--all': '清理应用所有缓存',
      }
    })
  }
}

export { CommandService, IProjectConfig };