import fs from 'fs';
import path from 'path';

import debug from 'debug';

const log = debug('pure:api:utils');

export function resolveProjectRoot(configFileName: string = 'pure.config.js') {
  let projectRoot = process.cwd();

  let hasPureConfig = fs.existsSync(path.join(projectRoot, configFileName));
  while (!hasPureConfig) {
    projectRoot = path.resolve(projectRoot, '..');
    // TODO: window path
    if (projectRoot === '/') {
      break;
    }
    hasPureConfig = fs.existsSync(path.join(projectRoot, configFileName));
  }
  log('resolve project root => %s', projectRoot);

  return projectRoot;
}
