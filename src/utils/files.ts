import { readFile, writeFile, stat } from 'fs/promises';

export async function loadJsonFile<T = any>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, { encoding: 'utf-8' })) as T;
}

export async function storeJsonFile(path: string, data: any): Promise<void> {
  writeFile(path, JSON.stringify(data), { encoding: 'utf-8' });
}

export async function fileExists(path: string): Promise<boolean> {
  try {
    await stat(path);
    return true;
  } catch (_) {
    return false;
  }
}
