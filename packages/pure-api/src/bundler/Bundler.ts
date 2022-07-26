import { CommandService } from '../service/CommandService';

/**
 * bundler abstract class
 *
 * @abstract
 * @class Bundler
 */
abstract class Bundler {
  service: CommandService;

  abstract get compileOption(): any;

  /**
   * Creates an instance of Bundler.
   * @param {CommandService} service
   * @memberof Bundler
   */
  constructor(service: CommandService) {
    this.service = service;
  }
  /**
   * clean dist directory
   *
   * @abstract
   * @memberof Bundler
   */
  abstract cleanDist(): void;
  /**
   * start dev server
   *
   * @abstract
   * @returns {Promise<void>}
   * @memberof Bundler
   */
  abstract dev(): Promise<void>;

  /**
   * build production asserts
   *
   * @abstract
   * @returns {Promise<void>}
   * @memberof Bundler
   */
  abstract build(): Promise<void>;
}

export { Bundler };
