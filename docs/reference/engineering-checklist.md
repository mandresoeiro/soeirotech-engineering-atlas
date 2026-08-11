# Checklist de Engenharia

Este arquivo é uma referência de revisão. As fontes oficiais continuam em `docs/00-product` até
`docs/09-tcc`.

## 1. Produto

- [ ] O problema do produto está claro?
- [ ] A solução continua alinhada a Projeto -> Skill -> Contexto -> Evidência?
- [ ] O produto ainda serve como portfólio técnico e rastreabilidade de competências?

## 2. Requisitos

- [ ] Os requisitos refletem funcionalidades reais?
- [ ] O que está planejado está marcado como planejado?
- [ ] Há requisito novo com problema real identificado?

## 3. Arquitetura

- [ ] A arquitetura continua adequada ao estágio atual?
- [ ] O monólito modular mantém separação de responsabilidades?
- [ ] Há justificativa real antes de propor nova camada, API ou serviço?

## 4. Dados

- [ ] O schema Prisma corresponde ao modelo documentado?
- [ ] Relações entre Project, Skill, ProjectSkill, Evidence e ArchitectureDecision estão coerentes?
- [ ] Mudanças persistentes possuem migration?

## 5. Decisões / ADR

- [ ] Decisões relevantes possuem ADR?
- [ ] ADRs registram contexto, decisão, alternativas e consequências?
- [ ] Critérios de reavaliação continuam válidos?

## 6. Qualidade e testes

- [ ] Mudanças críticas possuem testes?
- [ ] Validações e schemas têm cobertura relevante?
- [ ] Smoke tests cobrem rotas principais?
- [ ] Playwright E2E está planejado para fluxos críticos?

## 7. Segurança

- [ ] Segredos estão fora do repositório?
- [ ] Entradas são validadas nos limites do sistema?
- [ ] Dados privados ficam fora do showcase público?

## 8. Operação

- [ ] Docker Compose sobe o ambiente local?
- [ ] Health check está funcionando?
- [ ] Configurações sensíveis usam variáveis de ambiente?

## 9. Documentação

- [ ] Documentação acompanha mudanças relevantes?
- [ ] Cada informação possui uma fonte oficial?
- [ ] DevLog registra desenvolvimento real do produto?

## 10. Portfólio / evidências

- [ ] Existem evidências verificáveis para o portfólio?
- [ ] Evidências apontam para código, testes, ADRs, screenshots, releases ou deploys reais?
- [ ] O showcase representa apenas funcionalidades existentes ou claramente planejadas?
