interface IInfoLogger {
  info(message: string): void;
}

interface IErrorLogger {
  error(message: string): void;
}

interface ILogger extends IInfoLogger, IErrorLogger {}
