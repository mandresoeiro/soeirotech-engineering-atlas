# SoeiroTech Engineering Atlas

Plataforma para rastreabilidade de competências, decisões técnicas e evidências em projetos de
software.

## Problema

Estudar uma tecnologia ou possuir um certificado não demonstra, por si só, onde e como aquela
competência foi realmente aplicada.

## Solução

O Engineering Atlas organiza a evolução técnica pelo fluxo:

```text
Project
-> Skill
-> Contexto
-> Evidence
```

O produto também registra `ArchitectureDecision` para conectar decisões técnicas ao contexto do
projeto.

O Atlas demonstra onde uma competência foi aplicada, em qual contexto, quais evidências comprovam
essa aplicação e quais decisões técnicas foram tomadas.

## Funcionalidades atuais

- Projects CRUD inicial;
- Skills CRUD inicial;
- Project ↔ Skill;
- contexto de aplicação;
- evidências com tipo e fonte opcional (HTTP/HTTPS), sem validação automática do conteúdo;
- dashboard;
- showcase inicial;
- health check;
- validação com Zod;
- testes Vitest;
- build de produção validado;
- smoke tests HTTP.

## Em desenvolvimento / roadmap

- ampliar a cobertura Playwright E2E e acompanhar o CI existente;
- CRUD de ArchitectureDecision;
- Evidence Graph;
- refinamento do Showcase;
- deploy público.

## Stack

Tecnologias atuais:

- TypeScript;
- Next.js;
- React;
- PostgreSQL;
- Prisma;
- Docker;
- Zod;
- Vitest.

Qualidade configurada:

- Playwright E2E;
- GitHub Actions (lint, typecheck, testes, build e E2E).

A presença da configuração não substitui a verificação de cada execução.

## Arquitetura

```text
Browser
-> Next.js
-> regras da aplicação
-> Prisma
-> PostgreSQL
```

A arquitetura é um **Modular Monolith** com Next.js como aplicação full stack.

- Arquitetura: [docs/02-architecture/architecture.md](docs/02-architecture/architecture.md)
- ADR-001: [docs/04-decisions/ADR-001-modular-monolith.md](docs/04-decisions/ADR-001-modular-monolith.md)

## Modelo de domínio

```text
Project
-> ProjectSkill
-> Skill

Project
-> Evidence

Project
-> ArchitectureDecision
```

`ProjectSkill` registra o contexto em que uma `Skill` foi aplicada em um `Project`.

## Estrutura do repositório

- `src/`: aplicação Next.js, componentes e regras da aplicação;
- `prisma/`: schema, migrations e seed;
- `tests/`: testes automatizados e próximos fluxos E2E;
- `docs/`: documentação oficial do produto, arquitetura, dados, qualidade e TCC;
- `study/`: organização de estudos e aprendizado aplicado;
- `scripts/`: scripts auxiliares do projeto.

## Executando localmente

Docker Compose é o caminho principal para executar o ambiente local.

```bash
cp .env.example .env
docker compose up --build -d
```

Web:

```text
http://localhost:3010
```

Health:

```text
http://localhost:3010/api/health
```

## Validação

Já foram validados:

- Prisma generate;
- migration/seed;
- TypeScript/build;
- Vitest;
- smoke HTTP;
- health check.

## Documentação

- [docs/README.md](docs/README.md)
- [docs/INDEX.md](docs/INDEX.md)
- [docs/02-architecture/architecture.md](docs/02-architecture/architecture.md)
- [docs/04-decisions/ADR-001-modular-monolith.md](docs/04-decisions/ADR-001-modular-monolith.md)
- [docs/06-project/roadmap.md](docs/06-project/roadmap.md)
- [study/README.md](study/README.md)

## Próximo ciclo

- validar o fluxo Project -> Skill -> Contexto -> Evidence;
- ampliar os testes E2E existentes e verificar o CI;
- validar fontes de evidência no uso real;
- evoluir ArchitectureDecision;
- evoluir Showcase/Evidence Graph.

## Status

Projeto em desenvolvimento ativo.

## Próxima evolução e IA

O Atlas é o produto principal para conectar projeto, competência, contexto e evidência.
O ciclo atual melhora fontes e tipos de evidência sem adicionar novas bibliotecas.
Não há agente de IA implementado. A proposta e os critérios para investir nele estão em
[ADR-002](docs/04-decisions/ADR-002-evidence-sources-before-agents.md).

A aplicação de gestão ainda não possui autenticação e autorização de usuários; mantenha-a
local até implementar esse controle. A apresentação no portfólio pode ser publicada separadamente.
