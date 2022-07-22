type AnyAsnycFn = (...args: any[]) => Promise<any>;

export async function runAsyncFns(fns: AnyAsnycFn[], ...args: any[]) {
  for (const fn of fns) {
      await fn(...args);
    }
}