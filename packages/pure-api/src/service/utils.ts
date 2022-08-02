import { IProjectConfig } from './CommandService';
import { deepmerge } from '../utils';

export function mergeProjectConfig(
  target: Partial<IProjectConfig>,
  source: Partial<IProjectConfig>,
): Partial<IProjectConfig> {
  return deepmerge(target, source, {
    customMerge(key) {
      if (key === 'entry') {
        return (_tArr, sArr) => sArr;
      }
      return undefined;
    },
  });
}
