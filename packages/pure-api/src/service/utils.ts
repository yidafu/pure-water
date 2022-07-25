import path from 'path';
import fs from 'node:fs/promises';
import { PROJECT_ROOT } from '../constant';

export async function resolveProjectConfig(configFileName = 'pure.config.js') {
  const cfgPath = path.join(PROJECT_ROOT, configFileName);

  await fs.access(cfgPath);

  return cfgPath;
}