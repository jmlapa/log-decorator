import express from 'express';
import { ProdutoService } from './services/produto.service';
import { ProdutoRepository } from './repositories/produto.repository';
import { LogContext } from './decorators/log';
import { randomUUID } from 'crypto'


const app = express();
const port = 9001;
const repository = new ProdutoRepository();
const service = new ProdutoService(repository);

app.use(express.json());

app.use((req, res, next) => {
  const requestId = randomUUID();
  res.setHeader('X-Request-ID', requestId);
  LogContext.run({ requestId }, async () => {
    try {
      await next();
    } catch (err) {
      next(err);
    }
  });
});

app.get('/produto/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id as string);
    const categoria = req.query.categoria as string;

    const result = await service.buscarProduto({ id, categoria });
    res.json(result);
  } catch (error) {
    res.status(400).json({ erro: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
