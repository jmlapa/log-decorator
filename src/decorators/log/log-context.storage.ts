// src/context/log-context.ts
import { AsyncLocalStorage } from 'async_hooks';

const storage = new AsyncLocalStorage<Record<string, unknown>>();

export const LogContext = {
  run: <T>(data: Record<string, unknown>, callback: () => Promise<T>): Promise<T> => {
    return storage.run(data, callback);
  },

  set: (key: string, value: unknown): void => {
    const store = storage.getStore();
    if (store) store[key] = value;
  },
  getAll: (): Record<string, unknown> => {
    return storage.getStore() ?? {};
  }
};
