# ADR-001 — Iniciar como Modular Monolith

- **Status:** Aceito
- **Data:** 2026-08-07

## Contexto

O Engineering Atlas precisa organizar projetos, skills, contexto de aplicação e evidências sem criar
complexidade operacional artificial.

O projeto atualmente possui um único produto, um único banco e não há requisito real para ciclos de
deploy independentes entre módulos.

## Decisão

Iniciar como modular monolith usando Next.js como aplicação full stack, PostgreSQL como banco
relacional e Prisma como camada de acesso a dados.

Monólito modular não significa código sem separação de responsabilidades. A aplicação deve manter
módulos coesos, validação nos limites do sistema e regras organizadas conforme o domínio.

## Alternativas consideradas

1. Next.js separado de uma API NestJS desde o primeiro commit.
2. Microserviços.

Essas alternativas foram descartadas neste momento por adicionarem configuração, deploy,
observabilidade e coordenação operacional antes de existir uma necessidade comprovada.

## Consequências

### Positivas

- menor custo operacional;
- menos configuração duplicada;
- deploy e desenvolvimento mais simples;
- permite focar no domínio, nos testes e na rastreabilidade de competências.

### Negativas / trade-offs

- fronteiras entre módulos exigem disciplina dentro do mesmo repositório;
- o acoplamento pode crescer se os módulos não forem mantidos com responsabilidades claras;
- uma API ou serviço separado pode ser necessário no futuro.

## Critérios para reavaliação

A decisão deve ser reavaliada somente diante de requisito real, como:

1. necessidade de consumidores externos da API;
2. módulos com ciclos de deploy independentes;
3. requisitos de escalabilidade claramente diferentes;
4. fronteiras de domínio que justifiquem separação.
