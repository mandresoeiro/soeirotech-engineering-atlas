# Aprendizado Aplicado — Fundação Prisma

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 🚀[DEV] 💾[DB] 💻[CODE]

## Conceitos

- Prisma Schema;
- model;
- migration;
- PostgreSQL;
- seed;
- Prisma Client.

## Problema real

O Engineering Atlas precisa persistir Projects, Skills, Evidences e Architecture Decisions.

## Aplicação

A modelagem e persistência estão ligadas a:

```text
prisma/schema.prisma
prisma.config.ts
prisma/seed.ts
prisma/migrations/
src/lib/prisma.ts
src/generated/prisma/
```

## Estado validado

- Prisma Client gerado;
- migration inicial existente;
- seed executado;
- PostgreSQL acessível;
- `/api/health` confirma aplicação + banco.

## Evidências

```text
prisma/migrations/20260810155109_init/migration.sql
prisma/schema.prisma
prisma/seed.ts
src/lib/prisma.ts
```

## Próximo aprendizado

Ler consultas reais do Prisma Client e entender relações/`include`.
