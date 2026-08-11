---
name: Prisma e Banco de Dados
description: Regras para schema Prisma, migrations e persistência.
applyTo: "prisma/**/*,**/*prisma*.ts"
---

# Prisma e PostgreSQL

- Modele relações e constraints conforme regras reais do domínio.
- Use nomes claros e consistentes.
- Use migrations para mudanças rastreáveis.
- Não crie índices sem consulta ou necessidade observável.
- Use transação quando consistência entre escritas exigir.
- Evite expor modelos de persistência como contrato público sem avaliar acoplamento.
- Nunca coloque credenciais no schema.
