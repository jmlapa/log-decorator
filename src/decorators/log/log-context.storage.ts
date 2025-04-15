// src/context/log-context.ts
import { AsyncLocalStorage } from 'async_hooks';

const storage = new AsyncLocalStorage<Record<string, unknown>>();
const scopedStorage = new AsyncLocalStorage<Record<string, unknown>>();

export const LogContext = {
  run: <T>(data: Record<string, unknown>, callback: () => Promise<T>): Promise<T> => {
    return storage.run(data, callback);
  },

  runScoped: <T>(data: Record<string, unknown>, callback: () => Promise<T>): Promise<T> => {
    const store = storage.getStore();
    return scopedStorage.run({...store}, callback);
  },

  set: (key: string, value: unknown): void => {
    const store = scopedStorage.getStore();
    if (store) store[key] = value;
  },
  getAll: (): Record<string, unknown> => {
    return scopedStorage.getStore() ?? {};
  }
};
