import { UserConfig } from '@commitlint/types';
import { LOOSE_COMMITLINT_CONFIG } from './loose-config';
import { RECOMMENDED_COMMITLINT_CONFIG } from './recommended-config';
import { STRICT_COMMITLINT_CONFIG } from './strict-config';

export type ICommitlintMode = 'loose' | 'recommended' | 'strict';
export const COMMITLINT_CONFIG_MAP = new Map<ICommitlintMode, UserConfig>([
  ['loose', LOOSE_COMMITLINT_CONFIG],
  ['recommended', RECOMMENDED_COMMITLINT_CONFIG],
  ['strict', STRICT_COMMITLINT_CONFIG],
]);