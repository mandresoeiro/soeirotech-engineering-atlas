---
name: Testes
description: Estratégia para testes unitários, integração e E2E.
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,tests/**/*"
---

# Testes

- Teste comportamento e regras, não detalhes internos irrelevantes.
- Nomeie testes por condição e resultado esperado.
- Priorize regras de negócio, autorização, validação e regressões.
- Um bug corrigido deve ganhar teste de regressão quando viável.
- Para E2E, cubra fluxos realmente críticos.
