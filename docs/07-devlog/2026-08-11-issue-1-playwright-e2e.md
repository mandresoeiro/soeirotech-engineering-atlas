# DevLog — 2026-08-11

📋 **Painel de Sinais Organizados (Compacto)**
📂[PJ] 🚀[DEV] 📚[STUDY] 💻[CODE] 🧪[TEST] 📄[DOC]

## Objetivo

Automatizar e validar o fluxo principal do SoeiroTech Engineering Atlas:

Project → Skill → Contexto → Evidence

## Problema real

O fluxo principal da aplicação já havia sido validado manualmente,
mas ainda não existia um teste E2E automatizado comprovando que
Project, Skill, contexto e Evidence funcionavam de forma integrada
pela interface.

## Decisão

Utilizar Playwright para automatizar o fluxo completo pela interface,
mantendo Vitest para os testes já existentes de nível inferior.

## Implementação

- Mudança principal:
  criação do teste E2E do fluxo Project → Skill → Contexto → Evidence.

- Arquivos afetados:
  tests/e2e/project-skill-evidence.spec.ts
  docs/05-quality/testing-strategy.md

O teste cria dados com nomes únicos, associa uma Skill a um Project,
registra o contexto de aplicação, cria uma Evidence e confirma os
relacionamentos pela interface.

## Validação

- [x] testes Vitest — 8 testes aprovados
- [x] Playwright E2E — 2 testes aprovados
- [x] fluxo validado em `http://localhost:3010`
- [x] PR #2 integrado à main após validação dos testes

## Aprendizado aplicado

O Playwright permite validar o comportamento do sistema pelo ponto de
vista do usuário, percorrendo várias partes da aplicação em um único
fluxo.

Também foi identificado que o ambiente de execução influencia testes
E2E: o Chromium baixado pelo Playwright apresentou incompatibilidade
com o container Alpine, enquanto a execução pelo Windows com Chromium
instalado funcionou corretamente.

## Evidência

Issue #1:
https://github.com/mandresoeiro/soeirotech-engineering-atlas/issues/1

test: validate Project → Skill → Context → Evidence flow with Playwright

PR #2:
https://github.com/mandresoeiro/soeirotech-engineering-atlas/pull/2

test: validate Project → Skill → Context → Evidence flow with Playwright

Resultado:
- Playwright: 2 passed
- Vitest: 3 files passed / 8 tests passed
- PR #2 merged na main
- Issue #1 fechada automaticamente
- Evidence registrada no próprio Engineering Atlas associada ao
  projeto SoeiroTech Engineering Atlas e à Skill Playwright

## Próximo passo

Planejar a integração contínua com GitHub Actions.
