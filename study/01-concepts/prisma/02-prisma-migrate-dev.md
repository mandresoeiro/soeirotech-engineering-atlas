# 02 — Prisma Migrate Dev

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💾[DB] 💻[CODE] 🧪[TEST] 🚀[DEV]

## 1. O que é `prisma migrate dev`?

Até agora temos algo assim:

```text
prisma/schema.prisma
        ↓
model Project
```

Mas escrever um `model` **não cria sozinho uma tabela no PostgreSQL**.

Precisamos transformar o modelo em alterações reais no banco:

```text
schema.prisma
     ↓
Prisma Migrate
     ↓
arquivo SQL
     ↓
PostgreSQL
```

É aí que entra:

```bash
prisma migrate dev
```

No Engineering Atlas usamos:

```bash
docker compose exec web npm run db:migrate -- --name init
```

No `package.json`, temos:

```json
"db:migrate": "prisma migrate dev"
```

Então, na prática, o comando executado é:

```bash
prisma migrate dev --name init
```

---

## 2. O que significa cada parte?

### `prisma`

É a CLI do Prisma.

```text
prisma
↓
ferramentas de linha de comando
```

### `migrate`

Indica que queremos trabalhar com **migrações do banco de dados**.

### `dev`

Significa que estamos criando/aplicando migrations em **ambiente de desenvolvimento**.

```text
migrate dev
→ desenvolvimento

migrate deploy
→ produção
```

Não usamos `migrate dev` como estratégia de produção.

### `--name init`

Dá um nome para a migration:

```text
init
```

Como esta é a estrutura inicial do banco.

O Prisma pode criar algo parecido com:

```text
prisma/
└── migrations/
    └── 20260807141000_init/
        └── migration.sql
```

---

## 3. O que existe dentro de `migration.sql`?

SQL real.

De forma simplificada, podemos encontrar algo parecido com:

```sql
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
```

Então veja a ligação:

```prisma
model Project {
  name String
}
```

vira algo equivalente no PostgreSQL:

```sql
"name" TEXT NOT NULL
```

### Regra mental

> Prisma não elimina SQL. Ele gera e gerencia SQL para nós.

---

## 4. Para que guardar migrations?

Imagine que hoje nosso `Project` tenha:

```text
name
description
status
```

Daqui a um mês adicionamos:

```prisma
featured Boolean @default(false)
```

Não queremos destruir o banco e recriá-lo.

Criamos outra migration:

```bash
npm run db:migrate -- --name add-project-featured
```

Então teremos um histórico:

```text
prisma/migrations/

├── 20260807_init/
│   └── migration.sql
│
├── 20260820_add_project_featured/
│   └── migration.sql
│
└── ...
```

É uma boa forma de pensar nas migrations como um **histórico versionado da estrutura do banco**.

---

## 5. O que o `migrate dev` faz?

Simplificando:

```text
1. Lê schema.prisma
        ↓
2. Analisa o estado das migrations
        ↓
3. Compara a estrutura esperada
        ↓
4. Cria uma nova migration se necessário
        ↓
5. Gera SQL
        ↓
6. Aplica no PostgreSQL
        ↓
7. Registra a migration executada
```

O PostgreSQL também mantém uma tabela interna do Prisma:

```text
_prisma_migrations
```

Ela registra quais migrations já foram aplicadas.

---

## 6. O que é Shadow Database?

No desenvolvimento, o Prisma pode usar um **shadow database** temporário para entender o histórico das migrations e detectar diferenças.

Modelo mental suficiente por enquanto:

```text
Banco real
→ seus dados

Shadow database
→ banco temporário usado pelo Prisma
   para analisar migrations
```

Não precisamos aprofundar isso agora.

---

## 7. `migrate` ≠ `generate`

Essa diferença é importante.

### Migration

```bash
prisma migrate dev
```

Cuida da estrutura do:

```text
PostgreSQL
```

### Generate

```bash
prisma generate
```

Cuida do:

```text
Prisma Client
```

Portanto:

```text
schema.prisma
    │
    ├── migrate
    │      ↓
    │  PostgreSQL
    │
    └── generate
           ↓
       Prisma Client
           ↓
       TypeScript
```

---

## 8. E o `seed`?

É outra coisa.

```text
MIGRATION
→ cria estrutura

SEED
→ coloca dados iniciais
```

Exemplo:

```text
Migration
→ cria tabela Project

Seed
→ adiciona SoeiroTech Engineering Atlas
```

Nossa sequência fica:

```text
schema.prisma
      ↓
migrate
      ↓
tabelas
      ↓
generate
      ↓
Prisma Client
      ↓
seed
      ↓
dados iniciais
```

---

## 9. Migration deve ser versionada

A pasta:

```text
prisma/migrations/
```

deve ir para o Git.

Não deve ser colocada no `.gitignore`.

Porque ela documenta:

> como o banco chegou ao estado atual.

---

## 10. Comando usado no projeto

Na raiz do Engineering Atlas:

```bash
docker compose exec web npm run db:migrate -- --name init
```

Esse comando executa a migration dentro do container `web`.

---

## 11. Depois da migration

Depois que a migration for criada/aplicada, vale abrir:

```text
prisma/migrations/
```

e inspecionar:

```text
migration.sql
```

O objetivo é entender o SQL gerado e ligar:

```text
schema.prisma
→ migration.sql
→ PostgreSQL
```

---

## 12. O que memorizar agora

```text
Migration
→ alteração versionada da estrutura do banco

migrate dev
→ cria/aplica migrations em desenvolvimento

migration.sql
→ SQL que modifica o PostgreSQL

_prisma_migrations
→ histórico do que já foi aplicado
```

## 13. Regra mental final

```text
schema.prisma
      ↓
prisma migrate dev
      ↓
migration.sql
      ↓
PostgreSQL
```
