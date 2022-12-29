import path from 'path';
import { loadJsonFile, storeJsonFile } from './utils/files';
import { createWinstonLogger } from './utils/logs';
import { getElapsedTime } from './utils/time';

export async function runScript(scriptConfigPath: string, script: Script): Promise<void> {
  try {
    // Get script config.
    const { baseDir, persistentDataFile, configFiles, logs } = await loadJsonFile<ScriptConfig>(scriptConfigPath);
    // Setup script utils.
    // Load persistent data.
    const persistenDataFilePath = path.join(baseDir, persistentDataFile);
    const persistentDataPromise = loadJsonFile(persistenDataFilePath);
    // Setup logger.
    const logger = createWinstonLogger(path.join(baseDir, logs.error), path.join(baseDir, logs.info), { ...logs });
    // Load configs.
    const configs: Promise<any>[] = [];
    for (const configFile of configFiles) {
      configs.push(loadJsonFile(path.join(baseDir, configFile)));
    }
    // Run the script.
    const startTime = new Date();
    logger.info('Script started.');
    const persistentData = await persistentDataPromise;
    try {
      if (script.constructor.name === 'AsyncFunction') {
        await script(startTime, persistentData, logger, await Promise.all(configs));
      } else {
        script(startTime, persistentData, logger, await Promise.all(configs));
      }
      // Log store persistent data and log script ending.
      storeJsonFile(persistenDataFilePath, persistentData);
      const [hours, minutes, seconds, milliseconds] = getElapsedTime(startTime, new Date());
      logger.info(`Script ended OK. Elapsed time ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`);
    } catch (error) {
      // In case of script error log error and inform bad ending.
      logger.error(error);
      const [hours, minutes, seconds, milliseconds] = getElapsedTime(startTime, new Date());
      logger.info(`Script ended NOT OK. Elapsed time ${hours}h ${minutes}m ${seconds}s ${milliseconds}ms`);
    }
  } catch (error) {
    // In case of an unexpected error we cannot relly on a logger so we print the error on the console.
    console.error(error);
  }
}
