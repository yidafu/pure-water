import path from 'path';
import fs from 'node:fs/promises';
import {PROJECT_ROOT} from '../constant';

/**
 * require
 *
 * @export
 * @param {string} [configFileName='pure.config.js']
 * @return {Promise<string>}
 */
export async function resolveProjectConfig(
    configFileName = 'pure.config.js',
): Promise<string> {
  const cfgPath = path.join(PROJECT_ROOT, configFileName);

  await fs.access(cfgPath);

  return cfgPath;
}

