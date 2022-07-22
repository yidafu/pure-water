import { Bundler } from "../boundler";
import minimist, { ParsedArgs } from 'minimist';
import { runAsyncFns } from "../utils";
interface IProjectConfig {

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

class CommandService {
  private bundler: Bundler;

  private projectConfig: IProjectConfig = {};

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

    this.loadProjectConfig();

    this.addBuiltinCommands();
  }

  registerCommand(cmd: ICommand) {
    this.commands.push(cmd);
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

  loadProjectConfig() {
    this.projectConfig = {}
  }

  loadPresets() {

  }

  loadPlugins() {

  }

  private addBuiltinCommands() {
    const defaultOptions = {
      '--debug': '调试日志打印'
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