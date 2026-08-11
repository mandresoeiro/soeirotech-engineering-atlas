# Debugging — Next.js build e `NODE_ENV`

📋 **Painel de Sinais Organizados (Compacto)**  
🐞[BUG] 🔧[FIX] 💻[CODE] 📚[STUDY]

## Sintoma

O build avançava na compilação e typecheck, mas falhava durante a geração de páginas, acompanhado de aviso sobre `NODE_ENV` não padrão.

## Diagnóstico

O container de desenvolvimento usava:

```text
NODE_ENV=development
```

O build de produção foi testado explicitamente com:

```bash
docker compose exec -e NODE_ENV=production web npm run build
```

## Resultado

O build de produção foi concluído com sucesso.

## Aprendizado

```text
ambiente de desenvolvimento
≠
contexto do build de produção
```

Não é necessário transformar permanentemente o container local em produção apenas para validar o build.

## Evidência

- build de produção validado;
- smoke test executado depois da reinicialização.
