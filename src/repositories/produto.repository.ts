import { LogContext } from "../decorators/log";
import { LogExecution } from "../decorators/log/log-execution.decorator";

export class ProdutoRepository {
  @LogExecution
  async buscarProduto({ id, categoria }: { id: number; categoria?: string }): Promise<{ id: number; categoria?: string; nome: string }> {
    LogContext.set('entity', 'produto');
    LogContext.set('id', id);
    return { id, categoria, nome: 'Camiseta Tech' };
  }
}