namespace Example {
  type PersistentData = {
    lastRun: Date | null;
    lastItemsProcess: number[];
  };

  type ApiConnectionConfig = {
    host: string;
    path: string;
    key: string;
    endpoints: string[];
  };

  type MessagesConfig = {
    hello: string;
    almost: string;
    bye: string;
  };
}
