import { LogExecution } from '../decorators/log';
import { ProdutoRepository } from '../repositories/produto.repository';

export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @LogExecution
  async buscarProduto({id, categoria}: { id: number; categoria?: string }): Promise<{ id: number; categoria?: string; nome: string; }> {
    if (id < 0) throw new Error('ID inválido');
    return this.produtoRepository.buscarProduto({ id, categoria });
  }
}