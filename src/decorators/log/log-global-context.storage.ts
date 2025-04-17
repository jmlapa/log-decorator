import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';

export interface LogGlobalContextOptions {
  enableRequestId?: boolean;
  getRequestId?: () => string;
  additionalData?: Record<string, unknown>;
}

const globalStorage = new AsyncLocalStorage<Record<string, unknown>>();

export const LogGlobalContext = {
  configure: (options: LogGlobalContextOptions = {}): void => {
    const defaultOptions: LogGlobalContextOptions = {
      enableRequestId: true,
      getRequestId: () => randomUUID(),
      additionalData: {},
    };

    const mergedOptions = { ...defaultOptions, ...options };
    const initialData: Record<string, unknown> = {
      timestamp: new Date().toISOString(),
      ...mergedOptions.additionalData,
    };

    if (mergedOptions.enableRequestId) {
      initialData.requestId = mergedOptions.getRequestId?.();
    }

    const existingStore = globalStorage.getStore();
    if (existingStore) {
      Object.assign(existingStore, initialData);
    } else {
      globalStorage.enterWith(initialData);
    }
  },

  run: <T>(data: Record<string, unknown>, callback: () => Promise<T>): Promise<T> => {
    return globalStorage.run(data, callback);
  },

  set: (key: string, value: unknown): void => {
    const store = globalStorage.getStore();
    if (store) store[key] = value;
  },

  getAll: (): Record<string, unknown> => {
    return globalStorage.getStore() ?? {};
  }
};