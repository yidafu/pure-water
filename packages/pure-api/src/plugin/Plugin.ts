import Config from 'webpack-chain';
import { CommandService, ICommand } from '../service/CommandService';

export type PluginChainWebpackConfig = (config: Config) => Promise<void>;
export type PluginBeforeCompileHook = () => Promise<void>;
export type PluginOnPluginReadyHook = () => Promise<void>;
export type PluginOnDevServerReadyHook = () => Promise<void>;
export type PluginOnDevCompileDoneHook = () => Promise<void>;
export type PluginAfterBuildHook = () => Promise<void>;
export type PluginOnCleanHook = () => Promise<void>;

export interface IPluginConstructor {
  new (service: CommandService): Plugin;
  priority: number;
}
/**
 *
 *
 * @abstract
 * @class Plugin
 */
abstract class Plugin {
  private service: CommandService;

  /**
   * Creates an instance of Plugin.
   * @param {CommandService} service
   * @memberof Plugin
   */
  constructor(service: CommandService) {
    this.service = service;
  }



  /**
   *
   *
   * @param {string} pluginName
   * @return {Record<string, any>}
   * @memberof Plugin
   */
  getPluginOption(pluginName: string): Record<string, any> {
    return this.service.getPluginOption(pluginName);
  }

  /**
   * plugin priority. 0 is heighest, 100 is lowest.
   *
   * @static
   * @memberof Plugin
   */
  public static priority = 100;

  /**
   * only work when bundler is webpack
   *
   * @type {PluginChainWebpackConfig}
   * @memberof Plugin
   */
  chainWebpackConfig?: PluginChainWebpackConfig;

  /**
   *
   *
   * @memberof Plugin
   */
  registerCommand?: () => (ICommand | undefined);

  /**
   *
   *
   * @memberof Plugin
   */
  beforeCompile?: PluginBeforeCompileHook;

  onPluginReady?: PluginOnPluginReadyHook;

  onDevServerReady?: PluginOnDevServerReadyHook;

  onDevCompileDone?: PluginOnDevCompileDoneHook;

  afterBuild?: PluginAfterBuildHook;

  onClean?: PluginOnCleanHook;
}

export { Plugin };
