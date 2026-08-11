# Checkpoint 02 — Domínio v1

📋 **Painel de Sinais Organizados (Compacto)**  
🎯[OBJ] 🚀[DEV] 🔗[REL] 🧪[TEST]

## Implementação existente

### Project
- [x] listar;
- [x] criar;
- [x] detalhes;
- [x] editar;
- [x] status;
- [x] arquivar.

### Skill
- [x] listar;
- [x] criar;
- [x] detalhes;
- [x] editar;
- [x] slug automático;
- [x] exclusão protegida.

### ProjectSkill
- [x] associar Project ↔ Skill;
- [x] registrar contexto;
- [x] editar contexto;
- [x] remover associação.

### Evidence v1
- [x] listar;
- [x] criar;
- [x] detalhes;
- [x] editar;
- [x] excluir;
- [x] Project obrigatório;
- [x] Skill opcional;
- [x] validação ProjectSkill quando Skill é usada.

## Validação técnica existente

- [x] build;
- [x] testes Vitest;
- [x] rotas HTTP principais;
- [x] health check.

## Validação funcional ainda recomendada

- [ ] executar manualmente o fluxo completo:
  Project → Skill → Contexto → Evidence;
- [ ] transformar esse fluxo em Playwright E2E.

## Próximo passo

Compreender o fluxo antes de adicionar uma nova grande feature.
