# SoeiroTech Engineering Atlas

📋 **Painel de Sinais Organizados (Compacto)**  
📂[PJ] 🚀[DEV] 📚[STUDY] 💻[CODE] 🧪[TEST] 📄[DOC]

> **Status:** Fundação / v0.1  
> **Stack:** TypeScript · Next.js · PostgreSQL · Prisma · Docker  
> **Portas locais reservadas:** Web `3010` · PostgreSQL `5440`

## Objetivo

Construir uma plataforma para relacionar **projetos**, **skills**, **decisões arquiteturais** e
**evidências profissionais**.

O projeto não existe para copiar disciplinas ou aulas. O estudo fornece conceitos; o produto
fornece problemas reais onde esses conceitos podem ser aplicados.

## Arquitetura

```text
Browser
   ↓
Next.js
   ↓
Regras / módulos
   ↓
Prisma
   ↓
PostgreSQL
```

A arquitetura inicial é um **modular monolith**. Uma API NestJS separada só deve ser criada se um
requisito real justificar o custo adicional.

## Estrutura

```text
.
├── .github/              # CI, agentes, prompts e instruções
├── .vscode/              # workspace, tarefas e snippets
├── docs/                 # produto, arquitetura, ADRs, qualidade e showcase
├── prisma/               # schema e seed
├── src/
│   ├── app/              # App Router
│   ├── components/
│   └── lib/
├── tests/e2e/
├── AGENTS.md
├── compose.yaml
├── Dockerfile
└── prisma.config.ts
```

## Subir com Docker

### 1. Criar o `.env`

No Linux/WSL:

```bash
cp .env.example .env
```

No PowerShell:

```powershell
Copy-Item .env.example .env
```

### 2. Subir os containers

```bash
docker compose up --build -d
```

### 3. Ver logs

```bash
docker compose logs -f web
```

### 4. Criar a primeira migration

```bash
docker compose exec web npm run db:migrate -- --name init
```

### 5. Seed

```bash
docker compose exec web npm run db:seed
```

### 6. Abrir

- Aplicação: `http://localhost:3010`
- Showcase: `http://localhost:3010/showcase`
- Health: `http://localhost:3010/api/health`
- PostgreSQL no host: `localhost:5440`

## Desenvolvimento sem Docker para o Node

Se preferir executar somente o PostgreSQL no Docker, ajuste `DATABASE_URL` para `localhost:5440`,
instale as dependências e rode:

```bash
npm install
npm run db:generate
npm run dev
```

## Qualidade

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

E2E:

```bash
npx playwright install chromium
npm run test:e2e
```

## Prisma

```bash
npm run db:generate
npm run db:migrate -- --name nome-da-migration
npm run db:seed
npm run db:studio
```

O projeto está configurado no padrão atual do Prisma 7, com URL do datasource em
`prisma.config.ts`, e não dentro de `schema.prisma`.

## VS Code

Snippets:

- `stamp` → carimbo digital;
- `adr` → Architecture Decision Record;
- `devlog` → registro de desenvolvimento;
- `nsc` → Server Component;
- `zschema` → schema Zod;
- `vtest` → teste Vitest.

Agentes:

- **Arquiteto**
- **Implementador**
- **Revisor**
- **Mentor**

Prompts:

- `/planejar-feature`
- `/revisar-mudanca`
- `/criar-adr`
- `/explicar-mudanca`

## GitHub: privado + amostra pública

Estratégia sugerida:

```text
🔒 soeirotech-engineering-atlas
   código completo e histórico real

🌎 soeirotech-engineering-atlas-showcase
   README, arquitetura, screenshots, decisões e link de demonstração
```

Este repositório já possui a rota `/showcase` para servir como base da apresentação pública.

## Próximo passo

A primeira feature deve ser **Projetos**, não autenticação, notificações ou outras camadas
corporativas. Primeiro validar o domínio central; depois evoluir.
