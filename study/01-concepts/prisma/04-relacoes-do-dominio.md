# 04 — Relações do domínio

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💾[DB] 🔗[REL] 💻[CODE]

## Fluxo central

```text
Project
  ↓
ProjectSkill
  ↓
Skill

Project
  ↓
Evidence

Evidence
  └── Skill opcional

Project
  ↓
ArchitectureDecision
```

## Por que existe `ProjectSkill`?

Project e Skill possuem uma relação muitos-para-muitos.

Uma Skill pode aparecer em vários Projects.
Um Project pode usar várias Skills.

`ProjectSkill` representa essa ligação e ainda guarda:

```text
context
```

Ou seja: **onde/como a Skill foi aplicada naquele Project**.

## Chave composta

```text
(projectId, skillId)
```

Essa combinação identifica a ligação.

Ela evita cadastrar a mesma Skill duas vezes no mesmo Project.

## Evidence

Toda Evidence pertence a um Project.

A Skill é opcional porque uma evidência pode comprovar o projeto sem estar ligada a uma competência específica.

## Arquivos para localizar no projeto

```text
prisma/schema.prisma
src/app/projects/[id]/skills/
src/app/evidences/
```

## O que ainda preciso dominar?

- [ ] relação 1:N;
- [ ] relação N:N;
- [ ] chave estrangeira;
- [ ] chave composta;
- [ ] `include` nas consultas Prisma;
- [ ] deleção em cascata e seus riscos.

## Regra mental

> ProjectSkill não é uma Skill duplicada. É a evidência de ligação entre Project e Skill, com contexto.
