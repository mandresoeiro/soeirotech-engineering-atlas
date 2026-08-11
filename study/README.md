# Study — SoeiroTech Engineering Atlas

📋 **Painel de Sinais Organizados (Compacto)**  
📚[STUDY] 💻[CODE] 💾[DB] 🧪[TEST] 🐞[BUG] 🔍[CHECK]

## Objetivo

`study/` é o **caderno técnico de aprendizado** do Engineering Atlas.

Ele não substitui `docs/`.

```text
docs/
→ documentação oficial do produto

study/
→ conceitos, dúvidas, experimentos, erros, revisões e aprendizado aplicado
```

## Regra principal

> Estudar o que o projeto exige, compreender, aplicar, testar e registrar.

Evitar copiar aulas inteiras ou acumular conteúdo sem aplicação.

## Fluxo

```text
necessidade do projeto
        ↓
conceito
        ↓
código
        ↓
teste / validação
        ↓
aprendizado aplicado
        ↓
evidência
        ↓
docs/ quando virar decisão, requisito ou comportamento oficial
```

## Estrutura oficial

```text
study/
├── 00-inbox/             dúvidas ainda não organizadas
├── 01-concepts/          conceitos por tecnologia
│   ├── architecture/
│   ├── docker/
│   ├── nextjs/
│   ├── postgresql/
│   ├── prisma/
│   ├── react/
│   ├── testing/
│   └── typescript/
├── 02-labs/              pequenos experimentos
├── 03-debugging/         erros, causa e solução
├── 04-reviews/           revisões e perguntas
├── 05-glossary/          termos técnicos
├── 06-applied-learning/  conceito aplicado no Atlas
├── 07-checkpoints/       etapas realmente compreendidas/concluídas
└── templates/            modelos reutilizáveis
```

## Estado do projeto usado como referência

Já existe e foi validado:

- Next.js + TypeScript;
- Docker Compose;
- PostgreSQL;
- Prisma, migration e seed;
- Project;
- Skill;
- ProjectSkill com contexto;
- Evidence v1;
- Zod;
- Vitest;
- build de produção;
- smoke test das rotas;
- `/api/health`.

Próximos estudos ligados ao roadmap:

- Prisma Client e relações;
- fluxo Project → Skill → Contexto → Evidence;
- Server Components e Server Actions;
- testes de integração;
- Playwright E2E;
- GitHub Actions;
- ADR e arquitetura modular.

## Regra de progresso

Um item só deve ser marcado como **dominado** quando você conseguir explicar:

1. o que é;
2. qual problema resolve;
3. onde aparece no Atlas;
4. como foi validado;
5. qual limite ou trade-off importante.
