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

## Ainda falta validar manualmente como usuário

- [ ] criar/selecionar Project;
- [ ] associar Skill;
- [ ] registrar contexto;
- [ ] criar Evidence;
- [ ] conferir o relacionamento no detalhe.

Esse fluxo é candidato prioritário para Playwright E2E.
