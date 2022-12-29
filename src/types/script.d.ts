type Script<PDATA extends Object = any, CONFS = any> = (
  startTime: Date,
  persistentData: PDATA,
  logger: ILogger,
  configs: CONFS
) => any;

type ScriptConfig = {
  baseDir: string;
  configFiles: string[];
  persistentDataFile: string;
  logs: {
    maxFiles: number;
    maxMB: number;
    error: string;
    info: string;
  };
};
