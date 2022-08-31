import { isPlainObject } from 'is-plain-object'

import { deepmerge } from '../utils';

import { IProjectConfig } from './CommandService';

export function mergeProjectConfig(
  target: Partial<IProjectConfig>,
  source: Partial<IProjectConfig>,
): Partial<IProjectConfig> {
  return deepmerge(target, source, {
      isMergeableObject: isPlainObject,
      customMerge(key) {
      if (key === 'entry') {
        return (_tArr, sArr) => sArr;
      }
      return undefined;
    },
  });
}
