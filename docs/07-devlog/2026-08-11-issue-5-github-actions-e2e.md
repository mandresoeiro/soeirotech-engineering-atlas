# DevLog — 2026-08-11

📋 **Painel de Sinais Organizados (Compacto)**
📂[PJ] 🚀[DEV] 📚[STUDY] 💻[CODE] 🧪[TEST] 📄[DOC]

## Objetivo

Executar os testes E2E com Playwright dentro do GitHub Actions,
integrando a validação do fluxo principal ao pipeline de CI.

Fluxo validado:

Project → Skill → Contexto → Evidence

## Problema real

O projeto já possuía GitHub Actions para lint, typecheck, Vitest e
build, além de testes E2E com Playwright executados localmente.

Porém, o Playwright ainda não fazia parte do pipeline de CI.

Isso significava que um Pull Request poderia passar pelas validações
existentes sem executar o fluxo E2E principal em um ambiente limpo e
reproduzível.

## Decisão

Ampliar o workflow existente em vez de criar um segundo pipeline.

Foram adicionadas:

- aplicação das migrations com `prisma migrate deploy`;
- instalação do Chromium e dependências do Playwright;
- execução de `npm run test:e2e`.

As validações já existentes foram preservadas.

## Implementação

- Mudança principal:
  integração do Playwright E2E ao GitHub Actions.

- Arquivos afetados:
  `.github/workflows/ci.yml`
  `package.json`
  `docs/05-quality/testing-strategy.md`
  `tests/e2e/home.spec.ts`

Foi criado o script:

`db:migrate:deploy`

O workflow passou a:

1. iniciar PostgreSQL;
2. instalar dependências;
3. gerar Prisma Client;
4. aplicar migrations;
5. executar lint;
6. executar typecheck;
7. executar Vitest;
8. executar build;
9. instalar Chromium;
10. executar Playwright E2E.

## Validação

- [x] Prettier
- [x] lint
- [x] typecheck
- [x] Vitest — 3 files passed / 8 tests passed
- [x] build
- [x] Prisma migrate deploy no GitHub Actions
- [x] instalação do Chromium no GitHub Actions
- [x] Playwright E2E no GitHub Actions

GitHub Actions:

- Run #11: falhou no E2E;
- Run #12: passou completamente.

## Aprendizado aplicado

A primeira execução do CI revelou que o teste
`tests/e2e/home.spec.ts` dependia de um Project previamente existente
no banco local.

O teste esperava encontrar:

`SoeiroTech Engineering Atlas`

na página `/showcase`.

Como o banco do CI nasce limpo, esse dado não existia.

O teste foi corrigido para validar o conteúdo estrutural real da página:

`Projetos em evidência`

Com isso, o teste deixou de depender de dados locais previamente
cadastrados.

A principal aprendizagem foi compreender que ambientes de CI limpos
ajudam a revelar dependências ocultas dos testes e aumentam a
reprodutibilidade da validação.

## Evidência

Issue #5:

https://github.com/mandresoeiro/soeirotech-engineering-atlas/issues/5

PR #6:

https://github.com/mandresoeiro/soeirotech-engineering-atlas/pull/6

Resultado final:

- GitHub Actions Run #12: success;
- migrations aplicadas com sucesso;
- lint aprovado;
- typecheck aprovado;
- Vitest aprovado;
- build aprovado;
- Chromium instalado;
- Playwright E2E aprovado;
- PR #6 integrado à main;
- Issue #5 fechada automaticamente;
- Evidence registrada no próprio Engineering Atlas;
- Skill GitHub Actions associada ao projeto.

## Próximo passo

Avaliar se esta entrega exige atualização em `study/06-applied-learning/`.
