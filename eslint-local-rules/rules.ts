import { Rule } from "eslint";

export default {
  'one-param-only': {
    meta: {
      type: 'problem',
      docs: {
        description: 'Garante que métodos tenham apenas um parâmetro do tipo objeto',
        recommended: false
      },
      schema: []
    },
    create(context) {
      return {
        MethodDefinition(node) {
          if (node.kind === "constructor") {
            return;
          }

          if (node.value.params.length > 1) {
            context.report({
              node,
              message: 'Métodos devem ter apenas um parâmetro (do tipo objeto).'
            });
          }
  
          const param = node.value.params[0];
          if (param && param.type !== 'Identifier' && param.type !== 'ObjectPattern') {
            context.report({
              node: param,
              message: 'O parâmetro deve ser um objeto desestruturado ou identificador (Record-like).'
            });
          }
        }
      };
    }
  }
} satisfies Record<string, Rule.RuleModule>