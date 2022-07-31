import fs from 'fs/promises';

/**
 * ensure directory exists. will create if directory not exists.
 *
 * @export
 * @param {string} dirpath
 */
export async function ensureDirectory(dirpath: string) {
  try {
    await fs.access(dirpath);
  } catch (err) {
    await fs.mkdir(dirpath, { recursive: true });
  }
}

/**
 * check file whether exist
 *
 * @export
 * @param {string} filepath
 * @returns
 */
export async function fileExist(filepath: string) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}
