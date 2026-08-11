# 03 — Prisma Client

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💾[DB] 💻[CODE] 🔍[CHECK]

## Status

**Aplicado no projeto; estudo/revisão ainda em andamento.**

## O que é?

Prisma Client é a API TypeScript gerada a partir do `schema.prisma`.

Ele permite que a aplicação faça operações no banco usando código tipado.

```text
schema.prisma
      ↓
prisma generate
      ↓
Prisma Client
      ↓
TypeScript
      ↓
PostgreSQL
```

## No Engineering Atlas

O projeto possui:

```text
src/lib/prisma.ts
src/generated/prisma/
```

O primeiro centraliza o acesso ao cliente.
O segundo contém código gerado pelo Prisma e não deve ser editado manualmente.

## Operações que preciso reconhecer

```ts
prisma.project.findMany()
prisma.project.findUnique(...)
prisma.project.create(...)
prisma.project.update(...)
```

Os nomes disponíveis vêm dos models do schema.

## `prisma generate`

Gera/atualiza o Prisma Client depois de mudanças relevantes no schema.

Regra mental:

```text
migrate  → altera a estrutura do banco
generate → atualiza o cliente TypeScript
```

## Por que `src/lib/prisma.ts`?

Em aplicações Next.js, centralizar a instância ajuda a evitar criação desnecessária de múltiplos clientes durante o desenvolvimento.

## O que ainda preciso dominar?

- [ ] ler uma consulta real do Atlas linha por linha;
- [ ] entender `where`;
- [ ] entender `include`;
- [ ] entender `select`;
- [ ] entender `create`;
- [ ] entender `update`;
- [ ] entender tratamento de erro.

## O que memorizar

```text
Prisma Client
→ código TypeScript gerado
→ baseado no schema
→ usado para consultar e alterar PostgreSQL
```
