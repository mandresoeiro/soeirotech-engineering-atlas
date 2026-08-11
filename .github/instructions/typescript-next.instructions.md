---
name: TypeScript e Next.js
description: Convenções para código TypeScript, React e Next.js.
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript e Next.js

- Mantenha tipagem estrita e evite `any`.
- Use Server Components por padrão.
- Adicione `"use client"` somente quando houver necessidade real.
- Não execute autorização apenas no cliente.
- Separe validação, regra de negócio e persistência quando isso melhorar testabilidade.
- Evite `useEffect` para dados que podem ser obtidos no servidor.
- Preserve acessibilidade semântica.
- Não crie abstrações antes de existir repetição real.
