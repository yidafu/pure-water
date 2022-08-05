import { Plugin } from '@pure-org/api';

import { createCommand } from './create-command';
// eslint-disable-next-line import/no-default-export
export default class CreatePlugin extends Plugin {
  // eslint-disable-next-line class-methods-use-this
  registerCommand = () => createCommand;
}
