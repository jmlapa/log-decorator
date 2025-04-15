import { LogContext } from "./log-context.storage";

type LogData = {
  class: null | string;
  function: string;
  args: Record<string, unknown>;
  result: unknown;
  error: null | {
    name: string;
    message: string;
    trace: null | string;
  };
  extra: null | Record<string, unknown>;
}

export function LogExecution(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: Array<Record<string, unknown>>) {
    const logData: LogData = {
      class: this?.constructor?.name || target?.constructor?.name || null,
      function: propertyKey,
      args: {},
      result: null,
      error: null,
      extra: null
    }

    const params = args[0];

    Object.entries(params).forEach(([key, value]) => {
      logData.args[key] = value;
    });

    return await LogContext.run({}, async () => {
      try {
        const result = await originalMethod.apply(this, args);
        logData.result = result;
        return result;
      } catch (err) {
        const error = err as Error;
        logData.error = {
          name: error.name,
          message: error.message,
          trace: error.stack ?? null
        };
        throw error;
      } finally {
        const scopedData = LogContext.getAll();

        if (Object.entries(scopedData).length) {
          logData.extra = scopedData;
        }

        // TODO: Implementar um logger real
        console.log('Log de execução:', JSON.stringify(logData, null, 2));
      }
    })
  };

  return descriptor;
}
