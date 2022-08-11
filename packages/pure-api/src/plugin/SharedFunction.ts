export type AnyFunction = (...args: any[]) => any;

export class SharedFucntion {
  funcMap = new Map<string, AnyFunction>();

  setFunction(name: string, func: AnyFunction) {
    this.funcMap.set(name, func);
  }

  getFunction(name: string): AnyFunction | undefined {
    return this.funcMap.get(name);
  }

  callFunction(name: string, ...args: any[]) {
    const func = this.getFunction(name);
    if (func) {
      func(args);
    } else {
      throw new Error(`Function: ${name} not exist`);
    }
  }
}
