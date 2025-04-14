import { LogExecution } from "../decorators/log-execution.decorator";

export class ProdutoRepository {
  @LogExecution
  async buscarProduto({ id, categoria }: { id: number; categoria?: string }): Promise<{ id: number; categoria?: string; nome: string }> {
    return { id, categoria, nome: 'Camiseta Tech' };
  }
}