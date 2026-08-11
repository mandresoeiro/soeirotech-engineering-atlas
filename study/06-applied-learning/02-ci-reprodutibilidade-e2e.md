# CI, Reprodutibilidade e Testes E2E

📋 **Painel de Sinais Organizados (Compacto)**
📂[PJ] 📚[STUDY] 💡[IDEIA] 🧪[TEST] ⚙️[SYSTEM]

## Contexto

Durante a Issue #5, o Playwright E2E foi integrado ao GitHub Actions
do SoeiroTech Engineering Atlas.

O objetivo era executar automaticamente o fluxo principal da aplicação
em um ambiente de CI:

Project → Skill → Contexto → Evidence

## O que aconteceu

A primeira execução do GitHub Actions conseguiu executar com sucesso:

- PostgreSQL;
- geração do Prisma Client;
- migrations;
- lint;
- typecheck;
- Vitest;
- build;
- instalação do Chromium.

Porém, um dos testes E2E falhou.

O teste da página `/showcase` esperava encontrar o texto:

`SoeiroTech Engineering Atlas`

Esse texto não fazia parte da estrutura fixa da página.

Ele existia localmente porque havia um Project com esse nome cadastrado
no banco de desenvolvimento.

## Problema identificado

O teste dependia implicitamente de dados previamente existentes.

Localmente:

banco já populado
→ Project existente
→ teste passava

No CI:

banco limpo
→ Project inexistente
→ teste falhava

Isso mostrou que o teste não era completamente reproduzível.

## Correção aplicada

O teste passou a validar um elemento estrutural da própria página:

`Projetos em evidência`

Esse heading existe independentemente dos dados cadastrados.

Com isso:

ambiente limpo
→ aplicação inicia
→ `/showcase` é acessada
→ estrutura da página é validada
→ teste passa sem depender de seed local

## Aprendizado principal

Um ambiente de CI limpo ajuda a encontrar dependências ocultas que
podem passar despercebidas durante o desenvolvimento local.

Testes automatizados devem controlar suas próprias pré-condições.

Um teste deve:

- criar os dados de que necessita; ou
- validar elementos independentes de dados externos.

Ele não deve depender silenciosamente do estado anterior do banco.

## Separação de responsabilidades

No Engineering Atlas:

`home.spec.ts`

valida que o Showcase está acessível e possui sua estrutura principal.

`project-skill-evidence.spec.ts`

cria os próprios dados e valida o fluxo:

Project → Skill → Contexto → Evidence

Essa separação deixa cada teste mais previsível e compreensível.

## CI como ambiente de validação

O GitHub Actions não serve apenas para repetir comandos.

Ele fornece um ambiente novo onde podemos verificar se o projeto
realmente consegue ser reconstruído e validado a partir do zero.

Fluxo:

código
→ dependências
→ banco limpo
→ migrations
→ build
→ navegador
→ E2E

Se esse fluxo funciona, aumenta a confiança de que a aplicação não
depende de estados ocultos existentes apenas na máquina do
desenvolvedor.

## Referências práticas

- Issue #5
- PR #6
- GitHub Actions Run #11 — identificou a dependência oculta
- GitHub Actions Run #12 — pipeline aprovado
- `.github/workflows/ci.yml`
- `tests/e2e/home.spec.ts`
- `tests/e2e/project-skill-evidence.spec.ts`

## Regra que quero lembrar

> Teste reproduzível não depende do estado anterior do ambiente.

Antes de considerar um teste confiável, perguntar:

1. quais dados ele precisa?
2. quem cria esses dados?
3. ele funcionaria em um banco vazio?
4. ele funcionaria em outra máquina?
5. ele funcionaria no CI?

Se a resposta depender de dados locais existentes, existe uma
dependência escondida que precisa ser removida.
