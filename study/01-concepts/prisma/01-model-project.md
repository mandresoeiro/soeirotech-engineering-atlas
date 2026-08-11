# 01 — Entendendo o model Project

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💾[DB] 💻[CODE] 🔍[CHECK]

## 1. O que é um model no Prisma?

Um `model` representa uma entidade que será persistida no banco de dados.

No Engineering Atlas temos:

```prisma
model Project {
  ...
}
```

Esse model representa um projeto cadastrado no sistema.

Exemplos:

- Engineering Atlas
- Learning Hub
- TaskLite
- outro projeto futuro

De forma simplificada:

```text
model Project
      ↓
tabela Project
      ↓
registros de projetos
```

---

## 2. Model atual

```prisma
model Project {
  id          String        @id @default(cuid())
  slug        String        @unique
  name        String
  description String?
  status      ProjectStatus @default(PLANNED)
  repository  String?
  demoUrl     String?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  skillLinks ProjectSkill[]
  evidences  Evidence[]
  decisions  ArchitectureDecision[]

  @@index([status])
}
```

---

## 3. `id`

```prisma
id String @id @default(cuid())
```

O `id` identifica unicamente cada Project.

Exemplo:

```text
cm123abc...
```

### `String`

O tipo do campo é texto.

### `@id`

Define este campo como chave primária.

Uma chave primária identifica um registro de forma única.

### `@default(cuid())`

O Prisma gera automaticamente um identificador.

Então não precisamos fazer:

```text
id = 1
id = 2
id = 3
```

O sistema gera o valor.

---

## 4. `slug`

```prisma
slug String @unique
```

O slug é uma versão amigável do nome.

Exemplo:

```text
SoeiroTech Engineering Atlas
```

pode virar:

```text
soeirotech-engineering-atlas
```

Um slug pode ser usado em URLs amigáveis. No Atlas atual, as rotas principais de detalhe usam identificadores dinâmicos; portanto, não assumir que o slug já é a chave da rota pública.

### `@unique`

Impede dois projetos de terem o mesmo slug.

Portanto isto não seria permitido:

```text
learning-hub
learning-hub
```

---

## 5. `name`

```prisma
name String
```

É o nome do projeto.

Exemplo:

```text
SoeiroTech Engineering Atlas
```

Como não existe `?`, o campo é obrigatório.

---

## 6. `description`

```prisma
description String?
```

O `?` significa que o campo é opcional.

Podemos ter:

```text
description = "Plataforma de evolução em Engenharia de Software."
```

ou:

```text
description = null
```

---

## 7. `status`

```prisma
status ProjectStatus @default(PLANNED)
```

Esse campo não aceita qualquer texto.

Ele utiliza:

```prisma
enum ProjectStatus {
  IDEA
  PLANNED
  IN_PROGRESS
  PAUSED
  COMPLETED
  ARCHIVED
}
```

Assim o sistema controla quais estados são permitidos.

Exemplo:

```text
IDEA
PLANNED
IN_PROGRESS
PAUSED
COMPLETED
ARCHIVED
```

### Por que usar enum?

Sem enum poderíamos acabar com:

```text
Em andamento
em andamento
fazendo
ativo
Working
```

Isso deixaria os dados inconsistentes.

Com enum usamos um conjunto controlado.

---

## 8. `@default(PLANNED)`

```prisma
status ProjectStatus @default(PLANNED)
```

Se um novo projeto for criado sem status, o Prisma utilizará:

```text
PLANNED
```

Exemplo:

```text
Novo Project
     ↓
status não informado
     ↓
PLANNED
```

---

## 9. `repository`

```prisma
repository String?
```

Guarda o endereço do repositório.

Exemplo:

```text
https://github.com/usuario/projeto
```

É opcional porque um projeto pode existir antes de possuir repositório.

---

## 10. `demoUrl`

```prisma
demoUrl String?
```

Pode guardar a URL da aplicação publicada.

Exemplo:

```text
https://atlas.exemplo.com
```

Também é opcional.

---

## 11. `createdAt`

```prisma
createdAt DateTime @default(now())
```

Registra automaticamente quando o Project foi criado.

Isso é útil para:

- histórico;
- ordenação;
- auditoria básica;
- relatórios.

---

## 12. `updatedAt`

```prisma
updatedAt DateTime @updatedAt
```

O Prisma atualiza esse campo quando o registro é alterado.

---

## 13. Relacionamentos

```prisma
skillLinks ProjectSkill[]
evidences  Evidence[]
decisions  ArchitectureDecision[]
```

O `[]` significa coleção.

Ou seja, um Project pode possuir vários registros relacionados.

```text
Project
│
├── várias skills
├── várias evidências
└── várias decisões
```

Ainda não precisamos dominar os relacionamentos.

Vamos estudá-los separadamente.

---

## 14. Índice

```prisma
@@index([status])
```

Esse índice pode ajudar consultas que procuram projetos por status.

Exemplo:

```text
todos os projetos IN_PROGRESS
```

Não significa que todo campo deve ter índice.

Índices também possuem custo de armazenamento e escrita.

---

## 15. Organização mental do Project

```text
PROJECT
│
├── Identidade
│   ├── id
│   ├── slug
│   └── name
│
├── Informação
│   ├── description
│   ├── repository
│   └── demoUrl
│
├── Estado
│   └── status
│
├── Datas
│   ├── createdAt
│   └── updatedAt
│
└── Relacionamentos
    ├── skillLinks
    ├── evidences
    └── decisions
```

---

## 16. Exemplo de registro

```text
id:
cm123abc

slug:
soeirotech-engineering-atlas

name:
SoeiroTech Engineering Atlas

description:
Plataforma de evolução prática em Engenharia de Software.

status:
IN_PROGRESS

repository:
https://github.com/...

demoUrl:
null
```

---

## 17. O que aprendemos?

Um `model` do Prisma define:

- campos;
- tipos;
- obrigatoriedade;
- valores padrão;
- unicidade;
- relacionamentos;
- índices.

O model também expressa regras estruturais do domínio.

---

## 18. Regra mental

```text
Project
    ↓
entidade do nosso domínio

model Project
    ↓
representação no Prisma

Migration
    ↓
estrutura no PostgreSQL

Prisma Client
    ↓
TypeScript acessa os registros
```

## O que memorizar agora

```text
model
→ representa uma entidade

String?
→ campo opcional

@id
→ chave primária

@unique
→ não permite duplicidade

@default(...)
→ valor automático/padrão
```
