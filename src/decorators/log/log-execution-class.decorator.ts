import 'reflect-metadata';

// Estendendo o tipo do Reflect para adicionar os métodos de metadata
declare global {
  namespace Reflect {
    function defineMetadata(metadataKey: symbol | string, metadataValue: unknown, target: object): void;
    function getMetadata(metadataKey: symbol | string, target: object): unknown;
    function hasMetadata(metadataKey: symbol | string, target: object): boolean;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor = new (...args: any[]) => any;

// Interface para as opções do decorator de classe
export interface LogExecutionClassOptions {
  additionalData?: Record<string, unknown>;
}

// Símbolo para armazenar metadados do decorator de classe
export const LOG_CLASS_METADATA = Symbol('logClassMetadata');

// Decorator para classe
export function LogExecutionClass(options: LogExecutionClassOptions = {}): (target: Constructor) => void {
  return function(target: Constructor): void {
    Reflect.defineMetadata(LOG_CLASS_METADATA, options, target);
  };
}

// Função para obter os metadados da classe decorada
export function getClassMetadata(instance: object): LogExecutionClassOptions | undefined {
  const constructor = instance?.constructor;
  if (constructor) {
    return Reflect.getMetadata(LOG_CLASS_METADATA, constructor) as LogExecutionClassOptions;
  }
  return undefined;
}