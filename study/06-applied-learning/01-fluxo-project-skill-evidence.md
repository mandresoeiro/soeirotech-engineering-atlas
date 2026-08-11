# Aprendizado Aplicado — Project → Skill → Contexto → Evidence

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 🚀[DEV] 🔗[REL] 💻[CODE]

## Problema real

Um portfólio comum mostra tecnologias, mas não prova claramente **onde e como** cada competência foi aplicada.

## Aplicação no Atlas

```text
Project
→ ProjectSkill
→ Skill
→ Contexto de aplicação
→ Evidence
```

## O que já existe

- CRUD inicial de Projects;
- CRUD inicial de Skills;
- associação Project ↔ Skill;
- contexto na associação;
- Evidence v1;
- Evidence ligada obrigatoriamente a Project;
- Skill opcional na Evidence.

## Validações importantes

Uma Evidence associada a uma Skill deve respeitar a ligação existente entre essa Skill e o Project.

## Evidências no código

```text
prisma/schema.prisma
src/app/projects/
src/app/projects/[id]/skills/
src/app/skills/
src/app/evidences/
src/lib/validations/
```

## Validação concluída

O fluxo foi validado manualmente e posteriormente automatizado com
Playwright E2E.

- [x] criar/selecionar Project;
- [x] associar Skill;
- [x] registrar contexto;
- [x] criar Evidence;
- [x] conferir o relacionamento no detalhe;
- [x] automatizar o fluxo com Playwright.

A principal aprendizagem foi compreender que o teste E2E valida o
comportamento integrado do fluxo pela perspectiva do usuário, enquanto
os testes de níveis inferiores continuam responsáveis por validar
partes menores da aplicação.

Referências da validação:

- Issue #1
- PR #2
- `tests/e2e/project-skill-evidence.spec.ts`
