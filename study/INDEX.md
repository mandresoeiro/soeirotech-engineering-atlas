# Índice de Estudos

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 🗂️[PLAN] 🔍[CHECK]

Legenda:

- `[x]` já estudado/aplicado em nível inicial;
- `[ ]` ainda precisa de estudo ou revisão;
- `→` próximo foco recomendado.

## 0. Visão do Engineering Atlas

- [x] propósito do produto;
- [x] fluxo Projeto → Skill → Contexto → Evidência;
- [x] stack principal;
- [ ] conseguir explicar a estrutura completa do repositório.

## 1. Prisma

- [x] o que é Prisma;
- [x] `model Project`;
- [x] migration inicial;
- [ ] → Prisma Client;
- [ ] relações;
- [ ] `ProjectSkill` e chave composta;
- [ ] consultas `findMany`, `findUnique`, `create`, `update`, `delete`;
- [ ] seed;
- [ ] transações.

## 2. PostgreSQL

- [ ] tabela;
- [ ] primary key;
- [ ] foreign key;
- [ ] constraint;
- [ ] índice;
- [ ] join;
- [ ] transação;
- [ ] relação entre schema Prisma e SQL gerado.

## 3. Next.js

- [ ] App Router;
- [ ] Server Components;
- [ ] Client Components;
- [ ] Server Actions;
- [ ] Route Handlers;
- [ ] rotas dinâmicas `[id]`;
- [ ] fluxo das páginas de Projects, Skills e Evidence.

## 4. React

- [ ] componente;
- [ ] props;
- [ ] renderização;
- [ ] evento;
- [ ] quando um Client Component é realmente necessário.

## 5. TypeScript

- [ ] tipos básicos usados no projeto;
- [ ] inferência;
- [ ] `type` e `interface`;
- [ ] union types;
- [ ] narrowing;
- [ ] tipos gerados pelo Prisma;
- [ ] strict mode.

## 6. Docker

- [x] imagem e container — noção inicial;
- [x] portas;
- [x] volumes;
- [x] credential helper — debugging;
- [ ] Dockerfile;
- [ ] Compose em detalhe;
- [ ] healthcheck;
- [ ] diferença entre volume de `node_modules` e dados PostgreSQL.

## 7. Testing

- [x] Vitest existe e está executando no projeto;
- [ ] teste unitário;
- [ ] Arrange / Act / Assert;
- [ ] teste de integração;
- [x] smoke test — noção inicial;
- [ ] Playwright E2E;
- [ ] regressão;
- [ ] CI com GitHub Actions.

## 8. Arquitetura

- [x] Modular Monolith — conceito inicial;
- [x] ADR — finalidade inicial;
- [ ] coesão;
- [ ] acoplamento;
- [ ] fronteiras de módulos;
- [ ] trade-offs;
- [ ] YAGNI.

## Próximo foco recomendado

```text
Prisma Client
→ relações Project / Skill / ProjectSkill / Evidence
→ Next.js Server Components + Server Actions
→ Vitest e fluxo de testes
→ Playwright E2E
```
