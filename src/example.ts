import path from 'path';
import { runScript } from './script-runner'

const script: Script<Example.PersistentData, [Example.ApiConnectionConfig, Example.MessagesConfig]> = (
  startTime,
  persistentData,
  logger,
  [ apiConnectionConfig, messagesConfig ]
) => {
  const lastRun = persistentData.lastRun;
  persistentData.lastRun = new Date();
  persistentData.lastItemsProcess.push(persistentData.lastItemsProcess.length);
  logger.info(messagesConfig.hello);
  logger.info(`Current time: ${startTime}`);
  logger.info(`Last run ${lastRun}`);
  logger.info(`API host: ${apiConnectionConfig.host}`);
  logger.info(messagesConfig.almost);
  logger.info(`Last items process: ${persistentData.lastItemsProcess.join(', ')}`);
  logger.info(messagesConfig.bye);
}

runScript(path.resolve(__dirname, '../store/script.json'), script);
