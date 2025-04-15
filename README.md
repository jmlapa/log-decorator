# Logger Decorator

Este projeto demonstra o uso de **decorators** em TypeScript para implementar um sistema de logging detalhado de execução de métodos. Ele utiliza o decorator `LogExecution` e o contexto assíncrono `LogContext` para capturar informações sobre a execução de métodos, incluindo parâmetros, resultados e erros.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/jmlapa/log-decorator.git
   cd logger-decorator
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Execução

### Ambiente de Desenvolvimento

Para rodar o projeto em modo de desenvolvimento, utilize:
```bash
npm run dev
```

### Build e Execução

Para compilar o projeto e executá-lo:
```bash
npm run build
npm start
```

O servidor estará disponível em `http://localhost:9001`.

## Simulando Cenários de Sucesso e Erro

Para testar a funcionalidade do decorator de logging, você pode enviar requisições HTTP para os endpoints disponíveis:

### Cenário de Sucesso

```bash
# Buscar um produto com sucesso
curl --location 'localhost:9001/produto/1'
```

### Cenário de Erro

Você pode simular erros incluindo um parâmetro específico que acionará uma exceção:

```bash
# Forçar um erro de validação
curl --location 'localhost:9001/produto/-1'
```

### Logs Gerados

Observe o console da aplicação para ver os logs gerados pelo decorator. Para cada requisição, você verá informações como:

- Nome da classe e método chamado
- Parâmetros recebidos
- Resultado retornado (ou erro capturado)
- Dados extras de contexto

## Funcionamento do Decorator `LogExecution`

O decorator `LogExecution` é aplicado a métodos assíncronos e tem como objetivo capturar informações detalhadas sobre a execução do método. Ele utiliza o `LogContext` para armazenar e recuperar dados de contexto durante a execução.

### Como funciona:

1. **Captura de Dados**: O decorator coleta informações como:
   - Nome da classe e do método.
   - Parâmetros recebidos.
   - Resultado retornado.
   - Erros lançados.

2. **Uso do `LogContext`**:
   - O `LogContext` utiliza `AsyncLocalStorage` para armazenar dados de forma isolada por requisição.
   - Durante a execução do método, é possível adicionar informações ao contexto usando `LogContext.set`.
   - No final da execução, os dados do contexto são recuperados com `LogContext.getAll` e adicionados ao log.

3. **Log de Execução**:
   - Após a execução do método, os dados capturados são exibidos no console em formato JSON.

Exemplo de log gerado:
```json
{
  "class": "ProdutoRepository",
  "function": "buscarProduto",
  "args": {
    "id": 1,
    "categoria": "roupas"
  },
  "result": {
    "id": 1,
    "categoria": "roupas",
    "nome": "Camiseta Tech"
  },
  "error": null,
  "extra": {
    "entity": "produto",
    "id": 1
  }
}
```

## Regra Local do ESLint: `one-param-only`

A regra `one-param-only` foi criada para garantir que os métodos decorados com `LogExecution` recebam apenas um parâmetro do tipo objeto. Isso é necessário para que o decorator consiga capturar os parâmetros de forma consistente e estruturada.

### Por que é necessária?

- O decorator `LogExecution` assume que o método recebe um único parâmetro do tipo objeto, permitindo que ele itere sobre as propriedades desse objeto para capturar os valores.
- Métodos que recebem múltiplos parâmetros ou parâmetros de tipos primitivos não seriam compatíveis com o funcionamento do decorator.

### Como funciona:

A regra verifica:
1. Se o método possui mais de um parâmetro, um erro é reportado.
2. Se o único parâmetro não é do tipo `ObjectPattern` ou `Identifier`, um erro é reportado.

Exemplo de código inválido:
```typescript
async buscarProduto(id: number, categoria: string) {
  // Erro: Mais de um parâmetro.
}
```

Exemplo de código válido:
```typescript
async buscarProduto({ id, categoria }: { id: number; categoria?: string }) {
  // Correto: Um único parâmetro do tipo objeto.
}
```

### Configuração no ESLint

A regra está configurada no arquivo `.eslintrc.js`:
```javascript
'rules': {
  'local-rules/one-param-only': 'error'
}
```

## Estrutura do Projeto

```
logger-decorator/
├── .eslintrc.js
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── decorators/
│   │   └── log/
│   │       ├── index.ts
│   │       ├── log-context.storage.ts
│   │       └── log-execution.decorator.ts
│   ├── repositories/
│   │   └── produto.repository.ts
│   └── services/
│       └── produto.service.ts
└── eslint-local-rules/
    ├── index.js
    └── rules.ts
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.