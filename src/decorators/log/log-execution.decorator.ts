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
}

export function LogExecution(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: Array<Record<string, unknown>>) {
    const meta: LogData = {
      class: this?.constructor?.name || target?.constructor?.name || null,
      function: propertyKey,
      args: {},
      result: null,
      error: null,
    }

    const params = args[0];

    Object.entries(params).forEach(([key, value]) => {
      meta.args[key] = value;
    });

    return await LogContext.runScoped({}, async () => {
      try {
        const result = await originalMethod.apply(this, args);
        meta.result = result;
        return result;
      } catch (err) {
        const error = err as Error;
        meta.error = {
          name: error.name,
          message: error.message,
          trace: error.stack ?? null
        };
        throw error;
      } finally {
        const logPayload = {
          ...LogContext.getAll(),
          ...meta
        }
        console.log('Log de execução:', JSON.stringify(logPayload, null, 2));
      }
    })
  };

  return descriptor;
}
