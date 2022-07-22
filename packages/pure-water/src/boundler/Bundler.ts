import { CommandService } from "../service/CommandService";

abstract class Bundler {
  service: CommandService;

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