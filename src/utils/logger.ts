import Log from 'debug';

export default class Logger {
  module: string;
  debugger: Log.Debugger;

  constructor(module: string) {
    this.module = module;
    this.debugger = Log(`api:${module}`);
  }

  log(msg: any): void {
    this.debugger(msg);
  }
}
