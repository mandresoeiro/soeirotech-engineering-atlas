# Glossário Inicial

## ADR
Architecture Decision Record. Registro curto de uma decisão arquitetural relevante, seu contexto, alternativas e consequências.

## App Router
Sistema de rotas do Next.js baseado na pasta `app/`.

## CUID
Formato de identificador usado no projeto para gerar IDs únicos.

## Client Component
Componente React que precisa executar no navegador. No Next.js, deve ser usado apenas quando houver necessidade de interação no cliente.

## Composite Key / Chave composta
Identificação formada por mais de um campo. No `ProjectSkill`, a combinação é `projectId + skillId`.

## Constraint
Regra aplicada aos dados do banco, como obrigatoriedade, unicidade ou relacionamento.

## Container
Processo isolado executado a partir de uma imagem Docker.

## E2E
End-to-end. Teste que percorre um fluxo completo como um usuário.

## Enum
Conjunto controlado de valores possíveis.

## Evidence
Registro usado pelo Atlas para comprovar algo realizado em um Project, opcionalmente associado a uma Skill.

## Foreign Key
Campo que referencia a chave de outra tabela e cria uma relação.

## Health Check
Verificação usada para confirmar a saúde de uma aplicação ou dependência.

## Index
Estrutura usada pelo banco para acelerar determinadas consultas, com custo adicional de armazenamento e escrita.

## Migration
Mudança versionada na estrutura do banco.

## Modular Monolith
Aplicação implantada como uma unidade, mas organizada em módulos e responsabilidades claras.

## Model
Representação de uma entidade persistida no Prisma.

## ORM
Ferramenta que ajuda a aplicação a trabalhar com dados relacionais por meio de estruturas da linguagem.

## Primary Key
Campo ou conjunto de campos que identifica um registro de forma única.

## Prisma Client
Cliente TypeScript gerado pelo Prisma para consultar e alterar dados.

## ProjectSkill
Entidade de ligação entre Project e Skill que também registra o contexto de aplicação.

## Route Handler
Endpoint HTTP criado no App Router do Next.js, como `/api/health`.

## Schema
Descrição estrutural dos models, enums e relações no Prisma.

## Seed
Dados iniciais usados para preparar o ambiente.

## Server Action
Função executada no servidor que pode ser usada por interfaces Next.js para operações de escrita.

## Server Component
Componente renderizado no servidor por padrão no App Router do Next.js.

## Slug
Texto normalizado e amigável derivado de um nome. Não significa automaticamente que já seja usado como identificador de rota.

## Smoke Test
Teste rápido para confirmar que as partes principais do sistema estão acessíveis.

## Unique
Restrição que impede duplicidade.

## Volume
Armazenamento persistente gerenciado pelo Docker.

## Zod
Biblioteca usada para validar entradas e schemas na aplicação.
