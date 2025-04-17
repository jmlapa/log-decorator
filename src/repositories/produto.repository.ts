import { LogContext, LogExecution, LogExecutionClass } from "../decorators/log";

@LogExecutionClass({ additionalData: { entity: 'Produto' } })
export class ProdutoRepository {
  @LogExecution
  async buscarProduto({ id, categoria }: { id: number; categoria?: string }): Promise<{ id: number; categoria?: string; nome: string }> {
    LogContext.set('id', id);
    return { id, categoria, nome: 'Camiseta Tech' };
  }
}