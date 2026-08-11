# 00 — O que é Prisma?

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💾[DB] 💻[CODE] 🔗[REF]

## O que é?

Prisma é uma ferramenta de modelagem e acesso a banco de dados para aplicações Node.js e TypeScript.

No Engineering Atlas:

```text
Next.js / TypeScript
        ↓
      Prisma
        ↓
   PostgreSQL
```

## Prisma não é o banco

```text
PostgreSQL
→ banco de dados

Prisma
→ camada usada pela aplicação para acessar e modelar esse banco
```

## Principais partes

- Prisma Schema
- Prisma Client
- Prisma Migrate
- Prisma Generate
- Prisma Studio

## Regra mental

> PostgreSQL é o banco. Prisma é a camada pela qual a aplicação conversa com ele.

## Onde está no projeto?

```text
prisma/schema.prisma
prisma.config.ts
prisma/seed.ts
src/lib/prisma.ts
src/generated/prisma/
```

## O que memorizar

```text
schema.prisma → modela os dados
Migrate       → aplica mudanças no banco
Prisma Client → acessa dados em TypeScript
PostgreSQL    → onde os dados vivem
```
