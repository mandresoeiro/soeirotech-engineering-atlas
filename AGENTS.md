# AGENTS.md — SoeiroTech Engineering Atlas

## Missão

Construir uma plataforma real para planejar, documentar e evidenciar evolução prática em
Engenharia de Software.

O produto NÃO deve ser uma simples transposição de aulas, disciplinas ou apostilas.
A formação acadêmica pode inspirar conceitos, mas cada implementação precisa responder a um
problema do produto, requisito, decisão arquitetural ou necessidade de qualidade.

## Stack principal

- TypeScript
- Next.js
- React
- PostgreSQL
- Prisma
- Docker / Docker Compose
- Zod
- Tailwind CSS
- Vitest
- Playwright
- GitHub Actions

Não adicionar novas bibliotecas sem justificar o problema que elas resolvem.

## Princípios

1. Resolver o problema antes de escolher tecnologia.
2. Preferir arquitetura simples e modular.
3. Evitar overengineering.
4. Manter alta coesão e baixo acoplamento.
5. Validar entradas nos limites do sistema.
6. Nunca confiar em autorização apenas no cliente.
7. Nunca armazenar segredos no repositório.
8. Usar migrations para mudanças persistentes de schema.
9. Testar regras críticas e regressões relevantes.
10. Registrar decisões arquiteturais importantes com ADR.

## Fluxo obrigatório antes de alterar código

1. Inspecionar a estrutura existente.
2. Identificar o requisito ou problema real.
3. Reutilizar padrões existentes.
4. Propor a menor mudança coerente.
5. Implementar em passos pequenos.
6. Executar lint, typecheck, testes e build pertinentes.
7. Atualizar documentação/evidência quando necessário.

## Regras para IA/agentes

- Não reescrever arquivos inteiros quando uma alteração localizada resolver.
- Não criar camadas ou serviços apenas para parecer enterprise.
- Não inventar requisitos.
- Não trocar a stack sem solicitação explícita.
- Não duplicar lógica.
- Não esconder erros com `any`, casts desnecessários ou `try/catch` vazio.
- Explicar custo e benefício de abstrações sugeridas.
- Verificar referências antes de remover código.
- Detectar o package manager pelo lockfile.
- Preservar Docker e desenvolvimento local.

## Aprendizado aplicado

Após uma mudança importante, explicar de forma curta:

- problema resolvido;
- conceito aplicado;
- por que a solução foi escolhida;
- trade-off aceito;
- como foi validada.

## Evidência profissional

Uma funcionalidade relevante deve poder produzir ao menos uma evidência:

- commit;
- pull request;
- teste automatizado;
- ADR;
- diagrama;
- screenshot;
- release;
- deploy;
- benchmark quando fizer sentido.

## Definition of Done

Uma tarefa está concluída quando:

- requisito atendido;
- sem código temporário inexplicado;
- lint relevante passa;
- typecheck passa;
- testes relevantes passam;
- build relevante passa;
- documentação necessária atualizada;
- evidência verificável registrada.
