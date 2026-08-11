# Estratégia de Testes

## Unitários

- **Existente:** Vitest para validações, schemas e regras isoladas.
- **Diretriz:** priorizar regras críticas e regressões relevantes.

## Integração

- **Conforme necessidade:** validar fluxos que dependam de banco, Prisma ou composição entre
módulos.
- `/api/health` valida aplicação e conexão com o banco.

## E2E

- **Planejado:** Playwright para fluxos públicos ou críticos.
- Fluxo prioritário: **Project -> Skill -> Contexto -> Evidence**.

## Smoke/Health

- **Existente:** build de produção validado.
- **Existente:** smoke test HTTP das principais rotas.
- **Existente:** `/api/health` cobre disponibilidade da aplicação e do banco.

## CI

- **Planejado:** GitHub Actions para lint, typecheck, testes e build.

## Critérios de prioridade

Testes devem ser priorizados por risco:

1. regras de negócio;
2. autorização;
3. validação;
4. regressões;
5. fluxos críticos.

Não buscar cobertura percentual alta sem relação com risco.
